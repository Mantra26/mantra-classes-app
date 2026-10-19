import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Play,
  Award,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ExternalLink,
  X,
  Lock
} from 'lucide-react';

export const AssignedTestsView: React.FC = () => {
  const {
    facultyTests,
    studentSubmissions,
    setActiveFacultyTest,
    activeGrade,
    activeBoard,
    user,
    testAttempts,
    openPaymentModal,
    currentRole,
    hasUsedDemo
  } = useApp();

  const isAuthorized = currentRole === 'admin' || user.isProMember || user.paymentStatus === 'authorized';

  const [activeTab, setActiveTab] = useState<'pending' | 'submitted' | 'evaluated'>('pending');
  const [expandedSubmissionId, setExpandedSubmissionId] = useState<string | null>(null);
  const [zoomSheet, setZoomSheet] = useState<any | null>(null);

  // Filter tests matching active grade or 'all' and active board and only approved tests
  const gradeTests = facultyTests.filter(t => {
    const matchesGrade = t.targetGrade === 'all' || t.targetGrade === activeGrade;
    const matchesBoard = !t.board || t.board === activeBoard;
    const isApproved = !t.approvalStatus || t.approvalStatus === 'approved';
    return matchesGrade && matchesBoard && isApproved;
  });

  // Submissions for this student
  const mySubmissions = studentSubmissions.filter(s => s.studentId === user.id);

  // Split into Pending, Submitted, Evaluated
  const submittedTestIds = new Set(mySubmissions.map(s => s.testPaperId));
  const pendingTests = gradeTests.filter(t => !submittedTestIds.has(t.id));
  const underReviewSubmissions = mySubmissions.filter(s => s.status === 'submitted');
  const evaluatedSubmissions = mySubmissions.filter(s => s.status === 'evaluated');

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              {activeGrade === '11' || activeGrade === '12' ? `Class ${activeGrade} Portal` : `Grade ${activeGrade} Portal`}
            </span>
            <span className="text-xs text-slate-400">{activeBoard} Curriculum Continuous Assessment</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Assigned Faculty Tests & Homework
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
            Weekly benchmark papers, chapter unit tests, and subjective assignments issued directly by <strong>Director Uma Shukla</strong> and verified faculty.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start md:self-auto bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-600 px-2">Active Class:</span>
          <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-extrabold text-xs shadow-xs">
            {activeGrade === '11' || activeGrade === '12' ? `Class ${activeGrade} (${activeBoard})` : `Grade ${activeGrade} (${activeBoard})`}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'pending'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Pending Tests</span>
          {pendingTests.length > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
              {pendingTests.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('submitted')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'submitted'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Under Evaluation</span>
          {underReviewSubmissions.length > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-900 text-[10px] font-black">
              {underReviewSubmissions.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('evaluated')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'evaluated'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Evaluated Scorecards</span>
          {evaluatedSubmissions.length > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
              {evaluatedSubmissions.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: PENDING TESTS */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingTests.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Pending Tests for Grade {activeGrade}!</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                You are completely up to date with all assigned homework and test papers. Check back when Uma Ma'am publishes the next weekly benchmark.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pendingTests.map(test => (
                <div
                  key={test.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                        {test.subjectName}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        Target: Grade {test.targetGrade}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {test.title}
                      </h3>
                      {test.chapterTitle && (
                        <p className="text-xs text-indigo-600 font-medium mt-0.5">
                          Chapter: {test.chapterTitle}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {test.instructions}
                    </p>

                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Total Marks</span>
                        <span className="font-extrabold text-slate-800">{test.totalMarks} M</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Duration</span>
                        <span className="font-extrabold text-slate-800">{test.durationMinutes} mins</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Pass Criteria</span>
                        <span className="font-extrabold text-slate-800">{test.passingMarks} M</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Due: {new Date(test.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <div className="pt-5">
                    {hasUsedDemo && !isAuthorized ? (
                      <button
                        onClick={() => {
                          if (user.paymentStatus === 'pending_authorization') {
                            alert(`Your payment of ₹${user.pendingAmount || 499} for ${user.pendingPlanName || 'Course Module'} is currently pending authorization by Director Uma Shukla.\n\nOnce authorized, all tests in this module will be unlocked.`);
                          } else {
                            openPaymentModal();
                          }
                        }}
                        className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs sm:text-sm transition-all"
                      >
                        <Lock className="w-4 h-4 text-amber-600" />
                        <span>{user.paymentStatus === 'pending_authorization' ? '⏳ Awaiting Director Authorization' : '🔒 Unlock Test Paper with Pro Pass'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveFacultyTest(test)}
                        className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>{!hasUsedDemo && !isAuthorized ? '✨ Start 1 Free Demo Test Paper' : 'Start & Solve Test Paper'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: UNDER EVALUATION */}
      {activeTab === 'submitted' && (
        <div className="space-y-4">
          {underReviewSubmissions.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 space-y-2">
              <Clock className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No Submissions Currently Under Review</h3>
              <p className="text-xs text-slate-500">
                Tests you submit will appear here while faculty checks your subjective explanations.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {underReviewSubmissions.map(sub => (
                <div
                  key={sub.id}
                  className="bg-white rounded-3xl border border-amber-200/90 bg-gradient-to-br from-white to-amber-50/20 p-6 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center space-x-1">
                      <Clock className="w-3 h-3 animate-spin" />
                      <span>Awaiting Evaluation</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{sub.testTitle}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Submitted by {sub.studentName} • Grade {sub.studentGrade}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                    <span>Objective Auto-Score: <strong>{sub.autoScore} Marks</strong></span>
                    <span>Total Marks: <strong>{sub.totalMarks} M</strong></span>
                  </div>

                  <p className="text-xs text-amber-800/80 italic">
                    Director Uma Shukla is reviewing your subjective working steps. Once released, your scorecard and personalized guidance will appear under "Evaluated Scorecards".
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: EVALUATED SCORECARDS */}
      {activeTab === 'evaluated' && (
        <div className="space-y-4">
          {evaluatedSubmissions.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 space-y-2">
              <Award className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No Evaluated Scorecards Yet</h3>
              <p className="text-xs text-slate-500">
                Completed tests graded by Uma Ma'am will be documented here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {evaluatedSubmissions.map(sub => {
                const totalScored = (sub.autoScore || 0) + (sub.manualScore || 0);
                const isExpanded = expandedSubmissionId === sub.id;

                return (
                  <div
                    key={sub.id}
                    className="bg-white rounded-3xl border border-emerald-200/90 shadow-xs p-6 space-y-4 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Evaluated & Released</span>
                          </span>
                          <span className="text-xs text-slate-400">
                            Evaluated on {new Date(sub.evaluatedAt || sub.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{sub.testTitle}</h3>
                        <p className="text-xs text-slate-500">
                          Student: {sub.studentName} • Grade {sub.studentGrade}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3 self-start sm:self-auto">
                        <div className="text-right">
                          <div className="text-2xl font-black text-emerald-600">
                            {totalScored} <span className="text-xs text-slate-400">/ {sub.totalMarks}</span>
                          </div>
                          <div className="text-xs font-bold text-slate-500">{sub.percentage}% • {sub.grade}</div>
                        </div>

                        <span className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center border border-emerald-200">
                          {sub.percentage && sub.percentage >= 90 ? 'A+' : 'A'}
                        </span>
                      </div>
                    </div>

                    {/* Teacher Feedback Callout */}
                    {sub.facultyFeedback && (
                      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2">
                        <div className="flex items-center space-x-2 text-amber-900">
                          <MessageSquare className="w-4 h-4 text-amber-600" />
                          <span className="text-xs font-black uppercase tracking-wider">
                            Official Feedback from {sub.evaluatedBy || 'Uma Shukla'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif italic">
                          "{sub.facultyFeedback}"
                        </p>
                      </div>
                    )}

                    {/* Toggle Answers Breakdown */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <button
                        onClick={() => setExpandedSubmissionId(isExpanded ? null : sub.id)}
                        className="flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Submitted Answers' : 'View Submitted Answers'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <div className="text-xs text-slate-400">
                        Auto Score: {sub.autoScore} M | Subjective: {sub.manualScore || 0} M
                      </div>
                    </div>

                    {/* Expanded Answers View */}
                    {isExpanded && (
                      <div className="space-y-3 pt-3 border-t border-slate-100">
                        {Object.entries(sub.answers).map(([qId, ans], aIdx) => (
                          <div key={qId} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                            <div className="flex items-center justify-between font-bold text-slate-700">
                              <span>Response #{aIdx + 1} ({qId})</span>
                              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                                {ans.marksAwarded !== undefined ? `${ans.marksAwarded} Marks Awarded` : 'Checked'}
                              </span>
                            </div>
                            <div className="text-slate-600 font-mono whitespace-pre-wrap bg-white p-2.5 rounded-xl border border-slate-200">
                              {ans.userText || (ans.userMcqIndex !== undefined ? `Selected Option ${String.fromCharCode(65 + ans.userMcqIndex)}` : String(ans.userBoolean))}
                            </div>
                            {ans.uploadedAttachment && (
                              <div className="mt-2 p-2 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
                                <div className="flex items-center space-x-2 min-w-0">
                                  {ans.uploadedAttachment.type === 'image' ? (
                                    <img
                                      src={ans.uploadedAttachment.dataUrl}
                                      alt="Your uploaded solution"
                                      className="w-10 h-10 object-cover rounded-lg border border-indigo-200 cursor-pointer"
                                      onClick={() => setZoomSheet(ans.uploadedAttachment)}
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-lg bg-indigo-200 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0">
                                      PDF
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    <div className="font-bold text-xs text-slate-800 truncate">{ans.uploadedAttachment.name}</div>
                                    <div className="text-[10px] text-indigo-600 font-medium">Your Uploaded Answer Sheet</div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setZoomSheet(ans.uploadedAttachment)}
                                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-2xs shrink-0 flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>View Sheet</span>
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Answer Sheet Zoom Modal */}
      {zoomSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-bold">{zoomSheet.name}</span>
              <button
                type="button"
                onClick={() => setZoomSheet(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto flex items-center justify-center bg-slate-100 max-h-[80vh]">
              {zoomSheet.type === 'image' ? (
                <img
                  src={zoomSheet.dataUrl}
                  alt="Enlarged handwritten sheet"
                  className="max-h-[75vh] object-contain rounded-xl shadow-md"
                />
              ) : (
                <iframe
                  src={zoomSheet.dataUrl}
                  title="PDF Sheet Preview"
                  className="w-full h-[70vh] rounded-xl"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
