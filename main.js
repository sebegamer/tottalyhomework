import {
  observeAuth,
  signInWithGoogle,
  signOutAccount,
  ensureUserAccount,
  subscribeToUserAccount,
  syncUserArcadeData,
  getFriendlyFirebaseError,
  sanitizeIdArray,
  sanitizePlayCounts,
} from './firebase.js';

const FAVORITES_KEY = 'deskplay_favorites_v1';
const RECENT_GAMES_KEY = 'deskplay_recent_v1';
const PLAY_COUNTS_KEY = 'deskplay_play_counts_v1';
const THEME_KEY = 'deskplay_theme_v1';

const DIFFICULTY_RANK = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

const state = {
  catalogGames: [],
  favorites: new Set(),
  recentIds: [],
  playCounts: {},
  user: null,
  accountDoc: null,
  unsubscribeAccount: null,
  authPending: false,
  activeCategory: 'All',
  sortBy: 'featured',
  searchQuery: '',
  currentGameId: null,
  previewGameId: null,
  featuredIndex: 0,
  wideTheater: false,
  dimLights: false,
  lightTheme: false,
  sessionSeconds: 0,
  sessionTimerId: null,
};

const elements = {
  mainContainer: document.getElementById('main-container'),
  cinemaBackdrop: document.getElementById('cinema-backdrop'),
  brandLink: document.getElementById('brand-link'),
  navButtons: Array.from(document.querySelectorAll('[data-nav-category]')),
  tabButtons: Array.from(document.querySelectorAll('[data-category]')),
  authBtn: document.getElementById('auth-btn'),
  accountModal: document.getElementById('account-modal'),
  accountSignedOut: document.getElementById('account-signed-out'),
  accountSignedIn: document.getElementById('account-signed-in'),
  accountCloseBtn: document.getElementById('account-close-btn'),
  accountSignedInCloseBtn: document.getElementById('account-signedin-close-btn'),
  googleSignInBtn: document.getElementById('google-signin-btn'),
  signOutBtn: document.getElementById('signout-btn'),
  accountError: document.getElementById('account-error'),
  accountSyncError: document.getElementById('account-sync-error'),
  accountAvatarImg: document.getElementById('account-avatar-img'),
  accountAvatarFallback: document.getElementById('account-avatar-fallback'),
  accountName: document.getElementById('account-name'),
  accountEmail: document.getElementById('account-email'),
  accountCreated: document.getElementById('account-created'),
  accountStatSaved: document.getElementById('account-stat-saved'),
  accountStatPlays: document.getElementById('account-stat-plays'),
  accountSyncStatus: document.getElementById('account-sync-status'),
  searchInput: document.getElementById('search-input'),
  sortSelect: document.getElementById('sort-select'),
  gamesGrid: document.getElementById('games-grid'),
  gamesStatus: document.getElementById('games-status'),
  metricTotal: document.getElementById('metric-total'),
  metricCategories: document.getElementById('metric-categories'),
  metricSaved: document.getElementById('metric-saved'),
  featuredImg: document.getElementById('featured-img'),
  featuredMeta: document.getElementById('featured-meta'),
  featuredTitle: document.getElementById('featured-title'),
  featuredDesc: document.getElementById('featured-desc'),
  heroLead: document.getElementById('hero-lead'),
  featuredPrevBtn: document.getElementById('featured-prev-btn'),
  featuredNextBtn: document.getElementById('featured-next-btn'),
  featuredLaunchBtn: document.getElementById('featured-launch-btn'),
  heroPlayFeaturedBtn: document.getElementById('hero-play-featured-btn'),
  recentSection: document.getElementById('recent-section'),
  recentList: document.getElementById('recent-list'),
  clearRecentBtn: document.getElementById('clear-recent-btn'),
  playerSection: document.getElementById('player-section'),
  playerTitle: document.getElementById('player-title'),
  playerSubtitle: document.getElementById('player-subtitle'),
  playerTimer: document.getElementById('player-timer'),
  playerControlsTip: document.getElementById('player-controls-tip'),
  iframeStage: document.getElementById('iframe-stage'),
  playerInfoBtn: document.getElementById('player-info-btn'),
  favoritePlayerBtn: document.getElementById('favorite-player-btn'),
  dimLightsBtn: document.getElementById('dim-lights-btn'),
  theaterModeBtn: document.getElementById('theater-mode-btn'),
  reloadGameBtn: document.getElementById('reload-game-btn'),
  fullscreenGameBtn: document.getElementById('fullscreen-game-btn'),
  closePlayerBtn: document.getElementById('close-player-btn'),
  themeToggleBtn: document.getElementById('theme-toggle-btn'),
  previewModal: document.getElementById('preview-modal'),
  previewKicker: document.getElementById('preview-kicker'),
  previewTitle: document.getElementById('preview-title'),
  previewImg: document.getElementById('preview-img'),
  previewOverview: document.getElementById('preview-overview'),
  previewDifficulty: document.getElementById('preview-difficulty'),
  previewDifficultyBars: document.getElementById('preview-difficulty-bars'),
  previewTime: document.getElementById('preview-time'),
  previewPlayers: document.getElementById('preview-players'),
  previewControls: document.getElementById('preview-controls'),
  previewTips: document.getElementById('preview-tips'),
  previewSaveBtn: document.getElementById('preview-save-btn'),
  previewStartBtn: document.getElementById('preview-start-btn'),
  previewCloseBtn: document.getElementById('preview-close-btn'),
};

