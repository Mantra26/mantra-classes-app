import { Subject, Chapter } from '../types';

export const NEW_SUBJECTS: Subject[] = [
  {
    id: 'sanskrit',
    name: 'Sanskrit (संस्कृतम्)',
    code: 'SKT-LANG',
    iconName: 'BookOpen',
    color: '#d97706',
    bgGradient: 'from-amber-600 to-yellow-700',
    description: 'Sanskrit Vyakaran (Dhatu Roop, Shabda Roop, Sandhi), Subhashitani Shlokas, Varnamala and Sentence Translation.',
    chapterCount: 4,
    grades: ['5', '6', '7'],
    boards: ['ICSE', 'CBSE']
  },
  {
    id: 'social_studies',
    name: 'Social Studies (SST)',
    code: 'SST-CORE',
    iconName: 'Landmark',
    color: '#c2410c',
    bgGradient: 'from-orange-600 to-amber-800',
    description: 'Integrated Social Studies: The Harappan Civilization & Vedic Era, Earth Landforms, Democratic Governance, and Natural Vegetation.',
    chapterCount: 4,
    grades: ['3', '4', '5', '6', '7'],
    boards: ['ICSE', 'CBSE', 'IGCSE']
  },
  {
    id: 'evs',
    name: 'Environmental Studies (EVS)',
    code: 'EVS-CORE',
    iconName: 'Leaf',
    color: '#15803d',
    bgGradient: 'from-emerald-600 to-green-800',
    description: 'Ecosystems & Food Chains, Water Resources & Rainwater Harvesting, Pollution Control, and Waste Management (3 R\'s).',
    chapterCount: 4,
    grades: ['2', '3', '4', '5', '6', '7'],
    boards: ['ICSE', 'CBSE', 'IGCSE']
  }
];

