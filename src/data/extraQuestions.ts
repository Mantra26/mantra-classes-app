import { Question } from '../types';

export const EXTRA_QUESTIONS: Question[] = [
  // ==========================================
  // MATHEMATICS - EXTRA QUESTIONS (GRADE 7)
  // ==========================================
  // math-ch1: Integers & Operations
  {
    id: 'q-math-ch1-extra-1',
    subjectId: 'mathematics',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    topic: 'Distributive Property & BODMAS',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Evaluate using the distributive property: (-35) × 72 + (-35) × 28.',
    options: ['-3500', '3500', '-350', '2800'],
    correctOptionIndex: 0,
    mantraHint: 'Factor out (-35) as common: a × (b + c). Observe that 72 + 28 = 100!',
    explanation: 'Taking (-35) common: (-35) × (72 + 28) = (-35) × 100 = -3500. This avoids lengthy calculations.'
  },
  {
    id: 'q-math-ch1-extra-2',
    subjectId: 'mathematics',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    topic: 'Temperature Elevation Word Problem',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'At 6:00 AM, the temperature in Dras (Ladakh) was -12°C. By noon, it climbed by 8°C, and by midnight it fell by 6°C. What was the temperature at midnight?',
    options: ['-10°C', '-14°C', '-4°C', '+2°C'],
    correctOptionIndex: 0,
    mantraHint: 'Calculate: -12 + 8 - 6.',
    explanation: 'Initial temp = -12°C. At noon: -12 + 8 = -4°C. At midnight: -4 - 6 = -10°C.'
  },
  {
    id: 'q-math-ch1-extra-3',
    subjectId: 'mathematics',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    topic: 'Integer Multiplication Signs',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'The product of five negative integers and four positive integers is always a negative integer.',
    correctBoolean: true,
    mantraHint: 'Count the negative factors. Is 5 odd or even? An odd number of negative signs yields a negative product.',
    explanation: 'True. Multiplying an odd number of negative numbers (here, 5) yields a negative product. The positive integers do not change the sign.'
  },
  {
    id: 'q-math-ch1-extra-4',
    subjectId: 'mathematics',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    topic: 'Additive Identity and Multiplicative Identity',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'The additive identity for integers is ____, while the multiplicative identity for integers is ____.',
    correctBlanks: ['0 and 1', '0, 1', '0', '1'],
    mantraHint: 'What number added to a leaves a unchanged? What number multiplied by a leaves a unchanged?',
    explanation: 'For any integer a, a + 0 = a (so 0 is additive identity) and a × 1 = a (so 1 is multiplicative identity).'
  },
  {
    id: 'q-math-ch1-extra-5',
    subjectId: 'mathematics',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    topic: 'Multi-Bracket BODMAS Simplification',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'Simplify step-by-step: 42 - [18 - {15 - (6 - 2 × 4)}].',
    sampleAnswer: '41',
    markingCriteria: [
      'Solve multiplication inside round brackets 2 × 4 = 8, then 6 - 8 = -2 (1 mark)',
      'Solve curly bracket {15 - (-2)} = 15 + 2 = 17 (1 mark)',
      'Solve square bracket 18 - 17 = 1, and final 42 - 1 = 41 (1 mark)'
    ],
    mantraHint: 'Follow BODMAS strictly: solve (round brackets) with 2 × 4 first, then {curly brackets}, then [square brackets].',
    explanation: 'Step 1: (6 - 2 × 4) = (6 - 8) = -2.\nStep 2: {15 - (-2)} = {15 + 2} = 17.\nStep 3: [18 - 17] = 1.\nFinal: 42 - 1 = 41.'
  },

  // math-ch2: Fractions & Decimals
  {
    id: 'q-math-ch2-extra-1',
    subjectId: 'mathematics',
    chapterId: 'math-ch2',
    chapterTitle: 'Fractions & Decimals',
    topic: 'Division of Mixed Fractions',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Evaluate: (4 2/5) ÷ (2 1/5) in lowest terms.',
    options: ['2', '2 1/5', '1 4/5', '3'],
    correctOptionIndex: 0,
    mantraHint: 'Convert both to improper fractions: 4 2/5 = 22/5 and 2 1/5 = 11/5. Then invert and multiply!',
    explanation: '(22/5) ÷ (11/5) = (22/5) × (5/11) = 22 / 11 = 2.'
  },
  {
    id: 'q-math-ch2-extra-2',
    subjectId: 'mathematics',
    chapterId: 'math-ch2',
    chapterTitle: 'Fractions & Decimals',
    topic: 'Reciprocals & Proper Fractions',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'The reciprocal of a proper fraction (such as 3/7) is always an improper fraction whose value is greater than 1.',
    correctBoolean: true,
    mantraHint: 'In a proper fraction, numerator < denominator. Flipping it creates numerator > denominator.',
    explanation: 'True. In 3/7, 3 < 7. Its reciprocal 7/3 is an improper fraction equal to 2 1/3, which is greater than 1.'
  },
  {
    id: 'q-math-ch2-extra-3',
    subjectId: 'mathematics',
    chapterId: 'math-ch2',
    chapterTitle: 'Fractions & Decimals',
    topic: 'Decimal Multiplication',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'The product of 0.08 × 0.025 is equal to ____.',
    correctBlanks: ['0.002', '0.00200'],
    mantraHint: 'Multiply 8 × 25 = 200. Total decimal places = 2 + 3 = 5 places.',
    explanation: '8 × 25 = 200. Moving the decimal point 5 places to the left gives 0.00200 = 0.002.'
  },
  {
    id: 'q-math-ch2-extra-4',
    subjectId: 'mathematics',
    chapterId: 'math-ch2',
    chapterTitle: 'Fractions & Decimals',
    topic: 'Word Problem on Distance',
    type: 'short_answer',
    difficulty: 'Average',
    marks: 2,
    text: 'A tailor needs 1 3/4 metres of cloth to stitch one school uniform shirt. How many shirts can he stitch from a cloth piece measuring 28 metres?',
    sampleAnswer: '16 shirts',
    markingCriteria: [
      'Convert 1 3/4 to improper fraction 7/4 (1 mark)',
      'Divide 28 ÷ (7/4) = 28 × (4/7) = 16 shirts (1 mark)'
    ],
    mantraHint: 'Total length divided by cloth per shirt.',
    explanation: 'Number of shirts = 28 ÷ (7/4) = 28 × (4/7) = 4 × 4 = 16 shirts.'
  },

  // math-ch3: Algebraic Expressions & Linear Equations
  {
    id: 'q-math-ch3-extra-1',
    subjectId: 'mathematics',
    chapterId: 'math-ch3',
    chapterTitle: 'Algebraic Expressions & Linear Equations',
    topic: 'Solving Linear Equations in One Variable',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Solve the equation for x: 7(x - 2) - 3(2x - 5) = 9.',
    options: ['x = 8', 'x = 6', 'x = 10', 'x = 4'],
    correctOptionIndex: 0,
    mantraHint: 'Expand brackets: 7x - 14 - 6x + 15 = 9. Watch the sign: -3 × -5 = +15.',
    explanation: '7x - 14 - 6x + 15 = 9 => (7x - 6x) + (-14 + 15) = 9 => x + 1 = 9 => x = 8.'
  },
  {
    id: 'q-math-ch3-extra-2',
    subjectId: 'mathematics',
    chapterId: 'math-ch3',
    chapterTitle: 'Algebraic Expressions & Linear Equations',
    topic: 'Degree of Polynomials',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'In the algebraic term 8x³y², the degree of the term is 5.',
    correctBoolean: true,
    mantraHint: 'Add exponents of all variables in the monomial: 3 + 2 = 5.',
    explanation: 'True. The degree of a term with variables x³ and y² is the sum of their powers: 3 + 2 = 5.'
  },
  {
    id: 'q-math-ch3-extra-3',
    subjectId: 'mathematics',
    chapterId: 'math-ch3',
    chapterTitle: 'Algebraic Expressions & Linear Equations',
    topic: 'Perimeter of Rectangle in Algebra',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'The length of a rectangular sports ground is 5 metres more than twice its breadth. If the perimeter is 106 metres, find its length and breadth.',
    sampleAnswer: 'Breadth = 16 m, Length = 37 m',
    markingCriteria: [
      'Let breadth = b, length = 2b + 5 (1 mark)',
      'Set equation: 2(2b + 5 + b) = 106 => 2(3b + 5) = 106 => 6b + 10 = 106 => b = 16 (1 mark)',
      'Calculate length = 2(16) + 5 = 37 m (1 mark)'
    ],
    mantraHint: 'Perimeter = 2 × (Length + Breadth). Substitute (2b + 5) for length.',
    explanation: '2[(2b + 5) + b] = 106 => 2(3b + 5) = 106 => 3b + 5 = 53 => 3b = 48 => b = 16 m. Length = 2(16) + 5 = 37 m.'
  },

  // math-ch5: Lines, Angles & Triangles
  {
    id: 'q-math-ch5-extra-1',
    subjectId: 'mathematics',
    chapterId: 'math-ch5',
    chapterTitle: 'Lines, Angles & Triangles',
    topic: 'Parallel Lines & Transversals',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Two parallel lines are cut by a transversal. If one interior angle is 72°, what is the measure of the alternate interior angle?',
    options: ['72°', '108°', '18°', '90°'],
    correctOptionIndex: 0,
    mantraHint: 'Alternate interior angles formed by parallel lines and a transversal are always equal (Z-pattern).',
    explanation: 'When two parallel lines are intersected by a transversal, alternate interior angles are equal. Hence the angle is 72°.'
  },
  {
    id: 'q-math-ch5-extra-2',
    subjectId: 'mathematics',
    chapterId: 'math-ch5',
    chapterTitle: 'Lines, Angles & Triangles',
    topic: 'Triangle Angle Sum Property',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'In any triangle, the sum of all three interior angles is always equal to ____ degrees or two right angles.',
    correctBlanks: ['180', '180°'],
    mantraHint: 'Fundamental geometric postulate for plane triangles.',
    explanation: 'Angle sum of any triangle in Euclidean plane geometry is 180° (or π radians).'
  },
  {
    id: 'q-math-ch5-extra-3',
    subjectId: 'mathematics',
    chapterId: 'math-ch5',
    chapterTitle: 'Lines, Angles & Triangles',
    topic: 'Exterior Angle Theorem',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'The exterior angle of a triangle is always strictly greater than each of its interior opposite angles.',
    correctBoolean: true,
    mantraHint: 'Exterior angle = Interior Opposite 1 + Interior Opposite 2. Since angles are positive, it exceeds either one.',
    explanation: 'True. An exterior angle equals the sum of two positive interior opposite angles, so it is strictly greater than each individual opposite angle.'
  },

  // ==========================================
  // PHYSICS - EXTRA QUESTIONS (GRADE 7)
  // ==========================================
  // phy-ch1: Physical Quantities & Measurement
  {
    id: 'q-phy-ch1-extra-1',
    subjectId: 'physics',
    chapterId: 'phy-ch1',
    chapterTitle: 'Physical Quantities & Measurement',
    topic: 'Density & Water Displacement',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'A metal crown of mass 386 g is lowered into a measuring cylinder. The water level rises from 80 cm³ to 100 cm³. What is the density of the crown?',
    options: ['19.3 g/cm³', '12.5 g/cm³', '8.9 g/cm³', '10.5 g/cm³'],
    correctOptionIndex: 0,
    mantraHint: 'Volume = 100 - 80 = 20 cm³. Density = Mass / Volume. Notice 19.3 g/cm³ is the exact density of pure Gold!',
    explanation: 'Displaced volume = 100 - 80 = 20 cm³. Density = 386 g / 20 cm³ = 19.3 g/cm³ (pure gold density).'
  },
  {
    id: 'q-phy-ch1-extra-2',
    subjectId: 'physics',
    chapterId: 'phy-ch1',
    chapterTitle: 'Physical Quantities & Measurement',
    topic: 'Density of Water Anomaly',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'Water has its maximum density of 1.0 g/cm³ (1000 kg/m³) at a temperature of 4°C due to anomalous expansion.',
    correctBoolean: true,
    mantraHint: 'Between 0°C and 4°C, water contracts on heating instead of expanding.',
    explanation: 'True. Water reaches its maximum density of 1000 kg/m³ at 4°C, which allows aquatic organisms to survive in deep lakes during freezing winters.'
  },
  {
    id: 'q-phy-ch1-extra-3',
    subjectId: 'physics',
    chapterId: 'phy-ch1',
    chapterTitle: 'Physical Quantities & Measurement',
    topic: 'Speed & Conversion Formula',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'To convert speed from km/h to m/s, we multiply the value by the fraction ____.',
    correctBlanks: ['5/18', '5 / 18'],
    mantraHint: '1000 m / 3600 s = 5/18.',
    explanation: '1 km/h = 1000 m / 3600 s = 5/18 m/s. For example, 72 km/h × (5/18) = 20 m/s.'
  },

  // phy-ch3: Energy & Simple Machines
  {
    id: 'q-phy-ch3-extra-1',
    subjectId: 'physics',
    chapterId: 'phy-ch3',
    chapterTitle: 'Energy & Simple Machines',
    topic: 'Order of Lever Classes',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which of the following implements is an example of a Class II lever (where Load is in the middle)?',
    options: ['Wheelbarrow and Nutcracker', 'Scissors and See-saw', 'Sugar tongs and Fishing rod', 'Crowbar and Claw hammer'],
    correctOptionIndex: 0,
    mantraHint: 'Class II = Load in middle (FLE acronym). Effort on one side, fulcrum on the other.',
    explanation: 'A wheelbarrow and nutcracker have the Load situated in the center between Fulcrum (pivot) and Effort, giving Mechanical Advantage > 1.'
  },
  {
    id: 'q-phy-ch3-extra-2',
    subjectId: 'physics',
    chapterId: 'phy-ch3',
    chapterTitle: 'Energy & Simple Machines',
    topic: 'Efficiency of Real Machines',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'The efficiency of any practical machine in the real world is always strictly less than 100% because of friction and weight of moving parts.',
    correctBoolean: true,
    mantraHint: 'No real machine is ideal. Some energy is always dissipated as heat due to friction.',
    explanation: 'True. In practical machines, Work Output < Work Input due to friction and the weight of machine components, making efficiency η < 100%.'
  },
  {
    id: 'q-phy-ch3-extra-3',
    subjectId: 'physics',
    chapterId: 'phy-ch3',
    chapterTitle: 'Energy & Simple Machines',
    topic: 'Forms of Energy Transformation',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'In an electric hydroelectric generator, the falling water transforms its potential energy into kinetic energy, which rotates turbines to produce ____ energy.',
    correctBlanks: ['electrical', 'electrical energy'],
    mantraHint: 'The final usable output from a power station.',
    explanation: 'Hydroelectric plants convert gravitational potential energy of stored water into mechanical kinetic energy of turbines, which generators convert into electrical energy.'
  },

  // phy-ch5: Heat & Temperature Transfer
  {
    id: 'q-phy-ch5-extra-1',
    subjectId: 'physics',
    chapterId: 'phy-ch5',
    chapterTitle: 'Heat & Temperature Transfer',
    topic: 'Radiation and Absorbers',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Why are solar water heater panels and cooking utensil bottoms painted dull black?',
    options: [
      'Black surfaces are the best absorbers and emitters of radiant heat',
      'Black paint reflects heat rays away to prevent burning',
      'Black color conducts electricity faster to the food',
      'Black surfaces keep food warm by preventing conduction'
    ],
    correctOptionIndex: 0,
    mantraHint: 'Dark and rough surfaces absorb maximum infrared radiation.',
    explanation: 'Dull black surfaces are excellent absorbers and emitters of thermal radiation, maximizing heat capture in solar devices.'
  },
  {
    id: 'q-phy-ch5-extra-2',
    subjectId: 'physics',
    chapterId: 'phy-ch5',
    chapterTitle: 'Heat & Temperature Transfer',
    topic: 'Sea Breeze Convection Cycle',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'A Sea Breeze blows during daytime because the land heats up faster than water, causing hot air over the ground to rise and draw cooler sea air inland.',
    correctBoolean: true,
    mantraHint: 'Water has a much higher specific heat capacity than soil, so land warms up rapidly under the daytime sun.',
    explanation: 'True. Convection currents created by the differential daytime heating of land and sea produce the refreshing daytime sea breeze.'
  },

  // ==========================================
  // CHEMISTRY - EXTRA QUESTIONS (GRADE 7)
  // ==========================================
  // chem-ch1: Matter and Its Composition
  {
    id: 'q-chem-ch1-extra-1',
    subjectId: 'chemistry',
    chapterId: 'chem-ch1',
    chapterTitle: 'Matter and Its Composition',
    topic: 'Kinetic Theory of Matter',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'According to the Kinetic Molecular Theory of Matter, what happens to the motion of constituent particles when a liquid is heated?',
    options: [
      'Their kinetic energy increases and they move faster, overcoming intermolecular attractions',
      'Their kinetic energy decreases and they settle down firmly',
      'Their mass increases by absorbing thermal energy',
      'They stop vibrating and fuse into solid crystals'
    ],
    correctOptionIndex: 0,
    mantraHint: 'Heat is thermal energy that increases the speed (kinetic energy) of particles.',
    explanation: 'Heating increases kinetic energy of molecules. In liquids, molecules move with greater velocity, expanding the liquid and eventually overcoming attractions to vaporize.'
  },
  {
    id: 'q-chem-ch1-extra-2',
    subjectId: 'chemistry',
    chapterId: 'chem-ch1',
    chapterTitle: 'Matter and Its Composition',
    topic: 'Sublimation Examples',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'Common chemical substances that directly undergo sublimation without melting into liquid are Camphor, Naphthalene, and ____ chloride.',
    correctBlanks: ['Ammonium', 'ammonium'],
    mantraHint: 'NH4Cl sublimes into white dense fumes on heating.',
    explanation: 'Ammonium chloride (NH₄Cl), camphor, and iodine sublime directly from solid state to gaseous state upon heating.'
  },

  // chem-ch3: Elements, Compounds & Mixtures
  {
    id: 'q-chem-ch3-extra-1',
    subjectId: 'chemistry',
    chapterId: 'chem-ch3',
    chapterTitle: 'Elements, Compounds & Mixtures',
    topic: 'Compounds vs Mixtures',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'When iron filings and sulfur powder are mixed cold, they form a mixture. But when strongly heated, they react to form Iron(II) sulfide (FeS). Which statement is TRUE about FeS?',
    options: [
      'FeS is a compound with fixed chemical properties and iron cannot be separated by a magnet',
      'FeS is a mixture and sulfur dissolves easily in carbon disulfide',
      'FeS retains the individual magnetic properties of iron',
      'FeS can be separated into iron and sulfur using simple filtration'
    ],
    correctOptionIndex: 0,
    mantraHint: 'A chemical reaction forms a new compound with completely new properties.',
    explanation: 'FeS is a new chemical compound formed by chemical bonding. Iron loses its magnetic property and sulfur loses its solubility in CS₂.'
  },
  {
    id: 'q-chem-ch3-extra-2',
    subjectId: 'chemistry',
    chapterId: 'chem-ch3',
    chapterTitle: 'Elements, Compounds & Mixtures',
    topic: 'Chromatography Separation',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'Paper chromatography separates colored pigments in black ink based on their differing solubilities in a moving solvent phase.',
    correctBoolean: true,
    mantraHint: 'More soluble dyes travel faster and farther up the chromatography paper strip.',
    explanation: 'True. Paper chromatography separates solutes based on their differential migration rates through a stationary absorbent paper medium.'
  },

  // chem-ch5: Language of Chemistry & Equations
  {
    id: 'q-chem-ch5-extra-1',
    subjectId: 'chemistry',
    chapterId: 'chem-ch5',
    chapterTitle: 'Language of Chemistry & Equations',
    topic: 'Law of Conservation of Mass',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'A chemical equation must always be balanced so that the total number of atoms of each element on the reactant side equals that on the product side (Law of Conservation of Mass).',
    correctBoolean: true,
    mantraHint: 'Matter cannot be created or destroyed in a chemical reaction.',
    explanation: 'True. Balancing equations enforces Antoine Lavoisier\'s Law of Conservation of Mass: mass of reactants = mass of products.'
  },
  {
    id: 'q-chem-ch5-extra-2',
    subjectId: 'chemistry',
    chapterId: 'chem-ch5',
    chapterTitle: 'Language of Chemistry & Equations',
    topic: 'Formula Writing with Radicals',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'The chemical formula of Calcium Phosphate (where Calcium valency is 2 and Phosphate PO₄ valency is 3) is Ca₃(____)₂.',
    correctBlanks: ['PO4', 'PO₄'],
    mantraHint: 'Criss-cross valencies: Ca has 2, PO4 has 3. Formula is Ca3(PO4)2.',
    explanation: 'By the criss-cross method: Ca²⁺ and (PO₄)³⁻ combine to give Ca₃(PO₄)₂.'
  },

  // ==========================================
  // BIOLOGY - EXTRA QUESTIONS (GRADE 7)
  // ==========================================
  // bio-ch1: Plant & Animal Tissues
  {
    id: 'q-bio-ch1-extra-1',
    subjectId: 'biology',
    chapterId: 'bio-ch1',
    chapterTitle: 'Plant & Animal Tissues',
    topic: 'Plant Tissue Functions',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which dead sclerenchymatous tissue provides high mechanical rigidity and tensile strength to coconut husks (coir)?',
    options: ['Sclerenchyma fibers', 'Collenchyma cells', 'Parenchyma storage', 'Aerenchyma spongy cells'],
    correctOptionIndex: 0,
    mantraHint: 'Thick lignified dead cell walls with no protoplasm.',
    explanation: 'Sclerenchyma cells have heavily thickened, lignified secondary walls that provide structural support and rigidity to parts like coconut husks and walnut shells.'
  },
  {
    id: 'q-bio-ch1-extra-2',
    subjectId: 'biology',
    chapterId: 'bio-ch1',
    chapterTitle: 'Plant & Animal Tissues',
    topic: 'Types of Muscle Tissues',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'Cardiac muscles found in the human heart are involuntary, striated, and possess branched fibers that work rhythmically without getting fatigued.',
    correctBoolean: true,
    mantraHint: 'Heart pumps non-stop 24/7 throughout life without muscular fatigue.',
    explanation: 'True. Cardiac muscle tissue is striated and involuntary with intercalated discs connecting branched fibers, contracting continuously without fatigue.'
  },

  // bio-ch3: Respiration in Organisms
  {
    id: 'q-bio-ch3-extra-1',
    subjectId: 'biology',
    chapterId: 'bio-ch3',
    chapterTitle: 'Respiration in Organisms',
    topic: 'Alveoli Function in Lungs',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Why do human lungs contain millions of microscopic sac-like Alveoli surrounded by dense capillary networks?',
    options: [
      'To provide a huge surface area for rapid gas diffusion between air and blood',
      'To filter out large dust particles from inhaled air',
      'To store large volumes of excess carbon dioxide permanently',
      'To manufacture red blood cells using inhaled nitrogen'
    ],
    correctOptionIndex: 0,
    mantraHint: 'Surface area of all human alveoli combined equals roughly half a tennis court!',
    explanation: 'Alveoli create an expansive, ultra-thin, moist respiratory surface (~80 m²) facilitating rapid O₂ uptake and CO₂ release across capillary walls.'
  },
  {
    id: 'q-bio-ch3-extra-2',
    subjectId: 'biology',
    chapterId: 'bio-ch3',
    chapterTitle: 'Respiration in Organisms',
    topic: 'Cellular Respiration Products',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'Aerobic cellular respiration breaks down 1 molecule of glucose in the presence of oxygen to produce carbon dioxide, water, and ____ molecules of ATP energy.',
    correctBlanks: ['38', '36', '38 ATP'],
    mantraHint: 'Cellular energy currency (ATP).',
    explanation: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP (net 36-38 ATP molecules per glucose molecule).'
  },

  // bio-ch5: Excretion in Humans & Animals
  {
    id: 'q-bio-ch5-extra-1',
    subjectId: 'biology',
    chapterId: 'bio-ch5',
    chapterTitle: 'Excretion in Humans & Animals',
    topic: 'Artificial Kidney / Dialysis',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'When a patient suffers from complete renal (kidney) failure, which medical procedure filters out accumulated toxic urea and metabolic waste from the bloodstream?',
    options: ['Hemodialysis', 'Electrocardiography (ECG)', 'Angioplasty', 'Endoscopy'],
    correctOptionIndex: 0,
    mantraHint: 'Hemo = blood; Dialysis = selective diffusion across semipermeable membranes.',
    explanation: 'Hemodialysis circulates patient blood through an artificial kidney machine containing cellophane tubes bathed in dialysate to remove nitrogenous urea by diffusion.'
  },

  // ==========================================
  // COMPUTERS - EXTRA QUESTIONS (GRADE 7)
  // ==========================================
  // comp-ch1: Computer Hardware Fundamentals
  {
    id: 'q-comp-ch1-extra-3',
    subjectId: 'computers',
    chapterId: 'comp-ch1',
    chapterTitle: 'Computer Hardware Fundamentals',
    topic: 'Motherboard & Bus Architecture',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'The main circuit board inside a computer that connects the CPU, memory, expansion cards, and storage devices is called the ____.',
    correctBlanks: ['Motherboard', 'motherboard', 'system board'],
    mantraHint: 'The parent board of the whole system.',
    explanation: 'The Motherboard (system board) holds the processor socket, chipset, memory slots, and data buses connecting all internal components.'
  },
  // comp-ch2: Number Systems
  {
    id: 'q-comp-ch2-extra-3',
    subjectId: 'computers',
    chapterId: 'comp-ch2',
    chapterTitle: 'Number Systems',
    topic: 'Binary Addition',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'What is the sum of two binary numbers: (101)₂ + (011)₂?',
    options: ['(1000)₂', '(110)₂', '(111)₂', '(1010)₂'],
    correctOptionIndex: 0,
    mantraHint: '101 in decimal is 5; 011 in decimal is 3. 5 + 3 = 8. What is 8 in binary?',
    explanation: 'In decimal, 5 + 3 = 8. In binary, 8 = (1000)₂. Using binary addition rules: 1+1=0 (carry 1); 0+1+1=0 (carry 1); 1+0+1=0 (carry 1) giving 1000₂.'
  },
  // comp-ch3: Computer Virus & Cybersecurity
  {
    id: 'q-comp-ch3-extra-3',
    subjectId: 'computers',
    chapterId: 'comp-ch3',
    chapterTitle: 'Computer Virus: Threats & Protection',
    topic: 'Worms vs Viruses',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'Unlike a conventional virus that requires a host program or user action to execute, a Computer Worm can replicate and propagate itself autonomously across computer networks.',
    correctBoolean: true,
    mantraHint: 'Worms are standalone self-replicating malware that spread via network ports without human intervention.',
    explanation: 'True. Computer worms do not require a host program; they replicate automatically across computer networks, consuming network bandwidth.'
  },
  // comp-ch4: Ethics & Cyber Safety
  {
    id: 'q-comp-ch4-extra-3',
    subjectId: 'computers',
    chapterId: 'comp-ch4',
    chapterTitle: 'Ethics and Safety in Computing',
    topic: 'Digital Footprint & Privacy',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'The trail of personal data, browsing history, social media posts, and IP location left behind whenever you use the internet is called your:',
    options: ['Digital Footprint', 'Cyber Sandbox', 'Virtual Firewall', 'Cache Buffer'],
    correctOptionIndex: 0,
    mantraHint: 'Just like footprints left on wet beach sand.',
    explanation: 'A Digital Footprint includes all passive and active traces of your digital activity recorded by search engines, social media, and web trackers.'
  },
  // comp-ch5: Spreadsheets & Formulas
  {
    id: 'q-comp-ch5-extra-3',
    subjectId: 'computers',
    chapterId: 'comp-ch5',
    chapterTitle: 'Spreadsheets: Microsoft Excel Essentials',
    topic: 'Statistical Functions',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which Microsoft Excel function counts the number of non-empty cells in the cell range A1:A20 that contain numerical values?',
    options: ['COUNT(A1:A20)', 'SUM(A1:A20)', 'COUNTA(A1:A20)', 'TOTAL(A1:A20)'],
    correctOptionIndex: 0,
    mantraHint: 'COUNT evaluates numbers only; COUNTA counts all non-empty cells including text.',
    explanation: 'The COUNT() function counts cells in a range that contain numbers. SUM adds their values, while COUNTA counts all non-blank cells.'
  },
  // comp-ch6: Database Management & SQL
  {
    id: 'q-comp-ch6-extra-3',
    subjectId: 'computers',
    chapterId: 'comp-ch6',
    chapterTitle: 'Database Management: MS Access & SQL Basics',
    topic: 'Foreign Key Relationship',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'A Foreign Key in a database table is a field that matches the Primary Key of another table, creating a relational link between the two tables.',
    correctBoolean: true,
    mantraHint: 'Foreign Key establishes referential integrity between parent and child tables in an RDBMS.',
    explanation: 'True. A Foreign Key references the Primary Key column of a related table, maintaining referential integrity in relational database systems (RDBMS).'
  },

  // ==========================================
  // ENGLISH - EXTRA QUESTIONS (GRADE 7)
  // ==========================================
  {
    id: 'q-eng-ch1-extra-3',
    subjectId: 'english',
    chapterId: 'eng-ch1',
    chapterTitle: 'Advanced Grammar: Tenses & Active-Passive Voice',
    topic: 'Indirect Speech / Reported Speech',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Convert into indirect speech: The teacher said to the students, "The Earth orbits around the Sun."',
    options: [
      'The teacher told the students that the Earth orbits around the Sun.',
      'The teacher told the students that the Earth orbited around the Sun.',
      'The teacher said the students that the Earth was orbiting the Sun.',
      'The teacher asked the students if the Earth orbits the Sun.'
    ],
    correctOptionIndex: 0,
    mantraHint: 'Universal scientific truths and habitual facts do not change their present tense in reported speech.',
    explanation: 'Since the Earth orbiting the Sun is a universal scientific fact, its tense remains simple present (orbits) in indirect speech.'
  },

  // ==========================================
  // HISTORY & CIVICS - EXTRA QUESTIONS (GRADE 7)
  // ==========================================
  {
    id: 'q-hist-ch3-extra-2',
    subjectId: 'history_civics',
    chapterId: 'hist-ch3',
    chapterTitle: 'The Delhi Sultanate & Slave Dynasty',
    topic: 'Market Reforms of Alauddin Khilji',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which ruler of the Delhi Sultanate established strict market regulations, fixed prices for food grains and horses, and appointed intelligence officers called Barids and Munhias?',
    options: ['Alauddin Khilji', 'Balban', 'Muhammad bin Tughlaq', 'Feroz Shah Tughlaq'],
    correctOptionIndex: 0,
    mantraHint: 'Khilji dynasty ruler who implemented the Shahna-i-Mandi market control system to maintain a massive standing army.',
    explanation: 'Alauddin Khilji introduced comprehensive price controls and market monitoring (under Shahna-i-Mandi) in Delhi to maintain a large, low-cost standing army against Mongol invasions.'
  },

  // ==========================================
  // GEOGRAPHY - EXTRA QUESTIONS (GRADE 7)
  // ==========================================
  {
    id: 'q-geo-ch1-extra-2',
    subjectId: 'geography',
    chapterId: 'geo-ch1',
    chapterTitle: 'Representation of Geographical Features',
    topic: 'Conventional Signs and Colors',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'On standard Survey of India topographical sheets, forested and vegetated areas are printed in ____ color, while cultivated agricultural lands are printed in ____ color.',
    correctBlanks: ['green and yellow', 'green, yellow'],
    mantraHint: 'Green for forests; Yellow for farmed agricultural land; Brown for contours.',
    explanation: 'Topographical sheets use international cartographic colors: Green represents forests and scrub; Yellow represents cultivated lands; Blue represents water bodies.'
  }
];
