import { Question } from '../types';

export const JUNIOR_QUESTIONS: Question[] = [
  // ==========================================
  // GRADE 6 EXTRA QUESTIONS
  // ==========================================
  // comp-g6-ch1: Computer Languages & Translators
  {
    id: 'q-comp-g6-2',
    subjectId: 'computers',
    gradeLevel: '6',
    chapterId: 'comp-g6-ch1',
    chapterTitle: 'Computer Languages & Translators',
    topic: 'Compiler vs Interpreter',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which language translator scans and converts the entire high-level source code into machine code in one single go before execution?',
    options: ['Compiler', 'Interpreter', 'Assembler', 'Loader'],
    correctOptionIndex: 0,
    mantraHint: 'A Compiler converts whole program at once; an Interpreter translates line-by-line.',
    explanation: 'A Compiler reads the entire source program and translates it into machine code all at once, reporting syntax errors collectively at the end.'
  },
  {
    id: 'q-comp-g6-3',
    subjectId: 'computers',
    gradeLevel: '6',
    chapterId: 'comp-g6-ch1',
    chapterTitle: 'Computer Languages & Translators',
    topic: 'First Generation Language',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'Machine Language is the only language that a computer processor can directly understand without any translation, written entirely in binary 0s and 1s.',
    correctBoolean: true,
    mantraHint: 'CPUs execute binary machine code directly.',
    explanation: 'True. Machine language consists purely of binary 0s and 1s and requires no translator, making it executed at hardware speed.'
  },

  // math-g6-ch1: Knowing Our Numbers
  {
    id: 'q-math-g6-2',
    subjectId: 'mathematics',
    gradeLevel: '6',
    chapterId: 'math-g6-ch1',
    chapterTitle: 'Knowing Our Numbers & Large Numbers',
    topic: 'Indian vs International Number System',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'How many Thousands make 1 Million in the International Number System?',
    options: ['1,000 Thousands', '100 Thousands', '10,000 Thousands', '10 Thousands'],
    correctOptionIndex: 0,
    mantraHint: '1 Million = 1,000,000 = 1,000 × 1,000.',
    explanation: '1 Million has 6 zeros (1,000,000). 1 Thousand has 3 zeros (1,000). 1,000,000 ÷ 1,000 = 1,000 Thousands.'
  },
  {
    id: 'q-math-g6-3',
    subjectId: 'mathematics',
    gradeLevel: '6',
    chapterId: 'math-g6-ch1',
    chapterTitle: 'Knowing Our Numbers & Large Numbers',
    topic: 'Roman Numerals',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'In Roman Numerals, the letter L represents 50, C represents 100, D represents 500, and M represents ____.',
    correctBlanks: ['1000', '1,000'],
    mantraHint: 'Millennium = 1000 years.',
    explanation: 'In the Roman numeral system: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.'
  },

  // bio-g6-ch1: The Leaf
  {
    id: 'q-bio-g6-2',
    subjectId: 'biology',
    gradeLevel: '6',
    chapterId: 'bio-g6-ch1',
    chapterTitle: 'The Leaf: Structure & Functions',
    topic: 'Transpiration & Stomata',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'What are the tiny microscopic pores present mostly on the underside of green leaves through which transpiration and gas exchange occur?',
    options: ['Stomata', 'Lenticels', 'Hydathodes', 'Chloroplasts'],
    correctOptionIndex: 0,
    mantraHint: 'Guarded by kidney-shaped guard cells.',
    explanation: 'Stomata are microscopic pores guarded by specialized guard cells that regulate transpiration (loss of water vapor) and oxygen-CO₂ exchange.'
  },
  {
    id: 'q-bio-g6-3',
    subjectId: 'biology',
    gradeLevel: '6',
    chapterId: 'bio-g6-ch1',
    chapterTitle: 'The Leaf: Structure & Functions',
    topic: 'Venation Patterns',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'Monocot plants like grass, wheat, and maize exhibit parallel venation in their leaves, while dicots like mango and pea exhibit reticulate (net-like) venation.',
    correctBoolean: true,
    mantraHint: 'Compare a blade of grass (straight parallel veins) with a peepal leaf (branched net).',
    explanation: 'True. Monocots typically have parallel venation and fibrous roots, while dicots have reticulate venation and taproots.'
  },

  // ==========================================
  // GRADE 5 EXTRA QUESTIONS
  // ==========================================
  // comp-g5-ch1: Evolution of Computers
  {
    id: 'q-comp-g5-2',
    subjectId: 'computers',
    gradeLevel: '5',
    chapterId: 'comp-g5-ch1',
    chapterTitle: 'Evolution of Computers & Generations',
    topic: 'Computer Generations Hardware',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which primary electronic component was used in First Generation computers like ENIAC and UNIVAC?',
    options: ['Vacuum Tubes', 'Transistors', 'Integrated Circuits (ICs)', 'Microprocessors'],
    correctOptionIndex: 0,
    mantraHint: 'Large glass bulb-like devices that generated immense heat and burned out frequently.',
    explanation: 'First-generation computers (1940-1956) relied on bulky vacuum tubes for circuitry and magnetic drums for memory.'
  },
  {
    id: 'q-comp-g5-3',
    subjectId: 'computers',
    gradeLevel: '5',
    chapterId: 'comp-g5-ch1',
    chapterTitle: 'Evolution of Computers & Generations',
    topic: 'Father of Modern Computer',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'English mathematician and inventor ____ is celebrated as the Father of the Computer for designing the Analytical Engine.',
    correctBlanks: ['Charles Babbage', 'Babbage'],
    mantraHint: 'Designed the Difference Engine and Analytical Engine in the 1830s.',
    explanation: 'Charles Babbage conceptualized and designed the first programmable mechanical computer (the Analytical Engine) containing input, mill (CPU), store, and output.'
  },

  // math-g5-ch1: Large Numbers & Operations
  {
    id: 'q-math-g5-2',
    subjectId: 'mathematics',
    gradeLevel: '5',
    chapterId: 'math-g5-ch1',
    chapterTitle: 'Large Numbers & Roman Numerals',
    topic: 'Place Value and Face Value',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'In the number 6,482,931, what is the place value of the digit 8?',
    options: ['80,000 (Eighty Thousand)', '8,000 (Eight Thousand)', '800,000 (Eight Hundred Thousand)', '800 (Eight Hundred)'],
    correctOptionIndex: 0,
    mantraHint: 'Count positions from right: ones, tens, hundreds, thousands, ten-thousands.',
    explanation: 'Digit 8 occupies the ten-thousands place, so its place value is 8 × 10,000 = 80,000.'
  },
  {
    id: 'q-math-g5-3',
    subjectId: 'mathematics',
    gradeLevel: '5',
    chapterId: 'math-g5-ch1',
    chapterTitle: 'Large Numbers & Roman Numerals',
    topic: 'Rounding Off to Nearest Thousand',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'When 47,682 is rounded off to the nearest thousand, it becomes 48,000.',
    correctBoolean: true,
    mantraHint: 'Check the hundreds digit (6). Since 6 ≥ 5, round up!',
    explanation: 'True. In 47,682, the hundreds digit is 6, which is 5 or greater, so 47 thousands rounds up to 48,000.'
  },

  // bio-g5-ch1: Plant Reproduction
  {
    id: 'q-bio-g5-2',
    subjectId: 'biology',
    gradeLevel: '5',
    chapterId: 'bio-g5-ch1',
    chapterTitle: 'Plant Reproduction: Seeds & Spores',
    topic: 'Seed Dispersal by Wind',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Seeds of Dandelion and Drumstick have wing-like or hairy structures so they can easily be dispersed by:',
    options: ['Wind', 'Water', 'Animals', 'Explosion'],
    correctOptionIndex: 0,
    mantraHint: 'Lightweight seeds with tufts of hair float in the air currents.',
    explanation: 'Dandelion seeds have feathery parachutes (pappus) and drumstick seeds have wings enabling wind to carry them far away from the parent plant.'
  },

  // ==========================================
  // GRADE 4 EXTRA QUESTIONS
  // ==========================================
  // comp-g4-ch1: Memory & Storage Devices
  {
    id: 'q-comp-g4-2',
    subjectId: 'computers',
    gradeLevel: '4',
    chapterId: 'comp-g4-ch1',
    chapterTitle: 'Memory & Storage Devices',
    topic: 'Units of Data Measurement',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'How many Megabytes (MB) make 1 Gigabyte (GB)?',
    options: ['1024 MB', '100 MB', '1000 MB', '512 MB'],
    correctOptionIndex: 0,
    mantraHint: 'Computers use powers of 2. 2^10 = 1024.',
    explanation: '1 Gigabyte (GB) = 1024 Megabytes (MB). 1 Megabyte = 1024 Kilobytes (KB).'
  },
  {
    id: 'q-comp-g4-3',
    subjectId: 'computers',
    gradeLevel: '4',
    chapterId: 'comp-g4-ch1',
    chapterTitle: 'Memory & Storage Devices',
    topic: 'Secondary Storage Media',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'Pen drives and Solid-State Drives (SSD) use flash memory and do not have any rotating mechanical platters.',
    correctBoolean: true,
    mantraHint: 'Unlike older hard drives with spinning disks, flash storage has no moving mechanical parts.',
    explanation: 'True. Flash memory devices like USB drives and SSDs store data electronically in solid-state chips with zero moving parts, making them faster and shock-resistant.'
  },

  // math-g4-ch1: Place Value & Addition/Subtraction
  {
    id: 'q-math-g4-2',
    subjectId: 'mathematics',
    gradeLevel: '4',
    chapterId: 'math-g4-ch1',
    chapterTitle: 'Place Value, Addition & Subtraction',
    topic: 'Greatest and Smallest 5-Digit Numbers',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Using digits 8, 0, 5, 2, 9 exactly once, what is the smallest 5-digit number that can be formed?',
    options: ['20,589', '02,589', '20,859', '25,089'],
    correctOptionIndex: 0,
    mantraHint: '0 cannot be the first digit of a 5-digit number! Use the smallest non-zero digit first, followed by 0.',
    explanation: 'Starting with 2 (smallest non-zero), then 0, followed by ascending digits 5, 8, 9 gives 20,589.'
  },

  // ==========================================
  // GRADE 3 EXTRA QUESTIONS
  // ==========================================
  // comp-g3-ch1: Hardware vs Software
  {
    id: 'q-comp-g3-2',
    subjectId: 'computers',
    gradeLevel: '3',
    chapterId: 'comp-g3-ch1',
    chapterTitle: 'Hardware vs Software & Desktop Basics',
    topic: 'Input Devices',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which device is used to enter letters, numbers, and symbols into the computer by typing?',
    options: ['Keyboard', 'Monitor', 'Printer', 'Speaker'],
    correctOptionIndex: 0,
    mantraHint: 'Has keys like Enter, Spacebar, and Alphabet keys.',
    explanation: 'The keyboard is the primary input device used to type text and issue commands to the computer.'
  },

  // math-g3-ch1: 4-Digit Numbers
  {
    id: 'q-math-g3-2',
    subjectId: 'mathematics',
    gradeLevel: '3',
    chapterId: 'math-g3-ch1',
    chapterTitle: '4-Digit Numbers & Comparison',
    topic: 'Successor and Predecessor',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'The predecessor of 5,000 is ____, while the successor of 5,000 is ____.',
    correctBlanks: ['4999 and 5001', '4,999 and 5,001', '4999', '5001'],
    mantraHint: 'Predecessor is number - 1; Successor is number + 1.',
    explanation: 'Predecessor = 5000 - 1 = 4999. Successor = 5000 + 1 = 5001.'
  },

  // ==========================================
  // GRADE 2 EXTRA QUESTIONS
  // ==========================================
  // comp-g2-ch1: Smart Machine Basics
  {
    id: 'q-comp-g2-2',
    subjectId: 'computers',
    gradeLevel: '2',
    chapterId: 'comp-g2-ch1',
    chapterTitle: 'Computer: A Wonderful Smart Machine',
    topic: 'Features of a Computer',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'A computer never gets tired or bored and can do millions of sums very quickly without making mistakes on its own.',
    correctBoolean: true,
    mantraHint: 'Computers are fast, accurate, and have great memory.',
    explanation: 'True. Computers work at high speeds with 100% accuracy and do not get fatigued like humans.'
  },
  {
    id: 'q-comp-g2-3',
    subjectId: 'computers',
    gradeLevel: '2',
    chapterId: 'comp-g2-ch1',
    chapterTitle: 'Computer: A Wonderful Smart Machine',
    topic: 'Uses of Computers',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Where do doctors and nurses use computers to keep medical records of patients and do lab tests?',
    options: ['In Hospitals', 'In Swimming Pools', 'In Playgrounds', 'In Railway Tracks'],
    correctOptionIndex: 0,
    mantraHint: 'A place where sick people are treated.',
    explanation: 'Hospitals use computers for patient registration, scanning, medical reports, and monitoring health.'
  },

  // math-g2-ch1: 2-Digit & 3-Digit Numbers
  {
    id: 'q-math-g2-2',
    subjectId: 'mathematics',
    gradeLevel: '2',
    chapterId: 'math-g2-ch1',
    chapterTitle: '2-Digit & 3-Digit Numbers & Place Values',
    topic: 'Skip Counting by 5s and 10s',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'Fill in the next two numbers in the pattern: 20, 25, 30, 35, ____, ____.',
    correctBlanks: ['40 and 45', '40, 45', '40', '45'],
    mantraHint: 'Count by 5s: 35 + 5 = 40, 40 + 5 = 45.',
    explanation: 'Adding 5 at each step gives: 35 + 5 = 40, and 40 + 5 = 45.'
  }
];
