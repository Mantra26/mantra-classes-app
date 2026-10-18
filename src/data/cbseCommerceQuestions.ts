import { Question } from '../types';

export const CBSE_COMMERCE_QUESTION_BANK: Question[] = [
  // ==========================================
  // ACCOUNTANCY - CLASS 11 (CBSE)
  // ==========================================
  {
    id: 'q-acct-11-1',
    subjectId: 'accountancy',
    chapterId: 'acct-11-ch1',
    chapterTitle: 'Introduction to Accounting & Basic Accounting Terms',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Accounting Equation & Capital',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'If Total Assets of a sole proprietorship firm are ₹ 4,50,000 and Outside Liabilities are ₹ 1,75,000, what is the Owner Capital (Equity)?',
    options: ['₹ 2,75,000', '₹ 6,25,000', '₹ 1,75,000', '₹ 3,25,000'],
    correctOptionIndex: 0,
    mantraHint: 'Recall fundamental accounting equation: Assets = Liabilities + Capital. Rearrange for Capital: Capital = Assets - Liabilities.',
    explanation: 'Capital = Assets - Liabilities = ₹ 4,50,000 - ₹ 1,75,000 = ₹ 2,75,000. Double-entry duality ensures this equation remains perpetually balanced.'
  },
  {
    id: 'q-acct-11-2',
    subjectId: 'accountancy',
    chapterId: 'acct-11-ch1',
    chapterTitle: 'Introduction to Accounting & Basic Accounting Terms',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Trade vs Cash Discount',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'Trade discount allowed on the list price of goods is not recorded separately in the books of accounts; only net sales value is recorded.',
    correctBoolean: true,
    mantraHint: 'Trade discount is deducted directly from the catalog price at invoice preparation. Only cash discount appears in ledger accounts.',
    explanation: 'True. Trade discount is granted for trade volume/custom and is deducted on the face of invoice. It never has a separate ledger account, unlike Cash Discount Allowed (expense) or Cash Discount Received (income).'
  },
  {
    id: 'q-acct-11-3',
    subjectId: 'accountancy',
    chapterId: 'acct-11-ch2',
    chapterTitle: 'Theory Base of Accounting, GAAP & GST',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Prudence & Conservatism Principle',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'According to the convention of Prudence (Conservatism), closing inventory (stock) is valued at cost price or ____, whichever is ____.',
    correctBlanks: ['net realizable value', 'lower'],
    mantraHint: 'Do not anticipate profits, but anticipate and provide for all possible future losses.',
    explanation: 'Closing stock is valued at Cost Price or Net Realizable Value (market price), whichever is lower, ensuring profits are not artificially inflated.'
  },
  {
    id: 'q-acct-11-4',
    subjectId: 'accountancy',
    chapterId: 'acct-11-ch3',
    chapterTitle: 'Recording of Transactions: Journal, Ledger & Trial Balance',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Compound Journal Entry with Trade & Cash Discount',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'Pass the necessary Journal Entry in the books of Sharma Traders: "Sold goods to Rohan of list price ₹ 50,000 at 10% trade discount and 2% cash discount. Rohan paid 60% of the net amount immediately by cheque, and balance was on credit."',
    sampleAnswer: 'Bank A/c Dr. ₹ 26,460 | Discount Allowed A/c Dr. ₹ 540 | Rohan A/c Dr. ₹ 18,000 | To Sales A/c ₹ 45,000',
    markingCriteria: [
      '1 mark: Correct calculation of net sales (₹ 50,000 - 10% TD = ₹ 45,000).',
      '1 mark: Correct bifurcation into cash portion (60% = ₹ 27,000) and credit portion (40% = ₹ 18,000).',
      '1 mark: Correct cash discount calculation (2% of ₹ 27,000 = ₹ 540; Bank = ₹ 26,460) with balanced journal entry and narration.'
    ],
    mantraHint: 'Step 1: Subtract Trade Discount first. Step 2: Split Net Price into 60% cash and 40% credit. Step 3: Cash discount applies ONLY to the 60% cash portion paid immediately!',
    explanation: 'List price: ₹ 50,000. Less 10% TD: ₹ 5,000. Net Sales: ₹ 45,000. Cash portion (60%): ₹ 27,000. 2% Cash Discount: ₹ 540. Cash received in Bank: ₹ 26,460. Credit portion (40%): ₹ 18,000 debited to Rohans Personal A/c.'
  },
  {
    id: 'q-acct-11-5',
    subjectId: 'accountancy',
    chapterId: 'acct-11-ch5',
    chapterTitle: 'Financial Statements of Sole Proprietorship (With Adjustments)',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Operating Final Accounts & Provision for Doubtful Debts',
    type: 'long_answer',
    difficulty: 'Tough',
    marks: 5,
    text: 'Explain the detailed accounting treatment and state the journal entries for the following adjustments appearing outside the Trial Balance: (i) Provision for Doubtful Debts to be maintained @ 5% on Sundry Debtors of ₹ 80,000 after writing off further Bad Debts of ₹ 2,000; (ii) Outstanding Wages ₹ 6,000; (iii) Closing Stock valued at Cost ₹ 40,000 and Market Value ₹ 36,000.',
    sampleAnswer: '(i) Bad Debts Dr. ₹ 2,000, Prov for DD Dr. ₹ 3,900; (ii) Wages Dr. ₹ 6,000 to O/S Wages; (iii) Closing Stock recorded at ₹ 36,000 in Trading A/c Cr and Balance Sheet Asset.',
    markingCriteria: [
      '2 marks: Accurate computation and journal entries for Bad Debts and new Provision on remaining good debtors: (₹ 80,000 - ₹ 2,000) × 5% = ₹ 3,900.',
      '1.5 marks: Treatment of Outstanding wages added to Wages in Trading A/c and shown on Liabilities side of Balance Sheet.',
      '1.5 marks: Application of conservatism to value Closing Stock at ₹ 36,000 (lower of cost and market value) with presentation in Trading A/c & Balance Sheet.'
    ],
    mantraHint: 'Always deduct further bad debts FIRST from Debtors before calculating the 5% provision on remaining good debtors!',
    explanation: 'Debtors ₹ 80,000 - ₹ 2,000 further bad debts = ₹ 78,000 good debtors. 5% Provision = ₹ 3,900 debited to P&L A/c. Outstanding Wages ₹ 6,000 debited to Trading A/c and shown under Current Liabilities. Closing stock taken at ₹ 36,000 (lower of Cost ₹ 40k and Market ₹ 36k) credited to Trading A/c and shown under Current Assets.'
  },

  // ==========================================
  // ACCOUNTANCY - CLASS 12 (CBSE)
  // ==========================================
  {
    id: 'q-acct-12-1',
    subjectId: 'accountancy',
    chapterId: 'acct-12-ch1',
    chapterTitle: 'Accounting for Partnership: Fundamentals & Goodwill',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Interest on Drawings Average Period Method',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'A partner Amit withdraws ₹ 10,000 at the beginning of each quarter throughout the year. If interest on drawings is charged @ 10% p.a., the total interest on drawings will be:',
    options: ['₹ 2,500', '₹ 2,000', '₹ 3,000', '₹ 1,500'],
    correctOptionIndex: 0,
    mantraHint: 'Total drawings = ₹ 10,000 × 4 = ₹ 40,000. Beginning of each quarter average period = (12 + 3) / 2 = 7.5 months.',
    explanation: 'Total drawings = 4 × ₹ 10,000 = ₹ 40,000. Interest = ₹ 40,000 × (10 / 100) × (7.5 / 12) = ₹ 2,500. Average period is 7.5 months for quarterly withdrawals made at beginning of quarter.'
  },
  {
    id: 'q-acct-12-2',
    subjectId: 'accountancy',
    chapterId: 'acct-12-ch1',
    chapterTitle: 'Accounting for Partnership: Fundamentals & Goodwill',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Statutory Rules in Absence of Partnership Deed',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'In the absence of a written Partnership Deed, a partner who advances a loan of ₹ 1,00,000 to the firm is entitled to interest on such loan @ 6% per annum even if the firm suffers a net loss.',
    correctBoolean: true,
    mantraHint: 'Interest on partner loan is a charge against profits under Section 13(d) of Indian Partnership Act 1932, not an appropriation.',
    explanation: 'True. Under Section 13(d) of the Indian Partnership Act, 1932, interest on partner loan is a charge against profit and must be paid @ 6% p.a. irrespective of whether the firm makes a profit or sustains a loss.'
  },
  {
    id: 'q-acct-12-3',
    subjectId: 'accountancy',
    chapterId: 'acct-12-ch3',
    chapterTitle: 'Accounting for Share Capital: Issue, Forfeiture & Reissue',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Forfeiture of Shares & Capital Reserve',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'When forfeited shares are reissued at a discount, the maximum permissible discount cannot exceed the amount previously ____ on those shares, and any remaining balance in Forfeited Shares Account is transferred to ____ Reserve.',
    correctBlanks: ['forfeited', 'Capital'],
    mantraHint: 'Discount on reissue ≤ Amount forfeited on those specific reissued shares. Profit on reissue goes to Capital Reserve.',
    explanation: 'The discount on reissue cannot exceed the amount already collected and credited to Share Forfeiture A/c on those shares. The net profit upon reissue is transferred to Capital Reserve.'
  },
  {
    id: 'q-acct-12-4',
    subjectId: 'accountancy',
    chapterId: 'acct-12-ch1',
    chapterTitle: 'Accounting for Partnership: Fundamentals & Goodwill',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Super Profit Method of Goodwill Valuation',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'The capital of the firm of Ananya & Bhavya is ₹ 5,00,000 and the market rate of interest is 12%. The annual salary to partners is ₹ 6,000 each. The profits for the last 3 years were ₹ 90,000, ₹ 1,10,000, and ₹ 1,30,000. Calculate Goodwill on the basis of 2 years purchase of Super Profit.',
    sampleAnswer: 'Goodwill = ₹ 76,000',
    markingCriteria: [
      '1 mark: Correct Average Maintainable Profit computation: (90k + 110k + 130k)/3 = ₹ 1,10,000; deduct salaries (2 × 6k = 12k) = ₹ 98,000.',
      '1 mark: Correct Normal Profit computation: ₹ 5,00,000 × 12% = ₹ 60,000; Super Profit = ₹ 98,000 - ₹ 60,000 = ₹ 38,000.',
      '1 mark: Goodwill = ₹ 38,000 × 2 = ₹ 76,000 with complete working steps.'
    ],
    mantraHint: 'Always adjust for ongoing partner salaries before comparing average profit with normal profit!',
    explanation: 'Average Profit = (90,000 + 1,10,000 + 1,30,000) / 3 = ₹ 1,10,000. Less Partner Salaries: 2 × ₹ 6,000 = ₹ 12,000. Adjusted Average Profit = ₹ 98,000. Normal Profit = ₹ 5,00,000 × 12% = ₹ 60,000. Super Profit = ₹ 98,000 - ₹ 60,000 = ₹ 38,000. Goodwill = 2 × ₹ 38,000 = ₹ 76,000.'
  },
  {
    id: 'q-acct-12-5',
    subjectId: 'accountancy',
    chapterId: 'acct-12-ch3',
    chapterTitle: 'Accounting for Share Capital: Issue, Forfeiture & Reissue',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Pro-Rata Allotment & Forfeiture Master Question',
    type: 'long_answer',
    difficulty: 'Tough',
    marks: 5,
    text: 'Apex Ltd. invited applications for issuing 1,00,000 equity shares of ₹ 10 each at a premium of ₹ 2 per share payable as: ₹ 3 on application, ₹ 5 on allotment (including premium), and balance ₹ 4 on first and final call. Applications were received for 1,50,000 shares. Allotment was made pro-rata to all applicants. Excess application money was adjusted towards allotment. Rohan, who applied for 300 shares, failed to pay allotment and call money; his shares were forfeited and reissued at ₹ 8 per share fully paid up. Pass Journal Entries for forfeiture and reissue.',
    sampleAnswer: 'Share Capital A/c Dr. ₹ 2,000, Sec Premium A/c Dr. ₹ 400 | To Calls in Arrears ₹ 1,500 | To Share Forfeiture ₹ 900. Reissue: Bank Dr. ₹ 1,600, Forfeiture Dr. ₹ 400 To Share Capital ₹ 2,000. Capital Reserve: ₹ 500.',
    markingCriteria: [
      '1.5 marks: Correct pro-rata ratio (1,50,000 : 1,00,000 = 3:2). Shares allotted to Rohan = 300 × (2/3) = 200 shares. Excess application money = 100 × ₹ 3 = ₹ 300.',
      '2 marks: Correct forfeiture entry with Securities Premium debited because premium was unpaid on allotment: Arrears on allotment = (200 × 5) - 300 = ₹ 700. Arrears on call = 200 × 4 = ₹ 800.',
      '1.5 marks: Reissue entry (200 shares @ ₹ 8; ₹ 2 discount) and transfer to Capital Reserve: ₹ 900 - ₹ 400 = ₹ 500.'
    ],
    mantraHint: 'Always find shares ALLOTTED first: 300 × (100k / 150k) = 200 shares. The excess application money paid on 100 extra shares was ₹ 300, which reduces allotment arrears!',
    explanation: 'Shares allotted: 200. Excess application: 100 × ₹ 3 = ₹ 300. Due on allotment: 200 × ₹ 5 = ₹ 1,000. Arrears on allotment: ₹ 1,000 - ₹ 300 = ₹ 700. Arrears on call: 200 × ₹ 4 = ₹ 800. Total arrears = ₹ 1,500. Total forfeited = 200 × ₹ 3 + ₹ 300 = ₹ 900. Reissue discount = 200 × ₹ 2 = ₹ 400. Capital Reserve = ₹ 900 - ₹ 400 = ₹ 500.'
  },

  // ==========================================
  // BUSINESS STUDIES - CLASS 11 (CBSE)
  // ==========================================
  {
    id: 'q-bst-11-1',
    subjectId: 'business_studies',
    chapterId: 'bst-11-ch1',
    chapterTitle: 'Nature and Purpose of Business',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Auxiliaries to Trade Hindrances',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Which auxiliary to trade removes the "hindrance of time" by bridging the gap between production and consumption of goods?',
    options: ['Warehousing', 'Transportation', 'Insurance', 'Advertising'],
    correctOptionIndex: 0,
    mantraHint: 'Goods produced in one season (e.g. wheat, sugar) need safe storage until consumed throughout the year.',
    explanation: 'Warehousing removes the hindrance of time by storing goods safely from time of production until consumer demand arises. Transport removes hindrance of place, Insurance removes hindrance of risk.'
  },
  {
    id: 'q-bst-11-2',
    subjectId: 'business_studies',
    chapterId: 'bst-11-ch2',
    chapterTitle: 'Forms of Business Organisation',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Joint Hindu Family Business Liability',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'In a Joint Hindu Family Business, the liability of the Karta is unlimited, while the liability of all other coparceners is limited to their share in the family business property.',
    correctBoolean: true,
    mantraHint: 'Karta manages the business and bears unlimited personal liability; other coparceners have limited liability.',
    explanation: 'True. Under Hindu Law, Karta has unlimited liability (his personal assets can be utilized to settle debts), whereas all other coparceners have liability strictly limited to their ancestral co-ownership share.'
  },
  {
    id: 'q-bst-11-3',
    subjectId: 'business_studies',
    chapterId: 'bst-11-ch4',
    chapterTitle: 'Sources of Business Finance',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Commercial Paper Characteristics',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'Commercial Paper is an ____ promissory note issued by highly rated corporate borrowers with a maturity period ranging from 15 days to ____.',
    correctBlanks: ['unsecured', 'one year'],
    mantraHint: 'Regulated by RBI; used by creditworthy companies for bridge financing of working capital.',
    explanation: 'Commercial Paper is an unsecured money market promissory note issued by prime corporates with maturity between 15 days to 1 year, often used for bridge financing before long-term issues.'
  },
  {
    id: 'q-bst-11-4',
    subjectId: 'business_studies',
    chapterId: 'bst-11-ch2',
    chapterTitle: 'Forms of Business Organisation',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Choice of Form of Business Organisation',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'Three engineering graduates want to launch a tech startup requiring ₹ 2 Crore capital and specialized software patents. They want to protect their personal assets while raising capital from angel investors. Which form of business organisation would you recommend and why? Give 3 reasons.',
    sampleAnswer: 'Private Limited Company. Reasons: 1) Limited Liability; 2) Easy investment from angel investors via equity; 3) Separate legal entity protects patents and intellectual property.',
    markingCriteria: [
      '1 mark: Correct identification of Private Limited Company form.',
      '1 mark: Clear explanation of limited liability protecting personal assets.',
      '1 mark: Explaining ease of equity funding from venture capitalists/angels and perpetual succession.'
    ],
    mantraHint: 'Angel investors will never invest in a sole proprietorship or partnership where liability is unlimited and shares cannot be issued!',
    explanation: 'A Private Limited Company is the ideal structure. 1) Limited Liability protects personal assets; 2) Shares can be issued to angel investors in exchange for capital; 3) Separate legal entity ensures company holds patents in its own corporate name with perpetual succession.'
  },
  {
    id: 'q-bst-11-5',
    subjectId: 'business_studies',
    chapterId: 'bst-11-ch3',
    chapterTitle: 'Emerging Modes of Business & Social Responsibility',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'e-Business vs Traditional Business & CSR Dimensions',
    type: 'long_answer',
    difficulty: 'Tough',
    marks: 5,
    text: 'Differentiate between Traditional Business and e-Business on the basis of: (i) Ease of formation; (ii) Physical presence; (iii) Cost of setting up; (iv) Operating cost; and (v) Opportunity for inter-personal touch. Also explain why Corporate Social Responsibility (CSR) is essential for long-term business survival.',
    sampleAnswer: 'Table of 5 differences + 3 arguments for CSR: self-interest, moral obligation, avoiding government regulations.',
    markingCriteria: [
      '2.5 marks: Accurate 5-point comparison table with clear headings for each basis.',
      '2.5 marks: Well-argued justification for CSR (protects public image, prevents government intervention, ensures sustainable environmental resource supply).'
    ],
    mantraHint: 'Always use a formal comparison table for differentiation questions in CBSE Business Studies!',
    explanation: 'Traditional vs e-Business: 1) Formation: difficult vs simple; 2) Physical presence: mandatory store vs domain/website; 3) Setup cost: high real estate vs low digital server; 4) Operating cost: high staff vs low automated; 5) Personal touch: high vs low. CSR is vital because business uses societal resources, avoids hostile regulatory backlash, and builds invaluable brand equity.'
  },

  // ==========================================
  // BUSINESS STUDIES - CLASS 12 (CBSE)
  // ==========================================
  {
    id: 'q-bst-12-1',
    subjectId: 'business_studies',
    chapterId: 'bst-12-ch2',
    chapterTitle: 'Principles of Management: Henri Fayol vs F.W. Taylor',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Fayol Scalar Chain & Gang Plank',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'Under Henri Fayol principle of Scalar Chain, direct contact between two employees working at the same level in different departments during emergencies without following formal hierarchy is termed as:',
    options: ['Gang Plank', 'Esprit de Corps', 'Unity of Direction', 'Functional Foremanship'],
    correctOptionIndex: 0,
    mantraHint: 'A specialized emergency bridge connecting peer levels to prevent communication delays.',
    explanation: 'Gang Plank is a shorter route permitted by Fayol to enable two employees at the same hierarchical level in different lines of authority to communicate directly in emergency situations to avoid bureaucratic delays.'
  },
  {
    id: 'q-bst-12-2',
    subjectId: 'business_studies',
    chapterId: 'bst-12-ch1',
    chapterTitle: 'Nature and Significance of Management',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Effectiveness vs Efficiency',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'A production manager completed the target of producing 10,000 LED bulbs within the stipulated deadline of 30 days, but at double the budgeted cost by operating multiple overtime shifts. He is said to be effective but not efficient.',
    correctBoolean: true,
    mantraHint: 'Effectiveness is about meeting deadlines and targets on time; Efficiency is about keeping costs within budget.',
    explanation: 'True. The manager is effective because he accomplished the targeted output on time, but inefficient because he incurred exorbitant overtime costs and failed to minimize resource expenditure.'
  },
  {
    id: 'q-bst-12-3',
    subjectId: 'business_studies',
    chapterId: 'bst-12-ch5',
    chapterTitle: 'Financial Management, Marketing & Consumer Protection Act 2019',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Consumer Protection Act 2019 Pecuniary Limits',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'Under the Consumer Protection Act, 2019, a consumer can file a complaint directly before the State Consumer Disputes Redressal Commission if the value of goods or services paid exceeds ₹ ____ but does not exceed ₹ ____.',
    correctBlanks: ['1 Crore', '10 Crore'],
    mantraHint: 'District: up to ₹ 1 Cr. State: > ₹ 1 Cr to ₹ 10 Cr. National: > ₹ 10 Cr.',
    explanation: 'Under Consumer Protection Act 2019 pecuniary limits: District Commission handles claims up to ₹ 1 Crore; State Commission handles claims between ₹ 1 Crore and ₹ 10 Crore; National Commission handles claims exceeding ₹ 10 Crore.'
  },
  {
    id: 'q-bst-12-4',
    subjectId: 'business_studies',
    chapterId: 'bst-12-ch2',
    chapterTitle: 'Principles of Management: Henri Fayol vs F.W. Taylor',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Taylor Scientific Techniques - Functional Foremanship',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'Identify and explain the four foremen under the "Planning In-charge" in F.W. Taylor technique of Functional Foremanship. How does this technique violate Henri Fayol principle of Unity of Command?',
    sampleAnswer: 'Instruction Card Clerk, Route Clerk, Time & Cost Clerk, Disciplinarian. Violates Unity of Command because every worker receives orders from 8 specialists rather than 1 boss.',
    markingCriteria: [
      '2 marks: Accurate explanation of the 4 planning foremen (Instruction Card Clerk, Route Clerk, Time and Cost Clerk, Disciplinarian).',
      '1 mark: Explaining that Functional Foremanship violates Fayol Unity of Command because each factory worker takes orders simultaneously from 8 different bosses.'
    ],
    mantraHint: 'Remember the 4 planning bosses: Route (path), Instruction (tasks), Time & Cost (schedule/wages), Disciplinarian (rules).',
    explanation: 'Planning in-charges: 1) Instruction Card Clerk (drafts instructions for workers); 2) Route Clerk (determines route of production sequence); 3) Time & Cost Clerk (prepares time and cost sheets); 4) Disciplinarian (enforces factory rules). This violates Fayols Unity of Command because one worker receives instructions from 8 different specialists.'
  },
  {
    id: 'q-bst-12-5',
    subjectId: 'business_studies',
    chapterId: 'bst-12-ch5',
    chapterTitle: 'Financial Management, Marketing & Consumer Protection Act 2019',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Trading on Equity & Financial Leverage Case Study',
    type: 'long_answer',
    difficulty: 'Tough',
    marks: 5,
    text: 'XYZ Ltd. requires ₹ 30 Lakhs capital. Plan I: Issue only Equity Shares of ₹ 100 each. Plan II: Issue Equity Shares of ₹ 10 Lakhs and 10% Debentures of ₹ 20 Lakhs. EBIT of the company is ₹ 6 Lakhs and Tax rate is 30%. Calculate Earnings Per Share (EPS) under both plans. State whether Trading on Equity is favourable and explain the condition under which it occurs.',
    sampleAnswer: 'EPS Plan I = ₹ 14.00. EPS Plan II = ₹ 28.00. Trading on Equity is favourable because ROI (20%) > Cost of Debt (10%).',
    markingCriteria: [
      '2 marks: Correct calculation of Plan I EPS (EBIT: 6L - Interest: 0 = 6L. Tax @ 30%: 1.8L. EAT = 4.2L. EPS = 4.2L / 30,000 = ₹ 14).',
      '2 marks: Correct calculation of Plan II EPS (EBIT: 6L - Interest: 2L = 4L. Tax @ 30%: 1.2L. EAT = 2.8L. EPS = 2.8L / 10,000 = ₹ 28).',
      '1 mark: Explaining that Trading on Equity doubled EPS because ROI (6L / 30L = 20%) is greater than cost of debentures (10%).'
    ],
    mantraHint: 'Always calculate ROI first: (EBIT / Total Capital Employed) × 100. If ROI > Cost of Debt, borrowing debt magnifies equity returns!',
    explanation: 'Plan I: EBIT = ₹ 6,00,000. Less Interest = Nil. EBT = ₹ 6,00,000. Less Tax (30%) = ₹ 1,80,000. EAT = ₹ 4,20,000. Shares = 30,000. EPS = ₹ 14. Plan II: EBIT = ₹ 6,00,000. Less Debenture Interest (10% of 20L) = ₹ 2,00,000. EBT = ₹ 4,00,000. Less Tax (30%) = ₹ 1,20,000. EAT = ₹ 2,80,000. Shares = 10,000. EPS = ₹ 28. Trading on Equity is favourable because ROI (20%) exceeds 10% cost of debt, doubling earnings for equity shareholders.'
  },

  // ==========================================
  // ECONOMICS - CLASS 11 (CBSE)
  // ==========================================
  {
    id: 'q-econ-11-1',
    subjectId: 'economics',
    chapterId: 'econ-11-ch3',
    chapterTitle: 'Introduction to Microeconomics, Central Problems & PPC',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Shape of Production Possibility Curve (PPC)',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'A Production Possibility Curve (PPC) is typically concave to the origin because of:',
    options: [
      'Increasing Marginal Rate of Transformation (MRT)',
      'Constant Marginal Opportunity Cost',
      'Decreasing Marginal Rate of Substitution',
      'Equally efficient resources across all industries'
    ],
    correctOptionIndex: 0,
    mantraHint: 'Resources are not equally adaptable for production of all goods; as more of Good X is produced, increasingly more of Good Y must be sacrificed.',
    explanation: 'PPC is concave to the origin due to increasing Marginal Opportunity Cost (MRT). As output of one good is increased, resources less specialized in its production must be drawn away from the other good, causing the sacrifice ratio (ΔY / ΔX) to rise.'
  },
  {
    id: 'q-econ-11-2',
    subjectId: 'economics',
    chapterId: 'econ-11-ch2',
    chapterTitle: 'Measures of Central Tendency & Dispersion',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Median Graphical Determination via Ogives',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'The value of the Median of a continuous frequency distribution can be determined graphically from the intersection point of "Less than" and "More than" cumulative frequency curves (Ogives).',
    correctBoolean: true,
    mantraHint: 'Plot both ogives on the same graph; drop a perpendicular from the intersection point to the X-axis.',
    explanation: 'True. The perpendicular drawn from the intersection point of the Less-than Ogive and More-than Ogive to the horizontal X-axis locates the exact value of the Median.'
  },
  {
    id: 'q-econ-11-3',
    subjectId: 'economics',
    chapterId: 'econ-11-ch4',
    chapterTitle: 'Consumers Equilibrium & Theory of Demand',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Price Elasticity of Demand (Ed)',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'When a 20% fall in the price of a commodity leads to a 40% rise in its quantity demanded, the coefficient of Price Elasticity of Demand (Ed) is equal to ____ and the demand is described as ____.',
    correctBlanks: ['2', 'elastic'],
    mantraHint: 'Ed = (% change in Q) / (% change in P). When Ed > 1, demand is elastic.',
    explanation: 'Ed = 40% / 20% = 2. Since Ed is greater than 1, demand is price-elastic (consumers are highly responsive to price variations).'
  },
  {
    id: 'q-econ-11-4',
    subjectId: 'economics',
    chapterId: 'econ-11-ch5',
    chapterTitle: 'Producer Behaviour, Cost, Revenue & Supply',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Law of Variable Proportions 3 Stages',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'State the Law of Variable Proportions. In which of the three stages will a rational producer choose to operate in the short run? Give a sound economic reason.',
    sampleAnswer: 'Stage II (Stage of Diminishing Returns). In Stage I, fixed factor is under-utilized; in Stage III, marginal product is negative.',
    markingCriteria: [
      '1 mark: Accurate statement of the law (as more units of variable factor are combined with fixed factor, MP initially rises, then falls, and eventually becomes negative).',
      '1 mark: Identification of Stage II (Diminishing returns) as the rational operating stage.',
      '1 mark: Economic reasoning (In Stage I, fixed factor is underutilized and TP can be increased; In Stage III, MP is negative and TP falls).'
    ],
    mantraHint: 'No rational producer stops in Stage 1 where MP is rising, nor enters Stage 3 where adding workers causes total output to decline!',
    explanation: 'The Law states that keeping fixed factors constant, as variable factor increases, Marginal Product initially rises, then declines, and eventually turns negative. A rational producer operates in Stage II (Diminishing Returns) because in Stage I, fixed assets are under-utilized (increasing variable factors increases efficiency), while in Stage III, Marginal Product is negative.'
  },
  {
    id: 'q-econ-11-5',
    subjectId: 'economics',
    chapterId: 'econ-11-ch4',
    chapterTitle: 'Consumers Equilibrium & Theory of Demand',
    gradeLevel: '11',
    board: 'CBSE',
    topic: 'Indifference Curve Analysis & Consumers Equilibrium',
    type: 'long_answer',
    difficulty: 'Tough',
    marks: 5,
    text: 'Explain the conditions of Consumers Equilibrium under Indifference Curve (IC) analysis with the help of a neat diagram. What happens when Marginal Rate of Substitution (MRSxy) is greater than the price ratio (Px / Py)?',
    sampleAnswer: 'Two conditions: 1) MRSxy = Px / Py (Budget line tangent to IC); 2) IC is convex to origin (diminishing MRS). When MRSxy > Px/Py, consumer buys more of X until equilibrium is restored.',
    markingCriteria: [
      '2 marks: Detailed explanation of the two equilibrium conditions (tangency condition MRSxy = Px/Py, and convexity condition).',
      '1.5 marks: Diagram showing Budget Line AB tangent to Indifference Curve IC2 at point E.',
      '1.5 marks: Adjustment mechanism when MRSxy > Px/Py (consumer values Good X more than market price, consumes more X, leading to fall in MRSxy until equality is restored).'
    ],
    mantraHint: 'Condition 1: MRSxy = Px / Py. Condition 2: MRSxy must be diminishing at the point of equilibrium (IC must be convex).',
    explanation: 'Equilibrium requires: 1) Tangency: Slope of IC (MRSxy) = Slope of Budget Line (Px / Py); 2) Convexity: IC must be convex to origin at point of equilibrium (diminishing MRSxy). If MRSxy > Px / Py, the consumer is willing to sacrifice more of Y for an additional unit of X than what the market requires. Hence, the consumer buys more of Good X. By Law of Diminishing Marginal Utility, as consumption of X increases, MUx falls and MRSxy declines until MRSxy = Px / Py is restored.'
  },

  // ==========================================
  // ECONOMICS - CLASS 12 (CBSE)
  // ==========================================
  {
    id: 'q-econ-12-1',
    subjectId: 'economics',
    chapterId: 'econ-12-ch1',
    chapterTitle: 'National Income and Related Aggregates (Macroeconomics)',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Conversion of Macro Aggregates',
    type: 'mcq',
    difficulty: 'Average',
    marks: 1,
    text: 'To convert Gross Domestic Product at Market Price (GDPmp) into Net National Product at Factor Cost (NNPfc / National Income), what adjustments must be made?',
    options: [
      'Deduct Depreciation, Add NFIA, Deduct Net Indirect Taxes',
      'Add Depreciation, Deduct NFIA, Add Net Indirect Taxes',
      'Deduct Depreciation, Deduct NFIA, Deduct Subsidies',
      'Add NFIA, Add Net Indirect Taxes, Deduct Depreciation'
    ],
    correctOptionIndex: 0,
    mantraHint: 'Gross to Net: - Depreciation. Domestic to National: + NFIA. Market Price to Factor Cost: - Net Indirect Taxes (NIT).',
    explanation: 'NNPfc = GDPmp - Consumption of Fixed Capital (Depreciation) + Net Factor Income from Abroad (NFIA) - Net Indirect Taxes (NIT). This is the master formula of national income aggregates.'
  },
  {
    id: 'q-econ-12-2',
    subjectId: 'economics',
    chapterId: 'econ-12-ch2',
    chapterTitle: 'Money and Banking: Credit Creation & RBI Monetary Policy',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Money Multiplier & Total Credit Creation',
    type: 'true_false',
    difficulty: 'Average',
    marks: 1,
    text: 'If the Legal Reserve Ratio (LRR) is 20% and commercial banks receive initial primary cash deposits of ₹ 1,000 Crores, the total deposit creation in the banking system will be ₹ 5,000 Crores.',
    correctBoolean: true,
    mantraHint: 'Money Multiplier = 1 / LRR = 1 / 0.20 = 5. Total credit created = ₹ 1,000 Cr × 5 = ₹ 5,000 Cr.',
    explanation: 'True. Total Deposits = Primary Deposits × (1 / LRR) = ₹ 1,000 × (1 / 0.20) = ₹ 1,000 × 5 = ₹ 5,000 Crores. The fractional reserve system multiplies initial deposits by fivefold.'
  },
  {
    id: 'q-econ-12-3',
    subjectId: 'economics',
    chapterId: 'econ-12-ch3',
    chapterTitle: 'Determination of Income and Employment & Multiplier',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Investment Multiplier & Propensity to Consume',
    type: 'fill_blank',
    difficulty: 'Average',
    marks: 1,
    text: 'In an economy, if the Marginal Propensity to Consume (MPC) is 0.75, the value of the Investment Multiplier (k) is equal to ____, which means an initial investment of ₹ 100 Crores will generate an additional national income of ₹ ____ Crores.',
    correctBlanks: ['4', '400'],
    mantraHint: 'k = 1 / (1 - MPC) = 1 / (1 - 0.75) = 1 / 0.25 = 4. Change in Income ΔY = k × ΔI.',
    explanation: 'Multiplier k = 1 / (1 - 0.75) = 1 / 0.25 = 4. ΔY = k × ΔI = 4 × ₹ 100 Crores = ₹ 400 Crores. Every rupee of initial investment multiplies four times.'
  },
  {
    id: 'q-econ-12-4',
    subjectId: 'economics',
    chapterId: 'econ-12-ch4',
    chapterTitle: 'Government Budget and the Economy: Deficit Analysis',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'Primary Deficit Significance',
    type: 'short_answer',
    difficulty: 'Tough',
    marks: 3,
    text: 'Define Primary Deficit. What does a "Zero Primary Deficit" indicate about the fiscal health and government borrowing of a country?',
    sampleAnswer: 'Primary Deficit = Fiscal Deficit - Interest Payments. Zero Primary Deficit means the government borrowings are solely used to pay past interest liabilities without any fresh deficit.',
    markingCriteria: [
      '1 mark: Correct formula and definition: Primary Deficit = Fiscal Deficit - Interest Payments on past borrowings.',
      '2 marks: Clear explanation of zero primary deficit (the government has to borrow funds only to fulfill its past interest payment obligations, and current year revenues are sufficient to cover current non-interest expenditures).'
    ],
    mantraHint: 'Primary Deficit measures current year fiscal irresponsibility; zero means current year is balanced and borrowing is only for past debt interest!',
    explanation: 'Primary Deficit = Fiscal Deficit - Interest Payments. It indicates government borrowing requirements excluding interest commitments. A Zero Primary Deficit signifies that the current year government revenues are just adequate to cover current expenditures, and the government is borrowing solely to pay off interest liabilities accumulated from loans taken in past years.'
  },
  {
    id: 'q-econ-12-5',
    subjectId: 'economics',
    chapterId: 'econ-12-ch1',
    chapterTitle: 'National Income and Related Aggregates (Macroeconomics)',
    gradeLevel: '12',
    board: 'CBSE',
    topic: 'National Income Comprehensive 6-Marker Numerical',
    type: 'long_answer',
    difficulty: 'Tough',
    marks: 5,
    text: 'From the following data, calculate: (a) Gross Domestic Product at Market Price (GDPmp); and (b) National Income (NNPfc):\nItems (₹ in Crores):\n1. Compensation of Employees: ₹ 2,000\n2. Rent and Royalty: ₹ 400\n3. Interest: ₹ 500\n4. Profit: ₹ 800\n5. Mixed Income of Self-Employed: ₹ 1,200\n6. Net Factor Income from Abroad (NFIA): (-) ₹ 50\n7. Consumption of Fixed Capital (Depreciation): ₹ 200\n8. Goods and Services Tax (GST): ₹ 350\n9. Subsidies: ₹ 50',
    sampleAnswer: '(a) GDPmp = ₹ 5,400 Crores; (b) National Income (NNPfc) = ₹ 4,850 Crores.',
    markingCriteria: [
      '2 marks: Correct calculation of NDPfc using Income Method: COE (2000) + Rent/Royalty (400) + Interest (500) + Profit (800) + Mixed Income (1200) = ₹ 4,900 Crores.',
      '1.5 marks: Calculation of GDPmp = NDPfc + Depreciation (200) + NIT (350 - 50 = 300) = ₹ 4,900 + 200 + 300 = ₹ 5,400 Crores.',
      '1.5 marks: Calculation of NNPfc = NDPfc + NFIA = ₹ 4,900 + (-50) = ₹ 4,850 Crores with complete itemized steps and units in ₹ Crores.'
    ],
    mantraHint: 'Income Method gives NDPfc directly! Operating Surplus = Rent + Royalty + Interest + Profit = 400 + 500 + 800 = ₹ 1,700 Cr.',
    explanation: 'Step 1: NDPfc = COE (₹ 2,000) + Operating Surplus (Rent ₹ 400 + Interest ₹ 500 + Profit ₹ 800) + Mixed Income (₹ 1,200) = ₹ 4,900 Crores. Step 2: GDPmp = NDPfc + Depreciation (₹ 200) + Net Indirect Taxes (GST ₹ 350 - Subsidies ₹ 50 = ₹ 300) = ₹ 4,900 + ₹ 200 + ₹ 300 = ₹ 5,400 Crores. Step 3: NNPfc (National Income) = NDPfc + NFIA [(-) ₹ 50] = ₹ 4,900 - ₹ 50 = ₹ 4,850 Crores.'
  }
];
