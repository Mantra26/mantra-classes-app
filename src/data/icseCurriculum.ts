import { Subject, Chapter } from '../types';
import { CBSE_COMMERCE_SUBJECTS, CBSE_COMMERCE_CHAPTERS } from './cbseCommerceCurriculum';
import { NEW_SUBJECTS, NEW_SUBJECTS_CHAPTERS } from './newSubjectsCurriculum';

export const ICSE_SUBJECTS: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    code: 'MATH-CORE',
    iconName: 'Calculator',
    color: '#4f46e5',
    bgGradient: 'from-indigo-600 to-blue-700',
    description: 'Number Systems, Arithmetic, Algebra, Geometry, Calculus & Mensuration across ICSE and CBSE boards.',
    chapterCount: 6,
    grades: ['2', '3', '4', '5', '6', '7', '11', '12'],
    boards: ['ICSE', 'CBSE']
  },
  {
    id: 'computers',
    name: 'Computer Applications',
    code: 'COMP-CORE',
    iconName: 'Laptop',
    color: '#7c3aed',
    bgGradient: 'from-violet-600 to-purple-800',
    description: 'Hardware, Binary Systems, Scratch & Python Coding, Flowcharts, Web Basics & Cyber Safety.',
    chapterCount: 6,
    grades: ['2', '3', '4', '5', '6', '7', '11', '12'],
    boards: ['ICSE', 'CBSE']
  },
  {
    id: 'english',
    name: 'English Language & Core',
    code: 'ENG-CORE',
    iconName: 'BookOpen',
    color: '#d97706',
    bgGradient: 'from-amber-600 to-orange-700',
    description: 'Grammar mastery (Tenses, Voice, Parts of Speech), Reading Comprehension, and Advanced Composition.',
    chapterCount: 4,
    grades: ['2', '3', '4', '5', '6', '7', '11', '12'],
    boards: ['ICSE', 'CBSE']
  },
  ...CBSE_COMMERCE_SUBJECTS,
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHY-ICSE',
    iconName: 'Zap',
    color: '#0284c7',
    bgGradient: 'from-sky-600 to-cyan-700',
    description: 'Physical Quantities, Motion, Energy, Light & Heat with interactive ray diagrams and experiments.',
    chapterCount: 5,
    grades: ['6', '7'],
    boards: ['ICSE', 'CBSE']
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'CHEM-ICSE',
    iconName: 'FlaskConical',
    color: '#059669',
    bgGradient: 'from-emerald-600 to-teal-700',
    description: 'Matter & Composition, Elements, Compounds, Chemical Equations, and Air & Water.',
    chapterCount: 5,
    grades: ['6', '7'],
    boards: ['ICSE', 'CBSE']
  },
  {
    id: 'biology',
    name: 'Biology / Science',
    code: 'BIO-ICSE',
    iconName: 'Leaf',
    color: '#16a34a',
    bgGradient: 'from-green-600 to-emerald-800',
    description: 'Plant & Animal Life, Human Body, Ecosystems, Respiration & Classification.',
    chapterCount: 5,
    grades: ['2', '3', '4', '5', '6', '7'],
    boards: ['ICSE', 'CBSE']
  },
  {
    id: 'history_civics',
    name: 'History & Civics / Social',
    code: 'HIST-ICSE',
    iconName: 'Landmark',
    color: '#e11d48',
    bgGradient: 'from-rose-600 to-pink-700',
    description: 'Indian Heritage, Medieval India, Constitution, Community & Civic Duties.',
    chapterCount: 4,
    grades: ['3', '4', '5', '6', '7'],
    boards: ['ICSE', 'CBSE']
  },
  {
    id: 'geography',
    name: 'Geography & Environment',
    code: 'GEO-ICSE',
    iconName: 'Globe',
    color: '#0d9488',
    bgGradient: 'from-teal-600 to-cyan-800',
    description: 'Maps & Globes, Weather, Continents, Natural Resources and Earth Sciences.',
    chapterCount: 4,
    grades: ['3', '4', '5', '6', '7'],
    boards: ['ICSE', 'CBSE']
  },
  ...NEW_SUBJECTS
];

