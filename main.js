const FAVORITES_KEY = 'deskplay_favorites_v1';
const RECENT_GAMES_KEY = 'deskplay_recent_v1';
const PLAY_COUNTS_KEY = 'deskplay_play_counts_v1';
const THEME_KEY = 'deskplay_theme_v1';
const HW_DONE_KEY = 'totally_homework_done_v1';
const CRT_FX_KEY = 'deskplay_crt_fx_v1';
const FRAME_GLOW_KEY = 'deskplay_frame_glow_v1';
const ACCESS_CODE = 'justdoinghomework';
const VALID_ID_REGEX = /^[a-zA-Z0-9_-]+$/;
const GLOW_MODES = ['amber', 'cyan', 'violet', 'emerald', 'rose'];

const THEMES = [
  {
    id: 'obsidian',
    name: 'Obsidian Gold',
    cost: 0,
    swatch: 'linear-gradient(135deg, #06080e 45%, #f59e0b 100%)',
    description: 'Deep carbon surface with warm amber spotlight and crisp dark contrast.',
  },
  {
    id: 'midnight',
    name: 'Midnight Synth',
    cost: 0,
    swatch: 'linear-gradient(135deg, #050816 45%, #38bdf8 100%)',
    description: 'Electric sky-blue cockpit glow over deep cobalt midnight layers.',
  },
  {
    id: 'daylight',
    name: 'Clean Daylight',
    cost: 0,
    swatch: 'linear-gradient(135deg, #f2f4f8 45%, #d97706 100%)',
    description: 'Bright high-contrast classroom palette tuned for sunny screens.',
  },
  {
    id: 'emerald',
    name: 'Cyber Emerald',
    cost: 100,
    swatch: 'linear-gradient(135deg, #040d0a 45%, #10b981 100%)',
    description: 'Matrix-green phosphor energy with lime-tinted cabinet highlights.',
  },
  {
    id: 'crimson',
    name: 'Crimson Reactor',
    cost: 200,
    swatch: 'linear-gradient(135deg, #0d0609 45%, #f43f5e 100%)',
    description: 'High-voltage crimson core lighting with warm ember borders.',
  },
  {
    id: 'amethyst',
    name: 'Royal Amethyst',
    cost: 350,
    swatch: 'linear-gradient(135deg, #090612 45%, #c084fc 100%)',
    description: 'Cosmic violet aurora backdrop with glowing amethyst accents.',
  },
];

const HOMEWORK_ASSIGNMENTS = [
  // 3rd Grade
  {
    id: 'hw-3rd-math-mult',
    grade: '3rd',
    subject: 'Math',
    due: 'Due Tomorrow',
    duration: '15 min',
    title: 'Multiplication Arrays & Fact Families',
    description: 'Model 6×7, 8×4, and 9×5 using equal-row dot arrays and inverse division facts.',
    summary: 'Draw equal-row arrays for Problems 1–10 and write the two matching multiplication and division sentences for each.',
    notes: [
      'Commutative property: 6 × 7 equals 7 × 6 (42).',
      'Multiplication and division are inverse operations in the same fact family.',
      'Skip-count by rows to double-check tricky 7s and 8s facts.',
    ],
  },
  {
    id: 'hw-3rd-sci-habitats',
    grade: '3rd',
    subject: 'Science',
    due: 'Due Wednesday',
    duration: '15 min',
    title: 'Animal Adaptations & Habitats',
    description: 'Classify desert, tundra, rainforest, and wetland survival traits across local wildlife.',
    summary: 'Match six animals to their ecosystem and explain one physical and one behavioral adaptation for each.',
    notes: [
      'Camouflage helps animals blend into rocks, snow, or leaves to avoid predators.',
      'Thick blubber and dense fur trap body heat in arctic tundra climates.',
      'Cactus stems store rainwater and spines reduce moisture loss in deserts.',
    ],
  },
  {
    id: 'hw-3rd-hist-maps',
    grade: '3rd',
    subject: 'History',
    due: 'Due Thursday',
    duration: '15 min',
    title: 'Compass Rose & Community Maps',
    description: 'Use cardinal directions, map keys, and scale bars to navigate town landmarks.',
    summary: 'Trace three shortest routes on the town map worksheet and record directions using North, South, East, and West.',
    notes: [
      'Intermediate directions sit halfway between main points: NE, NW, SE, SW.',
      'Always check the map legend (key) first to decode park, river, and school symbols.',
      'A map scale converts inches or centimeters into real miles or kilometers.',
    ],
  },
  {
    id: 'hw-3rd-eng-parts',
    grade: '3rd',
    subject: 'English',
    due: 'Due Friday',
    duration: '15 min',
    title: 'Nouns, Verbs & Vivid Adjectives',
    description: 'Spot action verbs, common vs. proper nouns, and descriptive adjectives in short stories.',
    summary: 'Highlight nouns in blue, verbs in green, and adjectives in yellow across the two-paragraph reading passage.',
    notes: [
      'Proper nouns name specific people or places and always start with a capital letter.',
      'Adjectives answer questions like which one, what kind, or how many.',
      'Strong action verbs (sprinted, whispered) make sentences clearer than weak ones.',
    ],
  },
  {
    id: 'hw-3rd-cs-loops',
    grade: '3rd',
    subject: 'CS',
    due: 'Due Monday',
    duration: '15 min',
    title: 'Step-by-Step Maze Algorithms',
    description: 'Write ordered Move Forward, Turn Left, and Repeat instructions to guide a robot home.',
    summary: 'Debug four block-coding maze paths by replacing repeated move blocks with a single Repeat loop.',
    notes: [
      'An algorithm is an exact step-by-step recipe a computer follows in order.',
      'A loop repeats the same sequence of steps without rewriting them.',
      'Testing one step at a time makes bugs easy to spot and fix.',
    ],
  },

  // 5th Grade
  {
    id: 'hw-5th-math-fractions',
    grade: '5th',
    subject: 'Math',
    due: 'Due Tomorrow',
    duration: '20 min',
    title: 'Adding & Subtracting Unlike Fractions',
    description: 'Find least common denominators to combine mixed numbers and simplify final answers.',
    summary: 'Solve Exercises 1–12 using equivalent fractions and simplify every result to lowest terms.',
    notes: [
      'Multiply numerator and denominator by the same number to build equivalent fractions.',
      'Convert improper fractions like 9/4 into mixed numbers (2 1/4) at the end.',
      'Estimate first with 0, 1/2, or 1 benchmarks to catch arithmetic slips.',
    ],
  },
  {
    id: 'hw-5th-sci-solar',
    grade: '5th',
    subject: 'Science',
    due: 'Due Tuesday',
    duration: '20 min',
    title: 'Solar System & Earth Rotation Lab',
    description: 'Explain day/night cycles, seasons, inner rocky planets, and outer gas giants.',
    summary: 'Compare planet orbit lengths and explain how Earth’s 23.5° axial tilt creates opposite seasons.',
    notes: [
      'Earth completes one rotation on its axis every 24 hours (day and night).',
      'One full revolution around the Sun takes 365.25 days (1 year).',
      'Inner planets (Mercury–Mars) are rocky; outer planets (Jupiter–Neptune) are gas/ice giants.',
    ],
  },
  {
    id: 'hw-5th-hist-colonies',
    grade: '5th',
    subject: 'History',
    due: 'Due Thursday',
    duration: '20 min',
    title: 'Early North American Settlements',
    description: 'Compare climate, waterways, and daily trades across New England, Middle, and Southern regions.',
    summary: 'Complete the 3-column regional comparison chart highlighting shipbuilding, grain farming, and coastal trade.',
    notes: [
      'Rocky soil and deep harbors led New England towns to focus on fishing and timber.',
      'Fertile river valleys earned the Middle Colonies the nickname "Breadbasket Colonies."',
      'Navigable rivers connected inland farms directly to Atlantic shipping ports.',
    ],
  },
  {
    id: 'hw-5th-eng-inference',
    grade: '5th',
    subject: 'English',
    due: 'Due Friday',
    duration: '20 min',
    title: 'Text Evidence & Inference Paragraph',
    description: 'Combine background knowledge with direct story quotes to explain character motivation.',
    summary: 'Read Chapter 4 and write two RACE-method responses (Restate, Answer, Cite, Explain).',
    notes: [
      'Always wrap exact copied words from the book in quotation marks.',
      'An inference is a smart conclusion backed by clues, not a random guess.',
      'Explain how your chosen quote proves your answer in your own words.',
    ],
  },
  {
    id: 'hw-5th-cs-variables',
    grade: '5th',
    subject: 'CS',
    due: 'Due Next Week',
    duration: '20 min',
    title: 'Score Counters & If-Else Conditions',
    description: 'Use variables to track player lives and write conditional branches for game win checks.',
    summary: 'Trace what score and lives equal after running four mini-game event scripts.',
    notes: [
      'A variable is a named box that holds a number or word that can change while running.',
      'An if-else block runs one branch when true and a backup branch when false.',
      'Initialize score to 0 at game start so old points never carry over.',
    ],
  },

  // 7th Grade
  {
    id: 'hw-7th-math-proportions',
    grade: '7th',
    subject: 'Math',
    due: 'Due Tomorrow',
    duration: '25 min',
    title: 'Proportional Ratios & Unit Rates',
    description: 'Solve unit price, constant of proportionality (k = y/x), and percent markup problems.',
    summary: 'Determine which tables represent proportional relationships passing through (0, 0) and calculate unit rates.',
    notes: [
      'Proportional graphs always form a straight line passing through the origin (0, 0).',
      'Constant of proportionality k = y / x stays identical across every row.',
      'Convert percents to decimals (15% = 0.15) before multiplying for tax or tips.',
    ],
  },
  {
    id: 'hw-7th-sci-cells',
    grade: '7th',
    subject: 'Science',
    due: 'Due Wednesday',
    duration: '25 min',
    title: 'Cell Organelles & Osmosis',
    description: 'Compare plant vs. animal cells and predict water movement across semipermeable membranes.',
    summary: 'Label nucleus, mitochondria, cell wall, and chloroplasts, then solve three osmosis beaker scenarios.',
    notes: [
      'Plant cells contain cell walls and chloroplasts; animal cells do not.',
      'Water moves by osmosis from higher water concentration toward saltier solutions.',
      'The cell membrane controls what enters and leaves to maintain homeostasis.',
    ],
  },
  {
    id: 'hw-7th-hist-silkroad',
    grade: '7th',
    subject: 'History',
    due: 'Due Friday',
    duration: '20 min',
    title: 'Silk Road Trade & Cultural Exchange',
    description: 'Map overland and maritime routes linking East Asia, Persia, and the Mediterranean world.',
    summary: 'Identify major goods, technologies, and ideas that diffused along Eurasian caravan cities.',
    notes: [
      'Paper, gunpowder, silk, and the magnetic compass spread westward from China.',
      'Oasis cities like Samarkand and Kashgar thrived as multicultural trading hubs.',
      'Caravanserai inns gave merchants safe rest, storage, and currency exchange.',
    ],
  },
  {
    id: 'hw-7th-eng-argument',
    grade: '7th',
    subject: 'English',
    due: 'Due Monday',
    duration: '25 min',
    title: 'Claim, Evidence & Counterclaim Essay',
    description: 'Draft a clear claim, two cited evidence paragraphs, and a fair rebuttal paragraph.',
    summary: 'Build a structured argumentative outline with credible sources and clear transition phrases.',
    notes: [
      'Place your main claim at the end of your opening paragraph so readers know your stance.',
      'Use transitions like "Although some argue..." to introduce counterclaims.',
      'Follow every quote with two sentences connecting it back to your claim.',
    ],
  },
  {
    id: 'hw-7th-cs-binary',
    grade: '7th',
    subject: 'CS',
    due: 'Due Thursday',
    duration: '20 min',
    title: 'Binary Numbers & Boolean Truth Tables',
    description: 'Convert decimal integers to 8-bit binary and evaluate AND, OR, XOR, and NOT gates.',
    summary: 'Complete the 10 base-conversion exercises and fill out full truth tables for half-adder circuits.',
    notes: [
      'Each binary bit doubles in place value: 128, 64, 32, 16, 8, 4, 2, 1.',
      'XOR outputs 1 only when its two inputs differ.',
      'Half-adder uses XOR for the Sum bit and AND for the Carry bit.',
    ],
  },

  // 9th Grade
  {
    id: 'hw-9th-math-linear',
    grade: '9th',
    subject: 'Math',
    due: 'Due Tomorrow',
    duration: '25 min',
    title: 'Linear Systems & Slope-Intercept Form',
    description: 'Solve two-variable systems by substitution and elimination, and graph slope-intercept lines.',
    summary: 'Complete Problems 1–14 on linear systems and verify each solution by plugging (x, y) back into both equations.',
    notes: [
      'Slope-intercept form: y = mx + b (m = slope, b = y-intercept).',
      'Slope formula between two points: m = (y₂ − y₁) / (x₂ − x₁).',
      'Parallel lines share identical slopes; perpendicular slopes are negative reciprocals.',
    ],
  },
  {
    id: 'hw-9th-sci-genetics',
    grade: '9th',
    subject: 'Science',
    due: 'Due Tuesday',
    duration: '25 min',
    title: 'Mendelian Genetics & Punnett Squares',
    description: 'Predict monohybrid and dihybrid phenotype ratios using dominant and recessive alleles.',
    summary: 'Complete the blood-type codominance and pea-plant inheritance problems with exact ratios.',
    notes: [
      'A heterozygous cross (Aa × Aa) produces a 1:2:1 genotypic ratio and 3:1 phenotypic ratio.',
      'Codominance expresses both alleles equally (e.g., AB blood type).',
      'Incomplete dominance blends two traits into an intermediate phenotype.',
    ],
  },
  {
    id: 'hw-9th-hist-industrial',
    grade: '9th',
    subject: 'History',
    due: 'Due Friday',
    duration: '25 min',
    title: 'Industrial Revolution Primary Sources',
    description: 'Analyze factory testimony excerpts and evaluate how steam power reshaped urban labor and transit.',
    summary: 'Read the three primary source documents in Chapter 7 and write concise evidence-backed responses.',
    notes: [
      'Cite at least one direct quote from each source when comparing factory conditions.',
      'Contrast early water-frame mills with coal-powered steam factories.',
      'Note how rail expansion lowered regional shipping costs after 1830.',
    ],
  },
  {
    id: 'hw-9th-eng-poetry',
    grade: '9th',
    subject: 'English',
    due: 'Due Thursday',
    duration: '20 min',
    title: 'Sonnet Meter & Extended Metaphors',
    description: 'Scan iambic pentameter lines, identify rhyme schemes, and analyze Shakespearean volta shifts.',
    summary: 'Annotate Sonnet 18 for meter, imagery patterns, and how the final couplet resolves the poem.',
    notes: [
      'Iambic pentameter contains five unstressed-stressed syllable pairs (10 syllables).',
      'Shakespearean sonnets follow ABAB CDCD EFEF GG rhyme scheme.',
      'The volta marks a turn in perspective near line 9 or line 13.',
    ],
  },
  {
    id: 'hw-9th-cs-http',
    grade: '9th',
    subject: 'CS',
    due: 'Due Next Week',
    duration: '20 min',
    title: 'Web Protocols, DNS & HTTP Methods',
    description: 'Trace how DNS resolution, TLS handshakes, GET/POST requests, and status codes work.',
    summary: 'Diagram a full browser page request lifecycle and distinguish GET requests from state-changing POST requests.',
    notes: [
      'DNS translates human-readable domain names into IP addresses.',
      'Status codes: 2xx = success, 3xx = redirect, 4xx = client error, 5xx = server error.',
      'HTTPS encrypts HTTP traffic inside a TLS session.',
    ],
  },

  // 11th Grade
  {
    id: 'hw-11th-math-quadratics',
    grade: '11th',
    subject: 'Math',
    due: 'Due Tomorrow',
    duration: '30 min',
    title: 'Polynomial Roots & Complex Discriminants',
    description: 'Analyze quadratic discriminants, synthetic division, and end behavior of higher-degree polynomials.',
    summary: 'Factor cubic polynomials and classify real vs. complex conjugate roots across Exercises 1–12.',
    notes: [
      'Vertex x-coordinate of ax² + bx + c: −b / (2a).',
      'Discriminant (b² − 4ac) < 0 produces two complex conjugate roots.',
      'By the Fundamental Theorem of Algebra, a degree-n polynomial has n complex roots.',
    ],
  },
  {
    id: 'hw-11th-sci-physics',
    grade: '11th',
    subject: 'Science',
    due: 'Due Wednesday',
    duration: '30 min',
    title: 'Kinematics & Free-Body Force Analysis',
    description: 'Resolve 2D incline force vectors, friction coefficients, and projectile motion equations.',
    summary: 'Draw free-body diagrams and compute acceleration and normal force along 30° inclined planes.',
    notes: [
      'Resolve gravity on an incline into mg·sin(θ) parallel and mg·cos(θ) perpendicular.',
      'Static friction satisfies f_s ≤ μ_s · N before motion begins.',
      'Horizontal projectile velocity stays constant (assuming no air drag).',
    ],
  },
  {
    id: 'hw-11th-hist-federalist',
    grade: '11th',
    subject: 'History',
    due: 'Due Monday',
    duration: '30 min',
    title: 'Federalist vs. Anti-Federalist Constitutional Debate',
    description: 'Synthesize Federalist No. 10 and No. 51 arguments for faction control and checks and balances.',
    summary: 'Compare Madison’s defense of an extended republic with Brutus No. 1 critiques on central power.',
    notes: [
      'Federalist No. 51: "Ambition must be made to counteract ambition."',
      'Federalist No. 10 argues a large republic prevents a single faction from dominating.',
      'Anti-Federalist objections directly led to ratifying the Bill of Rights in 1791.',
    ],
  },
  {
    id: 'hw-11th-eng-rhetoric',
    grade: '11th',
    subject: 'English',
    due: 'Due Friday',
    duration: '25 min',
    title: 'AP Rhetorical Analysis & Synthesis',
    description: 'Evaluate ethos, pathos, logos, syntax shifts, and anaphora in historical addresses.',
    summary: 'Write a body paragraph analyzing how speaker diction and juxtaposition build urgency for the audience.',
    notes: [
      'Always name the specific audience and historical exigence before analyzing devices.',
      'Anaphora repeats an opening phrase across successive clauses to build momentum.',
      'Quote short high-impact phrases rather than copying full sentences.',
    ],
  },
  {
    id: 'hw-11th-cs-bigo',
    grade: '11th',
    subject: 'CS',
    due: 'Due Thursday',
    duration: '30 min',
    title: 'Algorithm Complexity, Big-O & Recursion',
    description: 'Compare O(1), O(log n), O(n log n), and O(n²) runtimes and trace recursive call stacks.',
    summary: 'Analyze binary search, merge sort, and memoized dynamic programming call trees on large arrays.',
    notes: [
      'Binary search halves the remaining search interval each step → O(log n).',
      'Merge sort splits recursively and merges in linear time → O(n log n).',
      'Every recursive function needs a terminating base case to prevent stack overflow.',
    ],
  },
];