function isSafeIframeUrl(rawUrl) {
  if (typeof rawUrl !== 'string') return false;
  const trimmed = rawUrl.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('./') && !trimmed.includes('..')) {
    return true;
  }
  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.includes('..')) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

function parseIframeConfig(game) {
  let src = typeof game.iframeSrc === 'string' ? game.iframeSrc.trim() : '';
  let title = game.title || 'Unblocked Game';
  let allow = 'fullscreen; autoplay; gamepad; pointer-lock';

  if (typeof game.iframe === 'string' && game.iframe.trim().startsWith('<')) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(game.iframe, 'text/html');
    const parsedIframe = doc.querySelector('iframe');
    if (parsedIframe) {
      const parsedSrc = parsedIframe.getAttribute('src');
      if (parsedSrc && !src) {
        src = parsedSrc.trim();
      }
      const parsedTitle = parsedIframe.getAttribute('title');
      if (parsedTitle) {
        title = parsedTitle.trim();
      }
      const parsedAllow = parsedIframe.getAttribute('allow');
      if (parsedAllow) {
        allow = parsedAllow.trim();
      }
    }
  }

  if (!isSafeIframeUrl(src)) {
    return null;
  }

  return { src, title, allow };
}

function createSafeIframeElement(game) {
  const config = parseIframeConfig(game);
  if (!config) return null;

  const iframe = document.createElement('iframe');
  iframe.src = config.src;
  iframe.title = config.title;
  iframe.allow = config.allow;
  iframe.allowFullscreen = true;
  iframe.loading = 'eager';
  iframe.referrerPolicy = 'no-referrer';
  return iframe;
}

function getAllGames() {
  return state.catalogGames;
}

function loadLocalStorage() {
  try {
    const savedFavs = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    if (Array.isArray(savedFavs)) {
      state.favorites = new Set(savedFavs.filter((id) => typeof id === 'string'));
    }
  } catch {
    state.favorites = new Set();
  }

  try {
    const savedRecent = JSON.parse(localStorage.getItem(RECENT_GAMES_KEY) || '[]');
    if (Array.isArray(savedRecent)) {
      state.recentIds = savedRecent.filter((id) => typeof id === 'string').slice(0, 6);
    }
  } catch {
    state.recentIds = [];
  }

  try {
    const savedCounts = JSON.parse(localStorage.getItem(PLAY_COUNTS_KEY) || '{}');
    if (savedCounts && typeof savedCounts === 'object') {
      state.playCounts = savedCounts;
    }
  } catch {
    state.playCounts = {};
  }

  state.lightTheme = localStorage.getItem(THEME_KEY) === 'light';
  applyTheme();
}

function applyTheme() {
  document.documentElement.classList.toggle('light-theme', state.lightTheme);
  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.textContent = state.lightTheme ? 'Dark Theme' : 'Light Theme';
  }
}

function toggleTheme() {
  state.lightTheme = !state.lightTheme;
  localStorage.setItem(THEME_KEY, state.lightTheme ? 'light' : 'dark');
  applyTheme();
}

function persistLocalArcadeState() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(state.favorites)));
  localStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(state.recentIds));
  localStorage.setItem(PLAY_COUNTS_KEY, JSON.stringify(state.playCounts));
}

async function persistArcadeState() {
  persistLocalArcadeState();
  renderAccountModalContent();
  if (!state.user) return;
  try {
    await syncUserArcadeData(state.user.uid, {
      favorites: Array.from(state.favorites),
      recentIds: state.recentIds,
      playCounts: state.playCounts,
    });
    if (elements.accountSyncStatus) {
      elements.accountSyncStatus.textContent = 'Synced';
    }
    if (elements.accountSyncError) {
      elements.accountSyncError.hidden = true;
    }
  } catch (err) {
    if (elements.accountSyncStatus) {
      elements.accountSyncStatus.textContent = 'Local only';
    }
    if (elements.accountSyncError) {
      elements.accountSyncError.textContent = getFriendlyFirebaseError(err);
      elements.accountSyncError.hidden = false;
    }
  }
}