export const ICSE_CHAPTERS: Chapter[] = [
  // ================= MATHEMATICS =================
  {
    id: 'math-ch1',
    subjectId: 'mathematics',
    chapterNumber: 1,
    title: 'Integers & Operations',
    summary: 'Rules of addition, subtraction, multiplication, and division of positive and negative integers. Properties such as Closure, Commutative, Associative, and Distributive law. Application in real-life problems like temperature and elevation.',
    keyConcepts: [
      'Multiplication of two negative integers yields a positive integer: (-a) * (-b) = a*b',
      'Distributive property of multiplication over addition: a * (b + c) = (a * b) + (a * c)',
      'Division by zero is undefined; 0 divided by any non-zero integer is 0',
      'BODMAS rule priority: Brackets, Order, Division, Multiplication, Addition, Subtraction'
    ],
    keyFormulasOrTerms: [
      { term: 'Additive Identity', definition: 'Zero (0) is the additive identity because a + 0 = a' },
      { term: 'Multiplicative Identity', definition: 'One (1) is the multiplicative identity because a * 1 = a' },
      { term: 'Additive Inverse', definition: 'The number which when added gives 0. For integer a, its inverse is -a' },
      { term: 'Modulus / Absolute Value', definition: '|x| represents the numerical value of x irrespective of its sign' },
    ],
    resources: [
      {
        type: 'video',
        title: 'Mastering Integers & BODMAS with Uma Shukla',
        durationOrPages: '24 mins',
        videoUrl: 'https://www.youtube.com/embed/V5Y40w2W3_I',
        description: 'Comprehensive walkthrough solving tricky bracket simplification, signs multiplication, and submarine word problems.'
      },
      {
        type: 'ppt_presentation',
        title: 'Integers & BODMAS 6-Slide Master Presentation Deck',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'High-yield visual slides covering integer sign rules, nested brackets priority, and solved ICSE exemplars.',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14',
        slides: [
          {
            slideNumber: 1,
            title: 'Class 7 ICSE: Integers & Properties Overview',
            categoryTag: 'BOARD SYLLABUS SCOPE',
            bullets: [
              'Integers consist of whole numbers and negative natural numbers: {... -3, -2, -1, 0, 1, 2, 3 ...}',
              'Zero is neither positive nor negative; it serves as the additive identity.',
              'Tested extensively in ICSE Class 7 Paper 1 (Section A compulsory questions).',
              'Director: Uma Shukla | Mantra Classes Academic Series'
            ],
            keyHighlight: 'Target: 100% accuracy in signed arithmetic and bracket expansion.',
            examMantra: 'Always determine the final sign FIRST before multiplying the absolute numbers.'
          },
          {
            slideNumber: 2,
            title: 'Integer Multiplication Sign Rules Matrix',
            categoryTag: 'CORE MATHEMATICAL RULES',
            bullets: [
              'Positive × Positive = Positive: (+a) × (+b) = +(ab)',
              'Negative × Negative = Positive: (-a) × (-b) = +(ab)',
              'Positive × Negative = Negative: (+a) × (-b) = -(ab)',
              'Odd count of negative signs = Negative result; Even count of negative signs = Positive result.'
            ],
            tableData: {
              headers: ['First Factor', 'Second Factor', 'Sign of Product', 'ICSE Example'],
              rows: [
                ['Positive (+)', 'Positive (+)', 'Positive (+)', '(+7) × (+8) = +56'],
                ['Negative (-)', 'Negative (-)', 'Positive (+)', '(-9) × (-4) = +36'],
                ['Negative (-)', 'Positive (+)', 'Negative (-)', '(-6) × (+5) = -30'],
                ['Positive (+)', 'Negative (-)', 'Negative (-)', '(+12) × (-3) = -36']
              ]
            },
            examMantra: 'Count the negative signs in a chain: 3 negatives = minus, 4 negatives = plus!'
          },
          {
            slideNumber: 3,
            title: 'Distributive Property & Shortcuts',
            categoryTag: 'EXAM TIME-SAVER',
            bullets: [
              'Distributive law of multiplication over addition: a × (b + c) = (a × b) + (a × c)',
              'Distributive law over subtraction: a × (b - c) = (a × b) - (a × c)',
              'Taking common factor: (-25) × 37 + (-25) × 63 = (-25) × (37 + 63) = (-25) × 100 = -2500'
            ],
            diagramBox: {
              label: 'Essential Properties Checklist',
              items: [
                { term: 'Closure Property', explanation: 'Sum and product of two integers is always an integer.' },
                { term: 'Commutative Law', explanation: 'a + b = b + a and a × b = b × a (Division is NOT commutative!).' },
                { term: 'Associative Law', explanation: '(a + b) + c = a + (b + c) for addition and multiplication.' }
              ]
            },
            examMantra: 'Look for factors that sum to 10, 50, or 100 to apply distributive law in 5 seconds.'
          },
          {
            slideNumber: 4,
            title: 'BODMAS Rule & Nested Bracket Hierarchy',
            categoryTag: 'BRACKET PRIORITY ORDER',
            bullets: [
              'Order of brackets: 1. Bar/Vinculum (), 2. Round brackets ( ), 3. Curly brackets { }, 4. Square brackets [ ]',
              'Careful with negative sign outside brackets: -{a - b} becomes -a + b on opening!',
              'Division and Multiplication carry equal priority from left to right; Addition and Subtraction carry equal priority from left to right.'
            ],
            keyHighlight: 'Worked Exemplar: 35 - [20 + {14 - (8 - 3 + 2)}] = 35 - [20 + {14 - 7}] = 35 - [20 + 7] = 35 - 27 = 8.',
            examMantra: 'Always rewrite the entire line copying untouched terms down until inner brackets resolve.'
          },
          {
            slideNumber: 5,
            title: 'Real-Life Word Problems: Elevation & Temperature',
            categoryTag: '5-MARK APPLICATION QUESTIONS',
            bullets: [
              'Sea level is represented by 0 m; elevations above are positive (+), depths below are negative (-).',
              'Distance between two vertical points: Higher elevation MINUS Lower elevation: (+350) - (-380) = +730 m.',
              'Temperature changes: Initial temperature + Rise - Fall = Final Temperature.'
            ],
            diagramBox: {
              label: 'Common Student Errors',
              items: [
                { term: 'Error 1', explanation: 'Subtracting 380 directly from 350 giving -30 m instead of 730 m.' },
                { term: 'Error 2', explanation: 'Dividing by zero: a ÷ 0 is undefined, whereas 0 ÷ a = 0.' }
              ]
            },
            examMantra: 'Distance is always a positive scalar; when asked for distance, subtract lower from higher.'
          },
          {
            slideNumber: 6,
            title: 'Uma Shukla\'s Integers Revision Checklist',
            categoryTag: 'MENTOR SUMMARY',
            bullets: [
              'Additive Inverse of a is -a; absolute value |-a| = a.',
              'Multiplicative Identity is 1; product of integer and reciprocal is 1.',
              'Solve all 5 questions in the Chapter Diagnostic Test on the Mantra Classes App.',
              'Director: Uma Shukla | Mantra Classes ICSE Prep'
            ],
            keyHighlight: 'Review your mistakes in the Scorecard to see exact weak areas and launch remedial practice.',
            examMantra: 'Write cleanly, check your signs twice, and 100% marks in Integers are yours!'
          }
        ]
      },
      {
        type: 'graphical_lab',
        title: 'Interactive Number Line & Sign Balancer',
        durationOrPages: 'Interactive Lab',
        labType: 'fraction_visualizer',
        description: 'Visual integer jump animations along positive and negative coordinates.'
      }
    ]
  },
  {
    id: 'math-ch2',
    subjectId: 'mathematics',
    chapterNumber: 2,
    title: 'Fractions & Decimals',
    summary: 'Classification of proper, improper, mixed, and equivalent fractions. Multiplication and division using reciprocal fractions. Conversion between terminating and recurring decimals.',
    keyConcepts: [
      'Reciprocal of a fraction a/b (where a,b != 0) is b/a. Dividing by a/b is multiplying by b/a',
      'To multiply decimals: multiply ignoring decimals, count total decimal places in both numbers, then place the point from right',
      'Lowest terms: Dividing numerator and denominator by their HCF'
    ],
    keyFormulasOrTerms: [
      { term: 'Reciprocal', definition: 'Inverting numerator and denominator. Product of a fraction and its reciprocal is always 1' },
      { term: 'Terminating Decimal', definition: 'A decimal numeral that contains a finite number of digits after the decimal point' },
      { term: 'Equivalent Fractions', definition: 'Fractions that represent the same value even though they look different' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Dividing Complex Fractions & Decimal Place Values - Uma Shukla',
        durationOrPages: '21 mins',
        videoUrl: 'https://www.youtube.com/embed/K95j0Fk_P0w',
        description: 'Step-by-step methods to divide mixed fractions and avoid shifting errors in decimal multiplication.'
      },
      {
        type: 'ppt_presentation',
        title: 'Fractions & Decimals Visual Mastery PPT Deck',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'Visual slice representations, reciprocal conversions, and recurring decimal shortcuts.',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14'
      },
      {
        type: 'graphical_lab',
        title: 'Fraction & Decimal Pizza/Bar Visualizer',
        durationOrPages: 'Interactive Tool',
        labType: 'fraction_visualizer',
        description: 'Slice circular and rectangular shapes into dynamic fractional slices and see decimal percentages.'
      }
    ]
  },
  {
    id: 'math-ch3',
    subjectId: 'mathematics',
    chapterNumber: 3,
    title: 'Algebraic Expressions & Equations',
    summary: 'Formation of algebraic expressions from statements, like and unlike terms, addition and subtraction of polynomials, and solving single-variable linear equations using the method of transposition.',
    keyConcepts: [
      'Like terms have the identical algebraic factors (e.g. 5x^2y and -3x^2y are like terms)',
      'Degree of polynomial: Highest power of variable in the expression',
      'Transposition rule: Changing side of an equation reverses the sign (+ becomes -, * becomes /)'
    ],
    keyFormulasOrTerms: [
      { term: 'Monomial, Binomial, Trinomial', definition: 'Expressions containing 1, 2, and 3 unlike terms respectively' },
      { term: 'Coefficient', definition: 'The numerical factor multiplied by the variable term' },
      { term: 'Linear Equation', definition: 'An equation where the highest exponent of the variable is exactly 1' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Solving Linear Equations by Transposition - Uma Shukla',
        durationOrPages: '23 mins',
        videoUrl: 'https://www.youtube.com/embed/LwCRRUa8yTU',
        description: 'Transposition method without sign confusion and word problem equation formulations.'
      }
    ]
  },
  {
    id: 'math-ch5',
    subjectId: 'mathematics',
    chapterNumber: 5,
    title: 'Lines, Angles & Transversals',
    summary: 'Complementary angles (sum = 90 deg), Supplementary angles (sum = 180 deg), Vertically opposite angles, and angle pairs formed when two parallel lines are cut by a transversal.',
    keyConcepts: [
      'Alternate interior angles are equal when lines are parallel (Z-shape)',
      'Corresponding angles are equal (F-shape)',
      'Co-interior (consecutive interior) angles are supplementary: sum = 180 deg (C-shape)'
    ],
    keyFormulasOrTerms: [
      { term: 'Linear Pair', definition: 'Adjacent angles whose non-common sides form a straight line; their sum is 180 deg' },
      { term: 'Transversal', definition: 'A line that intersects two or more lines at distinct points' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Angles on Parallel Lines & Transversals with Uma Shukla',
        durationOrPages: '26 mins',
        videoUrl: 'https://www.youtube.com/embed/e1X_B8-t73A'
      }
    ]
  },

  // ================= PHYSICS =================
  {
    id: 'phy-ch1',
    subjectId: 'physics',
    chapterNumber: 1,
    title: 'Physical Quantities & Measurement',
    summary: 'Measurement of volume of irregular solids using a measuring cylinder, density of substances, relative density bottle, and calculation of speed and time.',
    keyConcepts: [
      'Density = Mass / Volume (SI unit: kg/m^3, CGS: g/cm^3. Note: 1 g/cm^3 = 1000 kg/m^3)',
      'Relative Density = Density of substance / Density of water at 4 deg C (No unit)',
      'Water has maximum density (1 g/cm^3) at 4 deg Celsius due to anomalous expansion'
    ],
    keyFormulasOrTerms: [
      { term: 'Density formula', definition: 'd = m / V' },
      { term: 'Relative Density (R.D.)', definition: 'Mass of substance / Mass of equal volume of water at 4 C' },
      { term: 'Hydrometer', definition: 'An instrument used for measuring the relative density of liquids directly' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Density & Relative Density Experiments - Uma Shukla Lab',
        durationOrPages: '22 mins',
        videoUrl: 'https://www.youtube.com/embed/s8dI4d33kYs',
        description: 'Complete experimental walkthrough for measuring density of irregular stone using displacement cylinder.'
      },
      {
        type: 'ppt_presentation',
        title: 'Density, Volume & Relative Density 6-Slide Master Deck',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'SI and CGS conversions (1 g/cm3 = 1000 kg/m3), anomalous expansion of water, and eureka can experiments.',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14'
      }
    ]
  },
  {
    id: 'phy-ch3',
    subjectId: 'physics',
    chapterNumber: 3,
    title: 'Light: Reflection & Mirrors',
    summary: 'Rectilinear propagation of light, Laws of Reflection, Characteristics of images formed by a plane mirror (Virtual, Erect, Same size, Laterally inverted), and uses of mirrors.',
    keyConcepts: [
      'Law 1: The incident ray, the reflected ray, and the normal at the point of incidence all lie in the same plane',
      'Law 2: The angle of incidence is always equal to the angle of reflection (angle i = angle r)',
      'Lateral Inversion: The left side of the object appears as the right side in the image',
      'Minimum mirror size: A person needs a mirror of at least half their height to see their complete image'
    ],
    keyFormulasOrTerms: [
      { term: 'Angle of Incidence (i)', definition: 'The angle between the incident ray and the normal' },
      { term: 'Angle of Reflection (r)', definition: 'The angle between the reflected ray and the normal' },
      { term: 'Virtual Image', definition: 'An image that cannot be caught on a screen, formed by the apparent divergence of rays' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Reflection of Light & Plane Mirror Ray Diagrams - Uma Shukla',
        durationOrPages: '24 mins',
        videoUrl: 'https://www.youtube.com/embed/Fw09z85oV-k',
        description: 'Ray tracing demonstration: normal angle vs glancing angle, virtual image distance, and periscope reflections.'
      },
      {
        type: 'ppt_presentation',
        title: 'Optics: Laws of Reflection & Ray Tracing Complete PPT Deck',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'High-yield slides with normal angles, glancing angle calculations, lateral inversion proofs, and periscope diagrams.',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14',
        slides: [
          {
            slideNumber: 1,
            title: 'Optics: Rectilinear Propagation & Reflection Laws',
            categoryTag: 'PHYSICS PRINCIPLES',
            bullets: [
              'Light travels in straight lines in a homogeneous transparent medium (Rectilinear propagation).',
              'Reflection: Bouncing back of light rays into the same medium upon striking a polished surface.',
              'Tested with ray tracing diagrams in Section B of ICSE Physics papers.'
            ],
            keyHighlight: 'Uma Shukla: Draw arrows on every single light ray — missing arrows lose full marks in ICSE exams!',
            examMantra: 'Light rays without directional arrows are penalized with 0 marks by ICSE examiners.'
          },
          {
            slideNumber: 2,
            title: 'The Two Fundamental Laws of Reflection',
            categoryTag: 'BOARD DEFINITIONS',
            bullets: [
              '1st Law: The Incident Ray, the Reflected Ray, and the Normal to the mirror surface at the point of incidence all lie in the same plane.',
              '2nd Law: The Angle of Incidence (∠i) is strictly equal to the Angle of Reflection (∠r): ∠i = ∠r.'
            ],
            tableData: {
              headers: ['Parameter', 'Measured From', 'Symbol', 'ICSE Formula'],
              rows: [
                ['Angle of Incidence', 'Normal line to mirror', '∠i', '90° - Glancing Angle'],
                ['Angle of Reflection', 'Normal line to mirror', '∠r', 'Equal to ∠i'],
                ['Glancing Angle', 'Mirror surface to incident ray', 'g', '90° - ∠i']
              ]
            },
            examMantra: 'Always verify whether the question gives angle with normal or with mirror surface.'
          },
          {
            slideNumber: 3,
            title: 'Characteristics of Image in a Plane Mirror',
            categoryTag: 'MEMORIZE FOR 3 MARKS',
            bullets: [
              '1. Virtual: Cannot be focused or captured on a screen.',
              '2. Erect: Upright, same orientation as the object.',
              '3. Same Size: Magnification m = 1.',
              '4. Same Distance: Image distance behind mirror = Object distance in front of mirror.',
              '5. Laterally Inverted: Left and right sides are reversed.'
            ],
            keyHighlight: 'If object moves 5 m closer to mirror, the distance between object and image decreases by 10 m!',
            examMantra: 'Distance between object and its image is DOUBLE the distance from object to mirror.'
          },
          {
            slideNumber: 4,
            title: 'Lateral Inversion & The Periscope Mechanism',
            categoryTag: 'APPLIED RAY DIAGRAMS',
            bullets: [
              'Lateral inversion occurs because each point on the object reflects rays that reach the eye from corresponding symmetrical distances behind the plane.',
              'Why AMBULANCE is written inverted: So driver ahead reads it correctly in rear-view mirror.',
              'Periscope: Uses two plane mirrors inclined at 45° facing each other to view over obstacles.'
            ],
            diagramBox: {
              label: 'Periscope Construction Points',
              items: [
                { term: 'Mirror Angle', explanation: 'Both plane mirrors fixed at 45° to the tube axis parallel to each other.' },
                { term: 'Total Deviation', explanation: 'First mirror turns ray 90°; second mirror turns ray another 90° (total 180° parallel shift).' }
              ]
            },
            examMantra: 'In a periscope, final image is erect and NOT laterally inverted because of two successive reflections!'
          },
          {
            slideNumber: 5,
            title: 'Step-by-Step Solved Optics Numerical',
            categoryTag: 'ICSE BOARD EXEMPLAR',
            bullets: [
              'Problem: A light ray strikes a plane mirror making an angle of 35° with the mirror surface. Find (a) angle of incidence, (b) angle of reflection, (c) total angle between incident and reflected rays.',
              'Solution Step (a): Angle with mirror is glancing angle g = 35°. Normal is perpendicular (90°). Thus ∠i = 90° - 35° = 55°.',
              'Solution Step (b): By Law of reflection, ∠r = ∠i = 55°.',
              'Solution Step (c): Angle between rays = ∠i + ∠r = 55° + 55° = 110°.'
            ],
            keyHighlight: 'Box final answer: ∠i = 55°, ∠r = 55°, Total deviation = 110°.',
            examMantra: 'Never mistake glancing angle (35°) for angle of incidence!'
          },
          {
            slideNumber: 6,
            title: 'Optics Revision Checklist by Uma Shukla',
            categoryTag: 'FINAL SUMMARY',
            bullets: [
              'Normal is always an imaginary dotted perpendicular line drawn at 90° to the reflecting plane.',
              'Virtual rays behind the mirror MUST be drawn using dotted lines.',
              'Take the interactive Light Ray Tracer lab on Mantra Classes to adjust angles dynamically.',
              'Director: Uma Shukla | Mantra Classes'
            ],
            keyHighlight: 'Practice drawing plane mirror ray diagrams with a ruler, sharp pencil, and protractor.',
            examMantra: 'Clear, labelled diagrams fetch full marks in ICSE Science examinations.'
          }
        ]
      },
      {
        type: 'graphical_lab',
        title: 'Interactive Light Reflection Ray Tracer',
        durationOrPages: 'Interactive Lab',
        labType: 'light_reflection',
        description: 'Drag the light source to adjust angle of incidence and inspect reflection rays and normal in real time.'
      }
    ]
  },
  {
    id: 'phy-ch5',
    subjectId: 'physics',
    chapterNumber: 5,
    title: 'Energy & Simple Machines',
    summary: 'Mechanical energy (Kinetic and Potential), Law of Conservation of Energy, and 6 Simple Machines with focus on Levers (Class I, II, III) and Mechanical Advantage.',
    keyConcepts: [
      'Mechanical Advantage (MA) = Load / Effort',
      'Velocity Ratio (VR) = Distance moved by effort / Distance moved by load',
      'Efficiency (eta) = Work Output / Work Input = MA / VR',
      'Class I Lever: Fulcrum in middle (Scissors, Crowbar); Class II: Load in middle (Nutcracker, Wheelbarrow); Class III: Effort in middle (Tongs, Fishing rod)'
    ],
    keyFormulasOrTerms: [
      { term: 'Kinetic Energy', definition: 'Energy possessed by a body by virtue of its motion: KE = 1/2 m v^2' },
      { term: 'Potential Energy', definition: 'Energy stored due to position or configuration: PE = m g h' },
      { term: 'Principle of Moments', definition: 'Load * Load arm = Effort * Effort arm' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Classification of Levers with Uma Shukla Tricks',
        durationOrPages: '21 mins',
        videoUrl: 'https://www.youtube.com/embed/9t97sB_8kGk'
      }
    ]
  },

  // ================= CHEMISTRY =================
  {
    id: 'chem-ch1',
    subjectId: 'chemistry',
    chapterNumber: 1,
    title: 'Matter and Its Composition',
    summary: 'Particulate nature of matter, Kinetic molecular theory of solids, liquids, and gases, interconversion of states of matter (Melting, Vaporization, Sublimation, Condensation).',
    keyConcepts: [
      'Matter consists of tiny particles called atoms or molecules that have mass and occupy space',
      'Intermolecular space is smallest in solids, intermediate in liquids, and largest in gases',
      'Intermolecular force of attraction is strongest in solids and negligible in gases',
      'Sublimation is the direct change from solid to gas without entering liquid state (Camphor, Dry Ice, Iodine)'
    ],
    keyFormulasOrTerms: [
      { term: 'Brownian Motion', definition: 'Random, zigzag movement of microscopic particles suspended in a fluid' },
      { term: 'Sublimation', definition: 'Phase transition directly from solid to gas on heating' },
      { term: 'Deposition', definition: 'Phase transition directly from gas to solid on cooling' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Kinetic Molecular Theory of Matter Animation - Uma Shukla',
        durationOrPages: '19 mins',
        videoUrl: 'https://www.youtube.com/embed/ndw9XPhLpL8'
      },
      {
        type: 'ppt_presentation',
        title: 'States of Matter & Kinetic Theory Visual Slide Deck',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'Comparative particle arrangement, Brownian motion, sublimation experiments with ammonium chloride.',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14'
      }
    ]
  },
  {
    id: 'chem-ch3',
    subjectId: 'chemistry',
    chapterNumber: 3,
    title: 'Atomic Structure & Chemical Bonding Basics',
    summary: 'Subatomic particles: Protons, Neutrons, and Electrons. Rutherford model and Bohr model. Atomic number (Z), Mass number (A), Electronic configuration (2n^2 rule), and Valency.',
    keyConcepts: [
      'Proton: positively charged (in nucleus); Neutron: neutral (in nucleus); Electron: negatively charged (in orbits)',
      'Atomic Number (Z) = Number of protons = Number of electrons (in neutral atom)',
      'Mass Number (A) = Protons + Neutrons (Nucleons)',
      'Valency is the combining capacity of an atom: for valence electrons <= 4, valency = v; for > 4, valency = 8 - v'
    ],
    keyFormulasOrTerms: [
      { term: 'Valency', definition: 'The number of electrons gained, lost, or shared to achieve a stable octet' },
      { term: 'Radical', definition: 'A group of atoms that behaves as a single unit with a positive or negative charge' },
      { term: 'Octet Rule', definition: 'Tendency of atoms to have 8 electrons in their outermost valence shell' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Mastering Valency & Radical Formulas - Uma Shukla',
        durationOrPages: '25 mins',
        videoUrl: 'https://www.youtube.com/embed/xqzjZgO12-M'
      },
      {
        type: 'ppt_presentation',
        title: 'Atomic Structure, Valency & Criss-Cross Formulas Deck',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'Bohr orbits K-L-M, electrovalent vs covalent valencies, and radical tables for writing formulas.',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14'
      }
    ]
  },
  {
    id: 'chem-ch5',
    subjectId: 'chemistry',
    chapterNumber: 5,
    title: 'Air & Atmosphere',
    summary: 'Composition of air (Nitrogen 78%, Oxygen 21%, Carbon Dioxide 0.04%, Argon & trace gases). Properties and uses of oxygen and carbon dioxide. Rusting of iron and conditions for combustion.',
    keyConcepts: [
      'Conditions necessary for rusting: Presence of BOTH Oxygen (air) and Moisture (water)',
      'Prevention of rusting: Galvanization (coating zinc), electroplating, painting, oiling',
      'Combustion requires combustible substance, oxygen, and attainment of ignition temperature',
      'Acid rain is caused by sulfur dioxide and nitrogen oxides dissolving in rainwater to form acids'
    ],
    keyFormulasOrTerms: [
      { term: 'Galvanization', definition: 'Process of coating iron articles with a protective layer of zinc metal' },
      { term: 'Greenhouse Effect', definition: 'Trapping of heat in atmosphere by gases like CO2 and methane, causing global warming' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Rusting of Iron Experiment & Prevention - Uma Shukla Lab',
        durationOrPages: '18 mins',
        videoUrl: 'https://www.youtube.com/embed/5j6z22nNn6Y'
      }
    ]
  },

  // ================= BIOLOGY =================
  {
    id: 'bio-ch1',
    subjectId: 'biology',
    chapterNumber: 1,
    title: 'Plant and Animal Tissues',
    summary: 'Concept of tissue as a group of similar cells performing a specific function. Plant tissues: Meristematic (Apical, Lateral, Intercalary) vs Permanent (Parenchyma, Collenchyma, Sclerenchyma, Xylem, Phloem). Animal tissues: Epithelial, Connective, Muscular, Nervous.',
    keyConcepts: [
      'Meristematic tissues have continuously dividing cells with dense cytoplasm and thin cell walls',
      'Xylem conducts water and minerals unidirectionally from roots to leaves; composed of tracheids, vessels, xylem parenchyma, xylem fibres',
      'Phloem translocates prepared food bidirectionally; composed of sieve tubes, companion cells, phloem parenchyma, phloem fibres',
      'Blood is a fluid connective tissue consisting of plasma, RBCs (erythrocytes), WBCs (leukocytes), and platelets'
    ],
    keyFormulasOrTerms: [
      { term: 'Parenchyma', definition: 'Living plant tissue with thin walls and intercellular spaces, stores food' },
      { term: 'Sclerenchyma', definition: 'Dead plant tissue with heavily lignified thick walls, provides mechanical strength' },
      { term: 'Neuron', definition: 'Structural and functional unit of nervous tissue consisting of cyton, dendrites, and axon' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Plant and Animal Tissues Microscopic Anatomy - Uma Shukla',
        durationOrPages: '24 mins',
        videoUrl: 'https://www.youtube.com/embed/cKqX_s7HqjE',
        description: 'Microscopic cross-sections of Xylem vessels, Sieve tubes, Parenchyma vs Sclerenchyma, and Blood smear.'
      },
      {
        type: 'ppt_presentation',
        title: 'Plant and Animal Tissues 6-Slide High-Yield PPT Deck',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'Comprehensive comparative diagrams: Meristematic vs Permanent, Xylem vs Phloem, and 4 animal tissue types.',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14',
        slides: [
          {
            slideNumber: 1,
            title: 'Plant & Animal Tissues: Cellular Organization',
            categoryTag: 'ICSE BIOLOGY CORE',
            bullets: [
              'Tissue: A cluster of structurally similar cells organized to perform a specific physiological task.',
              'Division of Labour: Complex multicellular organisms allocate specialized tissues for protection, conduction, and movement.',
              'Tested with diagram identification questions in ICSE Class 7 Biology examinations.'
            ],
            keyHighlight: 'Xylem cells are mostly DEAD at maturity; Phloem cells are mostly LIVING.',
            examMantra: 'Remember that Xylem is unidirectional (roots to leaves), Phloem is bidirectional.'
          },
          {
            slideNumber: 2,
            title: 'Classification of Plant Tissues',
            categoryTag: 'PLANT HISTOLOGY',
            bullets: [
              '1. Meristematic Tissue: Actively dividing cells; thin cellulose walls, dense cytoplasm, prominent nucleus, no vacuoles.',
              '2. Permanent Tissue: Mature cells that have lost the power of cell division and taken fixed shape and function.'
            ],
            tableData: {
              headers: ['Meristem Type', 'Location in Plant', 'Function in Growth'],
              rows: [
                ['Apical Meristem', 'Tips of roots and shoots', 'Increases height / length (Primary Growth)'],
                ['Lateral Meristem (Cambium)', 'Beneath bark / vascular bundles', 'Increases girth / thickness (Secondary Growth)'],
                ['Intercalary Meristem', 'Base of leaves / internodes', 'Regrowth in grasses after grazing']
              ]
            },
            examMantra: 'Apical = Length, Lateral = Girth, Intercalary = Internodes.'
          },
          {
            slideNumber: 3,
            title: 'Complex Permanent Tissues: Xylem vs Phloem',
            categoryTag: 'VASCULAR SYSTEM COMPARISON',
            bullets: [
              'Xylem and Phloem together form the vascular bundle for long-distance transport in tracheophytes.',
              'Xylem elements: Tracheids, Tracheae (vessels), Xylem fibres (dead), Xylem parenchyma (only living element).',
              'Phloem elements: Sieve tubes, Companion cells, Phloem parenchyma (living), Phloem fibres (only dead element).'
            ],
            tableData: {
              headers: ['Feature', 'Xylem Tissue', 'Phloem Tissue'],
              rows: [
                ['Substance Transported', 'Water and dissolved mineral ions', 'Manufactured soluble food (Sucrose)'],
                ['Direction of Flow', 'Strictly Unidirectional (Upward only)', 'Bidirectional (Upward and downward)'],
                ['Living / Dead Nature', 'Composed mostly of dead cells', 'Composed mostly of living cells'],
                ['Conducting Elements', 'Tracheids and Xylem Vessels', 'Sieve tubes and Companion cells']
              ]
            },
            examMantra: 'Tabular difference between Xylem and Phloem is a guaranteed 3-mark question!'
          },
          {
            slideNumber: 4,
            title: 'Classification of Animal Tissues',
            categoryTag: 'ANIMAL HISTOLOGY',
            bullets: [
              'Epithelial Tissue: Protective sheet covering body exterior and lining internal organs (Squamous, Cuboidal, Columnar, Ciliated).',
              'Connective Tissue: Binds and supports other tissues (Areolar, Adipose, Skeletal bone/cartilage, Fluid blood/lymph).',
              'Muscular Tissue: Capable of contraction and relaxation (Striated voluntary, Unstriated involuntary, Cardiac).',
              'Nervous Tissue: Coordinates electrical impulses via neurons.'
            ],
            diagramBox: {
              label: 'Blood as Fluid Connective Tissue',
              items: [
                { term: 'Plasma (55%)', explanation: 'Straw-colored fluid transporting nutrients, urea, hormones, and proteins.' },
                { term: 'RBCs (Erythrocytes)', explanation: 'Biconcave discs packed with iron haemoglobin; transport O2 as oxyhaemoglobin.' },
                { term: 'WBCs (Leukocytes)', explanation: 'Amoeboid defence cells producing antibodies and performing phagocytosis.' }
              ]
            },
            examMantra: 'Blood is unique as a connective tissue because its matrix (plasma) is fluid and not synthesized by cells.'
          },
          {
            slideNumber: 5,
            title: 'The Neuron: Structural Unit of Nervous Tissue',
            categoryTag: 'NEUROLOGY FOR ICSE',
            bullets: [
              'Cyton (Cell body): Contains nucleus and granular cytoplasm.',
              'Dendrites: Short branching projections receiving incoming electrochemical impulses.',
              'Axon: Single long cylindrical fibre carrying impulses AWAY from cell body.',
              'Myelin Sheath: Insulating fatty layer speeding up nerve conduction.',
              'Synapse: Sub-microscopic gap across which chemical neurotransmitters pass.'
            ],
            keyHighlight: 'Path of nerve impulse: Dendrite → Cyton → Axon → Axon Terminals → Synapse → Next Neuron.',
            examMantra: 'Never reverse the arrow of impulse conduction: always into dendrite and out of axon.'
          },
          {
            slideNumber: 6,
            title: 'Uma Shukla\'s Biology Exam Revision Mantra',
            categoryTag: 'DIRECTOR CHECKLIST',
            bullets: [
              'Always label biological diagrams with horizontal straight pointer lines (no crossing lines).',
              'Review the Plant vs Animal Cell interactive lab on the Mantra Classes App.',
              'Practice writing exact scientific spelling of: Sclerenchyma, Collenchyma, Phagocytosis, and Erythrocytes.',
              'Director: Uma Shukla | Mantra Classes'
            ],
            keyHighlight: 'Accurate terminology separates 80% students from 98% toppers in ICSE Biology.',
            examMantra: 'Review your mistakes in the Scorecard to eliminate confusion before final tests!'
          }
        ]
      },
      {
        type: 'graphical_lab',
        title: 'Interactive Plant vs Animal Cell & Tissue Explorer',
        durationOrPages: 'Interactive Lab',
        labType: 'cell_organelles',
        description: 'Explore high-resolution diagram of cell organelles, click chloroplast, mitochondria, cell wall, and nucleus.'
      }
    ]
  },
  {
    id: 'bio-ch3',
    subjectId: 'biology',
    chapterNumber: 3,
    title: 'Plant Life: Photosynthesis & Respiration',
    summary: 'Process of photosynthesis, balanced chemical equation, role of chlorophyll and stomata, factors affecting photosynthesis, and comparison between photosynthesis and cellular respiration in plants.',
    keyConcepts: [
      'Chemical equation: 6CO2 + 12H2O --(Sunlight / Chlorophyll)--> C6H12O6 + 6H2O + 6O2',
      'Stomata are microscopic pores guarded by bean-shaped guard cells that regulate transpiration and gas exchange',
      'Photosynthesis is an anabolic / building up process occurring only in daylight; respiration is catabolic occurring day and night'
    ],
    keyFormulasOrTerms: [
      { term: 'Chloroplast', definition: 'Green plastid containing chlorophyll where light reaction and dark reaction occur' },
      { term: 'Stoma (pl. Stomata)', definition: 'Minute opening on the epidermis of leaves for gaseous exchange' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Photosynthesis Starch Test Lab Experiment - Uma Shukla',
        durationOrPages: '21 mins',
        videoUrl: 'https://www.youtube.com/embed/UPBMG5EIydo'
      },
      {
        type: 'ppt_presentation',
        title: 'Photosynthesis & Respiration in Plants Complete PPT Deck',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'Balanced equation, iodine starch test, water bath safety, and comparison between anabolic and catabolic plant pathways.',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14'
      }
    ]
  },
  {
    id: 'bio-ch5',
    subjectId: 'biology',
    chapterNumber: 5,
    title: 'Nervous System & Sense Organs',
    summary: 'Central Nervous System (Brain and Spinal Cord) and Peripheral Nervous System. Parts of the human brain: Cerebrum (intelligence, memory), Cerebellum (body balance, posture), Medulla Oblongata (involuntary vitals like heartbeat and breathing). Reflex action.',
    keyConcepts: [
      'Cerebrum is the largest part of brain, controlling thinking, reasoning, and voluntary actions',
      'Cerebellum maintains equilibrium and coordinates muscular movements (e.g. Walking in straight line)',
      'Medulla oblongata controls involuntary activities like heart rate, breathing, swallowing, and vomiting',
      'Reflex arc path: Receptor -> Sensory neuron -> Spinal cord -> Motor neuron -> Effector muscle'
    ],
    keyFormulasOrTerms: [
      { term: 'Synapse', definition: 'Microscopic gap across which nerve impulses pass from axon terminal to dendrite of next neuron' },
      { term: 'Reflex Action', definition: 'Quick, automatic, involuntary response to an external stimulus without conscious brain intervention' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Brain Parts & Reflex Arc Demonstration - Uma Shukla',
        durationOrPages: '23 mins',
        videoUrl: 'https://www.youtube.com/embed/rP3iM79jXhA'
      }
    ]
  },

  // ================= ENGLISH =================
  {
    id: 'eng-ch1',
    subjectId: 'english',
    chapterNumber: 1,
    title: 'Active and Passive Voice',
    summary: 'Rules of transforming sentences from active to passive voice across present, past, and future tenses. Handling sentences with two objects, imperative sentences (Let + subject + be + V3), and interrogative sentences.',
    keyConcepts: [
      'In active voice, subject performs action; in passive voice, subject receives action',
      'Passive voice always uses the past participle (V3) form of the main verb with suitable form of \'be\'',
      'Present continuous: is/am/are + being + V3; Past perfect: had + been + V3',
      'Sentences with intransitive verbs cannot be converted to passive voice'
    ],
    keyFormulasOrTerms: [
      { term: 'Transitive Verb', definition: 'A verb that requires a direct object to complete its meaning' },
      { term: 'Past Participle', definition: 'The 3rd form of verb (V3) used in all passive voice constructions' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Active and Passive Voice Conversion Masterclass - Uma Shukla',
        durationOrPages: '20 mins',
        videoUrl: 'https://www.youtube.com/embed/YpS8Vn9z1cQ'
      },
      {
        type: 'ppt_presentation',
        title: 'Active & Passive Voice Master Conversion PPT Deck',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'Tense conversion chart, continuous aspect rules, and imperative transformations (Let + obj + be + V3).',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14'
      }
    ]
  },
  {
    id: 'eng-ch2',
    subjectId: 'english',
    chapterNumber: 2,
    title: 'Direct and Indirect Speech',
    summary: 'Reported speech rules: change of reporting verbs (said to -> told/asked), backshift of tenses (Present Simple -> Past Simple), change of pronouns, and conversion of time and place words (now -> then, here -> there, today -> that day).',
    keyConcepts: [
      'Universal truths and habitual facts do not change tense in indirect speech',
      'Interrogative sentences starting with auxiliary use \'if\' or \'whether\'; WH-questions retain the WH-word',
      'Imperative sentences use reporting verbs like ordered, requested, advised followed by \'to + base verb\''
    ],
    keyFormulasOrTerms: [
      { term: 'Reporting Verb', definition: 'The verb in the introductory clause such as said, asked, explained' },
      { term: 'Backshift', definition: 'The grammatical shifting of tense one step back into the past when reporting indirect statements' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Reported Speech Rules & ICSE Board Tricks - Uma Shukla',
        durationOrPages: '22 mins',
        videoUrl: 'https://www.youtube.com/embed/yFjYV48w0S8'
      }
    ]
  },

  // ================= HISTORY & CIVICS =================
  {
    id: 'hist-ch1',
    subjectId: 'history_civics',
    chapterNumber: 1,
    title: 'The Delhi Sultanate (1206-1526)',
    summary: 'The five dynasties: Slave (Mamluk), Khalji, Tughlaq, Sayyid, and Lodi. Key rulers: Qutb-ud-din Aibak, Iltutmish, Razia Sultan, Balban, Alauddin Khalji (market regulations), and Muhammad bin Tughlaq (ambitious projects).',
    keyConcepts: [
      'Qutb-ud-din Aibak founded the Mamluk dynasty and commenced construction of Qutb Minar',
      'Razia Sultan was the first and only woman ruler of the Delhi Sultanate',
      'Alauddin Khalji implemented price control policy, market officers (Shahna-i-Mandi), and branding of horses (Dagh)',
      'Muhammad bin Tughlaq moved capital from Delhi to Daulatabad and introduced token copper currency'
    ],
    keyFormulasOrTerms: [
      { term: 'Mamluk', definition: 'Arabic term meaning owned or slave, referring to military slaves who rose to sovereign rulers' },
      { term: 'Iqta System', definition: 'System of granting revenue collection rights of specified land territories to military nobles' },
      { term: 'Dagh & Chehra', definition: 'Military administrative system of branding war horses and descriptive rolls of soldiers' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Delhi Sultanate Dynasties & Map Walkthrough - Uma Shukla',
        durationOrPages: '27 mins',
        videoUrl: 'https://www.youtube.com/embed/XqE80k11yYc'
      },
      {
        type: 'ppt_presentation',
        title: 'Delhi Sultanate Dynasties & Market Reforms PPT Deck',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'The 5 dynasties timeline, Razia Sultan, Alauddin Khalji price controls, and Tughlaq schemes.',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14'
      }
    ]
  },
  {
    id: 'hist-ch3',
    subjectId: 'history_civics',
    chapterNumber: 3,
    title: 'The Constitution of India & Preamble',
    summary: 'Meaning and importance of a Constitution. The Constituent Assembly (Dr. Rajendra Prasad, Dr. B.R. Ambedkar - Father of the Indian Constitution). Key ideals in the Preamble: Sovereign, Socialist, Secular, Democratic, Republic, Justice, Liberty, Equality, Fraternity.',
    keyConcepts: [
      'The Constitution of India came into effect on 26th January 1950, commemorated as Republic Day',
      'India is Sovereign (free from foreign control), Socialist (wealth equity), Secular (no official state religion)',
      'Democratic Republic means leaders are elected by the citizens and head of state is not hereditary'
    ],
    keyFormulasOrTerms: [
      { term: 'Preamble', definition: 'The introductory preface outlining the fundamental values, philosophy, and objectives of the Constitution' },
      { term: 'Sovereignty', definition: 'Supreme and independent power of a country to govern itself without external interference' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Preamble Breakdown for ICSE Class 7 Civics - Uma Shukla',
        durationOrPages: '20 mins',
        videoUrl: 'https://www.youtube.com/embed/0U9h_TtrFCo'
      }
    ]
  },

  // ================= GEOGRAPHY =================
  {
    id: 'geo-ch1',
    subjectId: 'geography',
    chapterNumber: 1,
    title: 'Representation of Geographical Features',
    summary: 'Topographical sheets, cardinal points, symbols and conventional signs, scale types (verbal, representative fraction 1:50,000, linear scale), contours, and measuring curved distances using thread.',
    keyConcepts: [
      'Representative Fraction (RF) is independent of units (e.g. 1:50000 means 1 cm on map = 50,000 cm = 500 m on ground)',
      'Contour lines join places of equal elevation above sea level; closely spaced contours indicate steep slopes',
      'Four-figure and six-figure grid references for locating features'
    ],
    keyFormulasOrTerms: [
      { term: 'Contour Interval', definition: 'The constant vertical difference in elevation between two consecutive contour lines' },
      { term: 'Representative Fraction', definition: 'The ratio between map distance and corresponding actual ground distance expressed as a fraction' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Reading ICSE Toposheets & Grid References - Uma Shukla',
        durationOrPages: '22 mins',
        videoUrl: 'https://www.youtube.com/embed/v8h3Vp3w2aQ'
      },
      {
        type: 'ppt_presentation',
        title: 'Toposheets, Contours & Conventional Signs PPT Deck',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'Brown contour intervals, 4-figure grid coordinates, measuring curved river paths, and conventional symbols.',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14'
      }
    ]
  },
  {
    id: 'geo-ch3',
    subjectId: 'geography',
    chapterNumber: 3,
    title: 'Hydrosphere: Oceans, Tides & Currents',
    summary: 'Distribution of water bodies, relief of ocean floor (Continental Shelf, Continental Slope, Abyssal Plain, Oceanic Trenches). Causes of Ocean Currents (Wind, Salinity, Temperature, Coriolis force). Spring tides vs Neap tides.',
    keyConcepts: [
      'Spring tides occur on New Moon and Full Moon when Sun, Moon, and Earth align in a straight line (Syzygy), resulting in maximum tidal range',
      'Neap tides occur during first and third quarters when Sun and Moon are at right angles, causing minimum tidal range',
      'Warm currents flow from equator toward poles (e.g. Gulf Stream); Cold currents flow from poles toward equator (e.g. Labrador Current)'
    ],
    keyFormulasOrTerms: [
      { term: 'Coriolis Effect', definition: 'Deflection of moving air and water caused by Earth\'s rotation (right in Northern hemisphere, left in Southern)' },
      { term: 'Continental Shelf', definition: 'The shallow, gently sloping submerged edge of a continent rich in marine life and fisheries' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Tides and Ocean Currents Mechanism with Uma Shukla',
        durationOrPages: '24 mins',
        videoUrl: 'https://www.youtube.com/embed/5ohDG7RqQ9I'
      }
    ]
  },

  // ================= COMPUTER APPLICATIONS (GRADE 7) =================
  {
    id: 'comp-ch1',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterNumber: 1,
    title: 'Hardware Components & Internal Architecture',
    summary: 'Understanding internal components of a computer: Motherboard, Microprocessor (ALU, CU, Registers), Memory hierarchy (Cache, RAM, ROM, Secondary Storage), Ports (USB, HDMI, Ethernet, Audio), Expansion slots (PCIe, DIMM), and Bus architectures.',
    keyConcepts: [
      'Central Processing Unit (CPU) is composed of Arithmetic Logic Unit (ALU), Control Unit (CU), and high-speed Registers',
      'RAM is volatile primary memory (lost on power-off); ROM is non-volatile primary memory storing firmware/BIOS',
      'System bus consists of Data Bus (bidirectional), Address Bus (unidirectional from CPU), and Control Bus',
      'Cache memory is extremely high-speed SRAM located between CPU and RAM to store frequently accessed instructions'
    ],
    keyFormulasOrTerms: [
      { term: 'ALU', definition: 'Arithmetic Logic Unit: Performs mathematical calculations (+, -, *, /) and logical comparisons (<, >, ==, !=)' },
      { term: 'Control Unit', definition: 'Extracts instructions from memory, decodes them, and coordinates the execution across computer components' },
      { term: 'Clock Speed', definition: 'The frequency at which a processor executes clock cycles per second, measured in Gigahertz (GHz)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'CPU Architecture, Motherboard & RAM/ROM Explained - Uma Shukla',
        durationOrPages: '21 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        description: 'Comprehensive walkthrough of internal PC hardware, CPU pinouts, memory buses, and motherboard connectivity.'
      },
      {
        type: 'ppt_presentation',
        title: 'Computer Hardware & Architecture Mastery PPT Deck',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'Comparison of Primary vs Secondary memory, CPU sub-units, Ports and Motherboard layout with Uma Shukla exam tips.',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14',
        slides: [
          {
            slideNumber: 1,
            title: 'Overview of Computer Architecture & Motherboard',
            categoryTag: 'ICSE Grade 7 Computer Hardware',
            bullets: [
              'A computer system consists of Hardware (physical electronic machinery) and Software (programmed instructions).',
              'The Motherboard is the main printed circuit board (PCB) connecting CPU, RAM, storage drives, and expansion cards.',
              'Data transfers between components via System Buses: Data Bus, Address Bus, and Control Bus.'
            ],
            keyHighlight: 'Motherboard is often called the backbone of the computer system.',
            examMantra: 'Remember: Hardware provides the physical body; Software provides the intelligence!'
          },
          {
            slideNumber: 2,
            title: 'CPU Sub-Units: ALU, Control Unit & Registers',
            categoryTag: 'Processor Architecture',
            bullets: [
              'Arithmetic Logic Unit (ALU): Executes all addition, subtraction, AND/OR/NOT logic gates.',
              'Control Unit (CU): Acts as the traffic cop; directs the flow of data between CPU and peripherals.',
              'Registers: Smallest and fastest memory units directly inside the CPU core (e.g. Accumulator, Program Counter).'
            ],
            tableData: {
              headers: ['CPU Component', 'Primary Function', 'Key Characteristic'],
              rows: [
                ['ALU', 'Calculations & Logic Comparisons', 'Executes machine instructions'],
                ['Control Unit (CU)', 'Instruction Decoding & Fetch-Execute Cycle', 'Issues control signals, does not compute'],
                ['Registers', 'Temporary Storage during execution', 'Fastest memory in the entire system']
              ]
            },
            examMantra: 'Uma Ma\'am Tip: CU does NOT perform calculations; it only manages and directs traffic!'
          },
          {
            slideNumber: 3,
            title: 'Primary Memory: RAM vs ROM Deep Dive',
            categoryTag: 'Memory Systems',
            bullets: [
              'RAM (Random Access Memory): Read/Write memory holding currently active apps and OS kernel.',
              'ROM (Read Only Memory): Read-only memory storing startup firmware like BIOS/UEFI.',
              'Cache Memory: Ultra-fast Static RAM (SRAM) bridging the CPU register speed and main RAM DRAM speed.'
            ],
            tableData: {
              headers: ['Feature', 'RAM (Random Access)', 'ROM (Read Only)'],
              rows: [
                ['Volatility', 'Volatile (Erased when powered off)', 'Non-volatile (Retains permanently)'],
                ['Operation', 'Read and Write allowed', 'Read Only by user programs'],
                ['Contents', 'Active applications, open files', 'Bootloader firmware (BIOS/POST)'],
                ['Speed', 'Very Fast (DDR4/DDR5)', 'Moderate speed']
              ]
            },
            examMantra: 'ICSE Exam Trap: Never confuse ROM with Hard Drive. Both are non-volatile, but ROM is primary memory!'
          },
          {
            slideNumber: 4,
            title: 'Secondary Storage Devices & Units of Storage',
            categoryTag: 'Storage Hierarchy',
            bullets: [
              'Hard Disk Drive (HDD): Magnetic storage utilizing spinning platters and read/write heads.',
              'Solid State Drive (SSD): Flash-based semiconductor storage with zero moving parts and 5x faster IOPS.',
              'Optical Discs (CD-ROM 700MB, DVD 4.7GB, Blu-ray 25GB/50GB).',
              'Units: 1 Byte = 8 bits, 1 KB = 1024 Bytes, 1 MB = 1024 KB, 1 GB = 1024 MB, 1 TB = 1024 GB.'
            ],
            keyHighlight: 'Storage hierarchy: Registers > Cache > RAM > SSD > HDD > Cloud.',
            examMantra: 'Calculation rule: When converting GB to MB, always multiply by 1024, not 1000!'
          },
          {
            slideNumber: 5,
            title: 'External Ports & Interfacing Connectors',
            categoryTag: 'Peripheral Interfacing',
            bullets: [
              'USB (Universal Serial Bus): Plug-and-play standard for keyboards, mice, flash drives, and webcams.',
              'HDMI (High-Definition Multimedia Interface): Transmits uncompressed digital video and multi-channel audio simultaneously.',
              'Ethernet (RJ-45): Connects computer to local area network (LAN) and broadband router.',
              'VGA / DisplayPort: Legacy and modern monitor display interfaces.'
            ],
            diagramBox: {
              label: 'Common I/O Port Pins & Bandwidth',
              items: [
                { term: 'USB 3.0 Type-A', explanation: 'Blue connector, transfers up to 5 Gbps' },
                { term: 'HDMI 2.0', explanation: 'Supports 4K video at 60Hz with embedded audio' },
                { term: 'RJ-45 Ethernet', explanation: '8-pin modular connector for Gigabit networking' }
              ]
            },
            examMantra: 'Remember: HDMI carries both audio AND video over a single cord, whereas VGA only carries video!'
          },
          {
            slideNumber: 6,
            title: 'Director Uma Shukla\'s Hardware Exam Mantra',
            categoryTag: 'Board Exam Revision',
            bullets: [
              'In Board exams, always define CPU with its three three-letter pillars: ALU, CU, and Registers.',
              'State exact units: 1024 bytes per kilobyte (binary powers: 2^10 = 1024).',
              'Always draw the block diagram showing Input Unit -> CPU (ALU + CU + Registers) <-> Primary Memory -> Output Unit.'
            ],
            keyHighlight: 'Golden Rule: Memory capacity is measured in Bytes; network bandwidth is measured in bits per second (bps)!',
            examMantra: 'Score 100%: Differentiate clearly between Volatile (RAM) and Non-Volatile (ROM/Storage).'
          }
        ]
      }
    ]
  },
  {
    id: 'comp-ch2',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterNumber: 2,
    title: 'Number Systems & Binary Arithmetic',
    summary: 'Decimal, Binary (base 2), Octal (base 8), and Hexadecimal (base 16) number systems. Conversion between decimal and binary. Rules of binary addition, subtraction with borrowing, and basic representation of numbers inside digital chips.',
    keyConcepts: [
      'Decimal uses base 10 (digits 0-9); Binary uses base 2 (bits 0 and 1)',
      'Octal uses base 8 (0-7); Hexadecimal uses base 16 (0-9 and A-F where A=10, B=11, C=12, D=13, E=14, F=15)',
      'Decimal to binary conversion uses successive division by 2 and recording remainders from bottom to top',
      'Binary addition rules: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (0 with carry 1), 1+1+1=11 (1 with carry 1)'
    ],
    keyFormulasOrTerms: [
      { term: 'Radix / Base', definition: 'The total number of unique digits or symbols used to represent numbers in a number system' },
      { term: 'Bit & Nibble', definition: 'Bit is binary digit (0 or 1). Nibble is a group of 4 bits. Byte is a group of 8 bits.' },
      { term: 'Binary Addition', definition: '1 + 1 = 0 (carry 1 to the next left column); 1 + 1 + 1 = 1 (carry 1)' }
    ],
    resources: [
      {
        id: 'res-faculty-vid-1',
        type: 'video',
        title: 'Binary 2\'s Complement Subtraction Explained - Prof. Rajesh Verma',
        durationOrPages: '19 mins',
        videoUrl: 'https://www.youtube.com/embed/4qH4unVtJkE',
        description: 'Detailed explanation of 1s complement inversion and adding 1 for 2s complement binary arithmetic.',
        uploadedBy: 'Prof. Rajesh Verma (Faculty)',
        uploadedAt: '2026-10-14',
        facultyId: 'fac-1',
        facultyName: 'Prof. Rajesh Verma',
        approvalStatus: 'pending_approval',
        chapterId: 'comp-ch2',
        chapterTitle: 'Number Systems & Binary Arithmetic',
        subjectId: 'computers',
        gradeLevel: '7'
      },
      {
        id: 'res-faculty-ppt-1',
        type: 'ppt_presentation',
        title: 'Hexadecimal to Binary Fast-Conversion Shortcuts (Faculty Deck)',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: '4-bit nibble grouping method for rapid conversion between Hex and Binary for ICSE Class 7 exams.',
        uploadedBy: 'Prof. Rajesh Verma (Faculty)',
        uploadedAt: '2026-10-14',
        facultyId: 'fac-1',
        facultyName: 'Prof. Rajesh Verma',
        approvalStatus: 'pending_approval',
        chapterId: 'comp-ch2',
        chapterTitle: 'Number Systems & Binary Arithmetic',
        subjectId: 'computers',
        gradeLevel: '7',
        slides: [
          {
            slideNumber: 1,
            title: '4-Bit Nibble Representation of Hex Digits',
            categoryTag: 'Fast Conversion Rule',
            bullets: [
              'Each Hexadecimal digit (0 to F) maps uniquely to exactly 4 binary bits (2^4 = 16 states)',
              '0 = 0000, 1 = 0001, 2 = 0010, 3 = 0011, 4 = 0100',
              'A = 1010 (10), B = 1011 (11), C = 1100 (12), D = 1101 (13), E = 1110 (14), F = 1111 (15)',
              'Convert any large binary string by grouping bits into 4 from right to left'
            ],
            keyHighlight: 'Never convert to decimal first! Direct 4-bit nibble translation saves 80% time in ICSE exams.',
            examMantra: 'Mantra: 8-4-2-1 weighted code gives immediate decimal value of any 4-bit nibble.'
          },
          {
            slideNumber: 2,
            title: 'Worked Example: (2B)16 to Binary',
            categoryTag: 'Step-by-Step Exemplar',
            bullets: [
              'Separate digits: 2 and B',
              'Convert digit 2 to 4-bit binary: 0010',
              'Convert digit B (11) to 4-bit binary: 1011 (8 + 2 + 1)',
              'Combine both nibbles: 0010 1011 = (101011)2'
            ],
            keyHighlight: 'Final answer: (2B)16 = (101011)2 in base 2 representation.',
            examMantra: 'Mantra: Drop unnecessary leading zeros on the far left of the final answer.'
          }
        ]
      },
      {
        type: 'video',
        title: 'Binary Arithmetic & Conversions Made Simple - Uma Shukla',
        durationOrPages: '23 mins',
        videoUrl: 'https://www.youtube.com/embed/w5qZc_V3DkQ',
        description: 'Step-by-step ICSE conversion method, binary addition carries, and subtraction borrows.',
        approvalStatus: 'approved'
      },
      {
        type: 'ppt_presentation',
        title: 'Number Systems & Binary Math 6-Slide Masterclass',
        durationOrPages: '6 Slides',
        slideCount: 6,
        description: 'Complete slide deck on Decimal, Binary, Octal, Hex, and binary addition/subtraction rules.',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-10-14',
        approvalStatus: 'approved',
        slides: [
          {
            slideNumber: 1,
            title: 'Why Computers Use Binary (Base 2)',
            categoryTag: 'Digital Logic Foundations',
            bullets: [
              'Transistors inside microchips operate in two stable states: ON (Voltage high = 1) and OFF (Voltage low = 0).',
              'Decimal system (Base 10) was invented because humans have 10 fingers, but binary (Base 2) is optimal for electronics.',
              'Every character, image, and song is encoded into sequences of 0s and 1s.'
            ],
            keyHighlight: 'A single 0 or 1 is a bit (Binary digIT). 8 bits make a Byte.',
            examMantra: 'Base indicates the number of symbols: Decimal=10, Binary=2, Octal=8, Hexadecimal=16.'
          },
          {
            slideNumber: 2,
            title: 'Decimal to Binary Conversion (Division by 2)',
            categoryTag: 'Conversion Algorithm',
            bullets: [
              'Step 1: Divide the decimal number by 2.',
              'Step 2: Note the remainder (either 0 or 1) on the right.',
              'Step 3: Repeat with quotient until the quotient becomes 0.',
              'Step 4: Read remainders from bottom to top (Most Significant Bit to Least Significant Bit).'
            ],
            diagramBox: {
              label: 'Exemplar: Convert Decimal 25 to Binary',
              items: [
                { term: '25 / 2 = 12', explanation: 'Remainder = 1 (LSB)' },
                { term: '12 / 2 = 6', explanation: 'Remainder = 0' },
                { term: '6 / 2 = 3', explanation: 'Remainder = 0' },
                { term: '3 / 2 = 1', explanation: 'Remainder = 1' },
                { term: '1 / 2 = 0', explanation: 'Remainder = 1 (MSB)' }
              ]
            },
            examMantra: 'Uma Ma\'am Tip: (25)₁₀ = (11001)₂. Always write the base subscript in parentheses!'
          },
          {
            slideNumber: 3,
            title: 'Binary to Decimal Conversion (Positional Weights)',
            categoryTag: 'Positional Notation',
            bullets: [
              'Each binary position has a positional weight of 2^n starting from n=0 at the rightmost bit.',
              'Weights from right to left: 1, 2, 4, 8, 16, 32, 64, 128...',
              'Multiply each bit by its positional weight and add the products together.'
            ],
            tableData: {
              headers: ['Bit Position (Power)', '2⁴ (16)', '2³ (8)', '2² (4)', '2¹ (2)', '2⁰ (1)'],
              rows: [
                ['Binary (11001)₂', '1', '1', '0', '0', '1'],
                ['Product Calculation', '1 × 16 = 16', '1 × 8 = 8', '0 × 4 = 0', '0 × 2 = 0', '1 × 1 = 1'],
                ['Total Sum', '16 + 8 + 0 + 0 + 1 = 25 in Decimal!', '', '', '', '']
              ]
            },
            examMantra: 'Fast Shortcut: Memorize powers of 2 (1, 2, 4, 8, 16, 32, 64, 128) to solve in under 10 seconds!'
          },
          {
            slideNumber: 4,
            title: 'Rules of Binary Addition',
            categoryTag: 'Binary Arithmetic',
            bullets: [
              '0 + 0 = 0 (no carry)',
              '0 + 1 = 1 (no carry)',
              '1 + 0 = 1 (no carry)',
              '1 + 1 = 10 (write 0 and carry 1 to next higher column)',
              '1 + 1 + 1 = 11 (write 1 and carry 1 to next higher column)'
            ],
            tableData: {
              headers: ['Operation', 'Sum Bit', 'Carry Bit', 'Explanation'],
              rows: [
                ['0 + 0', '0', '0', 'Zero plus zero'],
                ['1 + 0', '1', '0', 'One plus zero'],
                ['1 + 1', '0', '1', '1+1=2 in decimal; 2 in binary is 10!'],
                ['1 + 1 + 1', '1', '1', '1+1+1=3 in decimal; 3 in binary is 11!']
              ]
            },
            examMantra: 'Examiner Trap: In 1+1, students often write 1 instead of 0 with carry 1. Never make this error!'
          },
          {
            slideNumber: 5,
            title: 'Octal & Hexadecimal Number Systems',
            categoryTag: 'Advanced Number Systems',
            bullets: [
              'Octal (Base 8): Uses digits 0, 1, 2, 3, 4, 5, 6, 7. 3 binary bits = 1 octal digit (2³ = 8).',
              'Hexadecimal (Base 16): Uses digits 0-9 and letters A, B, C, D, E, F.',
              'Letter equivalents: A=10, B=11, C=12, D=13, E=14, F=15.',
              '4 binary bits = 1 hexadecimal digit (2⁴ = 16). Widely used for HTML color codes (#FFFFFF) and MAC addresses.'
            ],
            keyHighlight: 'Example: (15)₁₀ = (F)₁₆; (10)₁₀ = (A)₁₆.',
            examMantra: 'Mnemonic for Hex letters: A(10) to F(15). Always check if letter is capitalized in ICSE papers!'
          },
          {
            slideNumber: 6,
            title: 'Uma Shukla\'s Exam Mantra & Practice Checklist',
            categoryTag: 'Exam Strategy',
            bullets: [
              'Always show the division ladder steps with quotient on left and remainder on right.',
              'Double-check your binary addition by converting addends and the final answer to decimal.',
              'Write units clearly: Bit, Nibble (4 bits), Byte (8 bits).'
            ],
            keyHighlight: 'Check your answer: If (1011)₂ + (0101)₂ = (10000)₂, check in decimal: 11 + 5 = 16. Correct!',
            examMantra: 'Verify every answer in decimal before submitting your paper!'
          }
        ]
      }
    ]
  },
  {
    id: 'comp-ch3',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterNumber: 3,
    title: 'Computer Virus, Security & Cyber Ethics',
    summary: 'Classification of malware (Viruses, Worms, Trojans, Spyware, Ransomware). Symptoms of infection. Antivirus software, firewalls, and data backups. Ethical computer usage, netiquette, plagiarism, and cyber safety rules.',
    keyConcepts: [
      'Virus stands for Vital Information Resources Under Siege; requires a host file to propagate',
      'Worm self-replicates across computer networks without human intervention, consuming bandwidth',
      'Trojan Horse disguises itself as legitimate useful software while carrying a malicious payload',
      'Phishing is fraudulent attempt to steal credentials by impersonating trustworthy entities like banks'
    ],
    keyFormulasOrTerms: [
      { term: 'Firewall', definition: 'A network security barrier that monitors and filters incoming and outgoing network traffic based on security rules' },
      { term: 'Ransomware', definition: 'Malicious software that encrypts user files and demands monetary ransom for the decryption key' },
      { term: 'Plagiarism', definition: 'Copying someone else\'s intellectual work or code and passing it off as one\'s own without attribution' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Cyber Security, Malware & Online Safety Guide - Uma Shukla',
        durationOrPages: '20 mins',
        videoUrl: 'https://www.youtube.com/embed/inWWhr5tnEA',
        description: 'Real-world cyber threats, safe browsing rules, and ICSE cyber law guidelines.'
      }
    ]
  },
  {
    id: 'comp-ch4',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterNumber: 4,
    title: 'Computational Thinking, Algorithms & Flowcharts',
    summary: 'Problem-solving steps: Decomposition, Pattern recognition, Abstraction, and Algorithm design. Standard ANSI flowchart symbols, sequential logic, conditional decision branching, and iteration loops.',
    keyConcepts: [
      'Algorithm is a step-by-step finite sequence of unambiguous instructions to solve a problem',
      'Flowchart is a pictorial representation of an algorithm using standard geometric symbols',
      'Oval/Ellipse represents Start and Stop; Parallelogram represents Input and Output',
      'Rectangle represents Processing/Calculation; Diamond represents Decision/Conditional Branching'
    ],
    keyFormulasOrTerms: [
      { term: 'Terminal Symbol', definition: 'Oval shape indicating the beginning or ending of a flowchart program' },
      { term: 'Decision Box', definition: 'Diamond shape with one incoming line and two outgoing branch lines (True/False or Yes/No)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Mastering Flowcharts & Algorithms - Uma Shukla',
        durationOrPages: '25 mins',
        videoUrl: 'https://www.youtube.com/embed/eSYeHlwDCNA'
      }
    ]
  },
  {
    id: 'comp-ch5',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterNumber: 5,
    title: 'Introduction to Programming: Scratch & Python Basics',
    summary: 'Transitioning from block coding to text programming. Python syntax basics, variables, primitive data types (int, float, str, bool), print() output, input() function, conditional statements (if-elif-else), and simple for/while loops.',
    keyConcepts: [
      'Variables are named storage locations in memory holding data that can change during execution',
      'Python is an interpreted, high-level, dynamically typed language emphasizing clean readability',
      'Indentation (whitespace) defines code blocks in Python instead of curly braces',
      'The print() function outputs data to console; input() reads string input from user'
    ],
    keyFormulasOrTerms: [
      { term: 'Syntax Error', definition: 'Grammatical violation of the programming language rules that prevents compilation or execution' },
      { term: 'Data Type', definition: 'Classification specifying what value a variable can hold (e.g. integer 42, string "ICSE")' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Python for ICSE Beginners: Variables, Loops & If-Else - Uma Shukla',
        durationOrPages: '26 mins',
        videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8'
      }
    ]
  },
  {
    id: 'comp-ch6',
    subjectId: 'computers',
    gradeLevel: '7',
    chapterNumber: 6,
    title: 'HTML & Web Page Development Basics',
    summary: 'Structure of HTML document (html, head, title, body). Container elements vs empty elements (br, hr, img). Heading tags (h1 to h6), paragraphs, font formatting, hyperlinks, ordered and unordered lists, and table tags.',
    keyConcepts: [
      'HTML stands for HyperText Markup Language; building block of the World Wide Web',
      'Tags are enclosed in angle brackets: <tagname>content</tagname>',
      'Container tags require opening and closing tags (<p>...</p>); Empty tags do not have closing tags (<br>, <hr>, <img>)',
      'Attributes provide additional information about HTML elements (e.g. href in <a href="url">, src in <img src="file.jpg">)'
    ],
    keyFormulasOrTerms: [
      { term: 'Hypertext', definition: 'Text containing interactive links to other text or web resources' },
      { term: 'Empty Element', definition: 'An HTML element that contains no text content and has no closing tag (e.g. <br>, <hr>)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'HTML Complete Crash Course for ICSE - Uma Shukla',
        durationOrPages: '24 mins',
        videoUrl: 'https://www.youtube.com/embed/MDLn5-zSQQI'
      }
    ]
  },

  // ================= MULTI-GRADE CHAPTERS (GRADES 2, 3, 4, 5, 6) =================
  // GRADE 6
  {
    id: 'comp-g6-ch1',
    subjectId: 'computers',
    gradeLevel: '6',
    chapterNumber: 1,
    title: 'Computer Categories & Generations',
    summary: 'Classification of computers by size and capacity: Microcomputers, Minicomputers, Mainframes, and Supercomputers. Five generations of computers from Vacuum tubes to Artificial Intelligence.',
    keyConcepts: [
      'First Gen: Vacuum tubes (ENIAC); Second Gen: Transistors; Third Gen: Integrated Circuits (ICs)',
      'Fourth Gen: Microprocessors (VLSI); Fifth Gen: Artificial Intelligence and Quantum Computing',
      'Supercomputers (PARAM, Fugaku) are used for weather forecasting, nuclear research, and space exploration'
    ],
    keyFormulasOrTerms: [
      { term: 'Microprocessor', definition: 'A complete CPU integrated on a single silicon microchip' },
      { term: 'Supercomputer', definition: 'The fastest, largest, and most expensive type of computer capable of processing trillions of calculations per second' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Generations of Computers - Grade 6 with Uma Shukla',
        durationOrPages: '18 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA'
      }
    ]
  },
  {
    id: 'math-g6-ch1',
    subjectId: 'mathematics',
    gradeLevel: '6',
    chapterNumber: 1,
    title: 'Knowing Our Numbers & Whole Numbers',
    summary: 'Indian and International place value systems, comparing large numbers, estimation by rounding off to nearest 10, 100, 1000, and properties of Whole Numbers on the number line.',
    keyConcepts: [
      'Indian System: Ones, Thousands, Lakhs, Crores; International System: Ones, Thousands, Millions, Billions',
      'Natural numbers start from 1; Whole numbers include 0: {0, 1, 2, 3...}',
      'Closure and Commutative property holds for addition and multiplication of whole numbers'
    ],
    keyFormulasOrTerms: [
      { term: 'Predecessor', definition: 'The number that comes immediately before a given number (n - 1)' },
      { term: 'Successor', definition: 'The number that comes immediately after a given number (n + 1)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Large Numbers & Place Value Systems - Uma Shukla',
        durationOrPages: '20 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0'
      }
    ]
  },
  {
    id: 'bio-g6-ch1',
    subjectId: 'biology',
    gradeLevel: '6',
    chapterNumber: 1,
    title: 'The Leaf: Structure, Functions & Modifications',
    summary: 'Parts of a typical leaf (Petiole, Lamina, Midrib, Veins). Types of venation (Reticulate vs Parallel). Simple vs Compound leaves. Functions: Photosynthesis, Transpiration, and Gaseous exchange through stomata.',
    keyConcepts: [
      'Reticulate venation forms web-like network (Dicot plants e.g. Mango, Peepal)',
      'Parallel venation runs parallel from base to tip (Monocot plants e.g. Grass, Banana, Maize)',
      'Stomata regulate water loss via transpiration and intake of carbon dioxide'
    ],
    keyFormulasOrTerms: [
      { term: 'Transpiration', definition: 'The loss of water in the form of water vapor from aerial parts of the plant, mainly stomata' },
      { term: 'Chloroplast', definition: 'Green cell organelle containing chlorophyll essential for light trapping in photosynthesis' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Plant Leaf Structure & Venation - Uma Shukla',
        durationOrPages: '19 mins',
        videoUrl: 'https://www.youtube.com/embed/UPBMG5EYydo'
      }
    ]
  },

  // GRADE 5
  {
    id: 'comp-g5-ch1',
    subjectId: 'computers',
    gradeLevel: '5',
    chapterNumber: 1,
    title: 'Evolution of Computers & Software Types',
    summary: 'Early calculating devices: Abacus, Napier\'s Bones, Pascaline, Difference Engine. Classification of software into System Software (Operating System) and Application Software (Word processors, Games).',
    keyConcepts: [
      'Charles Babbage is universally revered as the Father of Computers for inventing the Analytical Engine',
      'System software manages computer hardware and provides a platform for running applications',
      'Application software helps users perform specific tasks like painting, writing letters, or browsing'
    ],
    keyFormulasOrTerms: [
      { term: 'Operating System', definition: 'System software that acts as an interface between the user, hardware, and application software' }
    ],
    resources: [
      {
        type: 'video',
        title: 'History of Computers & Software Types - Uma Shukla',
        durationOrPages: '16 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA'
      }
    ]
  },
  {
    id: 'math-g5-ch1',
    subjectId: 'mathematics',
    gradeLevel: '5',
    chapterNumber: 1,
    title: 'Large Numbers & Roman Numerals',
    summary: '7-digit and 8-digit numbers, Indian & International place value charts, expanded form, comparing large numbers, and Roman numerals up to 1000 (I, V, X, L, C, D, M).',
    keyConcepts: [
      'Rules of Roman numerals: Repetition means addition (XXX = 30); Smaller symbol before larger means subtraction (IV = 4, IX = 9)',
      'Symbols V, L, and D are never repeated and never subtracted',
      '1 Crore = 100 Lakhs = 10 Millions'
    ],
    keyFormulasOrTerms: [
      { term: 'Roman Numeral Values', definition: 'I=1, V=5, X=10, L=50, C=100, D=500, M=1000' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Roman Numerals & Large Numbers Mastery - Uma Shukla',
        durationOrPages: '18 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0'
      }
    ]
  },
  {
    id: 'bio-g5-ch1',
    subjectId: 'biology',
    gradeLevel: '5',
    chapterNumber: 1,
    title: 'Human Circulatory & Respiratory Systems',
    summary: 'Organs of the circulatory system: Heart, Blood, and Blood vessels (Arteries, Veins, Capillaries). Mechanics of breathing: Lungs, Diaphragm, Inhalation and Exhalation.',
    keyConcepts: [
      'Heart pumps oxygenated blood from lungs to body tissues and deoxygenated blood back to lungs',
      'Arteries carry oxygen-rich blood away from the heart; Veins carry carbon dioxide-rich blood back to the heart',
      'Red Blood Cells (RBCs) contain hemoglobin that binds and transports oxygen'
    ],
    keyFormulasOrTerms: [
      { term: 'Hemoglobin', definition: 'Iron-containing pigment in red blood cells that carries oxygen throughout the body' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Heart & Breathing Mechanism for Class 5 - Uma Shukla',
        durationOrPages: '21 mins',
        videoUrl: 'https://www.youtube.com/embed/UPBMG5EYydo'
      }
    ]
  },

  // GRADE 4
  {
    id: 'comp-g4-ch1',
    subjectId: 'computers',
    gradeLevel: '4',
    chapterNumber: 1,
    title: 'Memory & Storage Devices',
    summary: 'Difference between primary and secondary memory. Memory storage units: Bit, Byte, Kilobyte, Megabyte, Gigabyte. Storage media: Hard disk, CD/DVD, USB Flash drive, and Memory card.',
    keyConcepts: [
      'Primary memory (RAM/ROM) is located directly on motherboard and accessed directly by CPU',
      'Secondary memory (Flash drive, Hard disk) is external storage used to save work permanently',
      '8 bits combine to form 1 Byte. 1 Byte can store one character of text.'
    ],
    keyFormulasOrTerms: [
      { term: 'Pen Drive / USB Drive', definition: 'A portable, plug-and-play flash memory storage device rewritable thousands of times' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Computer Memory & Storage Devices - Grade 4 with Uma Shukla',
        durationOrPages: '15 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA'
      }
    ]
  },
  {
    id: 'math-g4-ch1',
    subjectId: 'mathematics',
    gradeLevel: '4',
    chapterNumber: 1,
    title: '5-Digit Numbers & Place Value',
    summary: 'Reading and writing 5-digit numbers up to 99,999. Place value and face value. Expanded notation, successor and predecessor, and ascending/descending order.',
    keyConcepts: [
      'Place value of a digit = (Face value of digit) * (Value of its place position)',
      'Face value of a digit is always the digit itself, regardless of its position',
      'Greatest 5-digit number is 99,999; Smallest 5-digit number is 10,000'
    ],
    keyFormulasOrTerms: [
      { term: 'Place Value', definition: 'The value represented by a digit in a number based on its positional column (Tens, Hundreds, Thousands)' }
    ],
    resources: [
      {
        type: 'video',
        title: '5-Digit Place Value & Number Operations - Uma Shukla',
        durationOrPages: '17 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0'
      }
    ]
  },

  // GRADE 3
  {
    id: 'comp-g3-ch1',
    subjectId: 'computers',
    gradeLevel: '3',
    chapterNumber: 1,
    title: 'Hardware vs Software & Desktop Basics',
    summary: 'Differentiating physical hardware you can touch and feel versus software programs you run. Exploring the Windows Desktop: Icons, Taskbar, Start button, and Wallpaper.',
    keyConcepts: [
      'Hardware: Monitor, Keyboard, Mouse, Printer, Speakers, System Cabinet',
      'Software: MS Paint, WordPad, Windows OS, Games, Calculator app',
      'The Taskbar is the horizontal bar at the bottom of the screen containing Start button and system clock'
    ],
    keyFormulasOrTerms: [
      { term: 'Hardware', definition: 'Physical electronic and mechanical parts of a computer system that can be seen and touched' },
      { term: 'Desktop', definition: 'The main screen that appears after turning on the computer and loading the operating system' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Hardware, Software & Desktop Fun - Grade 3 with Uma Shukla',
        durationOrPages: '14 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA'
      }
    ]
  },
  {
    id: 'math-g3-ch1',
    subjectId: 'mathematics',
    gradeLevel: '3',
    chapterNumber: 1,
    title: '4-Digit Numbers & Place Value',
    summary: 'Understanding numbers up to 9,999. Thousand block models, place value charts, skip counting, number names, and basic addition with carrying.',
    keyConcepts: [
      '10 Hundreds make 1 Thousand (1,000)',
      'Smallest 4-digit number is 1,000; Greatest 4-digit number is 9,999',
      'In addition, when a column sum exceeds 9, carry over 1 to the next left column'
    ],
    keyFormulasOrTerms: [
      { term: 'Thousand', definition: 'A number equal to 10 hundreds or 100 tens, written as 1000' }
    ],
    resources: [
      {
        type: 'video',
        title: '4-Digit Numbers Made Easy - Uma Shukla',
        durationOrPages: '16 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0'
      }
    ]
  },

  // GRADE 2
  {
    id: 'comp-g2-ch1',
    subjectId: 'computers',
    gradeLevel: '2',
    chapterNumber: 1,
    title: 'Computer: A Wonderful Smart Machine',
    summary: 'What is a machine? Characteristics of computers (fast, never gets tired, stores data, never makes mistakes on its own). Places where computers are used: Schools, Homes, Banks, Hospitals, Railway stations, Airports.',
    keyConcepts: [
      'Machines are man-made tools that make our work easy, fast, and save time',
      'Computers work on electricity and follow human instructions',
      'Main parts: Monitor (looks like TV), CPU (brain of computer), Keyboard (typing keys), Mouse (pointing tool)'
    ],
    keyFormulasOrTerms: [
      { term: 'Computer', definition: 'An electronic smart machine that accepts instructions, works fast, and gives accurate results' },
      { term: 'CPU', definition: 'Central Processing Unit: The brain of the computer that does all the thinking and work' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Computer: A Smart Machine - Fun Lesson for Class 2 by Uma Shukla',
        durationOrPages: '12 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA'
      }
    ]
  },
  {
    id: 'math-g2-ch1',
    subjectId: 'mathematics',
    gradeLevel: '2',
    chapterNumber: 1,
    title: '3-Digit Numbers, Even & Odd Numbers',
    summary: 'Numbers from 100 to 999. Place value of Ones, Tens, and Hundreds. Identifying even numbers (ending in 0, 2, 4, 6, 8) and odd numbers (ending in 1, 3, 5, 7, 9).',
    keyConcepts: [
      '10 Tens make 1 Hundred (100)',
      'Even numbers can be divided into equal pairs (end in 0, 2, 4, 6, 8)',
      'Odd numbers cannot be paired completely; always have 1 left over (end in 1, 3, 5, 7, 9)'
    ],
    keyFormulasOrTerms: [
      { term: 'Even Number', definition: 'Any whole number ending with 0, 2, 4, 6, or 8 that can be paired equally' },
      { term: 'Odd Number', definition: 'Any whole number ending with 1, 3, 5, 7, or 9 that leaves a remainder of 1 when paired' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Even & Odd Numbers with Blocks - Grade 2 with Uma Shukla',
        durationOrPages: '14 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0'
      }
    ]
  },
  ...CBSE_COMMERCE_CHAPTERS,
  ...NEW_SUBJECTS_CHAPTERS
];