const PRACTICE_QUESTIONS = [
  // 3rd Grade
  {
    grade: '3rd',
    subject: 'Math',
    question: 'What is 7 × 8 + 14?',
    options: ['64', '70', '72', '56'],
    answerIndex: 1,
    explanation: 'Multiply first: 7 × 8 = 56, then add 14 to get 70.',
  },
  {
    grade: '3rd',
    subject: 'Science',
    question: 'Which adaptation helps a desert cactus survive with very little rain?',
    options: ['Wide thin leaves', 'Thick water-storing stem', 'Thick winter fur', 'Webbed feet'],
    answerIndex: 1,
    explanation: 'A thick waxy stem stores water while spines reduce evaporation.',
  },
  {
    grade: '3rd',
    subject: 'History',
    question: 'If you walk East and then turn toward the top of a standard map, which direction are you facing?',
    options: ['South', 'West', 'North', 'Southeast'],
    answerIndex: 2,
    explanation: 'On a standard compass rose, North points toward the top of the map.',
  },
  {
    grade: '3rd',
    subject: 'English',
    question: 'Which word in "The clever fox leaped silently" is an adjective?',
    options: ['fox', 'leaped', 'clever', 'silently'],
    answerIndex: 2,
    explanation: '"Clever" describes the noun "fox," making it an adjective.',
  },
  {
    grade: '3rd',
    subject: 'CS',
    question: 'Why do coders use a Repeat loop in a maze program?',
    options: [
      'To delete the entire map',
      'To run repeated steps cleanly without rewriting them',
      'To turn off the monitor',
      'To make bugs happen faster',
    ],
    answerIndex: 1,
    explanation: 'Loops repeat a block of steps automatically, keeping programs short and clean.',
  },

  // 5th Grade
  {
    grade: '5th',
    subject: 'Math',
    question: 'What is 1/3 + 1/6 in simplest form?',
    options: ['2/9', '1/2', '3/6', '2/3'],
    answerIndex: 1,
    explanation: '1/3 equals 2/6. Adding 2/6 + 1/6 = 3/6, which simplifies to 1/2.',
  },
  {
    grade: '5th',
    subject: 'Science',
    question: 'What causes Earth to experience day and night every 24 hours?',
    options: [
      'Earth revolving around the Moon',
      'Earth spinning (rotating) on its axis',
      'Sunspots cooling down',
      'Clouds blocking sunlight',
    ],
    answerIndex: 1,
    explanation: 'Earth completes one full rotation on its axis every 24 hours.',
  },
  {
    grade: '5th',
    subject: 'History',
    question: 'Why did the New England colonies rely heavily on shipbuilding and fishing?',
    options: [
      'Endless flat wheat prairies',
      'Deep coastal harbors, timber forests, and rocky soil',
      'Tropical rainforest climate',
      'Gold mines in the desert',
    ],
    answerIndex: 1,
    explanation: 'Forests and natural harbors supported timber and maritime trade despite rocky soil.',
  },
  {
    grade: '5th',
    subject: 'English',
    question: 'Which punctuation mark must surround exact words copied from a text?',
    options: ['Parentheses', 'Quotation marks', 'Exclamation points', 'Semicolons'],
    answerIndex: 1,
    explanation: 'Quotation marks show the reader which exact words come directly from the source.',
  },
  {
    grade: '5th',
    subject: 'CS',
    question: 'If score starts at 10 and you collect three +5 coins, what value does the score variable hold?',
    options: ['15', '25', '30', '50'],
    answerIndex: 1,
    explanation: '10 + 5 + 5 + 5 = 25.',
  },

  // 7th Grade
  {
    grade: '7th',
    subject: 'Math',
    question: 'A cyclist travels 42 miles in 3 hours at a constant speed. What is the unit rate?',
    options: ['12 mph', '14 mph', '16 mph', '21 mph'],
    answerIndex: 1,
    explanation: 'Divide distance by time: 42 ÷ 3 = 14 miles per hour.',
  },
  {
    grade: '7th',
    subject: 'Science',
    question: 'Which structure is found in plant cells for photosynthesis but NOT in animal cells?',
    options: ['Nucleus', 'Mitochondrion', 'Chloroplast', 'Cell membrane'],
    answerIndex: 2,
    explanation: 'Chloroplasts capture sunlight to produce sugars inside plant cells.',
  },
  {
    grade: '7th',
    subject: 'History',
    question: 'Which Silk Road oasis city served as a major crossroads between China and Persia?',
    options: ['Samarkand', 'Carthage', 'Tenochtitlan', 'Athens'],
    answerIndex: 0,
    explanation: 'Samarkand in Central Asia flourished as a major Eurasian trade hub.',
  },
  {
    grade: '7th',
    subject: 'English',
    question: 'In an argumentative essay, what is the purpose of a counterclaim paragraph?',
    options: [
      'To change the topic completely',
      'To address and refute the strongest opposing viewpoint',
      'To list random dictionary definitions',
      'To repeat the title three times',
    ],
    answerIndex: 1,
    explanation: 'Addressing and refuting opposing views strengthens credibility and logic.',
  },
  {
    grade: '7th',
    subject: 'CS',
    question: 'What is the decimal value of the 8-bit binary number 00101101?',
    options: ['37', '43', '45', '53'],
    answerIndex: 2,
    explanation: '32 + 8 + 4 + 1 = 45.',
  },

  // 9th Grade
  {
    grade: '9th',
    subject: 'Math',
    question: 'What is the slope of the line passing through (2, 3) and (6, 11)?',
    options: ['1', '2', '4', '0.5'],
    answerIndex: 1,
    explanation: 'm = (11 − 3) / (6 − 2) = 8 / 4 = 2.',
  },
  {
    grade: '9th',
    subject: 'Science',
    question: 'In a heterozygous cross (Aa × Aa), what fraction of offspring are homozygous recessive (aa)?',
    options: ['1/4', '1/2', '3/4', '1/8'],
    answerIndex: 0,
    explanation: 'Punnett square outcomes are AA (1/4), Aa (2/4), and aa (1/4).',
  },
  {
    grade: '9th',
    subject: 'History',
    question: 'Which invention most accelerated overland freight transport during the 1830s?',
    options: ['Steam locomotive', 'Printing press', 'Windmill', 'Astrolabe'],
    answerIndex: 0,
    explanation: 'Steam-powered railways transformed shipping speed across industrial regions.',
  },
  {
    grade: '9th',
    subject: 'English',
    question: 'How many syllables are in a standard line of iambic pentameter?',
    options: ['8', '10', '12', '14'],
    answerIndex: 1,
    explanation: 'Five iambic feet (unstressed + stressed) equal 10 syllables.',
  },
  {
    grade: '9th',
    subject: 'CS',
    question: 'Which HTTP status code range indicates a successful server response?',
    options: ['2xx', '3xx', '4xx', '5xx'],
    answerIndex: 0,
    explanation: 'Status codes from 200 to 299 (such as 200 OK) indicate success.',
  },

  // 11th Grade
  {
    grade: '11th',
    subject: 'Math',
    question: 'For ax² + bx + c = 0, what kind of roots occur when the discriminant b² − 4ac is negative?',
    options: [
      'Two distinct real roots',
      'One repeated rational root',
      'Two complex conjugate roots',
      'Infinitely many roots',
    ],
    answerIndex: 2,
    explanation: 'Taking the square root of a negative discriminant yields a complex conjugate pair.',
  },
  {
    grade: '11th',
    subject: 'Science',
    question: 'If a 4 kg cart accelerates at 3 m/s², what net force acts on it?',
    options: ['0.75 N', '7 N', '12 N', '36 N'],
    answerIndex: 2,
    explanation: 'By Newton’s Second Law, F = m × a = 4 kg × 3 m/s² = 12 N.',
  },
  {
    grade: '11th',
    subject: 'History',
    question: 'Which essay argued that "ambition must be made to counteract ambition"?',
    options: ['Magna Carta', 'Federalist No. 51', 'Articles of Confederation', 'Treaty of Paris'],
    answerIndex: 1,
    explanation: 'James Madison wrote Federalist No. 51 to defend constitutional checks and balances.',
  },
  {
    grade: '11th',
    subject: 'English',
    question: 'Which rhetorical appeal relies primarily on statistics, data, and logical reasoning?',
    options: ['Ethos', 'Pathos', 'Logos', 'Anaphora'],
    answerIndex: 2,
    explanation: 'Logos persuades using data, evidence, and structured reasoning.',
  },
  {
    grade: '11th',
    subject: 'CS',
    question: 'What is the worst-case time complexity of binary search on a sorted array of n items?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    answerIndex: 1,
    explanation: 'Binary search halves the remaining search interval on every comparison.',
  },
];

let firebaseModulePromise = null;

function getFirebaseModule() {
  if (!firebaseModulePromise) {
    firebaseModulePromise = import('./firebase.js').catch((err) => {
      firebaseModulePromise = null;
      throw err;
    });
  }
  return firebaseModulePromise;
}

function sanitizeIdArray(items, maxLen) {
  if (!Array.isArray(items)) return [];
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (typeof item !== 'string') continue;
    const trimmed = item.trim();
    if (trimmed.length < 1 || trimmed.length > 64 || !VALID_ID_REGEX.test(trimmed)) {
      continue;
    }
    if (!seen.has(trimmed)) {
      seen.add(trimmed);
      out.push(trimmed);
      if (out.length >= maxLen) break;
    }
  }
  return out;
}

function sanitizePlayCounts(counts) {
  if (!counts || typeof counts !== 'object' || Array.isArray(counts)) return {};
  const out = {};
  let entries = 0;
  for (const [key, val] of Object.entries(counts)) {
    if (entries >= 50) break;
    if (typeof key !== 'string' || key.length < 1 || key.length > 64 || !VALID_ID_REGEX.test(key)) {
      continue;
    }
    const num = Math.max(0, Math.floor(Number(val) || 0));
    if (num > 0) {
      out[key] = num;
      entries += 1;
    }
  }
  return out;
}

function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors in restricted environments
  }
}

const DIFFICULTY_RANK = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

