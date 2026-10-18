import { Question } from '../types';

export const NEW_SUBJECTS_QUESTION_BANK: Question[] = [
  // ==========================================
  // SANSKRIT QUESTIONS
  // ==========================================
  {
    id: 'q-skt-1',
    subjectId: 'sanskrit',
    chapterId: 'skt-ch1',
    chapterTitle: 'संस्कृत वर्णमाला एवं उच्चारणम्',
    topic: 'उच्चारण स्थानानि (Points of Articulation)',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'संस्कृत वर्णमालायाम् "क-वर्गस्य" उच्चारण स्थानं किम् अस्ति? (What is the pronunciation place of Ka-varga in Sanskrit?)',
    options: ['कण्ठः (Throat)', 'तालु (Palate)', 'दन्तः (Teeth)', 'ओष्ठः (Lips)'],
    correctOptionIndex: 0,
    mantraHint: 'Remember the Paninian sutra: "अकुहविसर्जनीयानां कण्ठः"',
    explanation: 'कण्ठः (Throat) is the correct pronunciation place for अ, आ, क, ख, ग, घ, ङ, ह, and Visarga.'
  },
  {
    id: 'q-skt-2',
    subjectId: 'sanskrit',
    chapterId: 'skt-ch1',
    chapterTitle: 'संस्कृत वर्णमाला एवं उच्चारणम्',
    topic: 'ह्रस्व स्वराः (Short Vowels)',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'संस्कृत भाषायाम् "ऋ" इति वर्णः ह्रस्व स्वरः अस्ति। (In Sanskrit, "Rri" is a short vowel/Hrasva Swara.)',
    correctBoolean: true,
    mantraHint: 'Hrasva vowels take one matra: अ, इ, उ, ऋ, ऌ.',
    explanation: 'True. "ऋ" is classified under the five primary Hrasva Swaras (short vowels) requiring one matra of time.'
  },
  {
    id: 'q-skt-3',
    subjectId: 'sanskrit',
    chapterId: 'skt-ch2',
    chapterTitle: 'धातु रूपाणि एवं लकार परिचयः',
    topic: 'लट् लकार प्रथम पुरुष',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: '"पठ्" धातोः लट् लकारस्य प्रथम पुरुष बहुवचने रूपं ____ भवति। (The Lat Lakar Prathama Purusha plural form of "Path" Dhatu is ____.)',
    correctBlanks: ['पठन्ति'],
    mantraHint: 'Singular is पठति, dual is पठतः, plural is...',
    explanation: 'The inflection for 3rd person plural in Lat Lakar is ति, तः, अन्ति -> पठन्ति.'
  },
  {
    id: 'q-skt-4',
    subjectId: 'sanskrit',
    chapterId: 'skt-ch2',
    chapterTitle: 'धातु रूपाणि एवं लकार परिचयः',
    topic: 'लृट् लकार (Future Tense)',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: '"सह विद्यालयं ____।" (He will go to school.) रिक्तस्थानं लृट्लकारेण पूरयत।',
    options: ['गमिष्यति', 'गच्छति', 'अगच्छत्', 'गमिष्यन्ति'],
    correctOptionIndex: 0,
    mantraHint: 'Subject "सह" is Prathama Purusha Ekavachana (he). Future tense uses स्यति / इष्यति.',
    explanation: '"सह" (singular 3rd person) takes "गमिष्यति" in Lrit Lakar (future tense).'
  },
  {
    id: 'q-skt-5',
    subjectId: 'sanskrit',
    chapterId: 'skt-ch3',
    chapterTitle: 'शब्द रूपाणि एवं कारक विभक्ति',
    topic: 'तृतीया विभक्ति (Instrumental Case)',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: '"बालकः कलमेन लिखति।" अत्र "कलमेन" इति पदे का विभक्तिः अस्ति? (Which case/vibhakti is used in "kalamena"?)',
    options: ['तृतीया विभक्तिः (Instrumental)', 'प्रथमा विभक्तिः (Nominative)', 'पञ्चमी विभक्तिः (Ablative)', 'सप्तमी विभक्तिः (Locative)'],
    correctOptionIndex: 0,
    mantraHint: 'The pen is the instrument (साधकतमं करणम्) of writing.',
    explanation: 'The pen is the tool/means of writing (Karana Karaka), hence Tritiya Vibhakti (कलमेन) is applied.'
  },
  {
    id: 'q-skt-6',
    subjectId: 'sanskrit',
    chapterId: 'skt-ch4',
    chapterTitle: 'सूक्तयः एवं सुभाषितम्',
    topic: 'सुभाषित अर्थ एवं अन्वय',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'श्लोकस्य अर्थं लिखत: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः । न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः ॥"',
    sampleAnswer: 'कार्याणि केवलं परिश्रमेण सिध्यन्ति, केवलं इच्छाभिः न। यथा निद्रां कुर्वतः सिंहस्य मुखे मृगाः स्वयमेव न प्रविशन्ति। (Success in any endeavor is accomplished only through diligent hard work, never through mere wishful thinking. Just as deer do not walk into the mouth of a sleeping lion on their own, a person must exert effort to achieve goals.)',
    mantraHint: 'Focus on উদ্যम (hard work) vs मनोरथ (mere wish), with the analogy of a sleeping lion.',
    explanation: 'This famous Hitopadesha verse teaches that achievement demands industrious labor and proactive initiative.'
  },

  // ==========================================
  // SOCIAL STUDIES (SST) QUESTIONS
  // ==========================================
  {
    id: 'q-sst-1',
    subjectId: 'social_studies',
    chapterId: 'sst-ch1',
    chapterTitle: 'The Harappan Civilization & Early Vedic Life',
    topic: 'Indus Valley Urban Sanitation & Town Planning',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'At which Harappan archaeological site was a sophisticated tidal dockyard with a lock-gate basin excavated?',
    options: ['Lothal (Gujarat)', 'Kalibangan (Rajasthan)', 'Mohenjo-Daro (Sindh)', 'Ropar (Punjab)'],
    correctOptionIndex: 0,
    mantraHint: 'Located near the Gulf of Khambhat on the Bhogava river.',
    explanation: 'Lothal in Gujarat features an engineering marvel: a tidal dockyard engineered to handle seafaring trade vessels carrying carnelian, copper, and textiles to Mesopotamia.'
  },
  {
    id: 'q-sst-2',
    subjectId: 'social_studies',
    chapterId: 'sst-ch1',
    chapterTitle: 'The Harappan Civilization & Early Vedic Life',
    topic: 'The Great Bath Waterproofing',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'The Great Bath at Mohenjo-Daro was made watertight by applying a thick layer of natural bitumen (tar) between kiln-burnt brick walls.',
    correctBoolean: true,
    mantraHint: 'Think about ancient waterproofing technology before synthetic polymers existed.',
    explanation: 'True. The Harappan engineers laid gypsum mortar and coated the brick layers with natural bitumen/asphalt to make the Great Bath completely impervious to water leakage.'
  },
  {
    id: 'q-sst-3',
    subjectId: 'social_studies',
    chapterId: 'sst-ch2',
    chapterTitle: 'Major Landforms & Heat Zones of the Earth',
    topic: 'Solar Heat Zones of Earth',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which solar heat zone of the Earth receives direct, vertical overhead rays of the midday sun and experiences maximum solar radiation?',
    options: ['Torrid Zone', 'North Temperate Zone', 'South Temperate Zone', 'Frigid Zone'],
    correctOptionIndex: 0,
    mantraHint: 'Stretches between the Tropic of Cancer (23.5° N) and Tropic of Capricorn (23.5° S).',
    explanation: 'The Torrid Zone (between 23.5° N and 23.5° S latitudes) receives direct vertical rays of the sun at least once a year, making it the hottest thermal zone on Earth.'
  },
  {
    id: 'q-sst-4',
    subjectId: 'social_studies',
    chapterId: 'sst-ch3',
    chapterTitle: 'Democratic Governance & Panchayati Raj',
    topic: 'Grassroots Democracy & Gram Sabha',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'In rural grassroots governance in India, all adult citizens aged ____ years or above residing in a village constitute the ____.',
    correctBlanks: ['18', 'Gram Sabha'],
    mantraHint: 'Legal voting age in India and the village-wide assembly name.',
    explanation: 'Every adult who has attained the age of 18 years and is registered on the village voter list is an active member of the Gram Sabha.'
  },
  {
    id: 'q-sst-5',
    subjectId: 'social_studies',
    chapterId: 'sst-ch4',
    chapterTitle: 'India: Climate, Natural Vegetation & Wildlife',
    topic: 'Mangrove Forests & Specialized Adaptations',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'Explain why mangrove trees in the Sundarbans develop erect upward-growing aerial roots called pneumatophores.',
    sampleAnswer: 'Mangrove forests grow in coastal tidal wetlands where waterlogged, fine-grained mud is extremely saline and deficient in dissolved oxygen. To survive anoxic soil conditions, trees like Sundari develop erect aerial roots called pneumatophores with breathing pores (lenticels) that project upward above the mud surface to absorb atmospheric oxygen.',
    mantraHint: 'Waterlogged tidal mud lacks oxygen. How do roots breathe?',
    explanation: 'Pneumatophores are negatively geotropic breathing roots containing lenticels that allow atmospheric gas exchange in oxygen-starved marshy soils.'
  },

  // ==========================================
  // ENVIRONMENTAL STUDIES (EVS) QUESTIONS
  // ==========================================
  {
    id: 'q-evs-1',
    subjectId: 'evs',
    chapterId: 'evs-ch1',
    chapterTitle: 'Ecosystems, Food Chains & Biotic Balance',
    topic: 'Lindeman\'s 10% Ecological Law',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'If green plants in an ecosystem capture 20,000 Joules of solar energy, how much energy will approximately be available to secondary consumers (carnivores)?',
    options: ['200 Joules', '2,000 Joules', '20 Joules', '20,000 Joules'],
    correctOptionIndex: 0,
    mantraHint: 'Plants = 20,000 J -> Herbivores (10%) = 2,000 J -> Carnivores (10% of 2,000 J) = ?',
    explanation: 'By Lindeman\'s 10% Law: Plants (20,000 J) -> Primary Consumers (10% = 2,000 J) -> Secondary Consumers (10% = 200 J). 90% is dissipated as metabolic heat.'
  },
  {
    id: 'q-evs-2',
    subjectId: 'evs',
    chapterId: 'evs-ch1',
    chapterTitle: 'Ecosystems, Food Chains & Biotic Balance',
    topic: 'Unidirectional Energy Flow',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'Unlike nutrients which cycle endlessly in ecosystems, the flow of energy through trophic food chains is strictly unidirectional.',
    correctBoolean: true,
    mantraHint: 'Energy captured from sunlight cannot return to the sun once dissipated as heat.',
    explanation: 'True. Energy flows in one direction from the sun -> producers -> consumers -> decomposers, and dissipates as radiant heat without returning to solar origin.'
  },
  {
    id: 'q-evs-3',
    subjectId: 'evs',
    chapterId: 'evs-ch2',
    chapterTitle: 'Water Resources & Rainwater Harvesting',
    topic: 'Rooftop Rainwater Harvesting Components',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'The process of collecting and diverting roof runoff into underground permeable rock layers to replenish groundwater is called ____ harvesting to recharge the ____.',
    correctBlanks: ['rainwater', 'aquifer'],
    mantraHint: 'Technique that captures rain to replenish water-bearing rock layers.',
    explanation: 'Rooftop rainwater harvesting captures seasonal precipitation and channels it through sand/gravel filters into underground aquifers.'
  },
  {
    id: 'q-evs-4',
    subjectId: 'evs',
    chapterId: 'evs-ch3',
    chapterTitle: 'Air & Noise Pollution: Prevention & Health',
    topic: 'Green Muffler Acoustic Protection',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'What is a "Green Muffler" in environmental pollution abatement?',
    options: [
      'Planting dense rows of trees like Neem and Ashoka along roads to absorb noise and filter particulate dust',
      'Using a green exhaust filter inside diesel automobiles',
      'Painting industrial chimneys green to reduce infrared emission',
      'Wearing green earplugs inside loud manufacturing plants'
    ],
    correctOptionIndex: 0,
    mantraHint: 'Think of how dense tree foliage can act as an acoustic sponge.',
    explanation: 'A Green Muffler is a vegetative acoustic barrier created by planting 4 to 6 rows of evergreen trees alongside highways and industrial zones to dampen acoustic decibels by 10 to 15 dB.'
  },
  {
    id: 'q-evs-5',
    subjectId: 'evs',
    chapterId: 'evs-ch4',
    chapterTitle: 'Solid Waste Management & 3 R\'s Strategy',
    topic: '3 R\'s Hierarchy & Segregation',
    type: 'short_answer',
    difficulty: 'Average',
    marks: 3,
    text: 'Explain the 3 R\'s waste hierarchy (Reduce, Reuse, Recycle) with one concrete daily-life example for each step.',
    sampleAnswer: '1. REDUCE: Minimize unnecessary waste generation at the source (e.g., carrying personal cloth bags to grocery stores instead of accepting single-use plastic polythene bags).\n2. REUSE: Use items multiple times before discarding (e.g., repurposing glass jam jars to store pulses and kitchen spices).\n3. RECYCLE: Processing scrap materials into new functional items (e.g., sending old newspapers and cardboard cartons to paper mills to make recycled notebooks and packaging boxes).',
    mantraHint: 'First stop waste before it starts (Reduce), use items again (Reuse), process raw materials (Recycle).',
    explanation: 'The 3 R\'s inverted pyramid prioritizes source reduction first, followed by direct reuse, and lastly material recycling to conserve planetary resources.'
  }
];