function saveFavorites() {
  void persistArcadeState();
}

function recordGameLaunch(gameId) {
  state.recentIds = [gameId, ...state.recentIds.filter((id) => id !== gameId)].slice(0, 6);

  const nextCount = Number(state.playCounts[gameId] || 0) + 1;
  state.playCounts[gameId] = nextCount;

  renderRecentStrip();
  void persistArcadeState();
}

function formatDuration(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startSessionTimer() {
  clearInterval(state.sessionTimerId);
  state.sessionSeconds = 0;
  elements.playerTimer.textContent = '00:00';
  state.sessionTimerId = setInterval(() => {
    state.sessionSeconds += 1;
    elements.playerTimer.textContent = formatDuration(state.sessionSeconds);
  }, 1000);
}

function stopSessionTimer() {
  clearInterval(state.sessionTimerId);
  state.sessionTimerId = null;
}

function updateMetrics() {
  const all = getAllGames();
  const categories = new Set(all.map((g) => g.category).filter(Boolean));
  if (elements.metricTotal) {
    elements.metricTotal.textContent = String(all.length);
  }
  if (elements.metricCategories) {
    elements.metricCategories.textContent = String(categories.size || 4);
  }
  if (elements.metricSaved) {
    elements.metricSaved.textContent = String(state.favorites.size);
  }
}

function renderFeaturedSpotlight() {
  const all = getAllGames();
  if (all.length === 0) return;
  const idx = ((state.featuredIndex % all.length) + all.length) % all.length;
  state.featuredIndex = idx;
  const game = all[idx];

  elements.featuredTitle.textContent = game.title;
  elements.featuredDesc.textContent = game.description || 'Play directly inside the embedded iframe player.';
  elements.featuredMeta.textContent = `Featured · ${game.category} · ${idx + 1} / ${all.length}`;

  if (elements.heroLead) {
    const leadTitle = document.createElement('strong');
    leadTitle.textContent = `${game.title}: `;
    const leadDesc = document.createTextNode(
      `${game.description || 'Play directly in your browser.'} (${game.difficulty || 'Standard'} · ${game.controls || 'Keyboard or Mouse'})`
    );
    elements.heroLead.replaceChildren(leadTitle, leadDesc);
  }

  if (game.thumbnail && isSafeIframeUrl(game.thumbnail)) {
    elements.featuredImg.dataset.fb = '';
    elements.featuredImg.onerror = () => {
      if (!elements.featuredImg.dataset.fb && game.thumbnail.startsWith('./assets/')) {
        elements.featuredImg.dataset.fb = '1';
        elements.featuredImg.src = `./public/${game.thumbnail.slice(2)}`;
      }
    };
    elements.featuredImg.src = game.thumbnail;
    elements.featuredImg.alt = `${game.title} cover illustration`;
  }
}

function renderRecentStrip() {
  const all = getAllGames();
  const recentGames = state.recentIds
    .map((id) => all.find((g) => g.id === id))
    .filter(Boolean);

  if (recentGames.length === 0) {
    elements.recentSection.hidden = true;
    elements.recentList.replaceChildren();
    return;
  }

  elements.recentSection.hidden = false;
  const fragment = document.createDocumentFragment();
  recentGames.forEach((game) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'recent-btn';
    btn.addEventListener('click', () => openGamePreview(game.id));

    if (game.thumbnail && isSafeIframeUrl(game.thumbnail)) {
      const img = document.createElement('img');
      img.className = 'recent-thumb';
      img.src = game.thumbnail;
      img.alt = '';
      img.referrerPolicy = 'no-referrer';
      img.addEventListener('error', () => {
        if (!img.dataset.fb && game.thumbnail.startsWith('./assets/')) {
          img.dataset.fb = '1';
          img.src = `./public/${game.thumbnail.slice(2)}`;
        }
      });
      btn.appendChild(img);
    }

    const label = document.createElement('span');
    label.textContent = game.title;
    btn.appendChild(label);
    fragment.appendChild(btn);
  });

  elements.recentList.replaceChildren(fragment);
}

function syncCategoryUI() {
  elements.navButtons.forEach((btn) => {
    const isMatch = btn.dataset.navCategory === state.activeCategory;
    btn.classList.toggle('is-active', isMatch);
  });

  elements.tabButtons.forEach((btn) => {
    const isMatch = btn.dataset.category === state.activeCategory;
    btn.classList.toggle('is-active', isMatch);
    btn.setAttribute('aria-selected', String(isMatch));
  });
}