const FALLBACK_GAMES = [
  {
    id: 'minecraft-classic',
    title: 'Minecraft',
    category: 'Sandbox',
    difficulty: 'Medium',
    estimatedTime: '15–60 min',
    players: 'Single & Multiplayer',
    description: 'Explore, gather resources, craft tools, and build voxel worlds directly in your browser.',
    overview: 'Play Minecraft 1.5.2 directly in your browser with full Survival and Creative modes, infinite procedural terrain, crafting recipes, and both local singleplayer worlds and multiplayer servers.',
    controls: 'WASD move · Space jump · Left click mine · Right click place · E inventory',
    tips: [
      'Click inside the game window after loading a world to capture your mouse cursor for smooth 3D look.',
      'Press E to open your inventory and craft a wooden pickaxe before nightfall.',
      'Use Fullscreen mode in the player bar above for the sharpest viewport and mouse lock.',
    ],
    thumbnail: './assets/images/game_cover_minecraft_1795737499846.jpg',
    iframeSrc: 'https://d1tm91r4ytbt54.cloudfront.net/2779cbcb-a02f-48a3-9e2e-95a8d123d165/1685483461665/web/index.html',
  },
  {
    id: 'sonic-mania-edition',
    title: 'Sonic and More Games',
    category: 'Action',
    difficulty: 'Medium',
    estimatedTime: '10–30 min',
    players: '1 Player',
    description: 'Play Sonic Mania Edition plus bonus retro arcade games right in your browser.',
    overview: 'Launch Sonic Mania Edition alongside a full collection of classic retro games directly in your browser. Dash through classic loops, collect golden rings, spin-dash past enemies, or switch into bonus arcade favorites anytime.',
    controls: 'Arrow keys or WASD move · Space / Z / Enter jump & spin dash',
    tips: [
      'Hold Down and tap Jump while standing still to charge a fast Spin Dash.',
      'Keep at least one golden ring on hand so a hit won\'t cost a life.',
      'Click Fullscreen in the player bar above for crisp retro scaling.',
    ],
    thumbnail: './assets/images/game_cover_sonic_mania_1795811447480.jpg',
    iframeSrc: 'https://www.y9freegames.com/game/sonic-mania-edition/',
  },
  {
    id: 'grid-snake',
    title: 'Grid Snake',
    category: 'Arcade',
    difficulty: 'Easy',
    estimatedTime: '3–8 min',
    players: '1 Player',
    description: 'Steer the snake across the grid, collect golden apples, and avoid walls or your own tail.',
    overview: 'Guide your snake through a 20x20 arena, eating golden apples to extend your tail and build a high score. Each apple slightly increases your movement speed.',
    controls: 'Arrow keys or WASD (P to pause)',
    tips: ['Plan turns two tiles ahead once your snake grows past 15 segments.'],
    thumbnail: './assets/images/game_cover_snake_1795734863750.jpg',
    iframeSrc: './games/snake.html',
  },
  {
    id: 'brick-breaker',
    title: 'Brick Breaker',
    category: 'Arcade',
    difficulty: 'Medium',
    estimatedTime: '5–12 min',
    players: '1 Player',
    description: 'Deflect the ball off your paddle to clear layered brick formations across progressive rounds.',
    overview: 'Bounce the steel ball off your paddle to shatter five layered rows of colored bricks across progressive rounds.',
    controls: 'Mouse, Touch drag, or Left/Right arrows',
    tips: ['Hit the ball near the edges of your paddle to send it at sharper angles.'],
    thumbnail: './assets/images/game_cover_breakout_1795734864364.jpg',
    iframeSrc: './games/breakout.html',
  },
  {
    id: 'slide-2048',
    title: '2048 Slide',
    category: 'Puzzle',
    difficulty: 'Medium',
    estimatedTime: '5–15 min',
    players: '1 Player',
    description: 'Merge matching number tiles on a 4x4 board to reach the 2048 tile before running out of moves.',
    overview: 'Slide all tiles simultaneously on a 4x4 board and combine matching numbers until you forge the 2048 tile.',
    controls: 'Arrow keys, WASD, or Swipe',
    tips: ['Keep your highest-value tile anchored in one corner of the board.'],
    thumbnail: './assets/images/game_cover_puzzle2048_1795734865213.jpg',
    iframeSrc: './games/2048.html',
  },
  {
    id: 'minesweeper-classic',
    title: 'Minesweeper',
    category: 'Puzzle',
    difficulty: 'Medium',
    estimatedTime: '3–10 min',
    players: '1 Player',
    description: 'Uncover safe tiles using numerical adjacency clues and flag every hidden mine on the board.',
    overview: 'Deduce where hidden mines are buried across a 9x9 or 12x12 grid using numerical adjacency clues.',
    controls: 'Left click reveal · Right click or Mode button to flag',
    tips: ['Your very first click is always safe and opens a clear starting pocket.'],
    thumbnail: './assets/images/game_cover_minesweeper_1795734865129.jpg',
    iframeSrc: './games/minesweeper.html',
  },
  {
    id: 'asteroids-drift',
    title: 'Asteroids Drift',
    category: 'Action',
    difficulty: 'Hard',
    estimatedTime: '4–12 min',
    players: '1 Player',
    description: 'Pilot your starship through deep space, split drifting asteroids, and survive escalating waves.',
    overview: 'Take control of a vector starfighter with zero-gravity momentum and blast drifting asteroids across endless escalating waves.',
    controls: 'Left/Right turn · Up thrust · Spacebar fire',
    tips: ['Use short thrust bursts rather than holding Up continuously so you stay controllable.'],
    thumbnail: './assets/images/game_cover_asteroids_1795734865467.jpg',
    iframeSrc: './games/asteroids.html',
  },
  {
    id: 'memory-match',
    title: 'Memory Match',
    category: 'Puzzle',
    difficulty: 'Easy',
    estimatedTime: '2–4 min',
    players: '1 Player',
    description: 'Flip cards two at a time to locate all matching geometric pairs in the fewest moves.',
    overview: 'Flip two tiles per turn across 16 geometric cards and clear all 8 pairs in as few moves as possible.',
    controls: 'Click or tap cards',
    tips: ['Scan rows systematically from top-left to bottom-right on your opening turns.'],
    thumbnail: './assets/images/game_cover_memory_1795734866266.jpg',
    iframeSrc: './games/memory.html',
  },
  {
    id: 'voxel-builder',
    title: 'Voxel Block Builder',
    category: 'Sandbox',
    difficulty: 'Easy',
    estimatedTime: '5–20 min',
    players: '1 Player',
    description: 'Sculpt 2D terrain, place glowing torches, brick castles, and water pools in a side-view block sandbox.',
    overview: 'Build custom pixel structures across a 32x20 terrain grid with Grass, Dirt, Stone, Wood, Brick, Water, and Torch blocks plus Day/Night sky switching.',
    controls: 'Left click/drag place · Right click erase · Toolbar select block',
    tips: ['Switch Sky to Night and place Torch blocks to light up stone towers.'],
    thumbnail: './assets/covers/voxel-builder.svg',
    iframeSrc: './games/voxel-builder.html',
  },
  {
    id: 'pixel-sand',
    title: 'Falling Sand Lab',
    category: 'Sandbox',
    difficulty: 'Easy',
    estimatedTime: '5–15 min',
    players: '1 Player',
    description: 'Experiment with real-time cellular automata physics using sand, water, fire, wood, stone, and acid.',
    overview: 'Paint interactive elements onto a particle simulation grid and watch gravity, fluid displacement, burning wood, and acid reactions unfold.',
    controls: 'Click & drag to pour elements · Adjust brush size in toolbar',
    tips: ['Build a stone basin, fill it with water, then pour sand on top to watch displacement.'],
    thumbnail: './assets/covers/pixel-sand.svg',
    iframeSrc: './games/pixel-sand.html',
  },
  {
    id: 'gravity-orbits',
    title: 'Orbit Sandbox',
    category: 'Sandbox',
    difficulty: 'Easy',
    estimatedTime: '5–15 min',
    players: '1 Player',
    description: 'Fling planets and stars into space and watch real N-body gravitational orbits and trails.',
    overview: 'Pull back and release anywhere in the cosmos to launch planets or massive stars with custom velocity vectors and watch glowing orbital paths.',
    controls: 'Click & drag anywhere to launch a planet or star',
    tips: ['Pull perpendicular to the central star for clean circular orbits.'],
    thumbnail: './assets/covers/gravity-orbits.svg',
    iframeSrc: './games/gravity-orbits.html',
  },
  {
    id: 'circuit-maker',
    title: 'Logic Circuit Forge',
    category: 'Sandbox',
    difficulty: 'Medium',
    estimatedTime: '5–20 min',
    players: '1 Player',
    description: 'Wire switches, lamps, AND, OR, XOR, and NOT gates together to build live digital logic circuits.',
    overview: 'An interactive digital logic sandbox where you place switches, gates, and output lamps, connect live signal wires, and toggle inputs.',
    controls: 'Select part & click canvas to place · Select Wire & click two parts',
    tips: ['Start with Click / Toggle mode on the XOR Demo to watch live signal routing.'],
    thumbnail: './assets/covers/circuit-maker.svg',
    iframeSrc: './games/circuit-maker.html',
  },
  {
    id: 'pixel-studio',
    title: 'Pixel Sprite Studio',
    category: 'Sandbox',
    difficulty: 'Easy',
    estimatedTime: '5–20 min',
    players: '1 Player',
    description: 'Paint 16x16 retro game sprites with mirror symmetry, flood fill, and a live crisp pixel preview.',
    overview: 'Craft retro pixel characters, icons, and tiles on a 16x16 grid with a 12-color palette, vertical mirror mode, and flood fill.',
    controls: 'Click/drag paint · Toggle Mirror or Fill in top bar',
    tips: ['Turn on Mirror mode to draw symmetrical spaceships or monsters in seconds.'],
    thumbnail: './assets/covers/pixel-studio.svg',
    iframeSrc: './games/pixel-studio.html',
  },
  {
    id: 'wave-synth',
    title: 'Beat & Synth Lab',
    category: 'Sandbox',
    difficulty: 'Easy',
    estimatedTime: '5–15 min',
    players: '1 Player',
    description: 'Program 16-step synth and drum loops with live Web Audio synthesis and adjustable BPM tempo.',
    overview: 'Compose electronic beats across Lead, Synth, Bass, Snare, and Kick tracks on an interactive 16-step grid.',
    controls: 'Click pads to toggle notes · Drag BPM slider · Click Play Loop',
    tips: ['Load Groove for an instant starter beat, then remix the Lead notes.'],
    thumbnail: './assets/covers/wave-synth.svg',
    iframeSrc: './games/wave-synth.html',
  },
  {
    id: 'domino-physics',
    title: 'Marble Track Maker',
    category: 'Sandbox',
    difficulty: 'Easy',
    estimatedTime: '5–15 min',
    players: '1 Player',
    description: 'Draw ramps and bouncy pads, then drop physics marbles to watch them ricochet down your course.',
    overview: 'Design custom gravity tracks with angled ramps and high-bounce green bumpers, then unleash Marble Rain.',
    controls: 'Drag to draw ramps or bumpers · Click Drop Marble or Marble Rain',
    tips: ['Angle green Bumper Pads slightly upward to launch marbles across gaps.'],
    thumbnail: './assets/covers/domino-physics.svg',
    iframeSrc: './games/domino-physics.html',
  },
  {
    id: 'city-grid',
    title: 'Tiny City Planner',
    category: 'Sandbox',
    difficulty: 'Easy',
    estimatedTime: '5–15 min',
    players: '1 Player',
    description: 'Place houses, shops, parks, roads, and solar plants on a grid while balancing power and happiness.',
    overview: 'Design a thriving micro-city on a 10x7 grid. Keep solar power positive and add parks to keep citizen happiness at 100%.',
    controls: 'Pick a building tool and click any tile on the city grid',
    tips: ['Build Solar plants early so your city never dips into negative power.'],
    thumbnail: './assets/covers/city-grid.svg',
    iframeSrc: './games/city-grid.html',
  },
  {
    id: 'flappy-glider',
    title: 'Sky Hopper',
    category: 'Arcade',
    difficulty: 'Medium',
    estimatedTime: '2–6 min',
    players: '1 Player',
    description: 'Tap to boost between glowing skyline pillars and chase a new personal high score.',
    overview: 'Time every boost cleanly to thread the needle through endless neon skyline gates without clipping a pillar.',
    controls: 'Space, Up arrow, or Click/Tap to flap',
    tips: ['Use quick light taps before entering each gap rather than diving steeply.'],
    thumbnail: './assets/covers/flappy-glider.svg',
    iframeSrc: './games/flappy-glider.html',
  },
  {
    id: 'paddle-pong',
    title: 'Neon Rally Pong',
    category: 'Arcade',
    difficulty: 'Easy',
    estimatedTime: '3–8 min',
    players: '1–2 Players',
    description: 'Fast arcade paddle rally against a responsive CPU or a friend in local 2-player mode.',
    overview: 'Classic arcade table tennis with spin angles, escalating ball velocity on long rallies, and toggleable 1P/2P controls.',
    controls: 'Mouse or W/S (Player 1) · Up/Down arrows (Player 2 in 2P mode)',
    tips: ['Strike the ball off the top or bottom tip of your paddle for steep angled shots.'],
    thumbnail: './assets/covers/paddle-pong.svg',
    iframeSrc: './games/paddle-pong.html',
  },
  {
    id: 'space-invaders',
    title: 'Star Squadron',
    category: 'Arcade',
    difficulty: 'Medium',
    estimatedTime: '4–10 min',
    players: '1 Player',
    description: 'Blast descending rows of alien formations and clear escalating waves before they breach.',
    overview: 'Command your orbital cannon against marching alien squads firing back across progressively faster waves.',
    controls: 'Left/Right or A/D move · Space fire',
    tips: ['Trim the outer columns first to slow down how quickly the fleet drops rows.'],
    thumbnail: './assets/covers/space-invaders.svg',
    iframeSrc: './games/space-invaders.html',
  },
  {
    id: 'stack-tower',
    title: 'Skyline Stacker',
    category: 'Arcade',
    difficulty: 'Easy',
    estimatedTime: '2–6 min',
    players: '1 Player',
    description: 'Drop sliding beams with pinpoint timing to build the tallest skyscraper without losing width.',
    overview: 'Each mistimed drop slices off the overhanging beam—align within a few pixels for a perfect snap and climb skyward.',
    controls: 'Space or Click/Tap to drop block',
    tips: ['Watch one edge of the tower steadily rather than tracking the whole block.'],
    thumbnail: './assets/covers/stack-tower.svg',
    iframeSrc: './games/stack-tower.html',
  },
  {
    id: 'dino-sprint',
    title: 'Canyon Runner',
    category: 'Arcade',
    difficulty: 'Easy',
    estimatedTime: '3–8 min',
    players: '1 Player',
    description: 'Sprint across the canyon, double-jump over barriers and drones, and push your distance record.',
    overview: 'An endless high-speed side-scroller featuring double jumps, ground pillars, and aerial drones as speed climbs.',
    controls: 'Space, Up arrow, or Click/Tap to jump & double-jump',
    tips: ['Save your second mid-air jump for wide obstacles or flying drones.'],
    thumbnail: './assets/covers/dino-sprint.svg',
    iframeSrc: './games/dino-sprint.html',
  },
  {
    id: 'whack-critters',
    title: 'Turbo Reflex Pop',
    category: 'Arcade',
    difficulty: 'Easy',
    estimatedTime: '1–3 min',
    players: '1 Player',
    description: 'Test your reaction speed in a 30-second 4x4 target blitz—snag golden tiles and dodge red bombs.',
    overview: 'Rapidly click cyan +10 and gold +30 targets on a 4x4 reaction board before they vanish while avoiding -25 bombs.',
    controls: 'Click or tap glowing tiles',
    tips: ['Keep your cursor centered on the 4x4 grid for shorter travel distances.'],
    thumbnail: './assets/covers/whack-critters.svg',
    iframeSrc: './games/whack-critters.html',
  },
  {
    id: 'tetris-blocks',
    title: 'Block Drop',
    category: 'Arcade',
    difficulty: 'Medium',
    estimatedTime: '5–15 min',
    players: '1 Player',
    description: 'Rotate and drop falling tetrominoes to clear horizontal lines and rack up multi-line combos.',
    overview: 'Classic falling-block arcade action with all 7 tetromino shapes, hard drops, and escalating fall speeds.',
    controls: 'Left/Right move · Up rotate · Down soft drop · Space hard drop',
    tips: ['Keep a single column open on the edge for 4-line clears with the I-piece.'],
    thumbnail: './assets/covers/tetris-blocks.svg',
    iframeSrc: './games/tetris-blocks.html',
  },
  {
    id: 'pac-maze',
    title: 'Pellet Dash',
    category: 'Arcade',
    difficulty: 'Medium',
    estimatedTime: '3–8 min',
    players: '1 Player',
    description: 'Clear every pellet in the maze while outsmarting chasing guardians and grabbing power orbs.',
    overview: 'Navigate a tight neon labyrinth, collect corner power orbs to turn the tables on chasers, and clear the board.',
    controls: 'Arrow keys or WASD to steer',
    tips: ['Save corner power orbs for moments when two chasers trap your lane.'],
    thumbnail: './assets/covers/pac-maze.svg',
    iframeSrc: './games/pac-maze.html',
  },
  {
    id: 'sudoku-mini',
    title: 'Sudoku 9x9',
    category: 'Puzzle',
    difficulty: 'Medium',
    estimatedTime: '8–20 min',
    players: '1 Player',
    description: 'Fill every 9x9 row, column, and 3x3 box with digits 1–9 without repeating a number.',
    overview: 'Generate fresh 9x9 Sudoku boards with instant mistake highlighting, keyboard digit entry, and on-screen number buttons.',
    controls: 'Click a cell, then press 1–9 or click the number bar',
    tips: ['Scan 3x3 boxes that already contain 5 or more numbers first.'],
    thumbnail: './assets/covers/sudoku-mini.svg',
    iframeSrc: './games/sudoku-mini.html',
  },
  {
    id: 'lights-out',
    title: 'Circuit Lights Out',
    category: 'Puzzle',
    difficulty: 'Medium',
    estimatedTime: '2–8 min',
    players: '1 Player',
    description: 'Click tiles on a 5x5 grid to toggle adjacent bulbs until every single light is switched off.',
    overview: 'Every tile flips itself and its four orthogonal neighbors—solve guaranteed-solvable 5x5 boards in minimal moves.',
    controls: 'Click tiles on the 5x5 grid',
    tips: ['Chase lights downward row by row by clicking directly below any lit tile.'],
    thumbnail: './assets/covers/lights-out.svg',
    iframeSrc: './games/lights-out.html',
  },
  {
    id: 'sliding-15',
    title: '15 Tile Shuffle',
    category: 'Puzzle',
    difficulty: 'Medium',
    estimatedTime: '3–8 min',
    players: '1 Player',
    description: 'Slide numbered tiles into the blank slot to arrange 1 through 15 in ascending order.',
    overview: 'Guaranteed-solvable 4x4 sliding number puzzles highlighting tiles in green once they reach their home spot.',
    controls: 'Click adjacent tiles or use Arrow keys',
    tips: ['Solve the entire top row (1–4) and left column first, then never disturb them.'],
    thumbnail: './assets/covers/sliding-15.svg',
    iframeSrc: './games/sliding-15.html',
  },
  {
    id: 'word-guess',
    title: 'Five-Letter Wordle',
    category: 'Puzzle',
    difficulty: 'Medium',
    estimatedTime: '2–5 min',
    players: '1 Player',
    description: 'Deduce the secret 5-letter word within 6 guesses using green and amber letter clues.',
    overview: 'Unlimited 5-letter word puzzles with full physical and on-screen keyboard color tracking.',
    controls: 'Type letters + Enter (or use on-screen keyboard)',
    tips: ['Open with vowel-rich words like SPARK, TRAIL, or ORBIT.'],
    thumbnail: './assets/covers/word-guess.svg',
    iframeSrc: './games/word-guess.html',
  },
  {
    id: 'nonogram-grid',
    title: 'Picross Nonogram',
    category: 'Puzzle',
    difficulty: 'Hard',
    estimatedTime: '4–10 min',
    players: '1 Player',
    description: 'Use row and column run-length clues to uncover the hidden 6x6 pixel picture.',
    overview: 'Deduce which squares are filled or empty using classic Picross number clues along every row and column.',
    controls: 'Click to fill · Toggle Mode: Mark × to rule out empty cells',
    tips: ['Start with clues that sum close to 6 (like 6, 5, or 2 3).'],
    thumbnail: './assets/covers/nonogram-grid.svg',
    iframeSrc: './games/nonogram-grid.html',
  },
  {
    id: 'tower-hanoi',
    title: 'Tower of Hanoi',
    category: 'Puzzle',
    difficulty: 'Easy',
    estimatedTime: '2–6 min',
    players: '1 Player',
    description: 'Transfer the entire stacked disk pyramid to the rightmost peg without placing larger disks on smaller ones.',
    overview: 'Test your recursive planning across 3, 4, or 5 disks and try to match the theoretical minimum move count.',
    controls: 'Click source peg, then click destination peg',
    tips: ['Move the smallest disk every other turn in a consistent cyclic direction.'],
    thumbnail: './assets/covers/tower-hanoi.svg',
    iframeSrc: './games/tower-hanoi.html',
  },
  {
    id: 'simon-echo',
    title: 'Chroma Sequence',
    category: 'Puzzle',
    difficulty: 'Easy',
    estimatedTime: '2–6 min',
    players: '1 Player',
    description: 'Watch and listen as the four glowing pads flash longer melodic patterns each round.',
    overview: 'A classic audio-visual memory challenge that tracks your longest streak across rounds.',
    controls: 'Click or tap the 4 colored pads in order',
    tips: ['Group patterns into chunks of 3 or 4 colors in your head as sequences grow.'],
    thumbnail: './assets/covers/simon-echo.svg',
    iframeSrc: './games/simon-echo.html',
  },
  {
    id: 'pipe-connect',
    title: 'Pipe Flow Link',
    category: 'Puzzle',
    difficulty: 'Medium',
    estimatedTime: '2–6 min',
    players: '1 Player',
    description: 'Rotate elbow, straight, and tee pipes on a 5x5 grid to route water from start to finish.',
    overview: 'Watch live blue water surge through connected segments in real time until the bottom-right drain fills.',
    controls: 'Click any pipe tile to rotate it 90 degrees',
    tips: ['Trace backward from the bottom-right amber drain when stuck near the middle.'],
    thumbnail: './assets/covers/pipe-connect.svg',
    iframeSrc: './games/pipe-connect.html',
  },
  {
    id: 'dodge-meteor',
    title: 'Meteor Dodge',
    category: 'Action',
    difficulty: 'Medium',
    estimatedTime: '3–8 min',
    players: '1 Player',
    description: 'Weave around crimson meteors coming from all edges while grabbing golden energy orbs.',
    overview: 'High-speed 360-degree survival arena where meteor spawn rate and velocity climb with your score.',
    controls: 'Mouse cursor or WASD / Arrow keys',
    tips: ['Fly in wide figure-eights near the center rather than hugging corners.'],
    thumbnail: './assets/covers/dodge-meteor.svg',
    iframeSrc: './games/dodge-meteor.html',
  },
  {
    id: 'tank-duel',
    title: 'Ricochet Tanks',
    category: 'Action',
    difficulty: 'Hard',
    estimatedTime: '4–12 min',
    players: '1 Player',
    description: 'Battle rival tanks across cover walls and bank bouncing shells around corners to score eliminations.',
    overview: 'Tactical top-down tank combat where every shell ricochets twice off arena walls and cover barriers.',
    controls: 'WASD move · Mouse aim & Click fire',
    tips: ['Bank shots off the top or bottom wall to hit enemies hiding behind center cover.'],
    thumbnail: './assets/covers/tank-duel.svg',
    iframeSrc: './games/tank-duel.html',
  },
  {
    id: 'platform-dash',
    title: 'Spike Dash',
    category: 'Action',
    difficulty: 'Hard',
    estimatedTime: '2–8 min',
    players: '1 Player',
    description: 'Vault over neon spikes and climb elevated blocks with snappy double-jumps at rising speed.',
    overview: 'Rhythm-fast side-scrolling obstacle dash with single and double spike hazards plus jumpable platforms.',
    controls: 'Space, Up arrow, or Click/Tap to Jump & Double-Jump',
    tips: ['Use single jumps on lone spikes so your air jump is ready for double spikes.'],
    thumbnail: './assets/covers/platform-dash.svg',
    iframeSrc: './games/platform-dash.html',
  },
  {
    id: 'turret-defense',
    title: 'Hex Base Defense',
    category: 'Action',
    difficulty: 'Easy',
    estimatedTime: '3–10 min',
    players: '1 Player',
    description: 'Rotate your central laser turret 360 degrees to intercept incoming drone swarms before they breach.',
    overview: 'Defend the core from 360-degree enemy waves with rapid auto-firing laser bolts.',
    controls: 'Aim with Mouse or Touch · Turret auto-fires',
    tips: ['Sweep continuously toward whichever edge has the closest red drone.'],
    thumbnail: './assets/covers/turret-defense.svg',
    iframeSrc: './games/turret-defense.html',
  },
  {
    id: 'laser-snake',
    title: 'Tron Light Cycle',
    category: 'Action',
    difficulty: 'Medium',
    estimatedTime: '2–6 min',
    players: '1 Player',
    description: 'Outmaneuver a rival neon light cycle and trap them inside your glowing laser trail.',
    overview: 'High-speed arcade trail duel—cut across your opponent\'s path and avoid walls or any light wall.',
    controls: 'WASD or Arrow keys to steer',
    tips: ['Claim the center early so you have room to box the AI into a corner.'],
    thumbnail: './assets/covers/laser-snake.svg',
    iframeSrc: './games/laser-snake.html',
  },
  {
    id: 'fruit-slice',
    title: 'Blade Slice',
    category: 'Action',
    difficulty: 'Easy',
    estimatedTime: '2–6 min',
    players: '1 Player',
    description: 'Swipe across launching glowing orbs with your blade trail while dodging red bombs.',
    overview: 'Fast mouse or touch slicing action—don\'t miss glowing targets or accidentally slice an X bomb.',
    controls: 'Hold Click/Touch & swipe across targets',
    tips: ['Wait until targets reach the top of their arc where they hang briefly.'],
    thumbnail: './assets/covers/fruit-slice.svg',
    iframeSrc: './games/fruit-slice.html',
  },
  {
    id: 'dungeon-crawl',
    title: 'Dungeon Dash',
    category: 'Action',
    difficulty: 'Medium',
    estimatedTime: '4–10 min',
    players: '1 Player',
    description: 'Snag the golden key, evade chasing slimes, and reach the exit portal across procedural dungeon floors.',
    overview: 'Grid-based dungeon crawler where every move advances pursuing slimes toward you.',
    controls: 'WASD or Arrow keys to move',
    tips: ['Lure slimes around stone pillars to open a clean path to the golden key.'],
    thumbnail: './assets/covers/dungeon-crawl.svg',
    iframeSrc: './games/dungeon-crawl.html',
  },
  {
    id: 'boss-bullet',
    title: 'Starfighter Boss Rush',
    category: 'Action',
    difficulty: 'Hard',
    estimatedTime: '4–12 min',
    players: '1 Player',
    description: 'Weave through multi-wave bullet fans and defeat escalating dreadnought bosses.',
    overview: 'Vertical arcade boss-rush shooter where each defeated dreadnought unleashes a tougher boss phase.',
    controls: 'WASD / Arrows or Mouse move · Auto-Fire',
    tips: ['Stay near the bottom third of the screen so bullet fans spread wider and leave larger gaps.'],
    thumbnail: './assets/covers/boss-bullet.svg',
    iframeSrc: './games/boss-bullet.html',
  },
  {
    id: 'duel-arena',
    title: 'Neon Tank Clash 2P',
    category: 'Multiplayer',
    difficulty: 'Medium',
    estimatedTime: '3–10 min',
    players: '2 Players / vs Bot',
    description: 'Face off in a ricochet-wall tank arena with a friend on one keyboard or battle an AI rival to 5 rounds.',
    overview: 'Local 2-player top-down tank battle inside a glowing neon maze. Bounce shots off angled bumpers and steel barriers to outsmart Player 2 or switch to 1P vs Bot anytime.',
    controls: 'P1: WASD + Space fire · P2: Arrows + Enter fire (or vs Bot)',
    tips: ['Bank shots off side barriers to hit opponents hiding behind center walls.'],
    thumbnail: './assets/covers/duel-arena.svg',
    iframeSrc: './games/duel-arena.html',
  },
  {
    id: 'lightcycle-2p',
    title: 'Cyber Cycle 2P',
    category: 'Multiplayer',
    difficulty: 'Medium',
    estimatedTime: '2–8 min',
    players: '2 Players / vs Bot',
    description: 'Cut off your rival\'s neon light trail in high-speed 2-player head-to-head rounds or vs AI.',
    overview: 'Twin neon bikes leave solid glowing trails across a dark cyber grid. Force your opponent to crash first in fast best-of-rounds matches.',
    controls: 'P1: WASD steer · P2: Arrow keys steer',
    tips: ['Claim the center lanes early so you have space to box in your rival.'],
    thumbnail: './assets/covers/lightcycle-2p.svg',
    iframeSrc: './games/lightcycle-2p.html',
  },
  {
    id: 'sumo-bump',
    title: 'Sumo Ring Dash 2P',
    category: 'Multiplayer',
    difficulty: 'Easy',
    estimatedTime: '2–6 min',
    players: '2 Players / vs Bot',
    description: 'Ram and dash your opponent out of a shrinking neon ring in physics-driven 2-player sumo rounds.',
    overview: 'Build momentum and trigger timed dash bursts to knock your rival off the shrinking circular arena platform.',
    controls: 'P1: WASD + Shift dash · P2: Arrows + / or Enter dash',
    tips: ['Bait a rival dash near the edge, sidestep, and counter-ram from behind.'],
    thumbnail: './assets/covers/sumo-bump.svg',
    iframeSrc: './games/sumo-bump.html',
  },
  {
    id: 'air-hockey-2p',
    title: 'Pocket Air Hockey 2P',
    category: 'Multiplayer',
    difficulty: 'Easy',
    estimatedTime: '3–8 min',
    players: '2 Players / vs Bot',
    description: 'Fast-paced glowing air hockey table with bank-shot physics for 2 local players or solo vs Bot.',
    overview: 'Slide your striker across your half of the rink, smash the high-speed puck past your opponent\'s goal, and race to 7 points.',
    controls: 'P1: WASD or Mouse · P2: Arrow keys (or vs Bot)',
    tips: ['Angle your striker diagonally into incoming pucks for blistering bank shots.'],
    thumbnail: './assets/covers/air-hockey-2p.svg',
    iframeSrc: './games/air-hockey-2p.html',
  },
  {
    id: 'connect-four',
    title: 'Connect Four 2P',
    category: 'Multiplayer',
    difficulty: 'Easy',
    estimatedTime: '2–6 min',
    players: '2 Players / vs Bot',
    description: 'Drop amber and cyan discs into a 7x6 grid to line up four in a row against a friend or smart Bot.',
    overview: 'Classic tactical disc-dropping duel with animated drops, winning line highlights, score tracking, and 2-player or vs-Bot modes.',
    controls: 'Click any column (or press keys 1–7) to drop a disc',
    tips: ['Control the middle column early to unlock diagonal and horizontal threats.'],
    thumbnail: './assets/covers/connect-four.svg',
    iframeSrc: './games/connect-four.html',
  },
  {
    id: 'tag-arena-2p',
    title: 'Platform Star Duel 2P',
    category: 'Multiplayer',
    difficulty: 'Medium',
    estimatedTime: '2–5 min',
    players: '2 Players / vs Bot',
    description: 'Race across floating platforms in a 45-second brawl to collect golden stars and zap your rival.',
    overview: 'Side-view 2-player platformer arena where both fighters leap for falling stars and fire energy bolts to stun and steal points.',
    controls: 'P1: A/D + W jump + F shoot · P2: Left/Right + Up + Enter shoot',
    tips: ['Hold the top platform to spot new star spawns and drop down fast.'],
    thumbnail: './assets/covers/tag-arena-2p.svg',
    iframeSrc: './games/tag-arena-2p.html',
  },
];

