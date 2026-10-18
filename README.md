# 🎓 Mantra Classes App by Uma Shukla
### CBSE & ICSE Smart Learning and Test Series Platform

A modern full-stack web application designed for students, faculty, and administration of **Mantra Classes**, curated under the mentorship of **Director Uma Shukla**.

---

## 🌟 Key Features

1. **Dual Board Curriculum**:
   - **CBSE (English Medium)**: Senior Secondary **Class 11 & Class 12 Commerce** (Accountancy, Business Studies, Economics) with NCERT-aligned notes, 16:9 widescreen presentation slide decks, and video masterclasses.
   - **ICSE (English Medium)**: Grades 2, 3, 4, 5, 6, and 7 across Mathematics, Physics, Chemistry, Biology, Computer Applications, History & Civics, Geography, and English.

2. **Core Commerce Subjects**:
   - 🧮 **Accountancy (`ACCT-CBSE`)**: Partnership, Goodwill, Pro-Rata Share Capital, Debentures, Cash Flow (AS-3), and Final Accounts.
   - 💼 **Business Studies (`BST-CBSE`)**: Principles of Management, Planning & Directing, Marketing Mix, and Consumer Protection Act 2019.
   - 📈 **Economics (`ECON-CBSE`)**: Microeconomics & PPC, National Income Aggregates, Money & Banking (RBI tools), Multiplier, and Indian Economic Reforms.

3. **Multi-Format Question Bank**:
   - Multiple Choice Questions (MCQ) with conceptual explanations.
   - True / False with legal and accounting rationales.
   - Fill in the Blanks with exact keyword verification.
   - Short Answer (2–3 marks) with step-by-step marking schemes.
   - Long Answer (5–8 marks) with detailed numerical computations and case studies.

4. **Multi-Role Portals**:
   - **Student Portal**: Take chapter unit tests, whole subject mocks, and custom multi-chapter tests; view instant scorecards and weak-area diagnosis.
   - **Faculty Portal**: Upload test papers, PPT decks, and video lectures (queued for Director review).
   - **Admin Panel (Director Uma Shukla)**: Academic moderation desk to inspect and approve faculty submissions, manage teachers, and assign homework.

5. **Integrated UPI Payment Gateway**:
   - Beneficiary VPA: **`8707794159@ptyes`** (Payee: **Uma Shukla**).
   - Instant QR code scanner with deep-linking to BHIM, Google Pay, PhonePe, and Paytm.

---

## 🚀 Quick Start Instructions

### Option 1: Instant Run without Node.js (For Students & Evaluators)
- Navigate to the `dist/` folder and open `index.html` in any web browser (Chrome, Safari, Edge).
- Or drag the `dist/` folder into [https://app.netlify.com/drop](https://app.netlify.com/drop) to publish it live for free in 30 seconds.

### Option 2: Run in Development Mode (For Developers)
1. Make sure [Node.js](https://nodejs.org/) (v18+) is installed.
2. In this folder, install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```text
mantra-classes-app/
├── dist/                  # Pre-compiled, production-ready static website
├── src/
│   ├── components/        # React components (Dashboard, Tests, Admin, Faculty, Curriculum)
│   ├── context/           # AppContext for global state & persistence
│   ├── data/              # ICSE & CBSE Commerce curriculum and question banks
│   ├── services/          # LocalStorage persistence layer
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Root component with sidebar and dynamic view router
│   └── main.tsx           # Application entry point
├── .github/workflows/     # Automated GitHub Pages deployment pipeline
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.ts         # Vite configuration with relative asset paths
```

---

© 2026 Mantra Classes. Mentorship by Uma Shukla. All rights reserved.
