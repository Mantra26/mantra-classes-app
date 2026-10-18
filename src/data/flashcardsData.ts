import { Flashcard } from '../types';

export const COMPREHENSIVE_FLASHCARDS: Flashcard[] = [
  // ================= MATHEMATICS =================
  {
    id: 'fc-math-1',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    subjectId: 'mathematics',
    category: 'Formula & Law',
    front: 'Distributive Law of Multiplication',
    back: 'a × (b + c) = (a × b) + (a × c)\n\nExample: (-25) × 37 + (-25) × 63 = (-25) × (37 + 63) = (-25) × 100 = -2500.',
    mnemonicOrTip: 'Think "Distribute the outside number into every room in the bracket".'
  },
  {
    id: 'fc-math-2',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    subjectId: 'mathematics',
    category: 'Sign Rule',
    front: 'Multiplication Sign Rules for Integers',
    back: '• Positive × Positive = Positive\n• Negative × Negative = Positive\n• Positive × Negative = Negative\n\nRule: Odd number of negatives -> Negative; Even number of negatives -> Positive.',
    mnemonicOrTip: 'Two minuses kiss to make a plus!'
  },
  {
    id: 'fc-math-3',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    subjectId: 'mathematics',
    category: 'Definition',
    front: 'Additive Inverse vs Multiplicative Inverse',
    back: '• Additive Inverse: The number with opposite sign such that their sum equals 0 (e.g., of -7 is +7).\n• Multiplicative Inverse (Reciprocal): A number inverted such that their product equals 1 (e.g., of 4/5 is 5/4).',
    mnemonicOrTip: 'Additive flips the sign (+/-); Multiplicative flips the fraction (upside-down).'
  },
  {
    id: 'fc-math-4',
    chapterId: 'math-ch2',
    chapterTitle: 'Fractions & Decimals',
    subjectId: 'mathematics',
    category: 'Division Rule',
    front: 'Division of Two Fractions: a/b ÷ c/d',
    back: 'Multiply the dividend by the reciprocal of the divisor:\n\n(a/b) ÷ (c/d) = (a/b) × (d/c) = (a × d) / (b × c).',
    mnemonicOrTip: 'Keep, Change, Flip! (Keep 1st, Change to multiply, Flip 2nd).'
  },

  // ================= PHYSICS =================
  {
    id: 'fc-phy-1',
    chapterId: 'phy-ch1',
    chapterTitle: 'Physical Quantities & Measurement',
    subjectId: 'physics',
    category: 'Formula',
    front: 'Density Formula & SI Unit',
    back: 'Density (ρ) = Mass (M) / Volume (V)\n\n• SI Unit: kg/m³ (kilogram per cubic meter)\n• CGS Unit: g/cm³\n• Conversion: 1 g/cm³ = 1000 kg/m³.',
    mnemonicOrTip: 'Density is how tightly mass is packed into a space.'
  },
  {
    id: 'fc-phy-2',
    chapterId: 'phy-ch2',
    chapterTitle: 'Motion & Speed',
    subjectId: 'physics',
    category: 'Law & Formula',
    front: 'Speed vs Velocity Formulae',
    back: '• Speed = Total Distance / Total Time (Scalar, no direction, always ≥ 0)\n• Velocity = Displacement / Time (Vector, has magnitude and direction, can be 0 or negative).\n• SI Unit for both: m/s (meters per second).',
    mnemonicOrTip: 'Speed is how fast; Velocity is how fast AND where.'
  },
  {
    id: 'fc-phy-3',
    chapterId: 'phy-ch4',
    chapterTitle: 'Light & Reflection',
    subjectId: 'physics',
    category: 'Law',
    front: 'Laws of Reflection of Light',
    back: '1. The incident ray, the reflected ray, and the normal at the point of incidence all lie in the same plane.\n2. Angle of Incidence (∠i) is always strictly equal to the Angle of Reflection (∠r): ∠i = ∠r.',
    mnemonicOrTip: '∠i = ∠r always, measured against the perpendicular normal!'
  },

  // ================= CHEMISTRY =================
  {
    id: 'fc-chem-1',
    chapterId: 'chem-ch1',
    chapterTitle: 'Matter & Its Composition',
    subjectId: 'chemistry',
    category: 'Law',
    front: 'Law of Conservation of Mass (Lavoisier)',
    back: 'In any chemical reaction, mass is neither created nor destroyed.\n\nTotal Mass of Reactants = Total Mass of Products.\n\nThis is the fundamental reason why every chemical equation MUST be balanced.',
    mnemonicOrTip: 'What goes into a reaction must come out, just rearranged!'
  },
  {
    id: 'fc-chem-2',
    chapterId: 'chem-ch2',
    chapterTitle: 'Physical vs Chemical Changes',
    subjectId: 'chemistry',
    category: 'Concept',
    front: 'Physical vs Chemical Changes',
    back: '• Physical Change: Temporary, easily reversible, no new substance created, mass unchanged (e.g. melting of ice, glowing bulb).\n• Chemical Change: Permanent, irreversible, new substances formed with distinct properties, heat/light exchanged (e.g. rusting of iron, burning wood).',
    mnemonicOrTip: 'Can you easily undo it? Yes = Physical; No = Chemical.'
  },

  // ================= BIOLOGY =================
  {
    id: 'fc-bio-1',
    chapterId: 'bio-ch1',
    chapterTitle: 'Plant & Animal Tissues',
    subjectId: 'biology',
    category: 'Function',
    front: 'Xylem vs Phloem Vascular Bundles',
    back: '• Xylem: Transports water and dissolved soil minerals UNIDIRECTIONALLY upwards from roots to leaves (cells mostly dead like tracheids/vessels).\n• Phloem: Transports synthesized food (sucrose) BIDIRECTIONALLY from leaves to growing storage organs (living sieve tubes & companion cells).',
    mnemonicOrTip: 'Xylem = X-Water (Upwards); Phloem = Ph-Food (Both ways).'
  },
  {
    id: 'fc-bio-2',
    chapterId: 'bio-ch2',
    chapterTitle: 'Classification of Animals',
    subjectId: 'biology',
    category: 'Cell Biology',
    front: 'Mitochondria: The Powerhouse of the Cell',
    back: 'Double-membraned organelle with folded inner cristae that carries out aerobic cellular respiration to generate ATP (Adenosine Triphosphate), the cellular energy currency.',
    mnemonicOrTip: 'ATP = Adenosine Tri-Phosphate, cell energy currency made in Mitochondria.'
  },

  // ================= COMPUTERS =================
  {
    id: 'fc-comp-1',
    chapterId: 'comp-ch1',
    chapterTitle: 'Computer Fundamentals & Hardware',
    subjectId: 'computers',
    category: 'Memory',
    front: 'RAM vs ROM Memory',
    back: '• RAM (Random Access Memory): Primary volatile workspace; loses all stored data instantly when power is turned off; read/write.\n• ROM (Read Only Memory): Non-volatile permanent chip; retains startup BIOS firmware even when powered down; read-only.',
    mnemonicOrTip: 'RAM is temporary scratchpad; ROM is permanent birthmark.'
  },
  {
    id: 'fc-comp-2',
    chapterId: 'comp-ch2',
    chapterTitle: 'Number Systems & Binary',
    subjectId: 'computers',
    category: 'Conversion',
    front: 'Binary System Base & Powers of 2',
    back: '• Binary Base: 2 (Digits 0 and 1 only)\n• Decimal Base: 10 (Digits 0–9)\n• Positional weights from right to left:\n  2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16, 2⁵ = 32, 2⁶ = 64, 2⁷ = 128.\n• 1 Byte = 8 Bits (can represent 0 to 255).',
    mnemonicOrTip: 'Double each column as you step left: 1, 2, 4, 8, 16, 32, 64, 128!'
  },

  // ================= SANSKRIT =================
  {
    id: 'fc-skt-1',
    chapterId: 'skt-ch1',
    chapterTitle: 'संस्कृत वर्णमाला एवं उच्चारणम्',
    subjectId: 'sanskrit',
    category: 'Phonetics',
    front: 'उच्चारण स्थानम् (Points of Articulation)',
    back: '• कण्ठः (Throat): अ, आ, क-वर्ग, ह, विसर्ग\n• तालु (Palate): इ, ई, च-वर्ग, य, श\n• मूर्धा (Roof): ऋ, ॠ, ट-वर्ग, र, ष\n• दन्तः (Teeth): लृ, त-वर्ग, ल, स\n• ओष्ठः (Lips): उ, ऊ, प-वर्ग.',
    mnemonicOrTip: 'Sutra: अकुहविसर्जनीयानां कण्ठः । इचुयशानां तालुः ।'
  },
  {
    id: 'fc-skt-2',
    chapterId: 'skt-ch2',
    chapterTitle: 'धातु रूपाणि एवं लकार परिचयः',
    subjectId: 'sanskrit',
    category: 'Grammar',
    front: 'लट् लकार प्रत्ययाः (Present Tense Endings)',
    back: 'प्रथम पुरुष (3rd): ति (एक०), तः (द्वि०), अन्ति (बहु०)\nमध्यम पुरुष (2nd): सि, थः, थ\nउत्तम पुरुष (1st): आमि, आवः, आमः\n\nउदाहरण: पठति, पठतः, पठन्ति । पठसि, पठथः, पठथ । पठामि, पठावः, पठामः ।',
    mnemonicOrTip: 'ति-तः-अन्ति, सि-थः-थ, आमि-आवः-आमः (Parasmaipada mantra).'
  },
  {
    id: 'fc-skt-3',
    chapterId: 'skt-ch4',
    chapterTitle: 'सूक्तयः एवं सुभाषितम्',
    subjectId: 'sanskrit',
    category: 'Shloka Wisdom',
    front: 'उद्यमेन हि सिध्यन्ति कार्याणि...',
    back: 'श्लोकः: उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः ।\nन हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः ॥\n\nअर्थ: परिश्रम से ही कार्य सफल होते हैं, केवल इच्छा से नहीं। जैसे सोए हुए सिंह के मुख में हिरन स्वयं नहीं आते।',
    mnemonicOrTip: 'Action over daydreams: even the jungle king must hunt!'
  },

  // ================= SOCIAL STUDIES =================
  {
    id: 'fc-sst-1',
    chapterId: 'sst-ch1',
    chapterTitle: 'The Harappan Civilization & Early Vedic Life',
    subjectId: 'social_studies',
    category: 'Archaeology',
    front: 'Harappan Grid System & Great Bath',
    back: '• Town Planning: Streets cut at strict 90° right angles; standardized 1:2:4 burnt bricks.\n• Great Bath at Mohenjo-Daro: Natural bitumen asphalt layer between brick courses for 100% waterproofing.\n• Lothal: World\'s earliest engineered tidal dockyard.',
    mnemonicOrTip: 'Mohenjo-Daro = Great Bath; Lothal = Maritime Dockyard.'
  },
  {
    id: 'fc-sst-2',
    chapterId: 'sst-ch3',
    chapterTitle: 'Democratic Governance & Panchayati Raj',
    subjectId: 'social_studies',
    category: 'Civics',
    front: 'Panchayati Raj 3-Tier Hierarchy',
    back: '1. Village Level: Gram Panchayat (headed by Sarpanch, elected by Gram Sabha of citizens aged 18+).\n2. Block Level: Panchayat Samiti (Janpad Panchayat).\n3. District Level: Zila Parishad (highest rural governing council).',
    mnemonicOrTip: 'Village -> Block -> District (Gram -> Samiti -> Zila).'
  },

  // ================= EVS =================
  {
    id: 'fc-evs-1',
    chapterId: 'evs-ch1',
    chapterTitle: 'Ecosystems, Food Chains & Biotic Balance',
    subjectId: 'evs',
    category: 'Ecology Law',
    front: 'Lindeman\'s 10% Ecological Energy Law',
    back: 'Only ~10% of chemical energy from one trophic level is transferred and stored in the next consumer level. The remaining 90% is expended as metabolic heat, respiration, and movement.\n\nPlants (1,000 J) -> Herbivores (100 J) -> Carnivores (10 J).',
    mnemonicOrTip: 'Divide by 10 at every feeding step up the food chain!'
  },
  {
    id: 'fc-evs-2',
    chapterId: 'evs-ch4',
    chapterTitle: 'Solid Waste Management & 3 R\'s Strategy',
    subjectId: 'evs',
    category: 'Sustainability',
    front: 'The 3 R\'s Waste Management Hierarchy',
    back: '1. REDUCE: Minimize waste generation at source (carry cloth bags, stop single-use plastics).\n2. REUSE: Use materials repeatedly before discarding (glass jars, bottles, refillable pens).\n3. RECYCLE: Reprocess scrap waste into new products (paper pulp, recycled plastics, scrap metal).',
    mnemonicOrTip: 'Priority order: Reduce FIRST, Reuse SECOND, Recycle LAST.'
  }
];