const ACHIEVEMENTS = [
  {
    id: 'first-spark',
    title: 'First Spark',
    description: 'Play any 1 game while signed in.',
    tag: 'Rookie',
    flairClass: 'flair-amber-flame',
    tagClass: 'flair-tag-amber-flame',
    check: ({ totalPlays }) => totalPlays >= 1,
  },
  {
    id: 'five-plays',
    title: 'Arcade Regular',
    description: 'Launch games 5 total times.',
    tag: 'Arcade Kid',
    flairClass: 'flair-cyber-cyan',
    tagClass: 'flair-tag-cyber-cyan',
    check: ({ totalPlays }) => totalPlays >= 5,
  },
  {
    id: 'fifteen-plays',
    title: 'High-Score Chaser',
    description: 'Launch games 15 total times.',
    tag: 'Chaser',
    flairClass: 'flair-electric-violet',
    tagClass: 'flair-tag-electric-violet',
    check: ({ totalPlays }) => totalPlays >= 15,
  },
  {
    id: 'thirty-plays',
    title: 'Arcade Legend',
    description: 'Launch games 30 total times.',
    tag: 'Legend',
    flairClass: 'flair-prism-rainbow',
    tagClass: 'flair-tag-prism-rainbow',
    check: ({ totalPlays }) => totalPlays >= 30,
  },
  {
    id: 'fifty-plays',
    title: 'Arcade Immortal',
    description: 'Launch games 50 total times.',
    tag: 'Immortal',
    flairClass: 'flair-molten-gold',
    tagClass: 'flair-tag-molten-gold',
    check: ({ totalPlays }) => totalPlays >= 50,
  },
  {
    id: 'three-titles',
    title: 'Genre Sampler',
    description: 'Play 3 different games in the catalog.',
    tag: 'Explorer',
    flairClass: 'flair-emerald-matrix',
    tagClass: 'flair-tag-emerald-matrix',
    check: ({ distinctPlayed }) => distinctPlayed >= 3,
  },
  {
    id: 'eight-titles',
    title: 'Catalog Collector',
    description: 'Play 8 different games in the catalog.',
    tag: 'Collector',
    flairClass: 'flair-solar-gold',
    tagClass: 'flair-tag-solar-gold',
    check: ({ distinctPlayed }) => distinctPlayed >= 8,
  },
  {
    id: 'fifteen-titles',
    title: 'Library Master',
    description: 'Play 15 different games in the catalog.',
    tag: 'Master',
    flairClass: 'flair-crimson-nova',
    tagClass: 'flair-tag-crimson-nova',
    check: ({ distinctPlayed }) => distinctPlayed >= 15,
  },
  {
    id: 'all-genres',
    title: 'Five-Genre All-Star',
    description: 'Play at least 1 Sandbox, Arcade, Puzzle, Action, and Multiplayer game.',
    tag: 'All-Star',
    flairClass: 'flair-aurora-wave',
    tagClass: 'flair-tag-aurora-wave',
    check: ({ playedCategories }) =>
      ['Sandbox', 'Arcade', 'Puzzle', 'Action', 'Multiplayer'].every(
        (c) => (playedCategories[c] || 0) >= 1
      ),
  },
  {
    id: 'sandbox-creator',
    title: 'World Architect',
    description: 'Play 3 different Sandbox games.',
    tag: 'Architect',
    flairClass: 'flair-voxel-emerald',
    tagClass: 'flair-tag-voxel-emerald',
    check: ({ playedCategories }) => (playedCategories.Sandbox || 0) >= 3,
  },
  {
    id: 'arcade-ace',
    title: 'Arcade Quarter Master',
    description: 'Play 3 different Arcade games.',
    tag: 'Arcade Ace',
    flairClass: 'flair-arcade-neon',
    tagClass: 'flair-tag-arcade-neon',
    check: ({ playedCategories }) => (playedCategories.Arcade || 0) >= 3,
  },
  {
    id: 'puzzle-solver',
    title: 'Master Strategist',
    description: 'Play 3 different Puzzle games.',
    tag: 'Strategist',
    flairClass: 'flair-frost-diamond',
    tagClass: 'flair-tag-frost-diamond',
    check: ({ playedCategories }) => (playedCategories.Puzzle || 0) >= 3,
  },
  {
    id: 'action-ace',
    title: 'Speedster Ace',
    description: 'Play 3 different Action games.',
    tag: 'Speedster',
    flairClass: 'flair-sonic-bolt',
    tagClass: 'flair-tag-sonic-bolt',
    check: ({ playedCategories }) => (playedCategories.Action || 0) >= 3,
  },
  {
    id: 'multiplayer-challenger',
    title: 'Party Starter',
    description: 'Play any 1 Multiplayer game.',
    tag: 'Challenger',
    flairClass: 'flair-cobalt-pulse',
    tagClass: 'flair-tag-cobalt-pulse',
    check: ({ playedCategories }) => (playedCategories.Multiplayer || 0) >= 1,
  },
  {
    id: 'multiplayer-champion',
    title: 'Versus Champion',
    description: 'Play 3 different Multiplayer games.',
    tag: 'Versus Pro',
    flairClass: 'flair-plasma-magenta',
    tagClass: 'flair-tag-plasma-magenta',
    check: ({ playedCategories }) => (playedCategories.Multiplayer || 0) >= 3,
  },
  {
    id: 'collector-favs',
    title: 'Curator VIP',
    description: 'Save 5 games to your favorites list.',
    tag: 'VIP',
    flairClass: 'flair-royal-sunset',
    tagClass: 'flair-tag-royal-sunset',
    check: ({ favoritesCount }) => favoritesCount >= 5,
  },
  {
    id: 'coin-collector',
    title: 'Coin Baron',
    description: 'Earn 250 lifetime Coins while signed in.',
    tag: 'Baron',
    flairClass: 'flair-sky-prism',
    tagClass: 'flair-tag-sky-prism',
    check: ({ lifetimeCoins }) => lifetimeCoins >= 250,
  },
  {
    id: 'theme-stylist',
    title: 'Theme Collector',
    description: 'Unlock an exclusive theme from the Coin Theme Shop.',
    tag: 'Stylist',
    flairClass: 'flair-royal-amethyst',
    tagClass: 'flair-tag-royal-amethyst',
    check: ({ unlockedThemesCount }) => unlockedThemesCount >= 1,
  },
  {
    id: 'homework-scholar',
    title: 'Honor Roll',
    description: 'Complete 5 homework assignments while signed in.',
    tag: 'Scholar',
    flairClass: 'flair-mint-scholar',
    tagClass: 'flair-tag-mint-scholar',
    check: ({ hwDoneCount }) => hwDoneCount >= 5,
  },
  {
    id: 'quiz-whiz',
    title: 'Quiz Genius',
    description: 'Answer 5 practice drill questions right while signed in.',
    tag: 'Genius',
    flairClass: 'flair-galactic-omega',
    tagClass: 'flair-tag-galactic-omega',
    check: ({ quizCorrect }) => quizCorrect >= 5,
  },
];

