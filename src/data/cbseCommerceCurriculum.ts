import { Subject, Chapter } from '../types';

export const CBSE_COMMERCE_SUBJECTS: Subject[] = [
  {
    id: 'accountancy',
    name: 'Accountancy',
    code: 'ACCT-CBSE',
    iconName: 'Calculator',
    color: '#e11d48',
    bgGradient: 'from-rose-600 to-red-800',
    description: 'Double-entry bookkeeping, Journal/Ledger, Partnership Accounts, Share Capital, Debentures, and Cash Flow Statement.',
    chapterCount: 10,
    grades: ['11', '12'],
    boards: ['CBSE']
  },
  {
    id: 'business_studies',
    name: 'Business Studies',
    code: 'BST-CBSE',
    iconName: 'Briefcase',
    color: '#059669',
    bgGradient: 'from-emerald-600 to-teal-800',
    description: 'Principles of Management (Fayol & Taylor), Business Finance, Organisation Forms, Marketing 4Ps, and Consumer Protection Act 2019.',
    chapterCount: 10,
    grades: ['11', '12'],
    boards: ['CBSE']
  },
  {
    id: 'economics',
    name: 'Economics',
    code: 'ECON-CBSE',
    iconName: 'TrendingUp',
    color: '#d97706',
    bgGradient: 'from-amber-600 to-orange-800',
    description: 'Microeconomics (Consumer & Producer Equilibrium), Statistics for Economics, Macroeconomics (National Income, Money & Banking), and Indian Economic Development.',
    chapterCount: 10,
    grades: ['11', '12'],
    boards: ['CBSE']
  }
];