function setActiveCategory(category) {
  state.activeCategory = category;
  syncCategoryUI();
  renderCatalog();
}

function toggleFavorite(gameId) {
  if (state.favorites.has(gameId)) {
    state.favorites.delete(gameId);
  } else {
    state.favorites.add(gameId);
  }
  saveFavorites();
  updateMetrics();
  syncPlayerFavoriteButton();
  syncPreviewFavoriteButton();
  renderCatalog();
}

function syncPlayerFavoriteButton() {
  if (!elements.favoritePlayerBtn || !state.currentGameId) return;
  const saved = state.favorites.has(state.currentGameId);
  elements.favoritePlayerBtn.textContent = saved ? 'Saved' : 'Save';
  elements.favoritePlayerBtn.classList.toggle('is-saved', saved);
}

function syncPreviewFavoriteButton() {
  if (!elements.previewSaveBtn || !state.previewGameId) return;
  const saved = state.favorites.has(state.previewGameId);
  elements.previewSaveBtn.textContent = saved ? 'Saved' : 'Save';
  elements.previewSaveBtn.classList.toggle('is-saved', saved);
}

function renderDifficultyBars(difficulty) {
  const rank = DIFFICULTY_RANK[difficulty] || 2;
  const bars = Array.from(elements.previewDifficultyBars.children);
  bars.forEach((bar, idx) => {
    bar.classList.toggle('is-filled', idx < rank);
  });
}

function openGamePreview(gameId) {
  const game = getAllGames().find((item) => item.id === gameId);
  if (!game) return;

  state.previewGameId = game.id;
  const difficulty = game.difficulty || 'Standard';
  const duration = game.estimatedTime || '5–10 min';
  const players = game.players || '1 Player';

  elements.previewKicker.textContent = `${game.category} · Difficulty: ${difficulty} · ${players}`;
  elements.previewTitle.textContent = game.title;
  elements.previewOverview.textContent =
    game.overview || game.description || 'Play directly inside the browser.';
  elements.previewDifficulty.textContent = difficulty;
  renderDifficultyBars(difficulty);
  elements.previewTime.textContent = duration;
  elements.previewPlayers.textContent = players;
  elements.previewControls.textContent = game.controls || 'Keyboard or Mouse';

  if (game.thumbnail && isSafeIframeUrl(game.thumbnail)) {
    elements.previewImg.dataset.fb = '';
    elements.previewImg.onerror = () => {
      if (!elements.previewImg.dataset.fb && game.thumbnail.startsWith('./assets/')) {
        elements.previewImg.dataset.fb = '1';
        elements.previewImg.src = `./public/${game.thumbnail.slice(2)}`;
      } else {
        elements.previewImg.hidden = true;
      }
    };
    elements.previewImg.src = game.thumbnail;
    elements.previewImg.alt = `${game.title} cover artwork`;
    elements.previewImg.hidden = false;
  } else {
    elements.previewImg.hidden = true;
  }

  const tips = Array.isArray(game.tips) && game.tips.length > 0
    ? game.tips
    : ['Use the controls listed above to play.', 'Click Fullscreen anytime during play for a larger view.'];

  const tipsFragment = document.createDocumentFragment();
  tips.forEach((tipText) => {
    const li = document.createElement('li');
    li.textContent = tipText;
    tipsFragment.appendChild(li);
  });
  elements.previewTips.replaceChildren(tipsFragment);

  elements.previewStartBtn.textContent =
    state.currentGameId === game.id ? 'Resume Game' : 'Start Game';

  syncPreviewFavoriteButton();
  elements.previewModal.hidden = false;
  elements.previewStartBtn.focus();
}

function closeGamePreview() {
  state.previewGameId = null;
  elements.previewModal.hidden = true;
}

function setDimLights(enabled) {
  state.dimLights = enabled;
  elements.cinemaBackdrop.hidden = !enabled;
  elements.playerSection.classList.toggle('is-dimmed', enabled);
  elements.dimLightsBtn.classList.toggle('is-active', enabled);
  elements.dimLightsBtn.textContent = enabled ? 'Lights On' : 'Dim Lights';
}