const state = {
  catalogGames: [],
  favorites: new Set(),
  recentIds: [],
  playCounts: {},
  achievements: new Set(),
  equippedFlair: '',
  coins: 0,
  lifetimeCoins: 0,
  unlockedThemes: new Set(),
  themeId: 'obsidian',
  quizCorrect: 0,
  rewardedHwIds: new Set(),
  toastAchId: null,
  toastTimerId: null,
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
  crtFx: false,
  frameGlowIndex: 0,
  sessionSeconds: 0,
  sessionTimerId: null,
  arcadeUnlocked: false,
  hwDone: new Set(),
  hwGrade: 'All',
  hwSubject: 'All',
  hwSearch: '',
  hwModalId: null,
  practiceIndex: 0,
  practiceCorrect: 0,
  practiceAttempts: 0,
  practiceAnswered: false,
};

const elements = {
  mainContainer: document.getElementById('main-container'),
  cinemaBackdrop: document.getElementById('cinema-backdrop'),
  brandLink: document.getElementById('brand-link'),
  headerCoinsBtn: document.getElementById('header-coins-btn'),
  headerCoinsValue: document.getElementById('header-coins-value'),
  hwNav: document.getElementById('hw-nav'),
  arcadeNav: document.getElementById('arcade-nav'),
  hwNavButtons: Array.from(document.querySelectorAll('[data-hw-nav]')),
  navButtons: Array.from(document.querySelectorAll('[data-nav-category]')),
  tabButtons: Array.from(document.querySelectorAll('[data-category]')),
  homeworkView: document.getElementById('homework-view'),
  arcadeView: document.getElementById('arcade-view'),
  hwMetricTotal: document.getElementById('hw-metric-total'),
  hwMetricDone: document.getElementById('hw-metric-done'),
  hwStartDrillBtn: document.getElementById('hw-start-drill-btn'),
  hwGradeButtons: Array.from(document.querySelectorAll('[data-hw-grade]')),
  hwTabButtons: Array.from(document.querySelectorAll('[data-hw-subject]')),
  hwSearchInput: document.getElementById('hw-search-input'),
  hwThemeToggleBtn: document.getElementById('hw-theme-toggle-btn'),
  hwGrid: document.getElementById('hw-grid'),
  hwStatus: document.getElementById('hw-status'),
  practiceMeta: document.getElementById('practice-meta'),
  practiceScore: document.getElementById('practice-score'),
  practiceQuestion: document.getElementById('practice-question'),
  practiceOptions: document.getElementById('practice-options'),
  practiceFeedback: document.getElementById('practice-feedback'),
  practiceNextBtn: document.getElementById('practice-next-btn'),
  hwModal: document.getElementById('hw-modal'),
  hwModalKicker: document.getElementById('hw-modal-kicker'),
  hwModalTitle: document.getElementById('hw-modal-title'),
  hwModalSummary: document.getElementById('hw-modal-summary'),
  hwModalPoints: document.getElementById('hw-modal-points'),
  hwModalToggleBtn: document.getElementById('hw-modal-toggle-btn'),
  hwModalCloseBtn: document.getElementById('hw-modal-close-btn'),
  footerTagline: document.getElementById('footer-tagline'),
  unlockGamesBtn: document.getElementById('unlock-games-btn'),
  lockGamesBtn: document.getElementById('lock-games-btn'),
  backToHwBtn: document.getElementById('back-to-hw-btn'),
  achievementsBtn: document.getElementById('achievements-btn'),
  bannerPlayerName: document.getElementById('banner-player-name'),
  bannerCoins: document.getElementById('banner-coins'),
  bannerThemesBtn: document.getElementById('banner-themes-btn'),
  bannerAchievementsBtn: document.getElementById('banner-achievements-btn'),
  passcodeModal: document.getElementById('passcode-modal'),
  passcodeForm: document.getElementById('passcode-form'),
  passcodeInput: document.getElementById('passcode-input'),
  passcodeError: document.getElementById('passcode-error'),
  passcodeCloseBtn: document.getElementById('passcode-close-btn'),
  passcodeCancelBtn: document.getElementById('passcode-cancel-btn'),
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
  accountStatCoins: document.getElementById('account-stat-coins'),
  accountStatSaved: document.getElementById('account-stat-saved'),
  accountStatPlays: document.getElementById('account-stat-plays'),
  accountStatAch: document.getElementById('account-stat-ach'),
  accountSyncStatus: document.getElementById('account-sync-status'),
  accountOpenThemesBtn: document.getElementById('account-open-themes-btn'),
  accountThemesList: document.getElementById('account-themes-list'),
  achievementsList: document.getElementById('achievements-list'),
  achievementsGuestList: document.getElementById('achievements-guest-list'),
  clearFlairBtn: document.getElementById('clear-flair-btn'),
  themeModal: document.getElementById('theme-modal'),
  themeModalCoins: document.getElementById('theme-modal-coins'),
  themeModalCloseBtn: document.getElementById('theme-modal-close-btn'),
  themeStudioGrid: document.getElementById('theme-studio-grid'),
  achievementToast: document.getElementById('achievement-toast'),
  toastTitle: document.getElementById('toast-title'),
  toastDesc: document.getElementById('toast-desc'),
  toastEquipBtn: document.getElementById('toast-equip-btn'),
  toastDismissBtn: document.getElementById('toast-dismiss-btn'),
  searchInput: document.getElementById('search-input'),
  sortSelect: document.getElementById('sort-select'),
  gamesGrid: document.getElementById('games-grid'),
  gamesStatus: document.getElementById('games-status'),
  metricTotal: document.getElementById('metric-total'),
  metricCategories: document.getElementById('metric-categories'),
  metricSaved: document.getElementById('metric-saved'),
  featuredCard: document.getElementById('featured-card'),
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
  playerCoinsIndicator: document.getElementById('player-coins-indicator'),
  playerTimer: document.getElementById('player-timer'),
  playerControlsTip: document.getElementById('player-controls-tip'),
  iframeStage: document.getElementById('iframe-stage'),
  iframeMount: document.getElementById('iframe-mount'),
  crtFxBtn: document.getElementById('crt-fx-btn'),
  frameGlowBtn: document.getElementById('frame-glow-btn'),
  playerQuickSwitch: document.getElementById('player-quick-switch'),
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

  try {
    const savedHwDone = JSON.parse(localStorage.getItem(HW_DONE_KEY) || '[]');
    if (Array.isArray(savedHwDone)) {
      state.hwDone = new Set(savedHwDone.filter((id) => typeof id === 'string'));
    }
  } catch {
    state.hwDone = new Set();
  }

  const savedTheme = safeStorageGet(THEME_KEY);
  const resolvedTheme =
    savedTheme === 'light'
      ? 'daylight'
      : savedTheme === 'dark'
        ? 'obsidian'
        : THEMES.some((t) => t.id === savedTheme && t.cost === 0)
          ? savedTheme
          : 'obsidian';
  applyTheme(resolvedTheme);

  state.crtFx = safeStorageGet(CRT_FX_KEY) === '1';
  applyCrtFx();

  const savedGlow = safeStorageGet(FRAME_GLOW_KEY);
  const glowIdx = GLOW_MODES.indexOf(savedGlow);
  state.frameGlowIndex = glowIdx >= 0 ? glowIdx : 0;
  applyFrameGlow();
}

function getThemeDef(themeId) {
  return THEMES.find((t) => t.id === themeId) || THEMES[0];
}

function isThemeOwned(themeId) {
  const def = getThemeDef(themeId);
  if (def.cost === 0) return true;
  return Boolean(state.user && state.unlockedThemes.has(themeId));
}

function applyTheme(themeId) {
  const def = getThemeDef(themeId);
  const validId = isThemeOwned(def.id) ? def.id : 'obsidian';
  state.themeId = validId;
  document.documentElement.dataset.theme = validId;
  document.documentElement.classList.toggle('light-theme', validId === 'daylight');
  safeStorageSet(THEME_KEY, validId);
  const activeDef = getThemeDef(validId);
  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.textContent = `Theme: ${activeDef.name}`;
  }
  if (elements.hwThemeToggleBtn) {
    elements.hwThemeToggleBtn.textContent = `Theme: ${activeDef.name}`;
  }
  renderThemeStudio();
}

