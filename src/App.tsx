import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { SubjectsListView } from './components/chapters/SubjectsListView';
import { ChapterDetailView } from './components/chapters/ChapterDetailView';
import { TestSeriesExplorer } from './components/test/TestSeriesExplorer';
import { CustomTestBuilder } from './components/test/CustomTestBuilder';
import { TestRunner } from './components/test/TestRunner';
import { PerformanceAnalytics } from './components/analytics/PerformanceAnalytics';
import { BookmarksView } from './components/bookmarks/BookmarksView';
import { DoubtsView } from './components/doubts/DoubtsView';
import { AdminPanel } from './components/admin/AdminPanel';
import { ScorecardModal } from './components/test/ScorecardModal';
import { UpiPaymentModal } from './components/payment/UpiPaymentModal';
import { GraphicalLabsModal } from './components/chapters/GraphicalLabsModal';
import { VideoPlayerModal } from './components/chapters/VideoPlayerModal';
import { AssignedTestsView } from './components/test/AssignedTestsView';
import { FacultyTestRunnerModal } from './components/test/FacultyTestRunnerModal';
import { FacultyPortal } from './components/faculty/FacultyPortal';
import { StudentAuthModal } from './components/auth/StudentAuthModal';
import { StaffPasskeyModal } from './components/auth/StaffPasskeyModal';
import { FlashcardsModal } from './components/flashcards/FlashcardsModal';
import { SmartConceptSearchModal } from './components/search/SmartConceptSearchModal';
import { DailyBlitzQuizModal } from './components/test/DailyBlitzQuizModal';
import { ExamCapsulePrintModal } from './components/chapters/ExamCapsulePrintModal';
import { ScholarLeaderboardView } from './components/gamification/ScholarLeaderboardView';

export const AppContent: React.FC = () => {
  const { view, activeTest, currentRole } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col flex-1 min-w-0 transition-all">
        {/* Top Header */}
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        {/* Page Content View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {view === 'admin' && <AdminPanel />}
          {view === 'faculty' && <FacultyPortal />}
          {view === 'dashboard' && <DashboardOverview />}
          {view === 'subjects' && <SubjectsListView />}
          {view === 'chapter-detail' && <ChapterDetailView />}
          {view === 'assigned-tests' && <AssignedTestsView />}
          {view === 'test-series' && (activeTest ? <TestRunner /> : <TestSeriesExplorer />)}
          {view === 'custom-builder' && <CustomTestBuilder />}
          {view === 'analytics' && <PerformanceAnalytics />}
          {view === 'bookmarks' && <BookmarksView />}
          {view === 'doubts' && <DoubtsView />}
          {view === 'leaderboard' && <ScholarLeaderboardView />}
        </main>
      </div>

      {/* Global Modals & Overlays */}
      <StudentAuthModal />
      <StaffPasskeyModal />
      <ScorecardModal />
      <UpiPaymentModal />
      <GraphicalLabsModal />
      <VideoPlayerModal />
      <FacultyTestRunnerModal />
      <FlashcardsModal />
      <SmartConceptSearchModal />
      <DailyBlitzQuizModal />
      <ExamCapsulePrintModal />
    </div>
  );
};

export default AppContent;