function launchGame(gameId) {
  const game = getAllGames().find((item) => item.id === gameId);
  if (!game) return;

  const iframeEl = createSafeIframeElement(game);
  if (!iframeEl) return;

  closeGamePreview();

  state.currentGameId = game.id;
  elements.playerTitle.textContent = game.title;
  elements.playerSubtitle.textContent = `${game.category} · ${game.difficulty || 'Standard'} · ${game.players || '1 Player'}`;
  elements.playerControlsTip.textContent = `Controls: ${game.controls || 'Keyboard or Mouse'}`;

  elements.iframeStage.replaceChildren(iframeEl);
  elements.playerSection.hidden = false;
  syncPlayerFavoriteButton();
  recordGameLaunch(game.id);
  startSessionTimer();
  renderCatalog();

  elements.playerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closePlayer() {
  state.currentGameId = null;
  stopSessionTimer();
  setDimLights(false);
  elements.iframeStage.replaceChildren();
  elements.playerSection.hidden = true;
  renderCatalog();
}

function reloadCurrentGame() {
  if (!state.currentGameId) return;
  const game = getAllGames().find((item) => item.id === state.currentGameId);
  if (!game) return;
  const iframeEl = createSafeIframeElement(game);
  if (!iframeEl) return;
  elements.iframeStage.replaceChildren(iframeEl);
  startSessionTimer();
}

function toggleWideTheater() {
  state.wideTheater = !state.wideTheater;
  elements.mainContainer.classList.toggle('is-wide', state.wideTheater);
  elements.theaterModeBtn.classList.toggle('is-active', state.wideTheater);
  elements.theaterModeBtn.textContent = state.wideTheater ? 'Standard View' : 'Wide View';
}

function toggleFullscreen() {
  if (!elements.iframeStage) return;
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  } else if (elements.iframeStage.requestFullscreen) {
    elements.iframeStage.requestFullscreen().catch(() => {});
  }
}

function getFilteredGames() {
  const query = state.searchQuery.trim().toLowerCase();
  const filtered = getAllGames().filter((game) => {
    const matchesCategory =
      state.activeCategory === 'All' ||
      (state.activeCategory === 'Favorites'
        ? state.favorites.has(game.id)
        : game.category === state.activeCategory);

    if (!matchesCategory) return false;
    if (!query) return true;

    const haystack = `${game.title} ${game.category} ${game.difficulty || ''} ${game.description || ''}`.toLowerCase();
    return haystack.includes(query);
  });

  if (state.sortBy === 'alpha') {
    return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }
  if (state.sortBy === 'easy') {
    return [...filtered].sort(
      (a, b) => (DIFFICULTY_RANK[a.difficulty] || 2) - (DIFFICULTY_RANK[b.difficulty] || 2)
    );
  }
  if (state.sortBy === 'hard') {
    return [...filtered].sort(
      (a, b) => (DIFFICULTY_RANK[b.difficulty] || 2) - (DIFFICULTY_RANK[a.difficulty] || 2)
    );
  }
  return filtered;
}

function buildThumbnailSlot(game) {
  const wrap = document.createElement('div');
  wrap.className = 'card-thumb-wrap';

  const fallback = document.createElement('div');
  fallback.className = 'card-thumb-fallback';
  fallback.textContent = game.title;

  if (game.thumbnail && isSafeIframeUrl(game.thumbnail)) {
    const img = document.createElement('img');
    img.className = 'card-thumb-img';
    img.src = game.thumbnail;
    img.alt = `${game.title} game cover`;
    img.loading = 'lazy';
    img.referrerPolicy = 'no-referrer';
    img.addEventListener('error', () => {
      if (!img.dataset.fb && game.thumbnail.startsWith('./assets/')) {
        img.dataset.fb = '1';
        img.src = `./public/${game.thumbnail.slice(2)}`;
        return;
      }
      img.remove();
      wrap.appendChild(fallback);
    });
    wrap.appendChild(img);
  } else {
    wrap.appendChild(fallback);
  }

  return wrap;
}