function applyCrtFx() {
  if (elements.iframeStage) {
    elements.iframeStage.classList.toggle('is-crt', state.crtFx);
  }
  if (elements.crtFxBtn) {
    elements.crtFxBtn.classList.toggle('is-active', state.crtFx);
    elements.crtFxBtn.setAttribute('aria-pressed', String(state.crtFx));
    elements.crtFxBtn.textContent = state.crtFx ? 'CRT FX: On' : 'CRT FX';
  }
}

function toggleCrtFx() {
  state.crtFx = !state.crtFx;
  safeStorageSet(CRT_FX_KEY, state.crtFx ? '1' : '0');
  applyCrtFx();
}

function applyFrameGlow() {
  const mode = GLOW_MODES[state.frameGlowIndex % GLOW_MODES.length] || 'amber';
  if (elements.iframeStage) {
    elements.iframeStage.dataset.glow = mode;
  }
  if (elements.frameGlowBtn) {
    const label = mode.charAt(0).toUpperCase() + mode.slice(1);
    elements.frameGlowBtn.textContent = `Glow: ${label}`;
  }
}

function cycleFrameGlow() {
  state.frameGlowIndex = (state.frameGlowIndex + 1) % GLOW_MODES.length;
  const mode = GLOW_MODES[state.frameGlowIndex];
  safeStorageSet(FRAME_GLOW_KEY, mode);
  applyFrameGlow();
}

function renderCoinDisplays() {
  const coinText = `${state.coins} Coins`;
  if (elements.headerCoinsValue) {
    elements.headerCoinsValue.textContent = state.user ? coinText : '0 Coins';
  }
  if (elements.bannerCoins) {
    elements.bannerCoins.textContent = state.user ? coinText : 'Sign in for Coins';
  }
  if (elements.themeModalCoins) {
    elements.themeModalCoins.textContent = state.user ? coinText : 'Sign in to earn Coins';
  }
  if (elements.accountStatCoins) {
    elements.accountStatCoins.textContent = String(state.coins);
  }
  if (elements.playerCoinsIndicator) {
    elements.playerCoinsIndicator.textContent = state.user
      ? `${state.coins} Coins (+25/play)`
      : 'Sign in for +25 Coins';
  }
}

function awardCoins(amount, { evaluate = true } = {}) {
  if (!state.user || amount <= 0) return;
  state.coins = Math.min(1000000, state.coins + amount);
  state.lifetimeCoins = Math.min(1000000, Math.max(state.coins, state.lifetimeCoins + amount));
  renderCoinDisplays();
  if (evaluate) {
    evaluateAchievements({ notify: true });
  }
}

function persistLocalArcadeState() {
  safeStorageSet(FAVORITES_KEY, JSON.stringify(Array.from(state.favorites)));
  safeStorageSet(RECENT_GAMES_KEY, JSON.stringify(state.recentIds));
  safeStorageSet(PLAY_COUNTS_KEY, JSON.stringify(state.playCounts));
}

