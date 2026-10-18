import { AchievementBadge, LeaderboardUser } from '../types';

export const ALL_ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'badge-welcome',
    name: 'Mantra Scholar',
    description: 'Enrolled in Mantra Classes digital learning portal and setup study profile.',
    icon: 'Sparkles',
    xpReward: 50,
    category: 'milestone'
  },
  {
    id: 'badge-first-test',
    name: 'First Benchmark Aced',
    description: 'Successfully attempted and completed your first mock examination or chapter diagnostic.',
    icon: 'CheckCircle2',
    xpReward: 100,
    category: 'milestone'
  },
  {
    id: 'badge-streak-3',
    name: 'Flame Starter',
    description: 'Maintained an active consecutive study streak of 3 days.',
    icon: 'Flame',
    xpReward: 150,
    category: 'streak'
  },
  {
    id: 'badge-streak-7',
    name: 'Week of Fire',
    description: 'Demonstrated exceptional study discipline with an unbroken 7-day streak.',
    icon: 'Zap',
    xpReward: 300,
    category: 'streak'
  },
  {
    id: 'badge-bullseye',
    name: 'Perfect Bullseye',
    description: 'Scored 100% on any mock examination or diagnostic assessment paper.',
    icon: 'Target',
    xpReward: 250,
    category: 'accuracy'
  },
  {
    id: 'badge-speed-demon',
    name: 'Speed Blitz Champion',
    description: 'Finished the 60-Second Daily Rapid-Fire Blitz Quiz with 100% accuracy.',
    icon: 'Timer',
    xpReward: 150,
    category: 'accuracy'
  },
  {
    id: 'badge-cards-master',
    name: 'Flashcard Virtuoso',
    description: 'Mastered 15+ revision flashcards using spaced repetition drills.',
    icon: 'Layers',
    xpReward: 200,
    category: 'milestone'
  },
  {
    id: 'badge-polymath',
    name: 'Cross-Curricular Scholar',
    description: 'Practiced test assessments across 4 or more distinct subjects.',
    icon: 'Award',
    xpReward: 350,
    category: 'subject'
  },
  {
    id: 'badge-sanskrit-expert',
    name: 'संस्कृत मनीषी (Sanskrit Scholar)',
    description: 'Mastered Sanskrit Vyakaran rules, Dhatu Roop, and Subhashitani verses.',
    icon: 'BookOpen',
    xpReward: 200,
    category: 'subject'
  },
  {
    id: 'badge-pro-pass',
    name: 'Master Pass Holder',
    description: 'Enrolled in Director Uma Shukla\'s all-access Master Pass.',
    icon: 'Crown',
    xpReward: 500,
    category: 'milestone'
  }
];

export interface ScholarLevelInfo {
  level: number;
  title: string;
  badge: string;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercentage: number;
}

export function getScholarLevel(totalXp: number = 0): ScholarLevelInfo {
  const tiers = [
    { level: 1, title: 'Novice Scholar', badge: '🌱', min: 0, max: 200 },
    { level: 2, title: 'Curious Explorer', badge: '🧭', min: 200, max: 500 },
    { level: 3, title: 'Focused Achiever', badge: '⚡', min: 500, max: 1000 },
    { level: 4, title: 'Board Exam Contender', badge: '🎯', min: 1000, max: 2000 },
    { level: 5, title: 'Ranker Prodigy', badge: '🏆', min: 2000, max: 3500 },
    { level: 6, title: 'Mantra Grandmaster', badge: '👑', min: 3500, max: 6000 }
  ];

  for (let i = 0; i < tiers.length; i++) {
    const t = tiers[i];
    if (totalXp < t.max || i === tiers.length - 1) {
      const xpInLevel = Math.max(0, totalXp - t.min);
      const span = t.max - t.min;
      const progress = Math.min(100, Math.round((xpInLevel / span) * 100));
      return {
        level: t.level,
        title: t.title,
        badge: t.badge,
        currentLevelXp: totalXp,
        nextLevelXp: t.max,
        progressPercentage: progress
      };
    }
  }

  return {
    level: 6,
    title: 'Mantra Grandmaster',
    badge: '👑',
    currentLevelXp: totalXp,
    nextLevelXp: 10000,
    progressPercentage: 100
  };
}

export const SEED_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    id: 'user-top-1',
    name: 'Suhana Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    grade: 'Grade 7 (ICSE)',
    board: 'ICSE',
    streakDays: 14,
    xp: 2840,
    testsCompleted: 26,
    badgesCount: 8
  },
  {
    rank: 2,
    id: 'user-top-2',
    name: 'Reyansh Singhal',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    grade: 'Class 12 (CBSE Commerce)',
    board: 'CBSE',
    streakDays: 11,
    xp: 2420,
    testsCompleted: 21,
    badgesCount: 7
  },
  {
    rank: 3,
    id: 'user-top-3',
    name: 'Ananya Kapoor',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    grade: 'Grade 6 (Cambridge IGCSE)',
    board: 'IGCSE',
    streakDays: 9,
    xp: 1980,
    testsCompleted: 18,
    badgesCount: 6
  },
  {
    rank: 4,
    id: 'user-top-4',
    name: 'Kabir Varma',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    grade: 'Grade 7 (CBSE)',
    board: 'CBSE',
    streakDays: 7,
    xp: 1650,
    testsCompleted: 14,
    badgesCount: 5
  },
  {
    rank: 5,
    id: 'user-top-5',
    name: 'Meera Nambiar',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    grade: 'Grade 5 (ICSE)',
    board: 'ICSE',
    streakDays: 6,
    xp: 1320,
    testsCompleted: 11,
    badgesCount: 5
  }
];