function renderCatalog() {
  const filtered = getFilteredGames();
  elements.gamesGrid.replaceChildren();

  if (filtered.length === 0) {
    elements.gamesStatus.hidden = false;
    elements.gamesStatus.textContent =
      state.activeCategory === 'Favorites'
        ? 'No saved games yet. Click Save on any game card to pin it here.'
        : 'No matching games found. Try clearing the search filter.';
    return;
  }

  elements.gamesStatus.hidden = true;
  const fragment = document.createDocumentFragment();

  filtered.forEach((game) => {
    const card = document.createElement('article');
    card.className = 'game-card';
    if (game.id === state.currentGameId) {
      card.classList.add('is-playing');
    }

    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      openGamePreview(game.id);
    });

    card.appendChild(buildThumbnailSlot(game));

    const body = document.createElement('div');
    body.className = 'card-body';

    const meta = document.createElement('div');
    meta.className = 'card-meta';
    const plays = Number(state.playCounts[game.id] || 0);
    const playText = plays > 0 ? ` · Played ${plays}×` : '';
    meta.textContent = `${game.category} · ${game.difficulty || 'Standard'} · ${game.estimatedTime || '5 min'}${playText}`;

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = game.title;

    const desc = document.createElement('p');
    desc.className = 'card-desc';
    desc.textContent = game.description || 'Play directly inside the embedded iframe player.';

    body.append(meta, title, desc);
    card.appendChild(body);

    const footer = document.createElement('div');
    footer.className = 'card-footer';

    const playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'btn-primary card-play-btn';
    playBtn.textContent = game.id === state.currentGameId ? 'Playing' : 'Play Now';
    playBtn.addEventListener('click', () => openGamePreview(game.id));

    const favBtn = document.createElement('button');
    favBtn.type = 'button';
    const isSaved = state.favorites.has(game.id);
    favBtn.className = isSaved ? 'btn-secondary is-saved' : 'btn-secondary';
    favBtn.textContent = isSaved ? 'Saved' : 'Save';
    favBtn.setAttribute('aria-pressed', String(isSaved));
    favBtn.addEventListener('click', () => toggleFavorite(game.id));

    footer.append(playBtn, favBtn);
    card.appendChild(footer);

    fragment.appendChild(card);
  });

  elements.gamesGrid.appendChild(fragment);
}

async function loadGamesCatalog() {
  elements.gamesStatus.hidden = false;
  elements.gamesStatus.textContent = 'Loading games...';

  try {
    let usedPublicPrefix = false;
    let response = await fetch('./games.json', { cache: 'no-store' });
    if (!response.ok) {
      response = await fetch('./public/games.json', { cache: 'no-store' });
      usedPublicPrefix = true;
    }
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('games.json must contain an array of games.');
    }
    state.catalogGames = data
      .filter((item) => item && typeof item.id === 'string')
      .map((item) => {
        if (!usedPublicPrefix) return item;
        const rawSrc = typeof item.iframeSrc === 'string' ? item.iframeSrc.trim() : '';
        const adjustedSrc = rawSrc.startsWith('./games/')
          ? `./public/${rawSrc.slice(2)}`
          : rawSrc.startsWith('/games/')
            ? `./public${rawSrc}`
            : rawSrc;
        return { ...item, iframeSrc: adjustedSrc };
      });
    state.featuredIndex = 0;
    updateMetrics();
    renderFeaturedSpotlight();
    renderRecentStrip();
    renderCatalog();
  } catch (err) {
    elements.gamesStatus.hidden = false;
    elements.gamesStatus.textContent = `Could not load games (${err.message}).`;
  }
}

function getTotalLaunchCount() {
  return Object.values(state.playCounts).reduce((sum, n) => sum + (Number(n) || 0), 0);
}

