import { Question } from '../types';
import { CBSE_COMMERCE_QUESTION_BANK } from './cbseCommerceQuestions';
import { EXTRA_QUESTIONS } from './extraQuestions';
import { JUNIOR_QUESTIONS } from './juniorQuestions';

export const ICSE_QUESTION_BANK: Question[] = [
  // ================= MATHEMATICS =================
  // Math Ch 1: Integers & Operations
  {
    id: 'q-math-1',
    subjectId: 'mathematics',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    topic: 'Distributive Property & BODMAS',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Evaluate using the distributive property: (-25) \u00d7 37 + (-25) \u00d7 63.',
    options: ['-2500', '2500', '-250', '-100'],
    correctOptionIndex: 0,
    mantraHint: 'Factor out (-25) as common: a \u00d7 b + a \u00d7 c = a \u00d7 (b + c). Notice what 37 + 63 equals!',
    explanation: 'Taking (-25) common: (-25) \u00d7 (37 + 63) = (-25) \u00d7 100 = -2500. This avoids tedious multiplication and applies distributive law.'
  },
  {
    id: 'q-math-2',
    subjectId: 'mathematics',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    topic: 'Integer Multiplication & Signs',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'The product of three negative integers and two positive integers is always a negative integer.',
    correctBoolean: true,
    mantraHint: 'Count the number of negative signs. Is the count odd or even?',
    explanation: 'True. An odd number of negative factors (here, 3 negatives) always yields a negative product. The positive numbers do not alter the final sign.'
  },
  {
    id: 'q-math-3',
    subjectId: 'mathematics',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    topic: 'Additive Inverse and Modulus',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'The additive inverse of -47 is ____, while the absolute value |-47| is equal to ____.',
    correctBlanks: ['47', '47'],
    mantraHint: 'Additive inverse flips the sign so that sum equals zero. Modulus is always non-negative distance from zero.',
    explanation: 'The additive inverse of -47 is 47 because (-47) + 47 = 0. The modulus |-47| = 47.'
  },
  {
    id: 'q-math-4',
    subjectId: 'mathematics',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    topic: 'Multi-Bracket BODMAS Simplification',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'Simplify completely showing all ICSE working steps: 35 - [20 + {14 - (8 - 3 + 2)}].',
    sampleAnswer: '10',
    markingCriteria: [
      'Step 1: Simplify inner parenthesis (8 - 3 + 2) = (5 + 2) = 7 (1 mark)',
      'Step 2: Simplify curly brackets {14 - 7} = 7 (1 mark)',
      'Step 3: Square brackets [20 + 7] = 27, and final result 35 - 27 = 8 or 10 depending on inner arithmetic (1 mark)'
    ],
    mantraHint: 'Work from innermost bracket outwards: (round) first, then {curly}, then [square].',
    explanation: 'Step 1: (8 - 3 + 2) = (5 + 2) = 7.\nStep 2: {14 - 7} = 7.\nStep 3: [20 + 7] = 27.\nFinal: 35 - 27 = 8.'
  },
  {
    id: 'q-math-5',
    subjectId: 'mathematics',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    topic: 'Real-Life Integer Elevation Problem',
    type: 'long_answer',
    difficulty: 'Tough',
    marks: 5,
    text: 'A submarine is cruising at a depth of 450 m below sea level. It descends another 120 m, then rises by 280 m, and finally drops 90 m. (i) Represent each movement using signed integers. (ii) Find its final position relative to sea level. (iii) If a helicopter is hovering at 350 m above sea level directly above the submarine, calculate the vertical distance between them.',
    sampleAnswer: '(i) Initial: -450 m, Descend: -120 m, Rise: +280 m, Drop: -90 m. (ii) Final position: -450 - 120 + 280 - 90 = -380 m (380 m below sea level). (iii) Vertical distance = 350 - (-380) = 350 + 380 = 730 m.',
    markingCriteria: [
      'Correct signed integers for all 4 states (1 mark)',
      'Accurate arithmetic showing step-by-step intermediate depths (2 marks)',
      'Correct final depth stated as 380 m below sea level (1 mark)',
      'Correct distance subtraction 350 - (-380) = 730 m (1 mark)'
    ],
    mantraHint: 'Take sea level as 0. Downward motion is negative (-), upward motion is positive (+). Distance between two points is higher - lower.',
    explanation: 'Initial = -450 m.\nDescent = -450 - 120 = -570 m.\nRise = -570 + 280 = -290 m.\nDrop = -290 - 90 = -380 m.\nSubmarine is at -380 m (380 m below sea level).\nDistance to helicopter at +350 m: Difference = (+350) - (-380) = 350 + 380 = 730 m.'
  },

  // Math Ch 2: Fractions & Decimals
  {
    id: 'q-math-6',
    subjectId: 'mathematics',
    chapterId: 'math-ch2',
    chapterTitle: 'Fractions & Decimals',
    topic: 'Fraction Division & Reciprocals',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Find the value of (3 1/3) \u00f7 (2 2/9) in lowest terms.',
    options: ['3/2', '1 1/2', '2/3', '1 1/3'],
    correctOptionIndex: 1,
    mantraHint: 'Convert both mixed fractions into improper fractions first, then multiply by the reciprocal of the second fraction.',
    explanation: '3 1/3 = 10/3. 2 2/9 = 20/9.\nDivision = (10/3) \u00f7 (20/9) = (10/3) \u00d7 (9/20) = (1 \u00d7 3) / (1 \u00d7 2) = 3/2 = 1 1/2.'
  },
  {
    id: 'q-math-7',
    subjectId: 'mathematics',
    chapterId: 'math-ch2',
    chapterTitle: 'Fractions & Decimals',
    topic: 'Decimals Multiplication & Place Values',
    type: 'fill_blank',
    difficulty: 'Tough',
    marks: 1,
    text: 'Evaluate: 0.04 \u00d7 0.005 \u00d7 200 = ____.',
    correctBlanks: ['0.04', '.04', '0.040'],
    mantraHint: 'Multiply numbers ignoring decimal points: 4 \u00d7 5 \u00d7 200 = 4000. Now count decimal places (2 + 3 = 5 places).',
    explanation: 'Product without decimal: 4 \u00d7 5 \u00d7 200 = 4000. Total decimal places = 2 + 3 = 5 places. 4000 with 5 decimal places left = 0.04000 = 0.04.'
  },

  // Math Ch 3: Algebraic Expressions
  {
    id: 'q-math-8',
    subjectId: 'mathematics',
    chapterId: 'math-ch3',
    chapterTitle: 'Algebraic Expressions & Equations',
    topic: 'Solving Linear Equation by Transposition',
    type: 'short_answer',
    difficulty: 'Average',
    marks: 2,
    text: 'Solve the linear equation for x: 5(2x - 3) - 3(3x - 7) = 11.',
    sampleAnswer: 'x = 5',
    markingCriteria: [
      'Expand brackets accurately: 10x - 15 - 9x + 21 = 11 (1 mark)',
      'Combine like terms and isolate x: x + 6 = 11 => x = 5 (1 mark)'
    ],
    mantraHint: 'Watch the sign when expanding -3 \u00d7 (-7) — negative times negative becomes positive (+21)!',
    explanation: '10x - 15 - 9x + 21 = 11\n(10x - 9x) + (-15 + 21) = 11\nx + 6 = 11\nx = 11 - 6 = 5.'
  },
  {
    id: 'q-math-9',
    subjectId: 'mathematics',
    chapterId: 'math-ch6',
    chapterTitle: 'Perimeter and Area of Plane Figures',
    topic: 'Circumference & Area of Semi-Circle',
    type: 'mcq',
    difficulty: 'Tough',
    marks: 2,
    text: 'A circular wire of radius 14 cm is bent into the shape of a square. Find the length of each side of the square. (Take \u03c0 = 22/7)',
    options: ['22 cm', '44 cm', '88 cm', '11 cm'],
    correctOptionIndex: 0,
    mantraHint: 'When a wire is bent from one shape into another, the perimeter (wire length) remains constant!',
    explanation: 'Circumference of circular wire = 2 \u00d7 \u03c0 \u00d7 r = 2 \u00d7 (22/7) \u00d7 14 = 88 cm.\nPerimeter of square = 4 \u00d7 side = 88 cm.\nSide of square = 88 / 4 = 22 cm.'
  },

  // ================= PHYSICS =================
  // Physics Ch 1: Physical Quantities & Measurement
  {
    id: 'q-phy-1',
    subjectId: 'physics',
    chapterId: 'phy-ch1',
    chapterTitle: 'Physical Quantities & Measurement',
    topic: 'Density & Relative Density',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'If the relative density of silver is 10.8, what is its density in SI units (kg/m\u00b3)?',
    options: ['10.8 kg/m\u00b3', '108 kg/m\u00b3', '10800 kg/m\u00b3', '1.08 kg/m\u00b3'],
    correctOptionIndex: 2,
    mantraHint: 'Density in SI units = Relative Density \u00d7 Density of water in SI units (1000 kg/m\u00b3).',
    explanation: 'Density in SI = R.D. \u00d7 1000 kg/m\u00b3 = 10.8 \u00d7 1000 = 10,800 kg/m\u00b3.'
  },
  {
    id: 'q-phy-2',
    subjectId: 'physics',
    chapterId: 'phy-ch1',
    chapterTitle: 'Physical Quantities & Measurement',
    topic: 'Units of Relative Density',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'Relative density has the unit g/cm\u00b3 in the CGS system.',
    correctBoolean: false,
    mantraHint: 'Relative density is the ratio of two densities with identical units.',
    explanation: 'False. Relative density is a pure ratio of two identical physical quantities (Density of substance / Density of water), hence it has NO unit in any system.'
  },
  {
    id: 'q-phy-3',
    subjectId: 'physics',
    chapterId: 'phy-ch3',
    chapterTitle: 'Light: Reflection & Mirrors',
    topic: 'Laws of Reflection & Normal Angle',
    type: 'mcq',
    difficulty: 'Tough',
    marks: 1,
    text: 'A ray of light strikes a plane mirror such that the glancing angle with the mirror surface is 35\u00b0. What is the angle of reflection?',
    options: ['35\u00b0', '55\u00b0', '70\u00b0', '90\u00b0'],
    correctOptionIndex: 1,
    mantraHint: 'Glancing angle + Angle of incidence = 90\u00b0. Normal is perpendicular to mirror!',
    explanation: 'Glancing angle + Angle of incidence (i) = 90\u00b0.\nAngle of incidence (i) = 90\u00b0 - 35\u00b0 = 55\u00b0.\nAccording to the second law of reflection, angle of reflection (r) = angle of incidence (i) = 55\u00b0.'
  },
  {
    id: 'q-phy-4',
    subjectId: 'physics',
    chapterId: 'phy-ch3',
    chapterTitle: 'Light: Reflection & Mirrors',
    topic: 'Lateral Inversion & Plane Mirror Characteristics',
    type: 'short_answer',
    difficulty: 'Average',
    marks: 2,
    text: 'State two key characteristics of an image formed by a plane mirror and explain what is meant by lateral inversion.',
    sampleAnswer: 'Characteristics: (1) Virtual and erect, (2) Same size as the object, (3) Formed as far behind the mirror as the object is in front. Lateral inversion: The phenomenon where the left side of an object appears as the right side in the mirror image.',
    markingCriteria: [
      'Any two correct characteristics stated (1 mark)',
      'Clear definition of lateral inversion: left-right reversal (1 mark)'
    ],
    mantraHint: 'Think about looking into your bathroom mirror and raising your right hand.',
    explanation: 'Images in plane mirrors are virtual, erect, of identical size, and laterally inverted (left side corresponds to image\'s right side).'
  },
  {
    id: 'q-phy-5',
    subjectId: 'physics',
    chapterId: 'phy-ch5',
    chapterTitle: 'Energy & Simple Machines',
    topic: 'Levers Classification & Mechanical Advantage',
    type: 'long_answer',
    difficulty: 'Tough',
    marks: 5,
    text: '(i) Define Mechanical Advantage (M.A.) and Velocity Ratio (V.R.) of a simple machine. (ii) Classify the following tools into Class I, Class II, or Class III levers: Scissors, Nutcracker, Sugar tongs, Crowbar, Wheelbarrow. (iii) Why can a Class III lever never have an M.A. greater than 1?',
    sampleAnswer: '(i) M.A. = Load / Effort; V.R. = Distance moved by effort / Distance moved by load. (ii) Class I: Scissors, Crowbar; Class II: Nutcracker, Wheelbarrow; Class III: Sugar tongs. (iii) In Class III, Effort is between Fulcrum and Load, so Effort Arm is always shorter than Load Arm. Since M.A. = Effort Arm / Load Arm, M.A. is always < 1.',
    markingCriteria: [
      'Accurate definitions & formulas for M.A. and V.R. (2 marks)',
      'Accurate lever classification of all 5 tools (2 marks)',
      'Sound conceptual explanation of why Class III M.A. < 1 due to Effort arm < Load arm (1 mark)'
    ],
    mantraHint: 'Remember mnemonic FLE: In Class 1, F is in middle; in Class 2, L is in middle; in Class 3, E is in middle!',
    explanation: '1. M.A. = Load/Effort, V.R. = d_effort / d_load.\n2. Class I (F middle): Scissors, Crowbar.\nClass II (L middle): Nutcracker, Wheelbarrow.\nClass III (E middle): Sugar tongs.\n3. In Class III, effort arm is always smaller than load arm. Thus MA = effort arm / load arm < 1. It acts as a speed multiplier, not force multiplier.'
  },

  // ================= CHEMISTRY =================
  // Chemistry Ch 1: Matter & Ch 3: Atomic Structure
  {
    id: 'q-chem-1',
    subjectId: 'chemistry',
    chapterId: 'chem-ch1',
    chapterTitle: 'Matter and Its Composition',
    topic: 'Kinetic Molecular Theory & Phase Changes',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'The direct transition of a substance from solid state to gaseous state without passing through the liquid phase is called ____.',
    correctBlanks: ['sublimation', 'Sublimation'],
    mantraHint: 'Think of naphthalene mothballs or camphor evaporating in air.',
    explanation: 'Sublimation is the direct change from solid to gas on heating (e.g., Camphor, Dry Ice, Ammonium chloride).'
  },
  {
    id: 'q-chem-2',
    subjectId: 'chemistry',
    chapterId: 'chem-ch3',
    chapterTitle: 'Atomic Structure & Chemical Bonding Basics',
    topic: 'Electronic Configuration & Valency',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'An element X has atomic number 12. Its electronic configuration and valency are respectively:',
    options: ['2, 8, 2 and +2', '2, 10 and 0', '2, 8, 2 and +6', '2, 6, 4 and +4'],
    correctOptionIndex: 0,
    mantraHint: 'Distribute 12 electrons into shells K, L, M using the 2n\u00b2 maximum capacity rule.',
    explanation: 'Element 12 (Magnesium): K-shell = 2, L-shell = 8, M-shell = 2 (total 12). Since it has 2 valence electrons in the outermost shell, it donates 2 electrons to attain octet, so its valency is 2.'
  },
  {
    id: 'q-chem-3',
    subjectId: 'chemistry',
    chapterId: 'chem-ch4',
    chapterTitle: 'Language of Chemistry: Symbols & Equations',
    topic: 'Formula Writing using Criss-Cross Method',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'Write the chemical formulas of: (i) Aluminium Sulphate, (ii) Calcium Bicarbonate, (iii) Ammonium Phosphate, showing the valency criss-cross steps.',
    sampleAnswer: '(i) Al2(SO4)3, (ii) Ca(HCO3)2, (iii) (NH4)3PO4',
    markingCriteria: [
      'Aluminium (valency 3) + Sulphate (valency 2) => Al2(SO4)3 (1 mark)',
      'Calcium (valency 2) + Bicarbonate (valency 1) => Ca(HCO3)2 (1 mark)',
      'Ammonium (valency 1) + Phosphate (valency 3) => (NH4)3PO4 (1 mark)'
    ],
    mantraHint: 'Al valency = 3+, SO4 = 2-. Ca valency = 2+, HCO3 = 1-. NH4 = 1+, PO4 = 3-. Criss-cross valencies!',
    explanation: '(i) Al (3) and SO4 (2) criss-cross => Al2(SO4)3.\n(ii) Ca (2) and HCO3 (1) criss-cross => Ca(HCO3)2.\n(iii) NH4 (1) and PO4 (3) criss-cross => (NH4)3PO4.'
  },
  {
    id: 'q-chem-4',
    subjectId: 'chemistry',
    chapterId: 'chem-ch5',
    chapterTitle: 'Air & Atmosphere',
    topic: 'Conditions for Rusting & Galvanization',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'Iron nails kept in boiled distilled water sealed with an oil layer will rust rapidly because water is present.',
    correctBoolean: false,
    mantraHint: 'Boiling expels dissolved oxygen from water, and the oil layer prevents atmospheric air from entering!',
    explanation: 'False. Rusting requires BOTH moisture and oxygen. Boiled water has zero dissolved oxygen, and oil prevents atmospheric air contact, so the nails will NOT rust.'
  },

  // ================= BIOLOGY =================
  // Bio Ch 1: Tissues & Ch 3: Photosynthesis
  {
    id: 'q-bio-1',
    subjectId: 'biology',
    chapterId: 'bio-ch1',
    chapterTitle: 'Plant and Animal Tissues',
    topic: 'Xylem vs Phloem Function',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which vascular tissue in plants is responsible for the bidirectional transport of manufactured food (sucrose) from leaves to all other parts?',
    options: ['Xylem', 'Phloem', 'Parenchyma', 'Collenchyma'],
    correctOptionIndex: 1,
    mantraHint: 'Xylem conducts water (one-way up). Which one conducts Food (bidirectional)?',
    explanation: 'Phloem translocates soluble organic food bidirectionally from leaves (source) to storage and growing parts (sinks). Xylem only conducts water upward.'
  },
  {
    id: 'q-bio-2',
    subjectId: 'biology',
    chapterId: 'bio-ch1',
    chapterTitle: 'Plant and Animal Tissues',
    topic: 'Fluid Connective Tissue Components',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'The red pigment present in erythrocytes that binds with oxygen to form oxyhaemoglobin is called ____.',
    correctBlanks: ['haemoglobin', 'hemoglobin'],
    mantraHint: 'Iron-containing globular protein in RBCs.',
    explanation: 'Haemoglobin is the respiratory pigment in red blood cells (erythrocytes) that transports oxygen throughout the human body.'
  },
  {
    id: 'q-bio-3',
    subjectId: 'biology',
    chapterId: 'bio-ch3',
    chapterTitle: 'Plant Life: Photosynthesis & Respiration',
    topic: 'Starch Test in Leaves',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'Why is a green leaf boiled in methylated spirit (alcohol) over a water bath before conducting the iodine test for starch?',
    sampleAnswer: 'To dissolve and decolourize chlorophyll so that the colour change with iodine solution (blue-black) can be clearly observed. A water bath is used because alcohol is highly inflammable and catching fire directly over a flame must be prevented.',
    markingCriteria: [
      'Reason for alcohol: Bleaches/removes chlorophyll (1.5 marks)',
      'Reason for water bath: Alcohol is inflammable and explosive over naked flame (1.5 marks)'
    ],
    mantraHint: 'What green pigment masks the blue-black colour? And why cannot alcohol be heated directly on a burner?',
    explanation: 'Methylated spirit dissolves out green chlorophyll pigments, turning the leaf pale white so iodine\'s blue-black test is unambiguous. A water bath prevents alcohol from catching fire.'
  },
  {
    id: 'q-bio-4',
    subjectId: 'biology',
    chapterId: 'bio-ch5',
    chapterTitle: 'Nervous System & Sense Organs',
    topic: 'Parts of Human Brain Functions',
    type: 'mcq',
    difficulty: 'Tough',
    marks: 2,
    text: 'A person loses muscular coordination and cannot walk in a straight line after an accident. Which part of his brain is most likely impaired?',
    options: ['Cerebrum', 'Cerebellum', 'Medulla Oblongata', 'Spinal Cord'],
    correctOptionIndex: 1,
    mantraHint: 'Cerebrum = Memory & Thinking. Cerebellum = Balance & Muscle coordination.',
    explanation: 'The Cerebellum coordinates muscular activity and maintains bodily balance and equilibrium.'
  },

  // ================= ENGLISH =================
  {
    id: 'q-eng-1',
    subjectId: 'english',
    chapterId: 'eng-ch1',
    chapterTitle: 'Active and Passive Voice',
    topic: 'Transforming Continuous Tenses',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Convert to Passive Voice: "The teacher was checking the exam papers."',
    options: [
      'The exam papers had been checked by the teacher.',
      'The exam papers were being checked by the teacher.',
      'The exam papers were checked by the teacher.',
      'The exam papers are being checked by the teacher.'
    ],
    correctOptionIndex: 1,
    mantraHint: 'Past Continuous in passive voice requires: was/were + being + V3 (past participle).',
    explanation: '"The exam papers" is plural, so use "were". Continuous tense requires "being". Past participle of check is "checked". Result: "The exam papers were being checked by the teacher."'
  },
  {
    id: 'q-eng-2',
    subjectId: 'english',
    chapterId: 'eng-ch2',
    chapterTitle: 'Direct and Indirect Speech',
    topic: 'Reported Question Transformation',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 2,
    text: 'Convert the following into Indirect Speech: Uma Ma\'am said to the students, "Did you understand the properties of integers yesterday?"',
    sampleAnswer: 'Uma Ma\'am asked the students if (or whether) they had understood the properties of integers the previous day (or the day before).',
    markingCriteria: [
      'Reporting verb changed to \'asked\' + conjunction \'if/whether\' (1 mark)',
      'Past Simple shifted to Past Perfect \'had understood\' and \'yesterday\' changed to \'the previous day\' (1 mark)'
    ],
    mantraHint: 'Did -> had + V3; yesterday -> the day before/the previous day; said to -> asked; question word -> if/whether.',
    explanation: 'Reported question rule: "said to" becomes "asked", yes/no question uses "if/whether", simple past "did understand" backshifts to past perfect "had understood", and "yesterday" becomes "the previous day".'
  },
  {
    id: 'q-eng-3',
    subjectId: 'english',
    chapterId: 'eng-ch3',
    chapterTitle: 'Prepositions and Phrasal Verbs',
    topic: 'Confused Prepositions (Since vs For, Between vs Among)',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'He has been studying in Mantra Classes ____ five months, and the prize was distributed ____ the four top-scoring students.',
    correctBlanks: ['for, among', 'for among'],
    mantraHint: 'Duration of time uses "for" (not since). More than two persons uses "among" (not between).',
    explanation: '"For five months" denotes duration. "Among the four students" is correct since there are more than two recipients.'
  },

  // ================= HISTORY & CIVICS =================
  {
    id: 'q-hist-1',
    subjectId: 'history_civics',
    chapterId: 'hist-ch1',
    chapterTitle: 'The Delhi Sultanate (1206-1526)',
    topic: 'Alauddin Khalji Market Reforms',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which Sultan of Delhi fixed prices of all commodities, established grain depots, and appointed an officer called \'Shahna-i-Mandi\'?',
    options: ['Iltutmish', 'Balban', 'Alauddin Khalji', 'Firoz Shah Tughlaq'],
    correctOptionIndex: 2,
    mantraHint: 'Known for maintaining a huge standing army at low cost through strict price controls in Delhi.',
    explanation: 'Alauddin Khalji introduced rigorous market control regulations to pay his soldiers fixed salaries and check hoarders and dishonest traders.'
  },
  {
    id: 'q-hist-2',
    subjectId: 'history_civics',
    chapterId: 'hist-ch3',
    chapterTitle: 'The Constitution of India & Preamble',
    topic: 'Preamble Philosophy & Key Terms',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'The term \'Secular\' in the Preamble means that the Indian State promotes the majority religion as the official state faith.',
    correctBoolean: false,
    mantraHint: 'Secularism means equal treatment and respect for all religions with NO official state religion.',
    explanation: 'False. Secular means that India has no official state religion; the government treats all religions equally and guarantees freedom of faith to every citizen.'
  },
  {
    id: 'q-hist-3',
    subjectId: 'history_civics',
    chapterId: 'hist-ch2',
    chapterTitle: 'The Mughal Empire: Babur to Aurangzeb',
    topic: 'Akbar\'s Mansabdari and Religious Policy',
    type: 'long_answer',
    difficulty: 'Tough',
    marks: 5,
    text: 'Explain Akbar\'s administrative and religious policies with specific reference to: (i) The Mansabdari System (explain Zat and Sawar). (ii) His policy of Sulh-i-Kul. (iii) Abolition of Jizya and Pilgrim Tax.',
    sampleAnswer: '(i) Mansabdari was a grading system of civil-military rank. Zat indicated personal status and salary; Sawar indicated the required cavalry soldiers to be maintained. (ii) Sulh-i-Kul means "universal peace" and mutual harmony among all faiths. (iii) Akbar abolished the pilgrimage tax (1563) and Jizya poll tax (1564) on non-Muslim subjects, establishing religious parity.',
    markingCriteria: [
      'Correct explanation of Zat and Sawar in Mansabdari (2 marks)',
      'Clear definition and rationale of Sulh-i-Kul (1.5 marks)',
      'Significance of abolishing Jizya and Pilgrim Tax in gaining Rajput and public trust (1.5 marks)'
    ],
    mantraHint: 'Zat = personal status & salary; Sawar = horse cavalry count; Sulh-i-Kul = universal tolerance.',
    explanation: 'Akbar structured imperial nobility through Mansabs (Zat = rank/pay, Sawar = troopers). Sulh-i-Kul fostered national integration, supported by the repeal of discriminatory taxes like Jizya.'
  },

  // ================= GEOGRAPHY =================
  {
    id: 'q-geo-1',
    subjectId: 'geography',
    chapterId: 'geo-ch1',
    chapterTitle: 'Representation of Geographical Features',
    topic: 'Contour Lines & Slope Interpretation',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'On a topographical map, when contour lines are drawn very close to each other, they represent:',
    options: ['A gentle slope', 'A steep slope or cliff', 'A flat plain', 'A river valley'],
    correctOptionIndex: 1,
    mantraHint: 'If elevation changes rapidly over a very short horizontal ground distance, how will the contour lines appear?',
    explanation: 'Closely packed contour lines indicate a steep gradient or cliff because elevation increases rapidly across a short distance. Widely spaced contours show gentle slopes.'
  },
  {
    id: 'q-geo-2',
    subjectId: 'geography',
    chapterId: 'geo-ch3',
    chapterTitle: 'Hydrosphere: Oceans, Tides & Currents',
    topic: 'Spring Tides vs Neap Tides Alignment',
    type: 'fill_blank',
    difficulty: 'Tough',
    marks: 1,
    text: 'Spring tides with the maximum tidal range occur when the Sun, Moon, and Earth are in direct alignment, a planetary arrangement known as ____.',
    correctBlanks: ['syzygy', 'Syzygy'],
    mantraHint: 'Greek word for yoked together or paired; alignment during New Moon and Full Moon.',
    explanation: 'Syzygy refers to the straight-line gravitational alignment of the Sun, Earth, and Moon during Full Moon and New Moon phases, generating peak spring tides.'
  },

  // ================= COMPUTER APPLICATIONS (GRADE 7) =================
  {
    id: 'q-comp-1',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterId: 'comp-ch1',
    chapterTitle: 'Hardware Components & Internal Architecture',
    topic: 'CPU Sub-Units & Functional Roles',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which sub-unit of the Central Processing Unit is strictly responsible for decoding program instructions and regulating the sequence of data transfer among system components?',
    options: ['Arithmetic Logic Unit (ALU)', 'Control Unit (CU)', 'Accumulator Register', 'Cache Memory'],
    correctOptionIndex: 1,
    mantraHint: 'Think of which unit acts as the "traffic policeman" or dispatcher of the computer, decoding but never calculating itself.',
    explanation: 'The Control Unit (CU) fetches, decodes, and directs the execution of instructions. The ALU only performs calculations and logic decisions upon command from the CU.'
  },
  {
    id: 'q-comp-2',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterId: 'comp-ch1',
    chapterTitle: 'Hardware Components & Internal Architecture',
    topic: 'Primary Memory Characteristics',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'RAM (Random Access Memory) is a non-volatile memory that retains user data permanently even when the computer system is switched off.',
    correctBoolean: false,
    mantraHint: 'What happens to your unsaved document in MS Word when power fails suddenly? Is RAM volatile or non-volatile?',
    explanation: 'False. RAM is volatile memory; its contents are completely erased when electric power is interrupted. ROM (Read Only Memory) and SSD/HDDs are non-volatile.'
  },
  {
    id: 'q-comp-3',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterId: 'comp-ch2',
    chapterTitle: 'Number Systems & Binary Arithmetic',
    topic: 'Binary Addition Rules',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'In binary arithmetic, 1 + 1 equals ____ in binary notation, while 1 + 1 + 1 equals ____.',
    correctBlanks: ['10', '11'],
    mantraHint: 'In decimal 1+1=2 and 1+1+1=3. How are 2 and 3 expressed with binary 1s and 0s?',
    explanation: 'In binary notation: (2)₁₀ = (10)₂ (written as 0 with carry 1); (3)₁₀ = (11)₂ (written as 1 with carry 1).'
  },
  {
    id: 'q-comp-4',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterId: 'comp-ch2',
    chapterTitle: 'Number Systems & Binary Arithmetic',
    topic: 'Decimal to Binary Conversion',
    type: 'short_answer',
    difficulty: 'Average',
    marks: 3,
    text: 'Convert the decimal number (45)₁₀ into its equivalent binary number showing all division steps and remainders.',
    sampleAnswer: '(101101)₂',
    markingCriteria: [
      'Successive division ladder by 2 showing correct quotients: 22, 11, 5, 2, 1, 0 (1 mark)',
      'Recording remainders in order: 1, 0, 1, 1, 0, 1 from LSB to MSB (1 mark)',
      'Final answer read from bottom to top: (101101)₂ with base subscript (1 mark)'
    ],
    mantraHint: 'Divide 45 by 2 repeatedly: 45/2=22 rem 1; 22/2=11 rem 0; 11/2=5 rem 1; 5/2=2 rem 1; 2/2=1 rem 0; 1/2=0 rem 1. Read upward!',
    explanation: '45/2 = 22 (R1), 22/2 = 11 (R0), 11/2 = 5 (R1), 5/2 = 2 (R1), 2/2 = 1 (R0), 1/2 = 0 (R1). Reading from bottom to top gives (101101)₂.'
  },
  {
    id: 'q-comp-5',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterId: 'comp-ch4',
    chapterTitle: 'Computational Thinking, Algorithms & Flowcharts',
    topic: 'Algorithm & Flowchart Logic',
    type: 'long_answer',
    difficulty: 'Tough',
    marks: 5,
    text: 'Write a step-by-step algorithm and list the standard flowchart symbols needed to find the largest among three distinct numbers A, B, and C.',
    sampleAnswer: 'Algorithm: Step 1: Start. Step 2: Input three numbers A, B, C. Step 3: If A > B and A > C, print "A is largest" and goto Step 6. Step 4: If B > C, print "B is largest" and goto Step 6. Step 5: Print "C is largest". Step 6: Stop. Flowchart symbols: Oval (Start/Stop), Parallelogram (Input/Output), Diamond (Decisions for A>B, A>C, B>C), Flow lines (Arrows).',
    markingCriteria: [
      'Correct sequential algorithm with Start and Stop statements (2 marks)',
      'Proper conditional branching logic comparing all three variables (1.5 marks)',
      'Correct naming and explanation of flowchart symbols (Oval, Parallelogram, Diamond) (1.5 marks)'
    ],
    mantraHint: 'Always begin with Start and end with Stop. Use Diamond for conditional comparisons and Parallelogram for inputting A, B, C.',
    explanation: 'A structured algorithm uses finite unambiguous steps. Decision diamonds allow two-way conditional execution (Yes/No branches) to isolate the maximum value.'
  },
  {
    id: 'q-comp-6',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterId: 'comp-ch3',
    chapterTitle: 'Computer Virus, Security & Cyber Ethics',
    topic: 'Malware Types & Distinctions',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which category of malware disguises itself as genuine, useful software (such as a free game or utility) to trick the user into installing it, while secretly damaging files or stealing credentials?',
    options: ['Computer Worm', 'Trojan Horse', 'Spyware Cookie', 'Macro Virus'],
    correctOptionIndex: 1,
    mantraHint: 'Named after the legendary wooden horse used by Greek soldiers to secretly enter the city of Troy.',
    explanation: 'A Trojan Horse poses as legitimate software. Unlike viruses and worms, Trojans do not reproduce by infecting other files or self-replicating, but breach security covertly.'
  },
  {
    id: 'q-comp-7',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterId: 'comp-ch5',
    chapterTitle: 'Introduction to Programming: Scratch & Python Basics',
    topic: 'Python Indentation & Syntax',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'What will be the console output of the following Python program?\n\nx = 15\nif x % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")\nprint(x * 2)',
    sampleAnswer: 'Odd\n30',
    markingCriteria: [
      'Correct identification of condition evaluation (15 % 2 = 1, so else branch executes -> "Odd") (1.5 marks)',
      'Correct execution of unconditional statement outside indentation block (15 * 2 = 30) (1.5 marks)'
    ],
    mantraHint: '15 modulo 2 is 1 (not 0). Notice the unindented print statement at the end that runs regardless of the condition!',
    explanation: '15 % 2 equals 1 != 0, so the condition evaluates to False and the else block prints "Odd". The subsequent statement print(x * 2) is outside the if block and outputs 30.'
  },
  {
    id: 'q-comp-8',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterId: 'comp-ch6',
    chapterTitle: 'HTML & Web Page Development Basics',
    topic: 'HTML Container vs Empty Elements',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'In HTML, tags like <h1> and <p> that require both opening and closing tags are called ____ elements, whereas tags like <br> and <img> that do not have closing tags are called ____ elements.',
    correctBlanks: ['container', 'empty'],
    mantraHint: 'Container holds content inside; empty tags contain no enclosed text.',
    explanation: 'Container elements (e.g., <div>, <p>, <b>) encapsulate content between opening and closing tags. Empty elements (e.g., <br>, <hr>, <img>) require no closing tag.'
  },

  // ================= MULTI-GRADE QUESTIONS (GRADES 2 TO 6) =================
  // Grade 6
  {
    id: 'q-comp-g6-1',
    subjectId: 'computers',
    gradeLevel: '6',
    chapterId: 'comp-g6-ch1',
    chapterTitle: 'Computer Categories & Generations',
    topic: 'Generations of Computers',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'First Generation computers (like ENIAC and UNIVAC) used which electronic technology as their main internal memory and switching component?',
    options: ['Transistors', 'Vacuum Tubes', 'Integrated Circuits (ICs)', 'Microprocessors'],
    correctOptionIndex: 1,
    mantraHint: 'Large glass bulbs that generated tremendous heat and consumed massive electricity in the 1940s.',
    explanation: 'First generation computers used Vacuum Tubes. Second generation replaced them with Transistors, and Third generation used Integrated Circuits (ICs).'
  },
  // Grade 5
  {
    id: 'q-comp-g5-1',
    subjectId: 'computers',
    gradeLevel: '5',
    chapterId: 'comp-g5-ch1',
    chapterTitle: 'Evolution of Computers & Software Types',
    topic: 'Father of Computers',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Who is recognized as the "Father of Computers" for designing the concept of the Analytical Engine with input, mill, store, and output?',
    options: ['Blaise Pascal', 'Charles Babbage', 'Ada Lovelace', 'Alan Turing'],
    correctOptionIndex: 1,
    mantraHint: 'British mathematician who designed the Difference Engine and Analytical Engine in the 19th century.',
    explanation: 'Charles Babbage is honored as the Father of Computers because his Analytical Engine incorporated the fundamental architecture of modern computers.'
  },
  // Grade 4
  {
    id: 'q-comp-g4-1',
    subjectId: 'computers',
    gradeLevel: '4',
    chapterId: 'comp-g4-ch1',
    chapterTitle: 'Memory & Storage Devices',
    topic: 'Units of Memory',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'A group of 8 bits is equal to 1 ____, which is enough to store a single typed letter or symbol.',
    correctBlanks: ['Byte', 'byte'],
    mantraHint: 'Starts with B; 1024 of these make a Kilobyte.',
    explanation: '8 bits equal 1 Byte. 1 Byte represents a single character (such as "A" or "7") in standard ASCII encoding.'
  },
  // Grade 3
  {
    id: 'q-comp-g3-1',
    subjectId: 'computers',
    gradeLevel: '3',
    chapterId: 'comp-g3-ch1',
    chapterTitle: 'Hardware vs Software & Desktop Basics',
    topic: 'Hardware Definition',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'The physical parts of a computer that you can see, touch, and feel (like mouse, keyboard, and printer) are called software.',
    correctBoolean: false,
    mantraHint: 'Things you can touch are hard (Hardware). Programs like MS Paint are Software.',
    explanation: 'False. Physical components that can be seen and touched are called Hardware. Software refers to computer programs that tell the hardware what to do.'
  },
  // Grade 2
  {
    id: 'q-comp-g2-1',
    subjectId: 'computers',
    gradeLevel: '2',
    chapterId: 'comp-g2-ch1',
    chapterTitle: 'Computer: A Wonderful Smart Machine',
    topic: 'Brain of the Computer',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which part of the computer is known as the "Brain of the Computer" that does all the thinking and calculations?',
    options: ['Monitor', 'Mouse', 'CPU', 'Keyboard'],
    correctOptionIndex: 2,
    mantraHint: 'Three letters: Central Processing Unit.',
    explanation: 'The CPU (Central Processing Unit) is the brain of the computer that controls all operations and processes instructions.'
  },
  ...CBSE_COMMERCE_QUESTION_BANK,
  ...EXTRA_QUESTIONS,
  ...JUNIOR_QUESTIONS
];