async function persistArcadeState() {
  persistLocalArcadeState();
  renderCoinDisplays();
  renderAccountModalContent();
  renderThemeStudio();
  renderAuthButton();
  renderPlayerBanner();
  if (!state.user) return;
  try {
    const fb = await getFirebaseModule();
    const safeEquipped =
      state.equippedFlair && state.achievements.has(state.equippedFlair)
        ? state.equippedFlair
        : '';
    await fb.syncUserArcadeData(state.user.uid, {
      favorites: Array.from(state.favorites),
      recentIds: state.recentIds,
      playCounts: state.playCounts,
      achievements: Array.from(state.achievements),
      equippedFlair: safeEquipped,
      coins: state.coins,
      lifetimeCoins: state.lifetimeCoins,
      unlockedThemes: Array.from(state.unlockedThemes),
      equippedTheme: state.themeId,
      hwDone: Array.from(state.hwDone),
      quizCorrect: state.quizCorrect,
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
      elements.accountSyncError.textContent =
        err?.message || 'Cloud sync unavailable right now.';
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

  if (state.user) {
    awardCoins(25, { evaluate: false });
    evaluateAchievements({ notify: true });
  }
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
  elements.featuredMeta.textContent = `Featured · ${game.category} · ${game.difficulty || 'Medium'} · ${idx + 1} / ${all.length}`;

  if (elements.heroLead) {
    const leadTitle = document.createElement('strong');
    leadTitle.textContent = `${game.title}: `;
    const leadDesc = document.createTextNode(
      `${game.description || 'Play directly in your browser.'} (${game.difficulty || 'Standard'} · ${game.estimatedTime || '5–10 min'} · ${game.players || '1 Player'})`
    );
    elements.heroLead.replaceChildren(leadTitle, leadDesc);
  }

  if (game.thumbnail && isSafeIframeUrl(game.thumbnail)) {
    elements.featuredImg.dataset.fb = '';
    elements.featuredImg.style.opacity = '1';
    elements.featuredImg.onerror = () => {
      if (!elements.featuredImg.dataset.fb && game.thumbnail.startsWith('./assets/')) {
        elements.featuredImg.dataset.fb = '1';
        elements.featuredImg.src = `./public/${game.thumbnail.slice(2)}`;
      } else {
        elements.featuredImg.style.opacity = '0';
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
  if (state.user) {
    evaluateAchievements({ notify: true });
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

function renderQuickSwitchBar() {
  if (!elements.playerQuickSwitch) return;
  const all = getAllGames();
  const fragment = document.createDocumentFragment();

  const label = document.createElement('span');
  label.className = 'quick-switch-label';
  label.textContent = 'Quick Switch:';
  fragment.appendChild(label);

  all.forEach((game) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = game.id === state.currentGameId ? 'quick-switch-btn is-current' : 'quick-switch-btn';

    if (game.thumbnail && isSafeIframeUrl(game.thumbnail)) {
      const thumb = document.createElement('img');
      thumb.className = 'quick-switch-thumb';
      thumb.src = game.thumbnail;
      thumb.alt = '';
      thumb.loading = 'lazy';
      thumb.referrerPolicy = 'no-referrer';
      thumb.addEventListener('error', () => {
        if (!thumb.dataset.fb && game.thumbnail.startsWith('./assets/')) {
          thumb.dataset.fb = '1';
          thumb.src = `./public/${game.thumbnail.slice(2)}`;
        } else {
          thumb.remove();
        }
      });
      btn.appendChild(thumb);
    }

    const titleSpan = document.createElement('span');
    titleSpan.textContent = game.title;
    btn.appendChild(titleSpan);

    btn.addEventListener('click', () => {
      if (game.id !== state.currentGameId) {
        launchGame(game.id);
      }
    });
    fragment.appendChild(btn);
  });

  elements.playerQuickSwitch.replaceChildren(fragment);
}

function mountIframeWithOverlay(iframeEl, game) {
  const mountTarget = elements.iframeMount || elements.iframeStage;
  const overlay = document.createElement('div');
  overlay.className = 'iframe-loading';

  if (game.thumbnail && isSafeIframeUrl(game.thumbnail)) {
    const bg = document.createElement('div');
    bg.className = 'iframe-loading-bg';
    bg.style.backgroundImage = `url("${game.thumbnail}")`;
    overlay.appendChild(bg);
  }

  const titleEl = document.createElement('div');
  titleEl.className = 'iframe-loading-title';
  titleEl.textContent = `Launching ${game.title}...`;

  const hintEl = document.createElement('div');
  hintEl.className = 'iframe-loading-hint';
  hintEl.textContent = game.controls || 'Loading arcade frame';

  overlay.append(titleEl, hintEl);

  let cleared = false;
  const clearOverlay = () => {
    if (cleared) return;
    cleared = true;
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 240);
  };

  iframeEl.addEventListener('load', clearOverlay, { once: true });
  setTimeout(clearOverlay, 1600);

  mountTarget.replaceChildren(iframeEl, overlay);
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

  mountIframeWithOverlay(iframeEl, game);
  elements.playerSection.hidden = false;
  renderQuickSwitchBar();
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
  (elements.iframeMount || elements.iframeStage).replaceChildren();
  elements.playerSection.hidden = true;
  renderCatalog();
}

function reloadCurrentGame() {
  if (!state.currentGameId) return;
  const game = getAllGames().find((item) => item.id === state.currentGameId);
  if (!game) return;
  const iframeEl = createSafeIframeElement(game);
  if (!iframeEl) return;
  mountIframeWithOverlay(iframeEl, game);
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

function isMultiplayerGame(game) {
  if (!game) return false;
  if (game.category === 'Multiplayer') return true;
  const players = typeof game.players === 'string' ? game.players : '';
  return players.includes('2') || players.includes('Multi');
}

function getFilteredGames() {
  const query = state.searchQuery.trim().toLowerCase();
  const filtered = getAllGames().filter((game) => {
    const matchesCategory =
      state.activeCategory === 'All' ||
      (state.activeCategory === 'Favorites'
        ? state.favorites.has(game.id)
        : state.activeCategory === 'Multiplayer'
          ? isMultiplayerGame(game)
          : game.category === state.activeCategory);

    if (!matchesCategory) return false;
    if (!query) return true;

    const haystack = `${game.title} ${game.category} ${game.players || ''} ${game.difficulty || ''} ${game.description || ''}`.toLowerCase();
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
    const msg = document.createElement('span');
    msg.textContent =
      state.activeCategory === 'Favorites'
        ? 'No saved games yet. Click Save on any game card to pin it here.'
        : 'No matching games found for your current filter.';
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn-secondary';
    resetBtn.textContent = state.activeCategory === 'Favorites' ? 'Browse All Games' : 'Reset Filters';
    resetBtn.addEventListener('click', () => {
      state.searchQuery = '';
      if (elements.searchInput) elements.searchInput.value = '';
      setActiveCategory('All');
    });
    elements.gamesStatus.replaceChildren(msg, resetBtn);
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
  if (state.catalogGames.length === 0) {
    state.catalogGames = FALLBACK_GAMES;
    state.featuredIndex = 0;
    updateMetrics();
    renderFeaturedSpotlight();
    renderRecentStrip();
    renderCatalog();
  }

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
    const parsed = data
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
    if (parsed.length > 0) {
      state.catalogGames = parsed;
      state.featuredIndex = 0;
      updateMetrics();
      renderFeaturedSpotlight();
      renderRecentStrip();
      renderCatalog();
    }
  } catch (err) {
    console.warn('Using built-in game catalog:', err);
  }
}

function getTotalLaunchCount() {
  return Object.values(state.playCounts).reduce((sum, n) => sum + (Number(n) || 0), 0);
}

function getAchievementMetrics() {
  const allGames = getAllGames();
  const byId = new Map(allGames.map((g) => [g.id, g]));
  let totalPlays = 0;
  let distinctPlayed = 0;
  const playedCategories = {
    Sandbox: 0,
    Arcade: 0,
    Puzzle: 0,
    Action: 0,
    Multiplayer: 0,
  };

  for (const [id, rawCount] of Object.entries(state.playCounts)) {
    const count = Number(rawCount) || 0;
    if (count > 0) {
      totalPlays += count;
      distinctPlayed += 1;
      const game = byId.get(id);
      if (game) {
        if (game.category && Object.prototype.hasOwnProperty.call(playedCategories, game.category)) {
          playedCategories[game.category] += 1;
        }
        if (game.category !== 'Multiplayer' && isMultiplayerGame(game)) {
          playedCategories.Multiplayer += 1;
        }
      }
    }
  }

  return {
    totalPlays,
    distinctPlayed,
    playedCategories,
    favoritesCount: state.favorites.size,
    lifetimeCoins: state.lifetimeCoins,
    unlockedThemesCount: state.unlockedThemes.size,
    hwDoneCount: state.hwDone.size,
    quizCorrect: state.quizCorrect,
  };
}

function getAchievementById(achId) {
  return ACHIEVEMENTS.find((a) => a.id === achId) || null;
}

function renderStyledName(container, rawName, flairId, showTag = true) {
  if (!container) return;
  const ach = flairId ? getAchievementById(flairId) : null;
  if (!ach) {
    container.textContent = rawName;
    return;
  }

  const wrap = document.createElement('span');
  wrap.className = 'styled-name-wrap';

  const nameSpan = document.createElement('span');
  nameSpan.className = `flair-name ${ach.flairClass}`;
  nameSpan.textContent = rawName;
  wrap.appendChild(nameSpan);

  if (showTag) {
    const tagSpan = document.createElement('span');
    tagSpan.className = `flair-tag ${ach.tagClass}`;
    tagSpan.textContent = ach.tag;
    wrap.appendChild(tagSpan);
  }

  container.replaceChildren(wrap);
}

function dismissAchievementToast() {
  clearTimeout(state.toastTimerId);
  state.toastTimerId = null;
  state.toastAchId = null;
  if (elements.achievementToast) {
    elements.achievementToast.hidden = true;
  }
}

function showAchievementToast(ach) {
  if (!ach || !elements.achievementToast || !state.user) return;
  state.toastAchId = ach.id;
  if (elements.toastTitle) {
    elements.toastTitle.textContent = `${ach.title} (${ach.tag})`;
  }
  if (elements.toastDesc) {
    elements.toastDesc.textContent = `+50 Coins & "${ach.tag}" name style! ${ach.description}`;
  }
  if (elements.toastEquipBtn) {
    const alreadyEquipped = state.equippedFlair === ach.id;
    elements.toastEquipBtn.textContent = alreadyEquipped ? 'Equipped!' : 'Equip on Name';
    elements.toastEquipBtn.disabled = alreadyEquipped;
  }
  elements.achievementToast.hidden = false;
  clearTimeout(state.toastTimerId);
  state.toastTimerId = setTimeout(() => {
    dismissAchievementToast();
  }, 8500);
}

function evaluateAchievements({ notify = false } = {}) {
  if (!state.user) return [];
  const metrics = getAchievementMetrics();
  const newlyUnlocked = [];

  for (const ach of ACHIEVEMENTS) {
    if (!state.achievements.has(ach.id) && ach.check(metrics)) {
      state.achievements.add(ach.id);
      newlyUnlocked.push(ach);
    }
  }

  if (newlyUnlocked.length > 0) {
    awardCoins(newlyUnlocked.length * 50, { evaluate: false });
    const coinAch = getAchievementById('coin-collector');
    if (coinAch && !state.achievements.has(coinAch.id) && coinAch.check(getAchievementMetrics())) {
      state.achievements.add(coinAch.id);
      newlyUnlocked.push(coinAch);
      awardCoins(50, { evaluate: false });
    }
    if (notify) {
      showAchievementToast(newlyUnlocked[newlyUnlocked.length - 1]);
    }
  }
  return newlyUnlocked;
}

function equipNameFlair(achId) {
  if (!state.user) {
    openAccountModal();
    return;
  }
  if (achId && !state.achievements.has(achId)) {
    return;
  }
  state.equippedFlair = achId || '';
  renderAuthButton();
  renderPlayerBanner();
  renderAccountModalContent();
  void persistArcadeState();
}

function renderPlayerBanner() {
  if (!elements.bannerPlayerName) return;
  if (!state.user) {
    elements.bannerPlayerName.textContent = 'Guest (Sign in to earn cool name styles)';
    if (elements.bannerAchievementsBtn) {
      elements.bannerAchievementsBtn.textContent = 'Sign In for Achievements';
    }
    return;
  }

  const displayName =
    state.accountDoc?.displayName ||
    state.user.displayName ||
    state.user.email?.split('@')[0] ||
    'Player';
  const activeFlair = state.achievements.has(state.equippedFlair) ? state.equippedFlair : '';
  renderStyledName(elements.bannerPlayerName, displayName, activeFlair, true);
  if (elements.bannerAchievementsBtn) {
    elements.bannerAchievementsBtn.textContent = `Achievements (${state.achievements.size}/${ACHIEVEMENTS.length})`;
  }
}

function renderAchievementGrid(container, { signedIn, sampleName }) {
  if (!container) return;
  const fragment = document.createDocumentFragment();

  ACHIEVEMENTS.forEach((ach) => {
    const unlocked = signedIn && state.achievements.has(ach.id);
    const equipped = unlocked && state.equippedFlair === ach.id;

    const card = document.createElement('div');
    card.className = equipped
      ? 'ach-card is-unlocked is-equipped'
      : unlocked
        ? 'ach-card is-unlocked'
        : 'ach-card is-locked';

    const top = document.createElement('div');
    top.className = 'ach-card-top';

    const head = document.createElement('div');
    head.className = 'ach-card-head';

    const title = document.createElement('span');
    title.className = 'ach-title';
    title.textContent = ach.title;

    const stateLabel = document.createElement('span');
    stateLabel.className = 'ach-state-text';
    stateLabel.textContent = !signedIn
      ? 'Sign in required'
      : equipped
        ? 'Equipped ✓'
        : unlocked
          ? 'Unlocked'
          : 'Locked';

    head.append(title, stateLabel);

    const desc = document.createElement('p');
    desc.className = 'ach-desc';
    desc.textContent = ach.description;

    top.append(head, desc);

    const previewRow = document.createElement('div');
    previewRow.className = 'ach-preview-row';

    const sampleWrap = document.createElement('span');
    sampleWrap.className = 'ach-sample-wrap';
    renderStyledName(sampleWrap, sampleName, ach.id, true);
    previewRow.appendChild(sampleWrap);

    if (signedIn && unlocked) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = equipped ? 'btn-secondary is-active ach-equip-btn' : 'btn-primary ach-equip-btn';
      btn.textContent = equipped ? 'Unequip' : 'Equip';
      btn.addEventListener('click', () => {
        equipNameFlair(equipped ? '' : ach.id);
      });
      previewRow.appendChild(btn);
    }

    card.append(top, previewRow);
    fragment.appendChild(card);
  });

  container.replaceChildren(fragment);
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
  const activeFlair = state.achievements.has(state.equippedFlair) ? state.equippedFlair : '';

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
  renderStyledName(label, shortName, activeFlair, Boolean(activeFlair));
  fragment.appendChild(label);
  elements.authBtn.replaceChildren(fragment);
}

function renderAccountModalContent() {
  if (!elements.accountModal) return;

  if (!state.user) {
    elements.accountSignedOut.hidden = false;
    elements.accountSignedIn.hidden = true;
    renderAchievementGrid(elements.achievementsGuestList, {
      signedIn: false,
      sampleName: 'PlayerName',
    });
    return;
  }

  elements.accountSignedOut.hidden = true;
  elements.accountSignedIn.hidden = false;

  const displayName =
    state.accountDoc?.displayName ||
    state.user.displayName ||
    state.user.email?.split('@')[0] ||
    'Player';
  const shortSample = displayName.split(' ')[0].slice(0, 14) || 'Player';
  const email = state.accountDoc?.email || state.user.email || '';
  const photoUrl = state.accountDoc?.photoURL || state.user.photoURL || '';
  const initial = displayName.trim().charAt(0).toUpperCase() || 'P';
  const activeFlair = state.achievements.has(state.equippedFlair) ? state.equippedFlair : '';

  renderStyledName(elements.accountName, displayName, activeFlair, true);
  elements.accountEmail.textContent = email;
  elements.accountCreated.textContent = formatCreatedDate(state.accountDoc?.createdAt);
  elements.accountStatSaved.textContent = String(state.favorites.size);
  elements.accountStatPlays.textContent = String(getTotalLaunchCount());
  if (elements.accountStatAch) {
    elements.accountStatAch.textContent = `${state.achievements.size} / ${ACHIEVEMENTS.length}`;
  }
  if (elements.clearFlairBtn) {
    elements.clearFlairBtn.hidden = !activeFlair;
  }

  renderAchievementGrid(elements.achievementsList, {
    signedIn: true,
    sampleName: shortSample,
  });

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

function selectOrBuyTheme(themeId) {
  const def = getThemeDef(themeId);
  if (def.cost === 0 || (state.user && state.unlockedThemes.has(def.id))) {
    applyTheme(def.id);
    if (state.user) void persistArcadeState();
    return;
  }

  if (!state.user) {
    closeThemeModal();
    openAccountModal();
    return;
  }

  if (state.coins < def.cost) {
    return;
  }

  state.coins -= def.cost;
  state.unlockedThemes.add(def.id);
  evaluateAchievements({ notify: true });
  applyTheme(def.id);
  void persistArcadeState();
}

function renderThemeStudio() {
  if (elements.themeStudioGrid) {
    const fragment = document.createDocumentFragment();
    THEMES.forEach((t) => {
      const owned = isThemeOwned(t.id);
      const equipped = state.themeId === t.id;
      const canAfford = Boolean(state.user && state.coins >= t.cost);

      const card = document.createElement('div');
      card.className = equipped ? 'theme-card is-equipped' : 'theme-card';

      const top = document.createElement('div');
      top.className = 'theme-card-top';

      const titleGroup = document.createElement('div');
      titleGroup.className = 'theme-card-title-group';

      const swatch = document.createElement('span');
      swatch.className = 'theme-swatch';
      swatch.style.background = t.swatch;

      const name = document.createElement('span');
      name.className = 'theme-card-name';
      name.textContent = t.name;

      titleGroup.append(swatch, name);

      const cost = document.createElement('span');
      cost.className = 'theme-card-cost tabular-nums';
      cost.textContent = t.cost === 0 ? 'Free Starter' : owned ? 'Owned' : `${t.cost} Coins`;

      top.append(titleGroup, cost);

      const desc = document.createElement('p');
      desc.className = 'theme-card-desc';
      desc.textContent = t.description;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = equipped ? 'btn-secondary is-active' : owned || canAfford ? 'btn-primary' : 'btn-secondary';

      if (equipped) {
        btn.textContent = 'Equipped ✓';
        btn.disabled = true;
      } else if (owned) {
        btn.textContent = 'Apply Theme';
      } else if (!state.user) {
        btn.textContent = `Sign In (${t.cost} Coins)`;
      } else if (canAfford) {
        btn.textContent = `Unlock (${t.cost} Coins)`;
      } else {
        btn.textContent = `Need ${t.cost - state.coins} more Coins`;
        btn.disabled = true;
      }

      btn.addEventListener('click', () => selectOrBuyTheme(t.id));
      card.append(top, desc, btn);
      fragment.appendChild(card);
    });
    elements.themeStudioGrid.replaceChildren(fragment);
  }

  if (elements.accountThemesList) {
    const miniFrag = document.createDocumentFragment();
    THEMES.forEach((t) => {
      const owned = isThemeOwned(t.id);
      const equipped = state.themeId === t.id;
      const canAfford = Boolean(state.user && state.coins >= t.cost);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = equipped ? 'theme-mini-btn is-equipped' : 'theme-mini-btn';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = t.name;

      const statusSpan = document.createElement('span');
      statusSpan.className = 'tabular-nums';
      statusSpan.textContent = equipped ? 'Active' : owned ? 'Use' : `${t.cost}c`;

      if (!owned && !canAfford) {
        btn.disabled = true;
      }
      btn.append(nameSpan, statusSpan);
      btn.addEventListener('click', () => selectOrBuyTheme(t.id));
      miniFrag.appendChild(btn);
    });
    elements.accountThemesList.replaceChildren(miniFrag);
  }
}

function openThemeModal() {
  if (!elements.themeModal) return;
  renderCoinDisplays();
  renderThemeStudio();
  elements.themeModal.hidden = false;
  elements.themeModalCloseBtn?.focus();
}

function closeThemeModal() {
  if (!elements.themeModal) return;
  elements.themeModal.hidden = true;
}

function applyCloudAccountData(account) {
  if (!account) return;
  state.accountDoc = account;
  state.favorites = new Set(sanitizeIdArray(account.favorites || [], 50));
  state.recentIds = sanitizeIdArray(account.recentIds || [], 6);
  state.playCounts = sanitizePlayCounts(account.playCounts || {});
  state.achievements = new Set(sanitizeIdArray(account.achievements || [], 30));
  state.coins = Math.max(0, Math.floor(Number(account.coins) || 0));
  state.lifetimeCoins = Math.max(state.coins, Math.floor(Number(account.lifetimeCoins) || 0));
  state.unlockedThemes = new Set(sanitizeIdArray(account.unlockedThemes || [], 20));
  state.quizCorrect = Math.max(0, Math.floor(Number(account.quizCorrect) || 0));

  const cloudHwDone = sanitizeIdArray(account.hwDone || [], 50);
  state.hwDone = new Set([...Array.from(state.hwDone), ...cloudHwDone]);
  cloudHwDone.forEach((id) => state.rewardedHwIds.add(id));
  safeStorageSet(HW_DONE_KEY, JSON.stringify(Array.from(state.hwDone)));

  const rawFlair = typeof account.equippedFlair === 'string' ? account.equippedFlair.trim() : '';
  state.equippedFlair = rawFlair && state.achievements.has(rawFlair) ? rawFlair : '';

  const cloudTheme = typeof account.equippedTheme === 'string' ? account.equippedTheme.trim() : '';
  if (cloudTheme && isThemeOwned(cloudTheme)) {
    applyTheme(cloudTheme);
  }

  const newlyUnlocked = state.user ? evaluateAchievements({ notify: true }) : [];

  persistLocalArcadeState();
  updateMetrics();
  updateHomeworkMetrics();
  renderRecentStrip();
  syncPlayerFavoriteButton();
  syncPreviewFavoriteButton();
  renderCatalog();
  renderHomeworkGrid();
  renderCoinDisplays();
  renderThemeStudio();
  renderAuthButton();
  renderPlayerBanner();
  renderAccountModalContent();

  if (newlyUnlocked.length > 0 && state.user) {
    void persistArcadeState();
  }
}

async function initFirebaseAuth() {
  try {
    const fb = await getFirebaseModule();
    fb.observeAuth(async (user) => {
      if (state.unsubscribeAccount) {
        state.unsubscribeAccount();
        state.unsubscribeAccount = null;
      }

      state.user = user || null;
      if (!user) {
        state.accountDoc = null;
        state.achievements = new Set();
        state.equippedFlair = '';
        state.coins = 0;
        state.lifetimeCoins = 0;
        state.unlockedThemes = new Set();
        state.quizCorrect = 0;
        state.rewardedHwIds = new Set();
        if (!isThemeOwned(state.themeId)) {
          applyTheme('obsidian');
        }
        dismissAchievementToast();
        renderCoinDisplays();
        renderThemeStudio();
        renderAuthButton();
        renderPlayerBanner();
        renderAccountModalContent();
        return;
      }

      renderAuthButton();
      renderPlayerBanner();
      renderCoinDisplays();
      if (elements.accountSyncStatus) {
        elements.accountSyncStatus.textContent = 'Syncing...';
      }

      try {
        const result = await fb.ensureUserAccount(user, {
          favorites: Array.from(state.favorites),
          recentIds: state.recentIds,
          playCounts: state.playCounts,
          hwDone: Array.from(state.hwDone),
        });
        applyCloudAccountData(result.account);
        if (elements.accountSyncStatus) {
          elements.accountSyncStatus.textContent = 'Active';
        }
        if (elements.accountSyncError) {
          elements.accountSyncError.hidden = true;
        }

        state.unsubscribeAccount = fb.subscribeToUserAccount(
          user.uid,
          (docData) => {
            applyCloudAccountData(docData);
          },
          (err) => {
            if (elements.accountSyncStatus) {
              elements.accountSyncStatus.textContent = 'Error';
            }
            if (elements.accountSyncError) {
              elements.accountSyncError.textContent = fb.getFriendlyFirebaseError(err);
              elements.accountSyncError.hidden = false;
            }
          }
        );
      } catch (err) {
        if (elements.accountSyncStatus) {
          elements.accountSyncStatus.textContent = 'Local only';
        }
        if (elements.accountSyncError) {
          elements.accountSyncError.textContent = fb.getFriendlyFirebaseError(err);
          elements.accountSyncError.hidden = false;
        }
        if (elements.accountError) {
          elements.accountError.textContent = fb.getFriendlyFirebaseError(err);
          elements.accountError.hidden = false;
        }
      }
    });
  } catch (err) {
    console.warn('Account service unavailable:', err);
  }
}

function setArcadeUnlocked(unlocked) {
  state.arcadeUnlocked = Boolean(unlocked);
  if (elements.homeworkView) elements.homeworkView.hidden = state.arcadeUnlocked;
  if (elements.arcadeView) elements.arcadeView.hidden = !state.arcadeUnlocked;
  if (elements.hwNav) elements.hwNav.hidden = state.arcadeUnlocked;
  if (elements.arcadeNav) elements.arcadeNav.hidden = !state.arcadeUnlocked;
  if (elements.unlockGamesBtn) elements.unlockGamesBtn.hidden = state.arcadeUnlocked;
  if (elements.lockGamesBtn) elements.lockGamesBtn.hidden = !state.arcadeUnlocked;
  if (elements.footerTagline) {
    elements.footerTagline.textContent = state.arcadeUnlocked
      ? 'Unblocked Browser Arcade'
      : 'Student Study Workspace';
  }

  if (!state.arcadeUnlocked) {
    closePlayer();
    closeGamePreview();
  } else {
    renderFeaturedSpotlight();
    renderRecentStrip();
    renderCatalog();
  }
  window.scrollTo?.({ top: 0, behavior: 'smooth' });
}

function openPasscodeModal() {
  if (!elements.passcodeModal) return;
  if (elements.passcodeInput) elements.passcodeInput.value = '';
  if (elements.passcodeError) {
    elements.passcodeError.hidden = true;
    elements.passcodeError.textContent = '';
  }
  elements.passcodeModal.hidden = false;
  elements.passcodeInput?.focus();
}

function closePasscodeModal() {
  if (!elements.passcodeModal) return;
  elements.passcodeModal.hidden = true;
}

function formatGradeLabel(grade) {
  return grade === 'All' ? 'All Grades' : `${grade} Grade`;
}

function updateHomeworkMetrics() {
  if (elements.hwMetricTotal) {
    elements.hwMetricTotal.textContent = String(HOMEWORK_ASSIGNMENTS.length);
  }
  if (elements.hwMetricDone) {
    elements.hwMetricDone.textContent = String(state.hwDone.size);
  }
}

function syncHomeworkNavUI() {
  elements.hwNavButtons.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.hwNav === state.hwSubject);
  });
  elements.hwTabButtons.forEach((btn) => {
    const match = btn.dataset.hwSubject === state.hwSubject;
    btn.classList.toggle('is-active', match);
    btn.setAttribute('aria-selected', String(match));
  });
  elements.hwGradeButtons.forEach((btn) => {
    const match = btn.dataset.hwGrade === state.hwGrade;
    btn.classList.toggle('is-active', match);
    btn.setAttribute('aria-selected', String(match));
  });
}

function toggleHomeworkDone(assignmentId) {
  const markingDone = !state.hwDone.has(assignmentId);
  if (markingDone) {
    state.hwDone.add(assignmentId);
    if (state.user && !state.rewardedHwIds.has(assignmentId)) {
      state.rewardedHwIds.add(assignmentId);
      awardCoins(15, { evaluate: false });
    }
  } else {
    state.hwDone.delete(assignmentId);
  }
  safeStorageSet(HW_DONE_KEY, JSON.stringify(Array.from(state.hwDone)));
  if (state.user) {
    evaluateAchievements({ notify: true });
    void persistArcadeState();
  }
  updateHomeworkMetrics();
  renderHomeworkGrid();
  if (state.hwModalId === assignmentId && elements.hwModalToggleBtn) {
    const done = state.hwDone.has(assignmentId);
    elements.hwModalToggleBtn.textContent = done ? 'Completed' : 'Mark Complete';
  }
}

function openHomeworkNotes(assignmentId) {
  const item = HOMEWORK_ASSIGNMENTS.find((a) => a.id === assignmentId);
  if (!item || !elements.hwModal) return;
  state.hwModalId = item.id;
  elements.hwModalKicker.textContent = `${formatGradeLabel(item.grade)} · ${item.subject} · ${item.due} · ${item.duration}`;
  elements.hwModalTitle.textContent = item.title;
  elements.hwModalSummary.textContent = item.summary;

  const fragment = document.createDocumentFragment();
  item.notes.forEach((note) => {
    const li = document.createElement('li');
    li.textContent = note;
    fragment.appendChild(li);
  });
  elements.hwModalPoints.replaceChildren(fragment);

  const done = state.hwDone.has(item.id);
  elements.hwModalToggleBtn.textContent = done ? 'Completed' : 'Mark Complete';
  elements.hwModal.hidden = false;
  elements.hwModalCloseBtn.focus();
}

function closeHomeworkNotes() {
  state.hwModalId = null;
  if (elements.hwModal) elements.hwModal.hidden = true;
}

function renderHomeworkGrid() {
  if (!elements.hwGrid) return;
  const q = state.hwSearch.trim().toLowerCase();
  const filtered = HOMEWORK_ASSIGNMENTS.filter((item) => {
    const matchGrade = state.hwGrade === 'All' || item.grade === state.hwGrade;
    const matchSubject = state.hwSubject === 'All' || item.subject === state.hwSubject;
    if (!matchGrade || !matchSubject) return false;
    if (!q) return true;
    return `${item.title} ${item.subject} ${formatGradeLabel(item.grade)} ${item.description}`.toLowerCase().includes(q);
  });

  elements.hwGrid.replaceChildren();
  if (filtered.length === 0) {
    if (elements.hwStatus) {
      elements.hwStatus.hidden = false;
      elements.hwStatus.textContent = 'No assignments match your current grade or subject filter.';
    }
    return;
  }

  if (elements.hwStatus) elements.hwStatus.hidden = true;
  const fragment = document.createDocumentFragment();
  filtered.forEach((item) => {
    const done = state.hwDone.has(item.id);
    const card = document.createElement('article');
    card.className = done ? 'game-card hw-card is-done' : 'game-card hw-card';
    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      openHomeworkNotes(item.id);
    });

    const body = document.createElement('div');
    body.className = 'card-body';

    const meta = document.createElement('div');
    meta.className = 'card-meta';
    meta.textContent = `${formatGradeLabel(item.grade)} · ${item.subject} · ${item.due} · ${item.duration}`;

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = item.title;

    const desc = document.createElement('p');
    desc.className = 'card-desc';
    desc.textContent = item.description;

    body.append(meta, title, desc);
    if (done) {
      const doneNote = document.createElement('span');
      doneNote.className = 'hw-card-status';
      doneNote.textContent = '✓ Completed';
      body.appendChild(doneNote);
    }

    const footer = document.createElement('div');
    footer.className = 'card-footer';

    const notesBtn = document.createElement('button');
    notesBtn.type = 'button';
    notesBtn.className = 'btn-primary card-play-btn';
    notesBtn.textContent = 'Study Notes';
    notesBtn.addEventListener('click', () => openHomeworkNotes(item.id));

    const doneBtn = document.createElement('button');
    doneBtn.type = 'button';
    doneBtn.className = done ? 'btn-secondary is-saved' : 'btn-secondary';
    doneBtn.textContent = done ? 'Done' : 'Complete';
    doneBtn.addEventListener('click', () => toggleHomeworkDone(item.id));

    footer.append(notesBtn, doneBtn);
    card.append(body, footer);
    fragment.appendChild(card);
  });

  elements.hwGrid.appendChild(fragment);
}

function getFilteredPracticeQuestions() {
  const byGrade =
    state.hwGrade === 'All'
      ? PRACTICE_QUESTIONS
      : PRACTICE_QUESTIONS.filter((q) => q.grade === state.hwGrade);
  const byBoth =
    state.hwSubject === 'All'
      ? byGrade
      : byGrade.filter((q) => q.subject === state.hwSubject);
  if (byBoth.length > 0) return byBoth;
  if (byGrade.length > 0) return byGrade;
  return PRACTICE_QUESTIONS;
}

function renderPracticeQuestion() {
  if (!elements.practiceQuestion || !elements.practiceOptions) return;
  const pool = getFilteredPracticeQuestions();
  const safeIdx = ((state.practiceIndex % pool.length) + pool.length) % pool.length;
  const q = pool[safeIdx];
  state.practiceAnswered = false;

  if (elements.practiceMeta) {
    elements.practiceMeta.textContent = `${q.subject} · ${formatGradeLabel(q.grade)} · Question ${safeIdx + 1} of ${pool.length}`;
  }
  if (elements.practiceScore) {
    elements.practiceScore.textContent = `Score: ${state.practiceCorrect} / ${state.practiceAttempts}`;
  }
  elements.practiceQuestion.textContent = q.question;
  if (elements.practiceFeedback) {
    elements.practiceFeedback.hidden = true;
    elements.practiceFeedback.className = 'practice-feedback';
    elements.practiceFeedback.textContent = '';
  }

  const fragment = document.createDocumentFragment();
  q.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'practice-option-btn';
    btn.textContent = optText;
    btn.addEventListener('click', () => handlePracticeChoice(idx));
    fragment.appendChild(btn);
  });
  elements.practiceOptions.replaceChildren(fragment);
}

function handlePracticeChoice(selectedIdx) {
  if (state.practiceAnswered) return;
  state.practiceAnswered = true;
  state.practiceAttempts += 1;

  const pool = getFilteredPracticeQuestions();
  const safeIdx = ((state.practiceIndex % pool.length) + pool.length) % pool.length;
  const q = pool[safeIdx];
  const isCorrect = selectedIdx === q.answerIndex;
  if (isCorrect) {
    state.practiceCorrect += 1;
    if (state.user) {
      state.quizCorrect += 1;
      awardCoins(10, { evaluate: false });
      evaluateAchievements({ notify: true });
      void persistArcadeState();
    }
  }

  const optionBtns = Array.from(elements.practiceOptions.children);
  optionBtns.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.answerIndex) {
      btn.classList.add('is-correct');
    } else if (idx === selectedIdx) {
      btn.classList.add('is-wrong');
    }
  });

  if (elements.practiceScore) {
    elements.practiceScore.textContent = `Score: ${state.practiceCorrect} / ${state.practiceAttempts}`;
  }
  if (elements.practiceFeedback) {
    elements.practiceFeedback.hidden = false;
    elements.practiceFeedback.className = isCorrect
      ? 'practice-feedback is-correct'
      : 'practice-feedback is-wrong';
    const coinNote = isCorrect && state.user ? ' (+10 Coins!) ' : ' ';
    elements.practiceFeedback.textContent = `${isCorrect ? '✓ Correct —' : '✕ Not quite —'}${coinNote}${q.explanation}`;
  }
}