function formatCreatedDate(createdAt) {
  if (!createdAt) return 'Signed in with Google';
  try {
    const date = typeof createdAt.toDate === 'function' ? createdAt.toDate() : new Date(createdAt);
    if (Number.isNaN(date.getTime())) return 'Account active';
    return `Member since ${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
  } catch {
    return 'Account active';
  }
}

function renderAuthButton() {
  if (!elements.authBtn) return;
  if (!state.user) {
    elements.authBtn.className = 'btn-primary';
    elements.authBtn.textContent = 'Sign In';
    elements.authBtn.setAttribute('aria-label', 'Sign in or create account');
    return;
  }

  const displayName =
    state.accountDoc?.displayName ||
    state.user.displayName ||
    state.user.email?.split('@')[0] ||
    'Account';
  const shortName = displayName.split(' ')[0].slice(0, 16) || 'Account';
  const photoUrl = state.accountDoc?.photoURL || state.user.photoURL || '';
  const initial = displayName.trim().charAt(0).toUpperCase() || 'A';

  elements.authBtn.className = 'btn-secondary account-btn';
  elements.authBtn.setAttribute('aria-label', `Account settings for ${displayName}`);

  const fragment = document.createDocumentFragment();
  if (photoUrl && isSafeIframeUrl(photoUrl)) {
    const img = document.createElement('img');
    img.className = 'account-btn-avatar';
    img.src = photoUrl;
    img.alt = '';
    img.referrerPolicy = 'no-referrer';
    img.addEventListener('error', () => {
      const badge = document.createElement('span');
      badge.className = 'account-btn-initial';
      badge.textContent = initial;
      img.replaceWith(badge);
    });
    fragment.appendChild(img);
  } else {
    const badge = document.createElement('span');
    badge.className = 'account-btn-initial';
    badge.textContent = initial;
    fragment.appendChild(badge);
  }

  const label = document.createElement('span');
  label.textContent = shortName;
  fragment.appendChild(label);
  elements.authBtn.replaceChildren(fragment);
}

function renderAccountModalContent() {
  if (!elements.accountModal) return;

  if (!state.user) {
    elements.accountSignedOut.hidden = false;
    elements.accountSignedIn.hidden = true;
    return;
  }

  elements.accountSignedOut.hidden = true;
  elements.accountSignedIn.hidden = false;

  const displayName =
    state.accountDoc?.displayName ||
    state.user.displayName ||
    state.user.email?.split('@')[0] ||
    'Player';
  const email = state.accountDoc?.email || state.user.email || '';
  const photoUrl = state.accountDoc?.photoURL || state.user.photoURL || '';
  const initial = displayName.trim().charAt(0).toUpperCase() || 'P';

  elements.accountName.textContent = displayName;
  elements.accountEmail.textContent = email;
  elements.accountCreated.textContent = formatCreatedDate(state.accountDoc?.createdAt);
  elements.accountStatSaved.textContent = String(state.favorites.size);
  elements.accountStatPlays.textContent = String(getTotalLaunchCount());

  elements.accountAvatarFallback.textContent = initial;
  if (photoUrl && isSafeIframeUrl(photoUrl)) {
    elements.accountAvatarImg.src = photoUrl;
    elements.accountAvatarImg.alt = `${displayName} profile photo`;
    elements.accountAvatarImg.hidden = false;
    elements.accountAvatarFallback.hidden = true;
    elements.accountAvatarImg.onerror = () => {
      elements.accountAvatarImg.hidden = true;
      elements.accountAvatarFallback.hidden = false;
    };
  } else {
    elements.accountAvatarImg.hidden = true;
    elements.accountAvatarFallback.hidden = false;
  }
}

function openAccountModal() {
  if (elements.accountError) {
    elements.accountError.hidden = true;
    elements.accountError.textContent = '';
  }
  renderAccountModalContent();
  elements.accountModal.hidden = false;
  if (state.user) {
    elements.accountSignedInCloseBtn?.focus();
  } else {
    elements.googleSignInBtn?.focus();
  }
}

function closeAccountModal() {
  elements.accountModal.hidden = true;
}

function applyCloudAccountData(account) {
  if (!account) return;
  state.accountDoc = account;
  state.favorites = new Set(sanitizeIdArray(account.favorites || [], 50));
  state.recentIds = sanitizeIdArray(account.recentIds || [], 6);
  state.playCounts = sanitizePlayCounts(account.playCounts || {});
  persistLocalArcadeState();
  updateMetrics();
  renderRecentStrip();
  syncPlayerFavoriteButton();
  syncPreviewFavoriteButton();
  renderCatalog();
  renderAuthButton();
  renderAccountModalContent();
}

function initFirebaseAuth() {
  observeAuth(async (user) => {
    if (state.unsubscribeAccount) {
      state.unsubscribeAccount();
      state.unsubscribeAccount = null;
    }

    state.user = user || null;
    if (!user) {
      state.accountDoc = null;
      renderAuthButton();
      renderAccountModalContent();
      return;
    }

    renderAuthButton();
    if (elements.accountSyncStatus) {
      elements.accountSyncStatus.textContent = 'Syncing...';
    }

    try {
      const result = await ensureUserAccount(user, {
        favorites: Array.from(state.favorites),
        recentIds: state.recentIds,
        playCounts: state.playCounts,
      });
      applyCloudAccountData(result.account);
      if (elements.accountSyncStatus) {
        elements.accountSyncStatus.textContent = 'Active';
      }
      if (elements.accountSyncError) {
        elements.accountSyncError.hidden = true;
      }

      state.unsubscribeAccount = subscribeToUserAccount(
        user.uid,
        (docData) => {
          applyCloudAccountData(docData);
        },
        (err) => {
          if (elements.accountSyncStatus) {
            elements.accountSyncStatus.textContent = 'Error';
          }
          if (elements.accountSyncError) {
            elements.accountSyncError.textContent = getFriendlyFirebaseError(err);
            elements.accountSyncError.hidden = false;
          }
        }
      );
    } catch (err) {
      if (elements.accountSyncStatus) {
        elements.accountSyncStatus.textContent = 'Local only';
      }
      if (elements.accountSyncError) {
        elements.accountSyncError.textContent = getFriendlyFirebaseError(err);
        elements.accountSyncError.hidden = false;
      }
      if (elements.accountError) {
        elements.accountError.textContent = getFriendlyFirebaseError(err);
        elements.accountError.hidden = false;
      }
    }
  });
}

function wireEvents() {
  elements.brandLink.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveCategory('All');
    closePlayer();
  });

  elements.navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.navCategory || 'All';
      setActiveCategory(cat);
      elements.gamesGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  elements.tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category || 'All';
      setActiveCategory(cat);
    });
  });

  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderCatalog();
  });

  elements.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderCatalog();
  });

  elements.authBtn.addEventListener('click', openAccountModal);
  elements.accountCloseBtn.addEventListener('click', closeAccountModal);
  elements.accountSignedInCloseBtn.addEventListener('click', closeAccountModal);
  elements.accountModal.addEventListener('click', (e) => {
    if (e.target === elements.accountModal) {
      closeAccountModal();
    }
  });

  elements.googleSignInBtn.addEventListener('click', async () => {
    if (state.authPending) return;
    state.authPending = true;
    elements.googleSignInBtn.disabled = true;
    if (elements.accountError) {
      elements.accountError.hidden = true;
      elements.accountError.textContent = '';
    }
    try {
      await signInWithGoogle();
      closeAccountModal();
    } catch (err) {
      if (elements.accountError) {
        elements.accountError.textContent = getFriendlyFirebaseError(err);
        elements.accountError.hidden = false;
      }
    } finally {
      state.authPending = false;
      elements.googleSignInBtn.disabled = false;
    }
  });

  elements.signOutBtn.addEventListener('click', async () => {
    if (state.authPending) return;
    state.authPending = true;
    elements.signOutBtn.disabled = true;
    try {
      await signOutAccount();
      closeAccountModal();
    } catch (err) {
      if (elements.accountSyncError) {
        elements.accountSyncError.textContent = getFriendlyFirebaseError(err);
        elements.accountSyncError.hidden = false;
      }
    } finally {
      state.authPending = false;
      elements.signOutBtn.disabled = false;
    }
  });

  elements.featuredPrevBtn.addEventListener('click', () => {
    state.featuredIndex -= 1;
    renderFeaturedSpotlight();
  });

  elements.featuredNextBtn.addEventListener('click', () => {
    state.featuredIndex += 1;
    renderFeaturedSpotlight();
  });

  const openFeaturedPreview = () => {
    const all = getAllGames();
    const game = all[state.featuredIndex];
    if (game) openGamePreview(game.id);
  };

  elements.featuredLaunchBtn.addEventListener('click', openFeaturedPreview);
  elements.heroPlayFeaturedBtn.addEventListener('click', openFeaturedPreview);

  elements.clearRecentBtn.addEventListener('click', () => {
    state.recentIds = [];
    renderRecentStrip();
    void persistArcadeState();
  });

  elements.playerInfoBtn.addEventListener('click', () => {
    if (state.currentGameId) {
      openGamePreview(state.currentGameId);
    }
  });

  elements.favoritePlayerBtn.addEventListener('click', () => {
    if (state.currentGameId) {
      toggleFavorite(state.currentGameId);
    }
  });

  elements.dimLightsBtn.addEventListener('click', () => setDimLights(!state.dimLights));
  elements.cinemaBackdrop.addEventListener('click', () => setDimLights(false));
  elements.theaterModeBtn.addEventListener('click', toggleWideTheater);
  elements.reloadGameBtn.addEventListener('click', reloadCurrentGame);
  elements.fullscreenGameBtn.addEventListener('click', toggleFullscreen);
  elements.closePlayerBtn.addEventListener('click', closePlayer);
  elements.themeToggleBtn.addEventListener('click', toggleTheme);

  elements.previewCloseBtn.addEventListener('click', closeGamePreview);
  elements.previewSaveBtn.addEventListener('click', () => {
    if (state.previewGameId) {
      toggleFavorite(state.previewGameId);
    }
  });
  elements.previewStartBtn.addEventListener('click', () => {
    if (state.previewGameId) {
      launchGame(state.previewGameId);
    }
  });
  elements.previewModal.addEventListener('click', (e) => {
    if (e.target === elements.previewModal) {
      closeGamePreview();
    }
  });

  document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement?.tagName;
    const isTyping = activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT';

    if (e.key === 'Escape') {
      if (!elements.accountModal.hidden) {
        closeAccountModal();
        return;
      }
      if (!elements.previewModal.hidden) {
        closeGamePreview();
        return;
      }
      if (state.dimLights) {
        setDimLights(false);
      }
      return;
    }

    if (
      e.key === '/' &&
      !isTyping &&
      elements.previewModal.hidden &&
      elements.accountModal.hidden
    ) {
      e.preventDefault();
      elements.searchInput.focus();
    }
  });
}

loadLocalStorage();
wireEvents();
renderAuthButton();
updateMetrics();
loadGamesCatalog();
initFirebaseAuth();
