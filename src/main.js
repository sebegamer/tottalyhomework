const FAVORITES_KEY = 'deskplay_favorites_v1';
const RECENT_GAMES_KEY = 'deskplay_recent_v1';
const THEME_KEY = 'deskplay_theme_v1';

const state = {
  catalogGames: [],
  favorites: new Set(),
  recentIds: [],
  activeCategory: 'All',
  searchQuery: '',
  currentGameId: null,
  previewGameId: null,
  featuredIndex: 0,
  wideTheater: false,
  lightTheme: false,
};

const elements = {
  mainContainer: document.getElementById('main-container'),
  brandLink: document.getElementById('brand-link'),
  navButtons: Array.from(document.querySelectorAll('[data-nav-category]')),
  tabButtons: Array.from(document.querySelectorAll('[data-category]')),
  randomGameBtn: document.getElementById('random-game-btn'),
  searchInput: document.getElementById('search-input'),
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
  playerControlsTip: document.getElementById('player-controls-tip'),
  iframeStage: document.getElementById('iframe-stage'),
  playerInfoBtn: document.getElementById('player-info-btn'),
  favoritePlayerBtn: document.getElementById('favorite-player-btn'),
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
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
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
  let allow = 'fullscreen; autoplay; gamepad';

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
      state.recentIds = savedRecent.filter((id) => typeof id === 'string').slice(0, 5);
    }
  } catch {
    state.recentIds = [];
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

function saveFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(state.favorites)));
}

function recordRecentGame(gameId) {
  state.recentIds = [gameId, ...state.recentIds.filter((id) => id !== gameId)].slice(0, 5);
  localStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(state.recentIds));
  renderRecentStrip();
}

function updateMetrics() {
  const all = getAllGames();
  const categories = new Set(all.map((g) => g.category).filter(Boolean));
  if (elements.metricTotal) {
    elements.metricTotal.textContent = String(all.length);
  }
  if (elements.metricCategories) {
    elements.metricCategories.textContent = String(categories.size || 3);
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
  elements.featuredMeta.textContent = `Featured · ${game.category} · ${game.difficulty || 'Standard'}`;

  if (elements.heroLead) {
    const leadTitle = document.createElement('strong');
    leadTitle.textContent = `${game.title}: `;
    const leadDesc = document.createTextNode(
      `${game.description || 'Play directly in your browser.'} (${game.controls || 'Keyboard or Mouse'})`
    );
    elements.heroLead.replaceChildren(leadTitle, leadDesc);
  }

  if (game.thumbnail && isSafeIframeUrl(game.thumbnail)) {
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
  elements.previewTime.textContent = duration;
  elements.previewPlayers.textContent = players;
  elements.previewControls.textContent = game.controls || 'Keyboard or Mouse';

  if (game.thumbnail && isSafeIframeUrl(game.thumbnail)) {
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

function launchGame(gameId) {
  const game = getAllGames().find((item) => item.id === gameId);
  if (!game) return;

  const iframeEl = createSafeIframeElement(game);
  if (!iframeEl) return;

  closeGamePreview();

  state.currentGameId = game.id;
  elements.playerTitle.textContent = game.title;
  elements.playerSubtitle.textContent = `${game.category} · ${game.difficulty || 'Standard'} · ${game.controls || 'Keyboard or Mouse'}`;
  elements.playerControlsTip.textContent = `Controls: ${game.controls || 'Keyboard or Mouse'}`;

  elements.iframeStage.replaceChildren(iframeEl);
  elements.playerSection.hidden = false;
  syncPlayerFavoriteButton();
  recordRecentGame(game.id);
  renderCatalog();

  elements.playerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closePlayer() {
  state.currentGameId = null;
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
  return getAllGames().filter((game) => {
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
    meta.textContent = `${game.category} · ${game.difficulty || 'Standard'} · ${game.estimatedTime || '5 min'}`;

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
    const response = await fetch('/games.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('games.json must contain an array of games.');
    }
    state.catalogGames = data.filter((item) => item && typeof item.id === 'string');
    const asteroidsIdx = state.catalogGames.findIndex((g) => g.id === 'asteroids-drift');
    state.featuredIndex = asteroidsIdx >= 0 ? asteroidsIdx : 0;
    updateMetrics();
    renderFeaturedSpotlight();
    renderRecentStrip();
    renderCatalog();
  } catch (err) {
    elements.gamesStatus.hidden = false;
    elements.gamesStatus.textContent = `Could not load games (${err.message}).`;
  }
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

  elements.randomGameBtn.addEventListener('click', () => {
    const all = getAllGames();
    if (all.length === 0) return;
    const candidates =
      all.length > 1 ? all.filter((g) => g.id !== state.currentGameId) : all;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    openGamePreview(pick.id);
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
    localStorage.removeItem(RECENT_GAMES_KEY);
    renderRecentStrip();
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
    if (e.key === 'Escape' && !elements.previewModal.hidden) {
      closeGamePreview();
    }
  });
}

loadLocalStorage();
wireEvents();
updateMetrics();
loadGamesCatalog();