function wireEvents() {
  elements.brandLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.arcadeUnlocked) {
      setActiveCategory('All');
      closePlayer();
    } else {
      state.hwGrade = 'All';
      state.hwSubject = 'All';
      state.practiceIndex = 0;
      syncHomeworkNavUI();
      renderHomeworkGrid();
      renderPracticeQuestion();
    }
  });

  elements.hwNavButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.hwSubject = btn.dataset.hwNav || 'All';
      state.practiceIndex = 0;
      syncHomeworkNavUI();
      renderHomeworkGrid();
      renderPracticeQuestion();
      elements.hwGrid?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  elements.hwGradeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.hwGrade = btn.dataset.hwGrade || 'All';
      state.practiceIndex = 0;
      syncHomeworkNavUI();
      renderHomeworkGrid();
      renderPracticeQuestion();
    });
  });

  elements.hwTabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.hwSubject = btn.dataset.hwSubject || 'All';
      state.practiceIndex = 0;
      syncHomeworkNavUI();
      renderHomeworkGrid();
      renderPracticeQuestion();
    });
  });

  elements.hwSearchInput?.addEventListener('input', (e) => {
    state.hwSearch = e.target.value;
    renderHomeworkGrid();
  });

  elements.hwThemeToggleBtn?.addEventListener('click', openThemeModal);
  elements.headerCoinsBtn?.addEventListener('click', openThemeModal);
  elements.bannerThemesBtn?.addEventListener('click', openThemeModal);
  elements.accountOpenThemesBtn?.addEventListener('click', () => {
    closeAccountModal();
    openThemeModal();
  });
  elements.themeModalCloseBtn?.addEventListener('click', closeThemeModal);
  elements.themeModal?.addEventListener('click', (e) => {
    if (e.target === elements.themeModal) closeThemeModal();
  });

  elements.hwStartDrillBtn?.addEventListener('click', () => {
    state.practiceIndex += 1;
    renderPracticeQuestion();
    elements.practiceOptions?.querySelector('button')?.focus();
  });

  elements.practiceNextBtn?.addEventListener('click', () => {
    state.practiceIndex += 1;
    renderPracticeQuestion();
  });

  elements.hwModalCloseBtn?.addEventListener('click', closeHomeworkNotes);
  elements.hwModalToggleBtn?.addEventListener('click', () => {
    if (state.hwModalId) toggleHomeworkDone(state.hwModalId);
  });
  elements.hwModal?.addEventListener('click', (e) => {
    if (e.target === elements.hwModal) closeHomeworkNotes();
  });

  elements.unlockGamesBtn?.addEventListener('click', openPasscodeModal);
  elements.lockGamesBtn?.addEventListener('click', () => setArcadeUnlocked(false));
  elements.backToHwBtn?.addEventListener('click', () => setArcadeUnlocked(false));

  elements.passcodeCloseBtn?.addEventListener('click', closePasscodeModal);
  elements.passcodeCancelBtn?.addEventListener('click', closePasscodeModal);
  elements.passcodeModal?.addEventListener('click', (e) => {
    if (e.target === elements.passcodeModal) closePasscodeModal();
  });

  elements.passcodeForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const entered = (elements.passcodeInput?.value || '').trim().toLowerCase();
    if (entered === ACCESS_CODE) {
      closePasscodeModal();
      setArcadeUnlocked(true);
      return;
    }
    if (elements.passcodeError) {
      elements.passcodeError.textContent = 'Incorrect code. Try again.';
      elements.passcodeError.hidden = false;
    }
    if (elements.passcodeInput) {
      elements.passcodeInput.focus();
      elements.passcodeInput.select();
    }
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
  elements.achievementsBtn?.addEventListener('click', openAccountModal);
  elements.bannerAchievementsBtn?.addEventListener('click', openAccountModal);
  elements.clearFlairBtn?.addEventListener('click', () => equipNameFlair(''));
  elements.toastDismissBtn?.addEventListener('click', dismissAchievementToast);
  elements.toastEquipBtn?.addEventListener('click', () => {
    if (state.toastAchId) {
      equipNameFlair(state.toastAchId);
      dismissAchievementToast();
    }
  });
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
      const fb = await getFirebaseModule();
      const cred = await fb.signInWithGoogle();
      if (cred?.user) {
        state.user = cred.user;
        renderAuthButton();
        renderAccountModalContent();
      }
    } catch (err) {
      let msg = 'Could not sign in right now. Please try again.';
      try {
        const fb = await getFirebaseModule();
        msg = fb.getFriendlyFirebaseError(err);
      } catch {
        msg = err?.message || msg;
      }
      if (elements.accountError) {
        elements.accountError.textContent = msg;
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
      const fb = await getFirebaseModule();
      await fb.signOutAccount();
      closeAccountModal();
    } catch (err) {
      let msg = 'Could not sign out right now.';
      try {
        const fb = await getFirebaseModule();
        msg = fb.getFriendlyFirebaseError(err);
      } catch {
        msg = err?.message || msg;
      }
      if (elements.accountSyncError) {
        elements.accountSyncError.textContent = msg;
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

  elements.featuredCard?.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    openFeaturedPreview();
  });

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

  elements.crtFxBtn?.addEventListener('click', toggleCrtFx);
  elements.frameGlowBtn?.addEventListener('click', cycleFrameGlow);
  elements.dimLightsBtn.addEventListener('click', () => setDimLights(!state.dimLights));
  elements.cinemaBackdrop.addEventListener('click', () => setDimLights(false));
  elements.theaterModeBtn.addEventListener('click', toggleWideTheater);
  elements.reloadGameBtn.addEventListener('click', reloadCurrentGame);
  elements.fullscreenGameBtn.addEventListener('click', toggleFullscreen);
  elements.closePlayerBtn.addEventListener('click', closePlayer);
  elements.themeToggleBtn.addEventListener('click', openThemeModal);

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
      if (elements.themeModal && !elements.themeModal.hidden) {
        closeThemeModal();
        return;
      }
      if (elements.passcodeModal && !elements.passcodeModal.hidden) {
        closePasscodeModal();
        return;
      }
      if (elements.hwModal && !elements.hwModal.hidden) {
        closeHomeworkNotes();
        return;
      }
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
      elements.accountModal.hidden &&
      (!elements.themeModal || elements.themeModal.hidden) &&
      (!elements.passcodeModal || elements.passcodeModal.hidden) &&
      (!elements.hwModal || elements.hwModal.hidden)
    ) {
      e.preventDefault();
      if (state.arcadeUnlocked) {
        elements.searchInput.focus();
      } else {
        elements.hwSearchInput?.focus();
      }
    }
  });
}

window.addEventListener('error', (event) => {
  if (elements.gamesGrid && elements.gamesGrid.children.length === 0 && elements.gamesStatus) {
    elements.gamesStatus.hidden = false;
    elements.gamesStatus.textContent = `App error: ${event.message || 'Unknown error'}`;
  }
});

try {
  loadLocalStorage();
} catch (err) {
  console.warn('Storage init failed:', err);
}

try {
  wireEvents();
} catch (err) {
  console.warn('Event wiring failed:', err);
}

try {
  renderCoinDisplays();
  renderThemeStudio();
  renderAuthButton();
  renderPlayerBanner();
} catch (err) {
  console.warn('Auth button render failed:', err);
}

updateHomeworkMetrics();
syncHomeworkNavUI();
renderPracticeQuestion();
renderHomeworkGrid();

state.catalogGames = FALLBACK_GAMES;
updateMetrics();
renderFeaturedSpotlight();
renderRecentStrip();
renderCatalog();
setArcadeUnlocked(false);

void loadGamesCatalog();
void initFirebaseAuth();