export const NEW_SUBJECTS_CHAPTERS: Chapter[] = [
  // ==========================================
  // SANSKRIT (संस्कृतम्) CHAPTERS
  // ==========================================
  {
    id: 'skt-ch1',
    subjectId: 'sanskrit',
    chapterNumber: 1,
    title: 'संस्कृत वर्णमाला एवं उच्चारणम् (Alphabet & Phonetics)',
    summary: 'Introduction to Devanagari Sanskrit phonetics: Swara (vowels: Hrasva, Deergha, Pluta), Vyanjana (consonants: Sparsha, Antastha, Ushma), and Ayogavaha (Anusvara & Visarga). Understanding articulation places (Kanthya, Talavya, Murdhanya, Dantya, Oshthya).',
    keyConcepts: [
      'Sanskrit vowels (स्वराः) are divided into Hrasva (short: अ, इ, उ, ऋ, ऌ) and Deergha (long: आ, ई, ऊ, ॠ, ए, ऐ, ओ, औ)',
      'Consonants (व्यञ्जनानि) consist of 25 Sparsha (क-वर्ग to प-वर्ग), 4 Antastha (य, र, ल, व), and 4 Ushma (श, ष, स, ह)',
      'Ayogavaha includes Anusvara (ं) and Visarga (ः)',
      'Pronunciation places (उच्चारण स्थानानि): Kanthya (Throat), Talavya (Palate), Murdhanya (Roof), Dantya (Teeth), Oshthya (Lips)'
    ],
    keyFormulasOrTerms: [
      { term: 'ह्रस्व स्वर (Short Vowels)', definition: 'Vowels that take one matra (single unit of time) to pronounce: अ, इ, उ, ऋ, ऌ' },
      { term: 'दीर्घ स्वर (Long Vowels)', definition: 'Vowels requiring two matras for pronunciation: आ, ई, ऊ, ॠ, ए, ऐ, ओ, औ' },
      { term: 'विसर्ग (Visarga - ः)', definition: 'An unvoiced aspiration pronounced similar to half "h" (ह) originating from the throat' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Sanskrit Varnamala & Pronunciation Guide - Uma Shukla',
        durationOrPages: '18 mins',
        videoUrl: 'https://www.youtube.com/embed/5a2xW4m5Cg4'
      },
      {
        type: 'ppt_presentation',
        title: 'Sanskrit Alphabet & Phonetics Master Slide Deck',
        durationOrPages: '6 Slides',
        slides: [
          {
            slideNumber: 1,
            title: 'संस्कृत वर्णमाला परिचयः (Sanskrit Alphabet Overview)',
            categoryTag: 'Foundations',
            bullets: [
              'Sanskrit is written in Devanagari script (देवनागरी लिपि)',
              'Comprises 13 Swaras (vowels) and 33 Vyanjanas (consonants)',
              'Pure phonetic consistency: exactly as spoken is exactly as written',
              'Two supplementary sounds called Ayogavaha: Anusvara (ं) & Visarga (ः)'
            ],
            keyHighlight: 'Phonetic perfection: each sound has a precise, unvarying anatomical origin.'
          },
          {
            slideNumber: 2,
            title: 'स्वराणाम् वर्गीकरणम् (Classification of Vowels)',
            categoryTag: 'Vowels',
            bullets: [
              'ह्रस्व स्वराः (5 Short Vowels): अ, इ, उ, ऋ, ऌ (1 Matra time)',
              'दीर्घ स्वराः (8 Long Vowels): आ, ई, ऊ, ॠ, ए, ऐ, ओ, औ (2 Matras time)',
              'संयुक्त स्वराः (Diphthongs): ए (अ+इ), ऐ (अ+ए), ओ (अ+उ), औ (अ+ओ)',
              'Pluta Swara (3 Matras): Used in calling someone or musical chanting (e.g., ओ३म्)'
            ]
          },
          {
            slideNumber: 3,
            title: 'स्पर्श व्यञ्जनानि (The 25 Stop Consonants)',
            categoryTag: 'Consonants',
            bullets: [
              'क-वर्ग (Gutturals): क, ख, ग, घ, ङ',
              'च-वर्ग (Palatals): च, छ, ज, झ, ञ',
              'ट-वर्ग (Retroflex): ट, ठ, ड, ढ, ण',
              'त-वर्ग (Dentals): त, थ, द, ध, न',
              'प-वर्ग (Labials): प, फ, ब, भ, म'
            ],
            keyHighlight: 'The 5th consonant of every varga is an Anunasika (nasal sound).'
          },
          {
            slideNumber: 4,
            title: 'अन्तःस्थाः एवं ऊष्माणः (Semi-vowels & Sibilants)',
            categoryTag: 'Phonetics',
            bullets: [
              'अन्तःस्थ व्यञ्जनानि (Semi-vowels): य्, र्, ल्, व् (Pronounced midway between vowels and consonants)',
              'ऊष्म व्यञ्जनानि (Sibilants & Aspirate): श्, ष्, स्, ह् (Produce friction and heat during articulation)',
              'संयुक्ताक्षराणि (Conjuncts): क्ष (क्+ष्), त्र (त्+र्), ज्ञ (ज्+ञ)'
            ]
          },
          {
            slideNumber: 5,
            title: 'उच्चारण स्थानानि (Points of Articulation)',
            categoryTag: 'Anatomy',
            bullets: [
              'कण्ठ (Throat): अ, आ, क-वर्ग, ह, विसर्ग',
              'तालु (Hard Palate): इ, ई, च-वर्ग, य, श',
              'मूर्धा (Roof of Mouth): ऋ, ॠ, ट-वर्ग, र, ष',
              'दन्त (Teeth): लृ, त-वर्ग, ल, स',
              'ओष्ठ (Lips): उ, ऊ, प-वर्ग, उपध्मानीय'
            ],
            keyHighlight: 'Sutra: अकुहविसर्जनीयानां कण्ठः (Throat articulates A, Ka-varga, Ha, and Visarga).'
          },
          {
            slideNumber: 6,
            title: 'Summary & Practice Pointers',
            categoryTag: 'Summary',
            bullets: [
              'Devanagari letters carry an inherent \"a\" sound unless modified with a Halant (्)',
              'Visarga after masculine singular nouns is mandatory in Sanskrit (e.g., रामः, बालकः)',
              'Daily practice of Maheswara Sutras enhances diction and grammatical retention'
            ],
            keyHighlight: 'Mastering the 5 Varga articulators prevents spelling errors in Sandhi.'
          }
        ]
      }
    ]
  },
  {
    id: 'skt-ch2',
    subjectId: 'sanskrit',
    chapterNumber: 2,
    title: 'धातु रूपाणि एवं लकार परिचयः (Verb Forms & Tenses)',
    summary: 'Study of Sanskrit root verbs (धातु) such as पठ् (read), गम्/गच्छ् (go), भू/भव् (be/become), and कृ (do). Understanding Lakaras (Tenses): Lat Lakar (Present tense), Lrit Lakar (Future tense), and Lang Lakar (Past tense) across Prathama, Madhyama, and Uttama Purusha.',
    keyConcepts: [
      'In Sanskrit, verbs originate from Dhatus (roots) categorized into Parasmaipada and Atmanepada',
      'There are 3 persons (पुरुषाः): प्रथम पुरुष (Third person), मध्यम पुरुष (Second person), उत्तम पुरुष (First person)',
      'There are 3 numbers (वचनानि): एकवचन (Singular), द्विवचन (Dual), बहुवचन (Plural)',
      'लट्लकार (Present): पठति, पठतः, पठन्ति | पठसि, पठथः, पठथ | पठामि, पठावः, पठामः',
      'लृट्लकार (Future): पठिष्यति, पठिष्यतः, पठिष्यन्ति...'
    ],
    keyFormulasOrTerms: [
      { term: 'लट् लकार (Lat Lakar)', definition: 'Present tense denoting ongoing or habitual actions: ति, तः, अन्ति (तिङ् प्रत्ययाः)' },
      { term: 'लृट् लकार (Lrit Lakar)', definition: 'Future tense indicating actions to occur: स्यति / इष्यति suffixes' },
      { term: 'लङ् लकार (Lang Lakar)', definition: 'Past imperfect tense prefixed with \"अ\" and suffixed with त्, ताम्, अन्...' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Mastering Sanskrit Dhatu Roop (Lat & Lrit Lakar) - Mantra Classes',
        durationOrPages: '22 mins',
        videoUrl: 'https://www.youtube.com/embed/5a2xW4m5Cg4'
      }
    ]
  },
  {
    id: 'skt-ch3',
    subjectId: 'sanskrit',
    chapterNumber: 3,
    title: 'शब्द रूपाणि एवं कारक विभक्ति (Noun Declensions & Cases)',
    summary: 'Mastery of noun declensions (शब्द रूपाणि) for Akarant masculine (बालक, राम), Aakarant feminine (लता, बालिका), and Akarant neuter (फल, पुस्तक). Understanding the 7 Vibhaktis (Cases) and their mapping to Karak relations (कर्ता, कर्म, करण, सम्प्रदान, अपादान, सम्बन्ध, अधिकरण).',
    keyConcepts: [
      'Sanskrit nouns decline through 7 Vibhaktis plus Sambodhana across singular, dual, and plural',
      'Prathama (Nominative) = Karta (Agent) -> बालकः पठति',
      'Dvitiya (Accusative) = Karma (Object) -> बालकः पुस्तकं पठति',
      'Tritiya (Instrumental) = Karana (Means/Instrument) -> कलमेन लिखति',
      'Chaturthi (Dative) = Sampradana (Recipient) -> भिक्षुकाय दानं यच्छति',
      'Panchami (Ablative) = Apadana (Separation) -> वृक्षात् पत्रं पतति'
    ],
    keyFormulasOrTerms: [
      { term: 'विभक्ति (Vibhakti)', definition: 'Case endings added to noun bases to express grammatical relationships in a sentence' },
      { term: 'कारक (Karaka)', definition: 'The functional relationship between a noun and the main verb (action)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Shabda Roop & Karaka Vibhakti Tricks - Uma Shukla',
        durationOrPages: '20 mins',
        videoUrl: 'https://www.youtube.com/embed/5a2xW4m5Cg4'
      }
    ]
  },
  {
    id: 'skt-ch4',
    subjectId: 'sanskrit',
    chapterNumber: 4,
    title: 'सूक्तयः एवं सुभाषितम् (Subhashitani & Moral Wisdom)',
    summary: 'Exploration of inspiring timeless Sanskrit verses and Subhashitas emphasizing Vidya (knowledge), Satya (truth), Parishrama (hard work), and Mitra-Dharma (friendship). Includes Padachhed, Anvaya (prose order), and Hindi/English translation.',
    keyConcepts: [
      'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः । न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः ॥ (Success requires persistent effort, not mere daydreams)',
      'विद्या ददाति विनयं विनयाद्याति पात्रताम् । पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम् ॥ (True education bestows humility and character)',
      'Understanding Anvaya: rearranging poetic metered verses into direct subject-object-verb word order'
    ],
    keyFormulasOrTerms: [
      { term: 'अन्वय (Anvaya)', definition: 'The natural grammatical word order of words in a Sanskrit shloka to extract its direct meaning' },
      { term: 'सुभाषित (Subhashita)', definition: 'Wise aphorisms or noble sayings designed to inspire moral character and intellect' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Chanting & Analysis of Core Sanskrit Subhashitas - Uma Shukla',
        durationOrPages: '16 mins',
        videoUrl: 'https://www.youtube.com/embed/5a2xW4m5Cg4'
      }
    ]
  },

  // ==========================================
  // SOCIAL STUDIES (SST) CHAPTERS
  // ==========================================
  {
    id: 'sst-ch1',
    subjectId: 'social_studies',
    chapterNumber: 1,
    title: 'The Harappan Civilization & Early Vedic Life',
    summary: 'The dawn of Indian urbanization in the Indus Valley: town planning with grid systems, the Great Bath at Mohenjo-Daro, dockyards at Lothal, terracotta seals, and trade networks. Transition into the Early Vedic period: pastoral life, Sabha, Samiti, and the composition of the Rigveda.',
    keyConcepts: [
      'Harappan cities were divided into a fortified Citadel (Western mound) and a Lower Town (Eastern residential area)',
      'Advanced drainage network: underground brick-lined drains with inspection sumps in every street',
      'The Great Bath at Mohenjo-Daro constructed with burnt bricks, gypsum mortar, and bitumen lining',
      'Early Vedic society was egalitarian and pastoral; political assemblies included Sabha and Samiti'
    ],
    keyFormulasOrTerms: [
      { term: 'Citadel', definition: 'The elevated, fortified western part of Indus Valley cities containing public and administrative structures' },
      { term: 'Steatite Seals', definition: 'Carved soft stone seals depicting animals like the one-horned bull and Pashupati used for maritime trade authentication' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Indus Valley Civilization & Town Planning Visual Tour - Uma Shukla',
        durationOrPages: '24 mins',
        videoUrl: 'https://www.youtube.com/embed/5a2xW4m5Cg4'
      },
      {
        type: 'ppt_presentation',
        title: 'The Harappan Civilization Archaeological Slide Deck',
        durationOrPages: '6 Slides',
        slides: [
          {
            slideNumber: 1,
            title: 'Discovery & Geographical Extent',
            categoryTag: 'Archaeology',
            bullets: [
              'First excavated in 1921 at Harappa by Daya Ram Sahni; 1922 at Mohenjo-Daro by R.D. Banerji',
              'Spread across Northwestern India, Pakistan, and Afghanistan (1.3 million sq km)',
              'Key sites: Harappa (Ravi), Mohenjo-Daro (Indus), Lothal (Bhogava, Gujarat), Kalibangan (Rajasthan)'
            ],
            keyHighlight: 'Bronze Age civilization flourishing concurrently with Mesopotamia and Egypt.'
          },
          {
            slideNumber: 2,
            title: 'Grid System & Town Planning',
            categoryTag: 'Urban Planning',
            bullets: [
              'Streets cut each other at precise right angles (90 degrees), dividing city into rectangular blocks',
              'Standardized burnt bricks in the ratio 1:2:4 (thickness:width:length)',
              'No doors or windows opened directly onto main thoroughfares to reduce dust and noise'
            ]
          },
          {
            slideNumber: 3,
            title: 'Sanitation & Drainage Excellence',
            categoryTag: 'Sanitation',
            bullets: [
              'Every house had its own bathroom with sloping brick floors linked to street drains',
              'Street drains covered with limestone slabs and wooden planks for periodic cleaning',
              'Inspection traps and soak pits installed at regular intervals to collect sediment'
            ],
            keyHighlight: 'No ancient civilization, even Rome, paid such meticulous attention to public sanitation.'
          },
          {
            slideNumber: 4,
            title: 'The Great Bath & Granaries',
            categoryTag: 'Architecture',
            bullets: [
              'Great Bath: 11.88m x 7.01m x 2.43m waterproofed with natural bitumen/tar',
              'Served ritual purification purposes prior to religious ceremonies',
              'Granaries elevated on podiums with air ducts to prevent dampness and insect infestation'
            ]
          },
          {
            slideNumber: 5,
            title: 'Trade, Crafts & Harappan Seals',
            categoryTag: 'Economy',
            bullets: [
              'Maritime dockyard identified at Lothal with tidal lock-gate mechanism',
              'Over 2,000 steatite seals discovered with pictographic script (boustrophedon)',
              'Standardized chert stone weights following binary (1, 2, 4, 8, 16) and decimal multiples'
            ]
          },
          {
            slideNumber: 6,
            title: 'Decline & Historical Significance',
            categoryTag: 'Decline',
            bullets: [
              'Gradual decline around 1900 BCE likely due to tectonic shifts, climate change, and river drying (Saraswati)',
              'Legacy: Urban drainage principles, brick standardization, and craft traditions survived into later India'
            ],
            keyHighlight: 'The bedrock of Indian urban heritage and architectural precision.'
          }
        ]
      }
    ]
  },
  {
    id: 'sst-ch2',
    subjectId: 'social_studies',
    chapterNumber: 2,
    title: 'Major Landforms & Heat Zones of the Earth',
    summary: 'Study of internal and external forces shaping Earth surface: Mountains (Fold, Block, Volcanic), Plateaus, and Plains. Exploration of Latitudes and the three primary solar heat zones: Torrid Zone, Temperate Zone, and Frigid Zone.',
    keyConcepts: [
      'Mountains are classified into Fold Mountains (Himalayas, Alps), Block Mountains (Vosges, Black Forest), and Volcanic Mountains (Mt. Fuji, Mt. Kilimanjaro)',
      'Plateaus are elevated flat-topped tablelands; the Tibetan Plateau is the world\'s highest',
      'Alluvial plains formed by river deposition (Indo-Gangetic Plain) support high human population densities',
      'The three Heat Zones: Torrid Zone (Tropic of Cancer to Capricorn), Temperate Zone, and Frigid Zone (Arctic/Antarctic circles to Poles)'
    ],
    keyFormulasOrTerms: [
      { term: 'Torrid Zone', definition: 'The warmest climatic belt between 23.5°N and 23.5°S where the sun is directly overhead at least once a year' },
      { term: 'Fold Mountains', definition: 'Mountains created by tectonic plate collisions compressing sedimentary rock layers into huge anticlines and synclines' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Earth Landforms & Solar Heat Zones 3D Animation - Uma Shukla',
        durationOrPages: '21 mins',
        videoUrl: 'https://www.youtube.com/embed/5a2xW4m5Cg4'
      }
    ]
  },
  {
    id: 'sst-ch3',
    subjectId: 'social_studies',
    chapterNumber: 3,
    title: 'Democratic Governance & Panchayati Raj',
    summary: 'Understanding democracy and decentralized grassroots administration in India: 3-tier Panchayati Raj system (Gram Panchayat, Panchayat Samiti, Zila Parishad) in rural areas and Municipal Corporations in urban cities. The role of Gram Sabha and universal adult franchise.',
    keyConcepts: [
      'Gram Sabha consists of all adult citizens aged 18+ registered in the electoral roll of a village',
      'Gram Panchayat is the executive body headed by the Sarpanch elected by the Gram Sabha',
      '3-Tier Structure: Village (Gram Panchayat) -> Block (Panchayat Samiti) -> District (Zila Parishad)',
      'Urban local bodies: Nagar Panchayat (transitional areas), Municipal Council (small cities), Municipal Corporation (large metros headed by a Mayor)'
    ],
    keyFormulasOrTerms: [
      { term: 'Gram Sabha', definition: 'The democratic assembly of all registered adult voters residing within a village panchayat area' },
      { term: 'Universal Adult Suffrage', definition: 'The constitutional right of every adult citizen aged 18 and above to vote without discrimination' }
    ],
    resources: [
      {
        type: 'video',
        title: 'How Panchayati Raj & Municipalities Work - Civic Masterclass',
        durationOrPages: '19 mins',
        videoUrl: 'https://www.youtube.com/embed/5a2xW4m5Cg4'
      }
    ]
  },
  {
    id: 'sst-ch4',
    subjectId: 'social_studies',
    chapterNumber: 4,
    title: 'India: Climate, Natural Vegetation & Wildlife',
    summary: 'Study of India\'s monsoon climate: South-West Monsoon winds, Retreating Monsoon, and rainfall distribution. Types of natural vegetation: Tropical Evergreen Rainforests, Tropical Deciduous (Monsoon) Forests, Thorny Shrubs, Mountain Forests, and Mangrove Tidal Forests.',
    keyConcepts: [
      'India experiences a tropical monsoon climate dominated by the seasonal reversal of wind systems',
      'Tropical Evergreen Forests (Western Ghats, North-East) do not shed leaves simultaneously, staying green year-round (>200 cm rainfall)',
      'Tropical Deciduous Forests are the most widespread in India; shed leaves for 6-8 weeks in dry summer',
      'Mangrove forests (Sundarbans) possess specialized stilt roots and pneumatophores (breathing roots) to survive tidal mud'
    ],
    keyFormulasOrTerms: [
      { term: 'Monsoon', definition: 'Derived from Arabic \"mausim\" meaning season; refers to periodic seasonal reversal of wind direction accompanied by precipitation' },
      { term: 'Pneumatophores', definition: 'Erect aerial breathing roots of mangrove plants that protrude upward above waterlogged tidal soil to absorb atmospheric oxygen' }
    ],
    resources: [
      {
        type: 'video',
        title: 'India Natural Vegetation & Monsoon Wind Systems - Uma Shukla',
        durationOrPages: '23 mins',
        videoUrl: 'https://www.youtube.com/embed/5a2xW4m5Cg4'
      }
    ]
  },

  // ==========================================
  // ENVIRONMENTAL STUDIES (EVS) CHAPTERS
  // ==========================================
  {
    id: 'evs-ch1',
    subjectId: 'evs',
    chapterNumber: 1,
    title: 'Ecosystems, Food Chains & Biotic Balance',
    summary: 'Understanding abiotic (soil, sunlight, air, water) and biotic (producers, consumers, decomposers) components of ecosystems. Trophic levels, energy flow following Lindeman\'s 10% rule, Food Chains, and Food Webs that maintain ecological equilibrium.',
    keyConcepts: [
      'Producers (autotrophs like green plants) convert solar energy into chemical energy through photosynthesis',
      'Consumers are classified as Primary (herbivores), Secondary (carnivores), and Tertiary (apex predators)',
      'Decomposers (bacteria and fungi) recycle vital nutrients back into the soil and atmosphere',
      'Energy flow is unidirectional: only approximately 10% of energy is transferred from one trophic level to the next'
    ],
    keyFormulasOrTerms: [
      { term: '10% Law of Energy Transfer', definition: 'Formulated by Raymond Lindeman: only 10% of the energy entering a trophic level is stored and available to the next consumer level' },
      { term: 'Trophic Level', definition: 'The specific feeding position that an organism occupies in a food chain or ecological pyramid' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Food Chains, Food Webs & Lindeman 10% Rule - EVS Masterclass',
        durationOrPages: '17 mins',
        videoUrl: 'https://www.youtube.com/embed/5a2xW4m5Cg4'
      },
      {
        type: 'ppt_presentation',
        title: 'Ecosystems & Energy Flow Visual Slide Deck',
        durationOrPages: '6 Slides',
        slides: [
          {
            slideNumber: 1,
            title: 'What is an Ecosystem?',
            categoryTag: 'Ecology',
            bullets: [
              'A self-sustaining community where living organisms interact with their non-living physical environment',
              'Two primary components: Biotic (living) and Abiotic (non-living)',
              'Types: Terrestrial (Forests, Grasslands, Deserts) and Aquatic (Ponds, Lakes, Marine Oceans)'
            ],
            keyHighlight: 'Earth’s largest unified ecological system is the Biosphere.'
          },
          {
            slideNumber: 2,
            title: 'Biotic Roles: Producers to Decomposers',
            categoryTag: 'Biotic Factors',
            bullets: [
              'Producers (Autotrophs): Green plants synthesizing glucose via chlorophyll and sunlight',
              'Primary Consumers: Herbivores (Deer, Rabbit, Cow) feeding on vegetation',
              'Secondary & Tertiary Consumers: Carnivores (Fox, Snake) and Apex Predators (Tiger, Eagle)',
              'Decomposers: Saprotrophs breaking down organic waste into soil minerals'
            ]
          },
          {
            slideNumber: 3,
            title: 'Food Chains vs Food Webs',
            categoryTag: 'Interdependence',
            bullets: [
              'Food Chain: A linear sequence of who eats whom (Grass -> Grasshopper -> Frog -> Snake -> Eagle)',
              'Food Web: A realistic interconnected network of multiple food chains',
              'Significance: Complex food webs provide alternative food sources and maintain ecological stability'
            ],
            keyHighlight: 'Greater biodiversity equals greater resilience against natural disasters.'
          },
          {
            slideNumber: 4,
            title: 'Energy Flow & Lindeman\'s 10% Rule',
            categoryTag: 'Energy Dynamics',
            bullets: [
              'Solar radiation is the ultimate driver of life on planet Earth',
              'Sunlight (100,000 J) -> Plants capture ~1% (1,000 J) -> Herbivores (100 J) -> Carnivores (10 J)',
              '90% of energy is expended as metabolic heat, respiration, and movement at every step',
              'Energy flow is strictly unidirectional (non-cyclic)'
            ]
          },
          {
            slideNumber: 5,
            title: 'Ecological Pyramids',
            categoryTag: 'Pyramids',
            bullets: [
              'Pyramid of Numbers: Graphical representation of organism count at each trophic tier',
              'Pyramid of Biomass: Total dry weight of living matter at each tier',
              'Pyramid of Energy: Always upright because energy diminishes progressively at higher levels'
            ]
          },
          {
            slideNumber: 6,
            title: 'Human Impact & Conservation',
            categoryTag: 'Conservation',
            bullets: [
              'Biomagnification: Accumulation of toxic pesticides (like DDT) in higher trophic levels',
              'Deforestation disrupts carbon sequestration and causes habitat fragmentation',
              'Conservation: Protecting wildlife corridors and creating biosphere reserves'
            ],
            keyHighlight: 'Every species, no matter how small, plays an indispensable ecological role.'
          }
        ]
      }
    ]
  },
  {
    id: 'evs-ch2',
    subjectId: 'evs',
    chapterNumber: 2,
    title: 'Water Resources & Rainwater Harvesting',
    summary: 'Distribution of freshwater on Earth, causes of water scarcity, groundwater depletion, and recharge. Rooftop rainwater harvesting techniques, stepwells (Baolis), watershed management, and low-cost purification methods.',
    keyConcepts: [
      'Less than 1% of the total water on Earth is readily accessible freshwater for human consumption',
      'Groundwater over-extraction has lowered the water table drastically across urban and agricultural zones',
      'Rooftop Rainwater Harvesting collects clean runoff from roofs, filters it, and directs it to recharge borewells or storage tanks',
      'Watershed management approaches integrate conservation of soil, moisture, and vegetation across a river basin'
    ],
    keyFormulasOrTerms: [
      { term: 'Rainwater Harvesting', definition: 'The technique of collecting, filtering, and storing rainwater runoff from surfaces for immediate use or aquifer recharge' },
      { term: 'Aquifer', definition: 'An underground geological formation of permeable rock or sediment that holds and transmits groundwater' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Rainwater Harvesting Systems & Aquifer Recharge - Uma Shukla',
        durationOrPages: '18 mins',
        videoUrl: 'https://www.youtube.com/embed/5a2xW4m5Cg4'
      }
    ]
  },
  {
    id: 'evs-ch3',
    subjectId: 'evs',
    chapterNumber: 3,
    title: 'Air & Noise Pollution: Prevention & Health',
    summary: 'Causes, health hazards, and prevention of air and noise pollution. Gaseous pollutants (CO, SO2, NOx), Particulate Matter (PM2.5 and PM10), Smog, Acid Rain, and the Greenhouse Effect. Decibel (dB) noise limits, auditory damage, and green mufflers.',
    keyConcepts: [
      'Combustion of fossil fuels releases Carbon Monoxide, Sulphur Dioxide, Nitrogen Oxides, and particulate soot',
      'PM2.5 particles penetrate deep into the human alveoli, triggering chronic asthma and cardiovascular disorders',
      'Acid rain (pH < 5.6) occurs when SO2 and NOx react with atmospheric moisture to form sulfuric and nitric acids',
      'Noise above 80 decibels (dB) can cause permanent hearing impairment, hypertension, and sleep disorders; Green Mufflers (tree belts) absorb acoustic vibrations'
    ],
    keyFormulasOrTerms: [
      { term: 'PM 2.5', definition: 'Particulate Matter with a diameter of 2.5 micrometers or smaller, capable of entering bloodstream through lung tissue' },
      { term: 'Green Muffler', definition: 'Planting dense rows of evergreen trees like Neem and Ashoka along highways to absorb noise and trap dust pollutants' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Understanding Air Quality Index (AQI) & Green Mufflers - Uma Shukla',
        durationOrPages: '19 mins',
        videoUrl: 'https://www.youtube.com/embed/5a2xW4m5Cg4'
      }
    ]
  },
  {
    id: 'evs-ch4',
    subjectId: 'evs',
    chapterNumber: 4,
    title: 'Solid Waste Management & 3 R\'s Strategy',
    summary: 'Classification of municipal solid waste: Biodegradable (organic, kitchen waste) vs Non-biodegradable (plastics, electronic e-waste, glass). The 3 R\'s strategy: Reduce, Reuse, Recycle. Sanitary landfills, Vermicomposting, and banning single-use plastics.',
    keyConcepts: [
      'Segregation at source: Green bins for wet biodegradable organic waste; Blue bins for dry recyclable waste',
      'Biodegradable waste can be converted into organic humus compost or biogas via anaerobic digestion',
      'Non-biodegradable plastics persist for hundreds of years, leaching endocrine-disrupting microplastics into waterways',
      'The 3 R\'s hierarchy: REDUCE consumption first, REUSE existing materials repeatedly, and RECYCLE scrap materials into new products'
    ],
    keyFormulasOrTerms: [
      { term: 'Vermicomposting', definition: 'A bio-oxidation process using earthworms (like Eisenia fetida) to transform kitchen organic waste into nutrient-dense vermicast fertilizer' },
      { term: 'E-Waste', definition: 'Discarded electronic devices (smartphones, computers, batteries) containing toxic heavy metals like lead, mercury, and cadmium' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Waste Segregation, Vermicomposting & 3 R\'s in Action - Uma Shukla',
        durationOrPages: '16 mins',
        videoUrl: 'https://www.youtube.com/embed/5a2xW4m5Cg4'
      }
    ]
  }
];