export const CBSE_COMMERCE_CHAPTERS: Chapter[] = [
  // ==========================================
  // ACCOUNTANCY - CLASS 11 (CBSE ENGLISH MEDIUM)
  // ==========================================
  {
    id: 'acct-11-ch1',
    subjectId: 'accountancy',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 1,
    title: 'Introduction to Accounting & Basic Accounting Terms',
    summary: 'Meaning, objectives, and scope of Accounting. Branches of Accounting: Financial, Cost, and Management. Fundamental terms: Assets (Current, Non-Current, Tangible, Intangible), Liabilities, Capital, Drawings, Revenue, Expenses, Goods, Debtors, Creditors, Voucher, and Trade vs Cash Discount.',
    keyConcepts: [
      'Accounting is the art of recording, classifying, and summarising in a significant manner and in terms of money, transactions and events which are of financial character.',
      'Distinction between Book-keeping, Accounting, and Accountancy.',
      'Qualitative characteristics: Reliability, Relevance, Understandability, and Comparability.',
      'Users of Accounting Information: Internal (Management, Owners) vs External (Investors, Creditors, Tax Authorities).'
    ],
    keyFormulasOrTerms: [
      { term: 'Accounting Equation', definition: 'Assets = Liabilities + Capital (Equity)' },
      { term: 'Capital', definition: 'Amount invested by the proprietor/owner in the business enterprise: Capital = Assets - Liabilities' },
      { term: 'Current Assets', definition: 'Assets held on short-term basis for conversion into cash within normal operating cycle (e.g. Cash, Stock, Debtors, B/R)' },
      { term: 'Trade vs Cash Discount', definition: 'Trade discount is allowed on catalog price at sale time (not recorded in books); Cash discount is allowed for prompt payment (recorded in books)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Class 11 Accountancy Ch 1: Basic Accounting Terms with Uma Shukla & CA Ramanathan',
        durationOrPages: '28 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        uploadedBy: 'Uma Shukla (Director)',
        uploadedAt: '2026-09-01T10:00:00Z',
        approvalStatus: 'approved'
      },
      {
        type: 'ppt_presentation',
        title: 'Basic Accounting Terms & Conceptual Blueprint (Class 11 CBSE)',
        durationOrPages: '6 Slides',
        uploadedBy: 'CA Ramanathan Iyer',
        uploadedAt: '2026-09-02T11:00:00Z',
        approvalStatus: 'approved',
        slides: [
          {
            slideNumber: 1,
            title: 'Foundations of Accounting: Language of Business',
            categoryTag: 'CBSE CLASS 11 ACCOUNTANCY • UNIT 1',
            bullets: [
              'Accounting is the systematic process of identifying, measuring, recording, and communicating economic information.',
              'Serves stewardship, legal compliance, and decision-making for management and external stakeholders.',
              'Double-entry system ensures dual aspect: every debit has an equal and corresponding credit.'
            ],
            keyHighlight: 'Golden Formula: Assets = External Liabilities + Owner Equity',
            examMantra: 'Never confuse Trade Discount with Cash Discount in numerical problems.'
          },
          {
            slideNumber: 2,
            title: 'Classification of Assets & Liabilities',
            categoryTag: 'CORE TERMINOLOGY',
            bullets: [
              'Assets are classified based on liquidity and operational purpose.',
              'Non-current assets yield long-term benefits beyond one financial year.',
              'Current assets are meant for operational cash flow turnover.'
            ],
            diagramBox: {
              label: 'Asset Classification Matrix',
              items: [
                { term: 'Tangible Fixed Assets', explanation: 'Physical existence: Plant, Machinery, Furniture, Land & Buildings.' },
                { term: 'Intangible Assets', explanation: 'No physical form but possess economic value: Goodwill, Patents, Trademarks, Software.' },
                { term: 'Current Assets', explanation: 'Liquid or near-liquid within 12 months: Cash at Bank, Stock in Trade, Sundry Debtors.' }
              ]
            },
            examMantra: 'Fictitious assets (e.g., preliminary expenses) have no realizable market value.'
          },
          {
            slideNumber: 3,
            title: 'Capital vs Revenue Expenditures',
            categoryTag: 'EXAM COMPARISON TABLE',
            bullets: [
              'Capital expenditures improve earning capacity of the enterprise.',
              'Revenue expenditures maintain the existing operating capacity and appear in Trading/P&L A/c.'
            ],
            tableData: {
              headers: ['Parameter', 'Capital Expenditure', 'Revenue Expenditure'],
              rows: [
                ['Purpose', 'Acquisition or improvement of fixed assets', 'Day-to-day business operations & maintenance'],
                ['Earning Capacity', 'Increases business earning capacity', 'Maintains existing operational efficiency'],
                ['Accounting Treatment', 'Shown on Assets side of Balance Sheet', 'Debited to Trading or Profit & Loss A/c'],
                ['Benefit Period', 'Spans multiple financial years', 'Consumed within current accounting period']
              ]
            },
            examMantra: 'Cost of installing heavy machinery is Capital Expenditure; subsequent annual maintenance is Revenue.'
          },
          {
            slideNumber: 4,
            title: 'Income, Profit, Gain, and Loss Nuances',
            categoryTag: 'CONCEPT DRILL',
            bullets: [
              'Revenue: Gross inflow of cash, receivables or other consideration arising in ordinary course of business.',
              'Income = Revenue - Expenses incurred to earn that revenue.',
              'Profit: Excess of revenues over expenses for an accounting year.',
              'Gain: Monetary benefit resulting from incidental transactions (e.g., sale of old building at profit).'
            ],
            keyHighlight: 'Gain is irregular and non-operating; Profit is regular operational surplus.',
            examMantra: 'Write clear distinctions in 3-mark CBSE theory questions.'
          },
          {
            slideNumber: 5,
            title: 'Types of Vouchers & Source Documents',
            categoryTag: 'SOURCE EVIDENCE',
            bullets: [
              'Source documents serve as documentary evidence for transactions: Cash Memo, Invoice, Receipt, Debit Note, Credit Note.',
              'Accounting vouchers are prepared by the accountant and verified: Debit Vouchers (Payments) and Credit Vouchers (Receipts).',
              'Non-cash or Transfer vouchers record credit transactions.'
            ],
            diagramBox: {
              label: 'Voucher Workflow',
              items: [
                { term: 'Cash Memo', explanation: 'Issued when goods are sold for cash.' },
                { term: 'Invoice / Bill', explanation: 'Prepared when goods are sold on credit.' },
                { term: 'Debit Note', explanation: 'Sent to a supplier when goods are returned to him (Purchase Return).' },
                { term: 'Credit Note', explanation: 'Sent to a customer when goods are received back from him (Sales Return).' }
              ]
            },
            examMantra: 'Always link every journal entry to its underlying source voucher.'
          },
          {
            slideNumber: 6,
            title: 'Mantra Revision & Board Exam Strategy',
            categoryTag: 'TOPPER SCORECARD STRATEGY',
            bullets: [
              'Memorize exact NCERT wording for definitions: Entity, Voucher, Drawings, Working Capital.',
              'Working Capital = Current Assets - Current Liabilities.',
              'Ensure ledger formats include: Date, Particulars, J.F., Amount (Debit/Credit).'
            ],
            keyHighlight: 'Consistent practice of journal entries prevents balance sheet tallying errors.',
            examMantra: 'Directors Tip: Show formal working notes clearly beneath every numerical answer.'
          }
        ]
      }
    ]
  },
  {
    id: 'acct-11-ch2',
    subjectId: 'accountancy',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 2,
    title: 'Theory Base of Accounting, GAAP & Goods and Services Tax (GST)',
    summary: 'Generally Accepted Accounting Principles (GAAP). Fundamental assumptions: Going Concern, Consistency, and Accrual. Key Principles: Business Entity, Money Measurement, Accounting Period, Full Disclosure, Materiality, Prudence/Conservatism, Cost Concept, Matching, Dual Aspect. Mechanics and accounting entries of GST (CGST, SGST, IGST).',
    keyConcepts: [
      'Business Entity Principle: Business is treated as a separate unit distinct from its owner.',
      'Prudence / Conservatism: Do not anticipate profits, but provide for all possible losses (e.g., Provision for Doubtful Debts, Valuation of stock at cost or NRV, whichever is lower).',
      'Accrual Concept: Revenues and costs are recognized when earned or incurred, regardless of cash receipt/payment.',
      'GST: Destination-based consumption tax. Input GST is an asset (receivable set-off); Output GST is a liability (payable).'
    ],
    keyFormulasOrTerms: [
      { term: 'Net GST Payable', definition: 'Output GST - Input GST' },
      { term: 'Dual Aspect Rule', definition: 'For every debit, there is an equivalent credit: Assets = Liabilities + Capital' },
      { term: 'Historical Cost Principle', definition: 'Assets are recorded at their acquisition cost rather than fluctuating market prices' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Accounting Principles & GST Accounting Entries - Class 11 CBSE Masterclass',
        durationOrPages: '32 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'acct-11-ch3',
    subjectId: 'accountancy',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 3,
    title: 'Recording of Transactions: Journal, Ledger & Trial Balance',
    summary: 'Rules of Debit and Credit: Traditional approach (Personal, Real, Nominal accounts) vs Modern approach (Assets, Liabilities, Capital, Revenues, Expenses). Journalizing process, compound entries, opening entry, Ledger posting, balancing of accounts, and preparation of Trial Balance.',
    keyConcepts: [
      'Golden Rules of Traditional Accounting: Debit the receiver, Credit the giver (Personal); Debit what comes in, Credit what goes out (Real); Debit all expenses & losses, Credit all incomes & gains (Nominal).',
      'Modern Rules: Increase in Assets/Expenses is Debited; Increase in Liabilities/Capital/Revenue is Credited.',
      'Trial Balance is a statement prepared with debit and credit balances of ledger accounts to verify arithmetical accuracy.'
    ],
    keyFormulasOrTerms: [
      { term: 'Modern Rule (Assets/Expenses)', definition: 'Increase = DEBIT (Dr), Decrease = CREDIT (Cr)' },
      { term: 'Modern Rule (Liabilities/Equity/Income)', definition: 'Increase = CREDIT (Cr), Decrease = DEBIT (Dr)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Mastering Journal Entries & Ledger Posting - Class 11 with Director Uma Shukla',
        durationOrPages: '35 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'acct-11-ch4',
    subjectId: 'accountancy',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 4,
    title: 'Bank Reconciliation Statement (BRS) & Depreciation Accounting',
    summary: 'Need and causes of difference between Cash Book and Pass Book balances. Timing differences vs errors. Preparation of BRS starting with Cash Book / Pass Book balances (Favourable and Overdraft). Depreciation: Causes, Straight Line Method (SLM) vs Written Down Value Method (WDV).',
    keyConcepts: [
      'Cheques issued but not yet presented for payment: Add to Cash Book balance to reconcile with Pass Book.',
      'Cheques paid into bank but not yet cleared: Deduct from Cash Book balance.',
      'SLM calculates depreciation on original cost (uniform charge); WDV calculates depreciation on reducing book value (declining charge).'
    ],
    keyFormulasOrTerms: [
      { term: 'SLM Depreciation', definition: '(Original Cost - Estimated Scrap Value) / Estimated Useful Life in Years' },
      { term: 'WDV Carrying Amount', definition: 'Book Value at beginning of year - Depreciation for the current year' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Bank Reconciliation & Depreciation (SLM vs WDV) - Complete Guide',
        durationOrPages: '30 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'acct-11-ch5',
    subjectId: 'accountancy',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 5,
    title: 'Financial Statements of Sole Proprietorship (With Adjustments)',
    summary: 'Preparation of Trading Account (Gross Profit/Loss), Profit and Loss Account (Net Profit/Loss), and Balance Sheet. Key year-end adjustments: Closing Stock, Outstanding Expenses, Prepaid Expenses, Accrued Income, Income Received in Advance, Depreciation, Bad Debts, Provision for Doubtful Debts, and Interest on Capital.',
    keyConcepts: [
      'Gross Profit = Net Sales - Cost of Goods Sold (COGS).',
      'COGS = Opening Stock + Net Purchases + Direct Expenses - Closing Stock.',
      'Adjustments appearing outside the Trial Balance require two postings (one in Trading/P&L, one in Balance Sheet).'
    ],
    keyFormulasOrTerms: [
      { term: 'Gross Profit Ratio', definition: '(Gross Profit / Net Revenue from Operations) × 100' },
      { term: 'Net Profit', definition: 'Operating & Non-operating Incomes - Total Operating & Non-operating Expenses' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Final Accounts with 8 Crucial Adjustments - Class 11 CBSE Solved Paper',
        durationOrPages: '40 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },

  // ==========================================
  // ACCOUNTANCY - CLASS 12 (CBSE ENGLISH MEDIUM)
  // ==========================================
  {
    id: 'acct-12-ch1',
    subjectId: 'accountancy',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 1,
    title: 'Accounting for Partnership: Fundamentals & Valuation of Goodwill',
    summary: 'Provisions of the Indian Partnership Act, 1932 in absence of Partnership Deed. Preparation of Profit and Loss Appropriation Account, Partners Capital Accounts (Fixed vs Fluctuating). Interest on Drawings (Average Period Method), Interest on Capital, Past Adjustments, and Guarantee of Profits. Valuation of Goodwill: Average Profit, Super Profit, and Capitalisation Methods.',
    keyConcepts: [
      'In absence of Partnership Deed: Profits shared equally; No interest on capital; No interest on drawings; No salary/commission; Interest on partner loan @ 6% p.a.',
      'P&L Appropriation A/c is an extension of P&L A/c showing division of divisible profits among partners.',
      'Interest on Drawings = Total Drawings × Rate/100 × (Average Period / 12).',
      'Goodwill is the present value of future super profits resulting from brand reputation and location advantage.'
    ],
    keyFormulasOrTerms: [
      { term: 'Super Profit', definition: 'Actual / Average Profit - Normal Profit (where Normal Profit = Capital Employed × Normal Rate of Return / 100)' },
      { term: 'Capitalisation of Super Profit', definition: 'Goodwill = (Super Profit / Normal Rate of Return) × 100' },
      { term: 'Interest on Monthly Drawings (Beginning)', definition: 'Average Period = 6.5 months: Total Drawings × Rate × 6.5 / (100 × 12)' },
      { term: 'Interest on Monthly Drawings (End)', definition: 'Average Period = 5.5 months: Total Drawings × Rate × 5.5 / (100 × 12)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Class 12 CBSE Board: Partnership Fundamentals & Past Adjustments - Full Lecture',
        durationOrPages: '38 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      },
      {
        type: 'ppt_presentation',
        title: 'Partnership Fundamentals & Goodwill Valuation (Class 12 CBSE Master Deck)',
        durationOrPages: '6 Slides',
        uploadedBy: 'CA Ramanathan Iyer',
        uploadedAt: '2026-09-05T09:30:00Z',
        approvalStatus: 'approved',
        slides: [
          {
            slideNumber: 1,
            title: 'Indian Partnership Act 1932: Essential Statutory Rules',
            categoryTag: 'CLASS 12 CBSE BOARD ESSENTIALS',
            bullets: [
              'Partnership is the relation between persons who have agreed to share profits of a business carried on by all or any of them acting for all.',
              'Maximum number of partners allowed is 50 as per Companies Act 2013 Rules.',
              'Partnership Deed is a written agreement; registration is optional but provides legal benefits.'
            ],
            keyHighlight: 'Default Rules in Absence of Deed: Equal Profits | 6% Loan Interest | No Salary/Interest on Capital.',
            examMantra: 'Check deed clauses carefully before calculating interest on capital or partner salary.'
          },
          {
            slideNumber: 2,
            title: 'P&L Appropriation Account Architecture',
            categoryTag: 'LEDGER ACCOUNTS',
            bullets: [
              'Nominal account opened to distribute Net Profit among partners.',
              'Debited with: Interest on Capital, Partner Salaries, Partner Commissions, Transfer to General Reserve.',
              'Credited with: Net Profit b/d from P&L A/c and Interest on Drawings.'
            ],
            diagramBox: {
              label: 'P&L Appropriation Structure',
              items: [
                { term: 'Debit Side', explanation: 'To Interest on Capital | To Partners Salaries | To Reserve | To Divisible Profit c/d.' },
                { term: 'Credit Side', explanation: 'By Profit & Loss A/c (Net Profit) | By Interest on Drawings.' }
              ]
            },
            examMantra: 'Interest on partner loan is a charge against profit (shown in P&L A/c, NOT in P&L Appropriation A/c).'
          },
          {
            slideNumber: 3,
            title: 'Interest on Drawings: Average Period Shortcut Table',
            categoryTag: 'CRITICAL CBSE NUMERICAL FORMULAS',
            bullets: [
              'Average Period = (Months remaining after 1st drawing + Months remaining after last drawing) / 2.',
              'Memorize standard durations for uniform drawings across the year.'
            ],
            tableData: {
              headers: ['Frequency of Drawing', 'Beginning of Period', 'Middle of Period', 'End of Period'],
              rows: [
                ['Monthly (12 Months)', '6.5 Months', '6.0 Months', '5.5 Months'],
                ['Quarterly (4 Quarters)', '7.5 Months', '6.0 Months', '4.5 Months'],
                ['Half-Yearly (6 Months only)', '3.5 Months', '3.0 Months', '2.5 Months']
              ]
            },
            examMantra: 'If date of withdrawal is not given, always calculate interest on drawings for an average of 6 months.'
          },
          {
            slideNumber: 4,
            title: 'Fixed vs Fluctuating Capital Accounts',
            categoryTag: 'ACCOUNTING COMPARISON',
            bullets: [
              'Fixed Capital method maintains two accounts per partner: Capital A/c and Current A/c.',
              'Fluctuating Capital method maintains only one account (Capital A/c) where all adjustments are recorded.'
            ],
            tableData: {
              headers: ['Feature', 'Fixed Capital Method', 'Fluctuating Capital Method'],
              rows: [
                ['Number of Accounts', 'Two: Capital A/c & Current A/c', 'Only One: Capital A/c'],
                ['Capital Balance Change', 'Remains unchanged unless fresh capital is introduced or permanent withdrawal made', 'Changes with every single adjustment (interest, salary, drawings)'],
                ['Balance Nature', 'Always shows a Credit Balance', 'Can occasionally show a Debit Balance due to heavy drawings/losses']
              ]
            },
            examMantra: 'Unless specified otherwise in the question, always assume Fluctuating Capital method.'
          },
          {
            slideNumber: 5,
            title: 'Methods of Valuing Goodwill',
            categoryTag: 'FORMULA RECAP',
            bullets: [
              'Average Profit Method: Normal Average Profit × Number of Years Purchase.',
              'Super Profit Method: Super Profit = Actual Average Profit - Normal Profit.',
              'Capitalisation Method: Capitalised Value of Business - Net Assets.'
            ],
            diagramBox: {
              label: 'Goodwill Calculation Formulae',
              items: [
                { term: 'Normal Profit', explanation: 'Capital Employed × Normal Rate of Return / 100.' },
                { term: 'Super Profit', explanation: 'Average Maintainable Profit - Normal Profit.' },
                { term: 'Goodwill (Capitalisation of SP)', explanation: '(Super Profit / Normal Rate of Return) × 100.' }
              ]
            },
            examMantra: 'Abnormal losses (fire, theft) must be added back; abnormal gains must be deducted from past profits.'
          },
          {
            slideNumber: 6,
            title: 'Board Exam Scoring Checklist',
            categoryTag: 'CBSE 100/100 ROADMAP',
            bullets: [
              'Past Adjustments: Always draft a 4-column Analytical Table (Statements showing adjustment) before writing the single journal entry.',
              'Guarantee of Profit: First calculate normal profit share; deficiency must be borne by guaranteeing partner(s) in agreed ratio.',
              'Check if partner capital accounts are Fixed or Fluctuating to debit/credit either Capital A/c or Current A/c.'
            ],
            keyHighlight: 'Accuracy in the single adjustment journal entry with narration guarantees full 4/4 marks.',
            examMantra: 'Always verify that total debit adjustments equal total credit adjustments.'
          }
        ]
      }
    ]
  },
  {
    id: 'acct-12-ch2',
    subjectId: 'accountancy',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 2,
    title: 'Reconstitution of Partnership: Admission & Retirement of a Partner',
    summary: 'Change in profit sharing ratio among existing partners: Sacrificing Ratio vs Gaining Ratio. Accounting for Revaluation of Assets and Liabilities. Treatment of Accumulated Profits and Reserves. Adjustment of Capitals on Admission and Retirement of a Partner.',
    keyConcepts: [
      'Sacrificing Ratio = Old Profit Share - New Profit Share (used for distributing Goodwill on Admission).',
      'Gaining Ratio = New Profit Share - Old Profit Share (used for compensating retiring partner for Goodwill).',
      'Revaluation Account (Profit and Loss Adjustment Account) records increase/decrease in assets and liabilities.'
    ],
    keyFormulasOrTerms: [
      { term: 'Sacrificing Ratio', definition: 'Old Share - New Share' },
      { term: 'Gaining Ratio', definition: 'New Share - Old Share' },
      { term: 'Revaluation Profit', definition: 'Total appreciation of assets and reduction of liabilities exceeding depreciation/increase in liabilities' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Admission of Partner: Revaluation & Capital Adjustment Comprehensive Problem',
        durationOrPages: '42 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'acct-12-ch3',
    subjectId: 'accountancy',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 3,
    title: 'Accounting for Share Capital: Issue, Forfeiture & Reissue',
    summary: 'Nature and types of companies and share capital (Authorised, Issued, Subscribed, Called-up, Paid-up). Issue of Shares at Par and Premium. Pro-rata allotment in case of over-subscription. Calls-in-arrears and Calls-in-advance. Forfeiture of shares and Reissue of forfeited shares. Transfer to Capital Reserve.',
    keyConcepts: [
      'Securities Premium Reserve (Section 52(2) of Companies Act 2013) can only be utilized for: issuing fully paid bonus shares, writing off preliminary expenses, writing off share issue expenses/underwriting commission, premium on redemption of debentures/preference shares, buy-back of shares.',
      'Pro-rata allotment: Excess application money is adjusted towards allotment and calls.',
      'On forfeiture: Share Capital A/c is debited with CALLED-UP amount (not face value).'
    ],
    keyFormulasOrTerms: [
      { term: 'Capital Reserve on Reissue', definition: '(Forfeited Amount per share - Discount on reissue per share) × Number of reissued shares' },
      { term: 'Share Capital Debited on Forfeiture', definition: 'Number of forfeited shares × Called-up value per share' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Pro-Rata Allotment & Forfeiture Table Method - CBSE Class 12 Masterclass',
        durationOrPages: '45 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'acct-12-ch4',
    subjectId: 'accountancy',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 4,
    title: 'Issue and Redemption of Debentures',
    summary: 'Meaning, characteristics, and types of debentures. Distinction between Shares and Debentures. Issue of debentures at par, at premium, and at discount. Issue of debentures considering terms of redemption. Writing off loss on issue of debentures. Issue of debentures as collateral security.',
    keyConcepts: [
      'Six cases of issue considering redemption: Issue at par redeemable at par; Issue at discount redeemable at par; Issue at premium redeemable at par; Issue at par redeemable at premium; Issue at discount redeemable at premium; Issue at premium redeemable at premium.',
      'Premium on redemption of debentures is a liability and is provided at time of issue by debiting Loss on Issue of Debentures A/c.'
    ],
    keyFormulasOrTerms: [
      { term: 'Debenture Interest', definition: 'Nominal Face Value of Debentures × Coupon Rate % (paid semi-annually or annually, subject to TDS)' }
    ],
    resources: [
      {
        type: 'video',
        title: '6 Cases of Debenture Issue with Redemption Terms - Step-by-Step Journal Entries',
        durationOrPages: '26 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'acct-12-ch5',
    subjectId: 'accountancy',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 5,
    title: 'Financial Statement Analysis & Cash Flow Statement (AS-3)',
    summary: 'Schedule III of Companies Act 2013: Balance Sheet and Statement of Profit and Loss format. Accounting Ratios: Liquidity (Current, Quick), Solvency (Debt-Equity, Total Assets to Debt, Proprietary, Interest Coverage), Activity (Inventory Turnover, Trade Receivables Turnover), and Profitability (Gross Profit, Operating, Net Profit, Return on Investment). Cash Flow Statement preparation as per AS-3 (Operating, Investing, Financing activities).',
    keyConcepts: [
      'Current Ratio ideal benchmark is 2:1; Quick / Acid-Test Ratio ideal benchmark is 1:1.',
      'Cash Flow from Operating Activities starts from Net Profit before Tax and Extraordinary Items.',
      'Non-cash and non-operating items (Depreciation, Goodwill written off, Loss on sale of fixed assets) are added back to operating profit.'
    ],
    keyFormulasOrTerms: [
      { term: 'Current Ratio', definition: 'Current Assets / Current Liabilities' },
      { term: 'Quick Ratio', definition: '(Current Assets - Inventory - Prepaid Expenses) / Current Liabilities' },
      { term: 'Debt-Equity Ratio', definition: 'Long-term Debts / Shareholders Funds (Equity)' },
      { term: 'Inventory Turnover Ratio', definition: 'Cost of Revenue from Operations (COGS) / Average Inventory' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Cash Flow Statement (AS-3 Direct/Indirect) Complete Board Question Walkthrough',
        durationOrPages: '40 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },

  // ==========================================
  // BUSINESS STUDIES - CLASS 11 (CBSE ENGLISH MEDIUM)
  // ==========================================
  {
    id: 'bst-11-ch1',
    subjectId: 'business_studies',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 1,
    title: 'Nature and Purpose of Business',
    summary: 'Concept of Business, Profession, and Employment. Characteristics of business activities. Classification of business activities: Industry (Primary, Secondary, Tertiary) and Commerce (Trade & Auxiliaries to Trade: Banking, Insurance, Transport, Warehousing, Advertising). Business Risk: Nature and causes.',
    keyConcepts: [
      'Economic activities aim at earning money/livelihood; Non-economic activities stem from love, affection, sympathy, and patriotism.',
      'Business is an economic activity involving regular production and sale of goods/services to satisfy human needs for profit.',
      'Auxiliaries to Trade remove hindrances: Transport (hindrance of place), Warehousing (hindrance of time), Insurance (hindrance of risk), Banking (hindrance of finance), Advertising (hindrance of information).'
    ],
    keyFormulasOrTerms: [
      { term: 'Business Risk', definition: 'Possibility of inadequate profits or even losses due to uncertainties or unexpected events' },
      { term: 'Commerce', definition: 'Trade (buying & selling) + Auxiliaries to trade (supportive services removing hindrances)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Class 11 Business Studies Ch 1: Nature and Purpose of Business with Uma Shukla',
        durationOrPages: '25 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'bst-11-ch2',
    subjectId: 'business_studies',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 2,
    title: 'Forms of Business Organisation',
    summary: 'Comparative analysis of Sole Proprietorship, Joint Hindu Family Business (Karta & Coparceners), Partnership (Partnership Act 1932), Cooperative Societies (Cooperative Societies Act 1912), and Joint Stock Company (Private vs Public Company under Companies Act 2013). Choice of form of business organisation.',
    keyConcepts: [
      'Sole Proprietorship: Quick decision making and single risk bearer, but unlimited liability and limited managerial skills.',
      'Partnership: Agreement, mutual agency, unlimited liability (except LLP).',
      'Joint Stock Company: Artificial legal person, separate legal entity, perpetual succession, limited liability, common seal.'
    ],
    keyFormulasOrTerms: [
      { term: 'Perpetual Succession', definition: 'Company life is unaffected by entry, exit, insolvency or death of any shareholder; created and dissolved only by law' },
      { term: 'Limited Liability', definition: 'Shareholders liability is restricted to the unpaid amount on shares held by them' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Forms of Business Organisations Compared: Sole Prop vs Partnership vs Company',
        durationOrPages: '30 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'bst-11-ch3',
    subjectId: 'business_studies',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 3,
    title: 'Emerging Modes of Business & Social Responsibility',
    summary: 'e-Business: Meaning, scope, and benefits compared with traditional business. Online transactions and security measures. Outsourcing: BPO, KPO. Social Responsibility of Business towards Investors, Employees, Consumers, Government, and Community. Environmental protection and business ethics.',
    keyConcepts: [
      'e-Business transactions: B2B (Business to Business), B2C (Business to Consumer), C2C (Consumer to Consumer), Intra-B.',
      'Outsourcing allows firms to focus on core competencies and access global talent.',
      'CSR (Corporate Social Responsibility): Businesses must balance economic wealth creation with environmental stewardship.'
    ],
    keyFormulasOrTerms: [
      { term: 'B2C Commerce', definition: 'Transactions between business firms and end-consumers (e.g. online shopping portals)' },
      { term: 'Business Ethics', definition: 'Socially determined moral principles and guidelines that govern business conduct' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Emerging Modes of Business & Corporate Social Responsibility (CSR)',
        durationOrPages: '24 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'bst-11-ch4',
    subjectId: 'business_studies',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 4,
    title: 'Sources of Business Finance',
    summary: 'Concept and classification of financial needs: Fixed Capital vs Working Capital. Classification of sources based on period (Long, Medium, Short-term), ownership (Owners Funds vs Borrowed Funds), and generation (Internal vs External). Detailed study of Equity Shares, Preference Shares, Retained Earnings, Debentures, Commercial Banks, Financial Institutions, Public Deposits, Commercial Paper, Trade Credit, and ICDs.',
    keyConcepts: [
      'Owners Funds: Equity Shares have voting rights and residual claim; Retained earnings act as self-financing without dilution.',
      'Borrowed Funds: Debentures have fixed interest charge (tax-deductible) regardless of profit, but carry obligation of timely repayment.',
      'Trade Credit is short-term finance extended by one trader to another for purchase of goods.'
    ],
    keyFormulasOrTerms: [
      { term: 'Equity Shares', definition: 'Primary risk-bearing capital of a company carrying voting rights and variable dividend' },
      { term: 'Commercial Paper (CP)', definition: 'Unsecured short-term promissory note issued by highly rated corporates to raise working capital' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Sources of Business Finance: Equity vs Debt Financing Explained',
        durationOrPages: '30 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'bst-11-ch5',
    subjectId: 'business_studies',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 5,
    title: 'Internal Trade, Small Business & MSME Enterprises',
    summary: 'Internal Trade: Wholesale Trade (services to manufacturer & retailer) and Retail Trade (Itinerant retailers vs Fixed shop retailers: Departmental Stores, Chain Stores, Mail Order Houses). Role of Chambers of Commerce in promoting internal trade. Implementation of GST. MSME classification based on investment and turnover.',
    keyConcepts: [
      'Wholesalers buy in bulk from producers and sell in small lots to retailers, bearing warehousing and market risk.',
      'Departmental stores provide all consumer goods under one roof; Multiple shops (Chain stores) specialize in one line of goods across multiple locations.',
      'MSME classification criteria: Micro (Investment ≤ 1 Cr, Turnover ≤ 5 Cr), Small (Investment ≤ 10 Cr, Turnover ≤ 50 Cr), Medium (Investment ≤ 50 Cr, Turnover ≤ 250 Cr).'
    ],
    keyFormulasOrTerms: [
      { term: 'Wholesaler Services', definition: 'Facilitates large-scale production, provides market information, finances retailers by credit' },
      { term: 'Departmental Store', definition: 'Large-scale retail establishment offering wide variety of goods divided into distinct departments' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Internal Trade, Retail Systems & MSME 2026 Guidelines',
        durationOrPages: '22 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },

  // ==========================================
  // BUSINESS STUDIES - CLASS 12 (CBSE ENGLISH MEDIUM)
  // ==========================================
  {
    id: 'bst-12-ch1',
    subjectId: 'business_studies',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 1,
    title: 'Nature and Significance of Management',
    summary: 'Management: Concept, Objectives (Organisational, Social, Personal), and Importance. Management as Art, Science, and Profession. Levels of Management: Top, Middle, and Supervisory/Operational. Management Functions: Planning, Organising, Staffing, Directing, and Controlling (POSDCORB). Coordination: Essence of Management.',
    keyConcepts: [
      'Effectiveness means doing the right task, completing activities, and achieving goals on time.',
      'Efficiency means doing the task correctly and with minimum cost and resource wastage.',
      'Coordination is the force that binds all functions of management together; it is an ongoing, deliberate, and pervasive process.'
    ],
    keyFormulasOrTerms: [
      { term: 'Management', definition: 'Process of planning, organising, staffing, directing, and controlling resources to achieve goals effectively and efficiently' },
      { term: 'Coordination', definition: 'Harmonious integration, synchronization, and balancing of individual efforts to realize common organizational objectives' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Class 12 Business Studies: Management Fundamentals & POSDCORB Masterclass',
        durationOrPages: '32 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      },
      {
        type: 'ppt_presentation',
        title: 'Nature & Significance of Management (Class 12 CBSE Case Studies Deck)',
        durationOrPages: '6 Slides',
        uploadedBy: 'Dr. Meenakshi Sundaram',
        uploadedAt: '2026-09-08T10:00:00Z',
        approvalStatus: 'approved',
        slides: [
          {
            slideNumber: 1,
            title: 'Management: Concept, Efficiency & Effectiveness',
            categoryTag: 'CBSE CLASS 12 BUSINESS STUDIES • UNIT 1',
            bullets: [
              'Management is a goal-oriented, continuous, dynamic, and multi-dimensional process (Work, People, Operations).',
              'Tangible results produced through intangible force: orderly environment, satisfied employees, target achievement.'
            ],
            keyHighlight: 'Efficiency (Cost Minimization) + Effectiveness (Timely Completion) = Managerial Excellence.',
            examMantra: 'Distinguish between doing things right (efficiency) and doing the right things (effectiveness).'
          },
          {
            slideNumber: 2,
            title: 'Triple Objectives of Management',
            categoryTag: 'EXAM CONCEPT FRAMEWORK',
            bullets: [
              'Organisational: Survival (earn revenue to cover costs), Profit (essential incentive and growth engine), Growth (expansion in sales volume, products, employee count).',
              'Social: Creating economic value for society, eco-friendly production methods, fair employment generation.',
              'Personal: Satisfying diverse individual needs, competitive salary, peer recognition, and personal development.'
            ],
            diagramBox: {
              label: 'Organisational Hierarchy',
              items: [
                { term: 'Survival', explanation: 'Revenues must at least cover operating costs.' },
                { term: 'Profit', explanation: 'Margin above cost for risk premium and reinvestment.' },
                { term: 'Growth', explanation: 'Capital investment, plant capacity expansion, market share.' }
              ]
            },
            examMantra: 'Identify whether the case study quote highlights Social, Personal, or Organisational objective.'
          },
          {
            slideNumber: 3,
            title: 'Is Management an Art, Science, or Profession?',
            categoryTag: 'THEORETICAL ANALYSIS',
            bullets: [
              'Art: Proven by personalized application, practical knowledge, and creativity (Full match).',
              'Science: Systematized body of knowledge based on observation/experimentation, but principles lack universal physical rigidity (Inexact/Social Science).',
              'Profession: Has specialized knowledge and training, but lacks mandatory statutory licensing/code of conduct like law/medicine (Emerging Profession).'
            ],
            tableData: {
              headers: ['Parameter', 'Management as Art', 'Management as Science', 'Management as Profession'],
              rows: [
                ['Systematized Knowledge', 'Yes (Theoretical foundation)', 'Yes (Scientific principles)', 'Yes (Well defined body)'],
                ['Universal Validity', 'No (Personalized style)', 'Moderate (Social science)', 'No (No statutory restriction)'],
                ['Professional Code', 'Not formalized', 'Not applicable', 'Emerging (e.g. AIMA membership)']
              ]
            },
            examMantra: 'Call management an "Inexact Science" or "Social Science" in 3-mark CBSE answers.'
          },
          {
            slideNumber: 4,
            title: 'Three Levels of Management in Modern Enterprise',
            categoryTag: 'FUNCTIONAL LEVELS',
            bullets: [
              'Top Level (Board, CEO, Managing Director): Formulates overall organizational goals, strategies, and policies; interacts with external environment.',
              'Middle Level (Departmental Heads, Plant Superintendents): Interprets policies, ensures departmental staffing, assigns duties, and coordinates inter-departmental workflows.',
              'Operational / First-Line (Foremen, Supervisors): Directly oversees operational workforce, maintains quality standards, ensures safety and discipline.'
            ],
            diagramBox: {
              label: 'Functional Roles',
              items: [
                { term: 'Top Level', explanation: 'Conceptual and design skills; strategic long-term vision.' },
                { term: 'Middle Level', explanation: 'Human resource management and departmental coordination.' },
                { term: 'Operational Level', explanation: 'Technical oversight and direct day-to-day work supervision.' }
              ]
            },
            examMantra: 'Supervisors belong to Operational/Lower level, NOT middle level.'
          },
          {
            slideNumber: 5,
            title: 'Coordination: The Essence of Management',
            categoryTag: 'CORE ESSENCE',
            bullets: [
              'Coordination is not a separate function; it is the implicit essence that harmonizes Planning, Organising, Staffing, Directing, and Controlling.',
              'Integrates group effort towards common goals; ensures unity of action.',
              'It is a deliberate responsibility of every manager, regardless of hierarchical level.'
            ],
            keyHighlight: 'Without coordination, individual efforts turn into chaos and duplicated costs.',
            examMantra: 'Whenever asked "Is coordination a 6th function?", answer clearly: No, it is the essence of management.'
          },
          {
            slideNumber: 6,
            title: 'Board Exam Case Study Strategy',
            categoryTag: 'SCORING PROTOCOL',
            bullets: [
              'Read the final question sentence first to identify what concept is being targeted.',
              'Quote exact lines from the paragraph as evidence before stating your technical term.',
              'Use the heading-explanation format with clean bullet points.'
            ],
            keyHighlight: 'Quoting lines from the case problem is strictly required for full CBSE board marks.',
            examMantra: 'Master NCERT terminology to unlock top examiner band marks.'
          }
        ]
      }
    ]
  },
  {
    id: 'bst-12-ch2',
    subjectId: 'business_studies',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 2,
    title: 'Principles of Management: Henri Fayol vs F.W. Taylor',
    summary: 'Principles of Management: Concept, nature, and significance. Henri Fayols 14 Principles of Administrative Management (Division of Work, Authority & Responsibility, Discipline, Unity of Command, Unity of Direction, Subordination of Individual Interest to General Interest, Remuneration, Centralisation & Decentralisation, Scalar Chain & Gang Plank, Order, Equity, Stability of Personnel, Initiative, and Esprit de Corps). F.W. Taylors Scientific Management: Principles (Science not rule of thumb, Harmony not discord, Cooperation not individualism, Maximum development) and Techniques (Functional Foremanship, Standardisation, Work Study: Time, Motion, Fatigue, Method, and Differential Piece Wage System).',
    keyConcepts: [
      'Unity of Command states that an employee should receive orders from one and only one superior (prevents confusion).',
      'Unity of Direction states one head, one plan for a group of activities having the same objective.',
      'Scalar Chain is the formal line of authority from highest to lowest rank; Gang Plank allows direct lateral communication in emergencies.'
    ],
    keyFormulasOrTerms: [
      { term: 'Gang Plank', definition: 'Shorter route bypassing scalar chain allowing peers of same level to communicate directly in emergencies' },
      { term: 'Functional Foremanship', definition: 'Taylor technique separating planning (4 in-charges) from execution (4 in-charges) for specialised factory supervision' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Fayols 14 Principles vs Taylors Scientific Management - Complete Comparison',
        durationOrPages: '35 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'bst-12-ch3',
    subjectId: 'business_studies',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 3,
    title: 'Business Environment, LPG Reforms & Demonetisation',
    summary: 'Business Environment: Meaning, features, and importance (First mover advantage, Early warning signals). Dimensions of Business Environment: Economic, Social, Technological, Political, and Legal. Economic Environment in India: Impact of Liberalisation, Privatisation, and Globalisation (LPG 1991). Demonetisation 2016: Objectives and impact.',
    keyConcepts: [
      'Dimensions: Economic (interest rates, inflation), Social (customs, literacy, lifestyle), Technological (AI, automation), Political (government stability), Legal (court verdicts, statutory acts).',
      'Demonetisation aimed to curb corruption, counterfeit currency, black money hoarding, and accelerate cashless digital payments.'
    ],
    keyFormulasOrTerms: [
      { term: 'First Mover Advantage', definition: 'Early identification of environmental opportunities allowing a firm to capture market leadership before rivals' }
    ],
    resources: [
      {
        type: 'video',
        title: '5 Dimensions of Business Environment & Demonetisation Case Studies Walkthrough',
        durationOrPages: '28 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'bst-12-ch4',
    subjectId: 'business_studies',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 4,
    title: 'Planning, Organising, Staffing & Directing Framework',
    summary: 'Planning: Steps in planning process and types of plans (Objectives, Strategy, Policy, Procedure, Rule, Method, Programme, Budget). Organising: Formal vs Informal organisation, Functional vs Divisional structure, Delegation (Authority, Responsibility, Accountability) and Decentralisation. Staffing: Recruitment, Selection process, Training & Development. Directing: Supervision, Motivation (Maslow Hierarchy), Leadership styles, and Barriers to Communication.',
    keyConcepts: [
      'Accountability cannot be delegated; it is absolute towards higher authority.',
      'Divisional structure is ideal for multi-product enterprises; Functional structure is based on specialized tasks.',
      'Maslows Hierarchy of Needs: Physiological, Safety, Social/Belongingness, Esteem, and Self-Actualisation.'
    ],
    keyFormulasOrTerms: [
      { term: 'Delegation', definition: 'Downward transfer of authority from a superior to a subordinate to enable operational task execution' },
      { term: 'Decentralisation', definition: 'Systematic and even distribution of decision-making authority throughout all levels of management' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Delegation vs Decentralisation & Maslow Motivation Matrix',
        durationOrPages: '30 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'bst-12-ch5',
    subjectId: 'business_studies',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 5,
    title: 'Financial Management, Marketing (4 Ps) & Consumer Protection Act 2019',
    summary: 'Financial Management: Role, financial decisions (Investment/Capital Budgeting, Financing, Dividend decisions). Capital Structure: Factors affecting (Trading on Equity). Marketing Management: Philosophies (Production, Product, Selling, Marketing, Societal Marketing). Marketing Mix 4 Ps: Product (Branding, Labelling, Packaging), Price, Place (Channels of Distribution), and Promotion (Advertising, Personal Selling, Sales Promotion, Public Relations). Consumer Protection Act 2019: Consumer rights, redressal machinery (District Commission, State Commission, National Commission).',
    keyConcepts: [
      'Trading on Equity: Increasing EPS by employing lower cost fixed debt capital when ROI > Cost of Debt.',
      'Marketing Philosophies: Societal Marketing balances customer satisfaction, company profits, and long-term societal well-being.',
      'Consumer Protection Act 2019 3-tier redressal: District (claims up to ₹1 Crore), State (claims between ₹1 Crore and ₹10 Crore), National (claims above ₹10 Crore).'
    ],
    keyFormulasOrTerms: [
      { term: 'Trading on Equity', definition: 'Use of fixed-cost debt in capital structure to magnify return on equity shareholders investment' },
      { term: 'District Commission Jurisdiction (CPA 2019)', definition: 'Entertains consumer complaints where value of goods/services paid does not exceed ₹1 Crore' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Consumer Protection Act 2019 & Marketing 4Ps Board Exam Review',
        durationOrPages: '35 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },

  // ==========================================
  // ECONOMICS - CLASS 11 (CBSE ENGLISH MEDIUM)
  // ==========================================
  {
    id: 'econ-11-ch1',
    subjectId: 'economics',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 1,
    title: 'Statistics for Economics: Collection, Organisation & Presentation',
    summary: 'Meaning, scope, and importance of Statistics in economics. Primary data vs Secondary data. Methods of data collection (Census vs Sample survey, NSSO, Census of India). Organisation of data: Frequency distribution, class limits, and tally bars. Presentation of data: Tabulation, Bar diagrams (Simple, Multiple, Sub-divided), Pie charts, Histograms, Frequency Polygons, and Ogives.',
    keyConcepts: [
      'Statistics deals with aggregate numerical facts influenced by multiplicity of causes and placed in relation to each other.',
      'Primary data is collected by the investigator first-hand for a specific purpose; Secondary data is gathered from published sources.',
      'Histograms can only be drawn for continuous grouped data and help determine the Mode graphically.'
    ],
    keyFormulasOrTerms: [
      { term: 'Class Mark / Midpoint', definition: '(Upper Class Limit + Lower Class Limit) / 2' },
      { term: 'Angle of Component in Pie Chart', definition: '(Component Value / Total Value) × 360°' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Class 11 Statistics: Data Presentation, Pie Charts & Histograms by Uma Shukla',
        durationOrPages: '26 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'econ-11-ch2',
    subjectId: 'economics',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 2,
    title: 'Measures of Central Tendency & Dispersion',
    summary: 'Arithmetic Mean (Direct, Assumed Mean, and Step-Deviation methods for individual, discrete, and continuous series). Combined Mean. Median: Calculation and graphical location using Ogives. Mode: Calculation and graphical location using Histogram. Measures of Dispersion: Standard Deviation and Coefficient of Variation.',
    keyConcepts: [
      'Arithmetic Mean is rigidly defined and based on all observations: sum of observations / number of observations.',
      'Median is the middlemost value of an ordered distribution (50th percentile).',
      'The intersection point of Less-than Ogive and More-than Ogive on the X-axis gives the exact value of Median.'
    ],
    keyFormulasOrTerms: [
      { term: 'Step-Deviation Mean', definition: 'A + (Σfd / Σf) × c (where d = (X - A) / c)' },
      { term: 'Coefficient of Variation (CV)', definition: '(Standard Deviation / Mean) × 100 (measures relative consistency/variability)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Mean, Median, Mode & Standard Deviation Numericals Step-by-Step Guide',
        durationOrPages: '34 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'econ-11-ch3',
    subjectId: 'economics',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 3,
    title: 'Introduction to Microeconomics, Central Problems & PPC',
    summary: 'Meaning of Microeconomics vs Macroeconomics. Scarcity and choice. Central problems of an economy: What to produce, How to produce, and For whom to produce. Production Possibility Curve (PPC): Concept, shape (concave to origin due to increasing MRT), shifts, and rotations. Opportunity Cost and Marginal Rate of Transformation (MRT).',
    keyConcepts: [
      'Microeconomics studies economic behaviour of individual economic units (consumer, firm, industry).',
      'PPC slopes downwards from left to right because resources are limited and transferring resources from Good X to Good Y requires sacrifice of Good X.',
      'PPC is concave to the origin because Marginal Opportunity Cost (MRT) tends to increase as resources are not equally efficient in production of all goods.'
    ],
    keyFormulasOrTerms: [
      { term: 'Marginal Rate of Transformation (MRT)', definition: 'ΔY / ΔX (Units of Good Y sacrificed per additional unit of Good X gained)' },
      { term: 'Opportunity Cost', definition: 'Value of the next best alternative forgone when a choice is made' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Microeconomics Ch 1: PPC Curve, Opportunity Cost & Central Problems',
        durationOrPages: '28 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'econ-11-ch4',
    subjectId: 'economics',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 4,
    title: 'Consumers Equilibrium & Theory of Demand',
    summary: 'Utility analysis: Total Utility (TU) and Marginal Utility (MU). Law of Diminishing Marginal Utility. Consumers equilibrium in single and two-commodity cases. Indifference Curve analysis: Properties of Indifference Curves, Marginal Rate of Substitution (MRS), Budget Line, and Consumers Equilibrium. Theory of Demand: Demand schedule, Law of Demand, and Price Elasticity of Demand (Percentage method).',
    keyConcepts: [
      'Law of Diminishing Marginal Utility states that as a consumer consumes more and more units of a commodity, the utility derived from each successive unit decreases.',
      'Consumers equilibrium in IC analysis occurs where Budget Line is tangent to highest achievable Indifference Curve: MRSxy = Px / Py.',
      'Price Elasticity of Demand (Ed) = (% change in quantity demanded) / (% change in price).'
    ],
    keyFormulasOrTerms: [
      { term: 'Equilibrium Condition (Utility)', definition: 'MUx / Px = MUy / Py = MUm (Marginal utility of money)' },
      { term: 'Price Elasticity of Demand (Ed)', definition: '-(P / Q) × (ΔQ / ΔP)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Consumers Equilibrium: Indifference Curves & Price Elasticity of Demand',
        durationOrPages: '36 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'econ-11-ch5',
    subjectId: 'economics',
    gradeLevel: '11',
    board: 'CBSE',
    chapterNumber: 5,
    title: 'Producer Behaviour, Cost, Revenue & Supply',
    summary: 'Production function: Short run vs Long run. Law of Variable Proportions (Total, Marginal, and Average Product). Cost concepts: Fixed Cost (TFC), Variable Cost (TVC), Total Cost (TC), Average Cost (AC), and Marginal Cost (MC). Revenue concepts: Total Revenue (TR), Average Revenue (AR), and Marginal Revenue (MR). Producers Equilibrium (MR-MC approach). Theory of Supply and Elasticity of Supply.',
    keyConcepts: [
      'Law of Variable Proportions operates in the short run: Stage 1 (Increasing returns to factor), Stage 2 (Diminishing returns - rational stage of operation), Stage 3 (Negative returns).',
      'MC curve is U-shaped and cuts AC curve at its lowest minimum point from below.',
      'Producers equilibrium conditions under MR-MC approach: 1) MC = MR; 2) MC must be rising beyond the point of equality.'
    ],
    keyFormulasOrTerms: [
      { term: 'Total Cost', definition: 'TFC + TVC' },
      { term: 'Marginal Cost', definition: 'TCn - TCn-1 (or ΔTC / ΔQ)' },
      { term: 'Producers Equilibrium', definition: 'MC = MR and MC cuts MR from below' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Law of Variable Proportions & Cost Curves Analysis - Class 11 Microeconomics',
        durationOrPages: '32 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },

  // ==========================================
  // ECONOMICS - CLASS 12 (CBSE ENGLISH MEDIUM)
  // ==========================================
  {
    id: 'econ-12-ch1',
    subjectId: 'economics',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 1,
    title: 'National Income and Related Aggregates (Macroeconomics)',
    summary: 'Circular flow of income (two-sector model). Basic concepts: Final goods vs Intermediate goods, Consumer goods vs Capital goods, Factor income vs Transfer income, Domestic territory and Normal residents. Aggregates: GDPmp, GDPfc, NDPmp, NDPfc, GNPmp, GNPfc, NNPmp, NNPfc (National Income). Measurement of National Income: Value Added Method, Income Method, and Expenditure Method. Real GDP vs Nominal GDP and GDP Deflator.',
    keyConcepts: [
      'National Income is NNPfc (Net National Product at Factor Cost).',
      'Conversion rules: Gross to Net = Deduct Depreciation (Consumption of Fixed Capital); Domestic to National = Add NFIA (Net Factor Income from Abroad); Market Price to Factor Cost = Deduct NIT (Net Indirect Taxes = Indirect Taxes - Subsidies).',
      'Real GDP measures physical output evaluated at constant base-year prices; Nominal GDP is measured at current market prices.'
    ],
    keyFormulasOrTerms: [
      { term: 'National Income (NNPfc)', definition: 'GDPmp - Depreciation + NFIA - Net Indirect Taxes (NIT)' },
      { term: 'GDP Deflator', definition: '(Nominal GDP / Real GDP) × 100' },
      { term: 'Value of Output', definition: 'Sales + Change in Stock (Closing Stock - Opening Stock)' },
      { term: 'Operating Surplus (Income Method)', definition: 'Rent + Royalty + Interest + Profit (Dividends + Corporate Tax + Undistributed Profits)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Class 12 CBSE Macroeconomics: National Income Conversions & Measurement Tricks',
        durationOrPages: '38 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      },
      {
        type: 'ppt_presentation',
        title: 'National Income & Macro Aggregates (Class 12 CBSE Formula Vault)',
        durationOrPages: '6 Slides',
        uploadedBy: 'Dr. Meenakshi Sundaram',
        uploadedAt: '2026-09-10T11:00:00Z',
        approvalStatus: 'approved',
        slides: [
          {
            slideNumber: 1,
            title: 'Circular Flow of Income & Fundamental Macro Concepts',
            categoryTag: 'CBSE CLASS 12 MACROECONOMICS • UNIT 1',
            bullets: [
              'Circular flow of income involves continuous generation, distribution, and disposition of income between Households and Firms.',
              'Real Flow: Flow of factor services (land, labour, capital, enterprise) from households to firms, and flow of goods/services from firms to households.',
              'Money Flow: Factor payments (rent, wages, interest, profit) and consumer consumption expenditures.'
            ],
            keyHighlight: 'Total Production Value ≡ Total Factor Income ≡ Total Final Expenditure.',
            examMantra: 'Transfer payments (scholarships, pensions) are excluded from national income calculation.'
          },
          {
            slideNumber: 2,
            title: 'The Golden Conversion Bridge of Macro Aggregates',
            categoryTag: 'CRITICAL CONVERSION MECHANISM',
            bullets: [
              'Bridge 1 (Gross vs Net): Gross - Depreciation = Net.',
              'Bridge 2 (Domestic vs National): Domestic + NFIA = National.',
              'Bridge 3 (Market Price vs Factor Cost): Market Price - Net Indirect Taxes (NIT) = Factor Cost.'
            ],
            tableData: {
              headers: ['Step / Direction', 'Forward Calculation', 'Reverse Adjustment'],
              rows: [
                ['Gross ↔ Net', 'Gross - Depreciation = Net', 'Net + Depreciation = Gross'],
                ['Domestic ↔ National', 'Domestic + NFIA = National', 'National - NFIA = Domestic'],
                ['Market Price ↔ Factor Cost', 'Market Price - NIT = Factor Cost', 'Factor Cost + NIT = Market Price']
              ]
            },
            examMantra: 'NIT = Indirect Taxes - Subsidies. If subsidies exceed indirect taxes, NIT is negative!'
          },
          {
            slideNumber: 3,
            title: 'Three Methods of Measuring National Income',
            categoryTag: 'MEASUREMENT ALGORITHMS',
            bullets: [
              'Value Added / Product Method: Gross Value Added at MP = Value of Output - Intermediate Consumption.',
              'Income Method: Compensation of Employees + Operating Surplus (Rent, Royalty, Interest, Profit) + Mixed Income of Self-employed.',
              'Expenditure Method: Private Final Consumption Expenditure + Government Final Consumption Expenditure + Gross Domestic Capital Formation + Net Exports (X - M).'
            ],
            diagramBox: {
              label: 'Aggregates Obtained per Method',
              items: [
                { term: 'Value Added Method', explanation: 'Yields GDPmp (sum of GVAs of all primary, secondary, and tertiary firms).' },
                { term: 'Income Method', explanation: 'Yields NDPfc (Domestic Factor Income).' },
                { term: 'Expenditure Method', explanation: 'Yields GDPmp directly.' }
              ]
            },
            examMantra: 'Beware: Intermediate consumption of power/raw materials is subtracted to avoid double counting.'
          },
          {
            slideNumber: 4,
            title: 'Items Included and Excluded from National Income',
            categoryTag: 'HIGH-FREQUENCY CBSE THEORY',
            bullets: [
              'Included: Imputed rent of owner-occupied houses, production for self-consumption, broker commission on sale of second-hand goods.',
              'Excluded: Sale of second-hand goods (counted in original year), transfer earnings (old-age pension, gifts), purchase of financial shares/bonds, black money, windfall gains (lotteries).'
            ],
            keyHighlight: 'Only factor earnings arising from productive economic activity in current year are counted.',
            examMantra: 'State reasons clearly when asked to justify inclusion/exclusion of items.'
          },
          {
            slideNumber: 5,
            title: 'Real GDP, Nominal GDP and GDP Deflator',
            categoryTag: 'ECONOMIC WELFARE',
            bullets: [
              'Nominal GDP increases due to both price rise and output growth.',
              'Real GDP increases ONLY when actual volume of goods and services produced increases.',
              'GDP Deflator reflects price changes across all goods in the domestic economy.'
            ],
            diagramBox: {
              label: 'GDP Formulae',
              items: [
                { term: 'GDP Deflator', explanation: '(Nominal GDP / Real GDP) × 100.' },
                { term: 'Real GDP', explanation: '(Nominal GDP / GDP Deflator) × 100.' },
                { term: 'Externalities', explanation: 'Environmental degradation (negative externality) is omitted from GDP, so GDP is an imperfect welfare metric.' }
              ]
            },
            examMantra: 'Real GDP is universally preferred over Nominal GDP as an index of economic welfare.'
          },
          {
            slideNumber: 6,
            title: 'Board Exam 6-Marker Numerical Protocol',
            categoryTag: 'TOPPER SCORING PROTOCOL',
            bullets: [
              'Step 1: Write the primary aggregate formula clearly (e.g. NDPfc = COE + OS + MI).',
              'Step 2: Substitute values with corresponding item numbers from the question table.',
              'Step 3: Convert the resulting aggregate to NNPfc using the Golden Bridge rules.',
              'Step 4: Conclude with final answer highlighted in bold with unit (e.g. ₹ 4,500 Crores).'
            ],
            keyHighlight: 'Step-marking applies; never omit units of measurement (Crores / Millions).',
            examMantra: 'Check NFIA carefully: Net Factor Income FROM abroad is added; Net Factor Income TO abroad is deducted.'
          }
        ]
      }
    ]
  },
  {
    id: 'econ-12-ch2',
    subjectId: 'economics',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 2,
    title: 'Money and Banking: Credit Creation & RBI Monetary Policy',
    summary: 'Money: Meaning, functions, and supply of money (M1 = Currency with public + Demand deposits + Other deposits with RBI). Commercial Banks: Process of credit creation / deposit multiplication. Central Bank (RBI): Functions (Bank of Issue, Banker to Government, Bankers Bank and Supervisor). Monetary Policy Tools: Quantitative (Repo Rate, Reverse Repo Rate, Bank Rate, CRR, SLR) and Qualitative instruments (Margin Requirements, Moral Suasion). Control of Inflation and Deflation.',
    keyConcepts: [
      'Credit Multiplier = 1 / LRR (Legal Reserve Ratio = CRR + SLR).',
      'Total Credit Created = Initial Primary Deposit × (1 / LRR).',
      'To curb Inflation (Excess Demand), RBI raises Repo Rate, CRR, and SLR (tight money policy); To fight Deflation (Deficient Demand), RBI reduces rates to expand liquidity.'
    ],
    keyFormulasOrTerms: [
      { term: 'Money Multiplier', definition: '1 / LRR (Legal Reserve Ratio)' },
      { term: 'Cash Reserve Ratio (CRR)', definition: 'Fraction of total net demand and time liabilities that commercial banks must keep in cash with RBI' },
      { term: 'Statutory Liquidity Ratio (SLR)', definition: 'Fraction of deposits that commercial banks must maintain in liquid assets (gold, govt securities) with themselves' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Credit Creation by Commercial Banks & RBI Monetary Tools with Director Uma Shukla',
        durationOrPages: '30 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'econ-12-ch3',
    subjectId: 'economics',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 3,
    title: 'Determination of Income and Employment & Multiplier',
    summary: 'Aggregate Demand (AD = C + I) and Aggregate Supply (AS = C + S). Propensities to Consume and Save: APC, MPC, APS, MPS. Relationship: APC + APS = 1; MPC + MPS = 1. Short-run fixed price equilibrium (AD-AS and S-I approaches). Investment Multiplier (k) and its mechanism. Problems of Deficient Demand (Deflationary Gap) and Excess Demand (Inflationary Gap) and remedial fiscal and monetary policies.',
    keyConcepts: [
      'Consumption Function: C = c̄ + bY (where c̄ is autonomous consumption, b is MPC).',
      'Saving Function: S = -c̄ + (1 - b)Y (where 1 - b is MPS).',
      'Investment Multiplier: k = ΔY / ΔI = 1 / (1 - MPC) = 1 / MPS.',
      'Deflationary Gap is the extent by which Aggregate Demand falls short of Aggregate Supply at full employment level.'
    ],
    keyFormulasOrTerms: [
      { term: 'Investment Multiplier (k)', definition: '1 / (1 - MPC) or 1 / MPS' },
      { term: 'MPC + MPS', definition: 'Equal to 1 (Since ΔY = ΔC + ΔS, dividing by ΔY yields ΔC/ΔY + ΔS/ΔY = 1)' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Investment Multiplier Mechanism & Inflationary/Deflationary Gap Solved Numericals',
        durationOrPages: '35 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'econ-12-ch4',
    subjectId: 'economics',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 4,
    title: 'Government Budget and the Economy: Deficit Analysis',
    summary: 'Government Budget: Meaning, objectives (Reallocation of resources, Reducing inequalities, Economic stability). Classification of Receipts: Revenue Receipts (Tax: Direct vs Indirect; Non-tax: Fines, Fees, Escheat) vs Capital Receipts (Borrowings, Disinvestment, Recovery of loans). Classification of Expenditure: Revenue Expenditure vs Capital Expenditure. Measures of Government Deficit: Revenue Deficit, Fiscal Deficit, and Primary Deficit and their implications.',
    keyConcepts: [
      'Revenue receipts neither create liability nor reduce assets of the government.',
      'Capital receipts either create liability (e.g. borrowings) or cause reduction in assets (e.g. PSU disinvestment).',
      'Fiscal Deficit indicates total borrowings needed by the government from all sources to bridge budget gap.'
    ],
    keyFormulasOrTerms: [
      { term: 'Fiscal Deficit', definition: 'Total Expenditure - (Revenue Receipts + Non-debt Capital Receipts) = Borrowings' },
      { term: 'Revenue Deficit', definition: 'Revenue Expenditure - Revenue Receipts' },
      { term: 'Primary Deficit', definition: 'Fiscal Deficit - Interest Payments' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Government Budget & 3 Deficits (Revenue, Fiscal, Primary) Calculation Guide',
        durationOrPages: '28 mins',
        videoUrl: 'https://www.youtube.com/embed/AkFi90lZmXA',
        approvalStatus: 'approved'
      }
    ]
  },
  {
    id: 'econ-12-ch5',
    subjectId: 'economics',
    gradeLevel: '12',
    board: 'CBSE',
    chapterNumber: 5,
    title: 'Indian Economic Development: Reforms (1991) & Key Challenges',
    summary: 'State of Indian economy on eve of independence. Economic reforms since 1991: Liberalisation (deregulation, tax reforms), Privatisation, and Globalisation (LPG policy) and WTO. Current challenges facing Indian economy: Human Capital Formation (Education, Health), Rural Development (Credit, Marketing, Organic farming), Employment (Formal vs Informal sector, Jobless growth), and Sustainable Development.',
    keyConcepts: [
      'New Economic Policy (1991) was introduced due to balance of payments crisis, mounting fiscal deficit, and high inflation.',
      'Human capital formation converts human beings into economic assets through investments in education, health, on-the-job training, migration, and information.',
      'Sustainable development meets the needs of the present without compromising the ability of future generations to meet their own needs.'
    ],
    keyFormulasOrTerms: [
      { term: 'Human Capital', definition: 'Stock of skill, dexterity, education, and knowledge embodied in the population of a nation' },
      { term: 'Sustainable Development', definition: 'Development that preserves environmental resources and ecological balance for future generations' }
    ],
    resources: [
      {
        type: 'video',
        title: 'Indian Economic Development: 1991 LPG Reforms & Rural Development Strategy',
        durationOrPages: '32 mins',
        videoUrl: 'https://www.youtube.com/embed/v3Y2zWpM8t0',
        approvalStatus: 'approved'
      }
    ]
  }
];
