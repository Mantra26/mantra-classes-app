import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserAnswer, StudentTestSubmission } from '../../types';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Send,
  Flag,
  Camera,
  ExternalLink,
  FileText
} from 'lucide-react';

export const FacultyTestRunnerModal: React.FC = () => {
  const {
    activeFacultyTest,
    setActiveFacultyTest,
    submitStudentTest,
    user,
    setView
  } = useApp();

  if (!activeFacultyTest) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [remainingSeconds, setRemainingSeconds] = useState(activeFacultyTest.durationMinutes * 60);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zoomAttachment, setZoomAttachment] = useState<any | null>(null);

  const handleFileUpload = (questionId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File exceeds 5MB limit. Please upload a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleAnswerChange(questionId, {
          uploadedAttachment: {
            name: file.name,
            type: file.type.includes('pdf') ? 'pdf' : 'image',
            dataUrl: reader.result,
            sizeBytes: file.size,
            uploadedAt: new Date().toISOString()
          }
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // Timer countdown
  useEffect(() => {
    if (remainingSeconds <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setRemainingSeconds(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingSeconds]);

  const questions = activeFacultyTest.questions;
  const currentQ = questions[currentIndex];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, partial: Partial<UserAnswer>) => {
    setAnswers(prev => {
      const existing = prev[questionId];
      return {
        ...prev,
        [questionId]: {
          ...existing,
          questionId,
          ...partial,
          timeSpentSeconds: (existing?.timeSpentSeconds || 0) + 1
        }
      };
    });
  };

  const toggleFlag = (questionId: string) => {
    setFlagged(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);

    // Compute automatic score for objective questions
    let autoScore = 0;
    questions.forEach(q => {
      const ans = answers[q.id];
      if (!ans) return;

      if (q.type === 'mcq' && ans.userMcqIndex !== undefined) {
        if (ans.userMcqIndex === q.correctOptionIndex) {
          autoScore += q.marks;
          ans.isCorrect = true;
          ans.marksAwarded = q.marks;
        } else {
          ans.isCorrect = false;
          ans.marksAwarded = 0;
        }
      } else if (q.type === 'true_false' && ans.userBoolean !== undefined) {
        if (ans.userBoolean === q.correctBoolean) {
          autoScore += q.marks;
          ans.isCorrect = true;
          ans.marksAwarded = q.marks;
        } else {
          ans.isCorrect = false;
          ans.marksAwarded = 0;
        }
      } else if (q.type === 'fill_blank' && ans.userText && q.correctBlanks) {
        const userWords = ans.userText.toLowerCase().split(',').map(s => s.trim());
        const matchAll = q.correctBlanks.every((b, idx) => {
          return userWords[idx] && userWords[idx].includes(b.toLowerCase());
        });
        if (matchAll) {
          autoScore += q.marks;
          ans.isCorrect = true;
          ans.marksAwarded = q.marks;
        } else {
          ans.isCorrect = false;
          ans.marksAwarded = 0;
        }
      }
    });

    const durationSpent = Math.max(1, Math.round((activeFacultyTest.durationMinutes * 60 - remainingSeconds) / 60));

    const uploadedSheets = Object.values(answers)
      .map(a => a.uploadedAttachment)
      .filter((att): att is NonNullable<typeof att> => Boolean(att));

    const submission: StudentTestSubmission = {
      id: `sub-${Date.now()}`,
      testPaperId: activeFacultyTest.id,
      testTitle: activeFacultyTest.title,
      studentId: user.id || `stu-${user.mobileNumber?.slice(-4) || 'guest'}`,
      studentName: user.name || 'Student',
      studentMobile: user.mobileNumber,
      studentGrade: (user.gradeLevel || '7') as any,
      subjectId: activeFacultyTest.subjectId,
      submittedAt: new Date().toISOString(),
      durationSpentMinutes: durationSpent,
      answers,
      uploadedSheets,
      status: 'submitted',
      autoScore,
      totalMarks: activeFacultyTest.totalMarks
    };

    submitStudentTest(submission);
    setIsSubmitting(false);
    setActiveFacultyTest(null);
    setView('assigned-tests');
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-5 sm:px-7 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                {activeFacultyTest.subjectName} • Grade {activeFacultyTest.targetGrade}
              </span>
              <span className="text-xs text-slate-400">
                Created by {activeFacultyTest.createdBy}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-1">
              {activeFacultyTest.title}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-mono text-sm font-bold shadow-inner">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{formatTime(remainingSeconds)}</span>
            </div>

            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Test</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to exit? Your answers will be saved.')) {
                  setActiveFacultyTest(null);
                }
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Instructions strip */}
        <div className="bg-indigo-50/80 border-b border-indigo-100 px-5 sm:px-7 py-2.5 flex items-center justify-between text-xs text-indigo-900">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-medium">{activeFacultyTest.instructions}</span>
          </div>
          <div className="flex items-center space-x-3 font-semibold text-slate-600 shrink-0 pl-2">
            <span>Marks: {activeFacultyTest.totalMarks}</span>
            <span>Pass: {activeFacultyTest.passingMarks}</span>
          </div>
        </div>

        {/* Question Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {currentQ ? (
            <div className="space-y-5">
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="text-xs font-bold text-indigo-600">
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                    <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {currentQ.type.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      {currentQ.marks} {currentQ.marks > 1 ? 'Marks' : 'Mark'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                    {currentQ.text}
                  </h3>
                </div>

                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  className={`p-2 rounded-xl border transition-colors shrink-0 ${
                    flagged[currentQ.id]
                      ? 'bg-amber-100 border-amber-300 text-amber-700'
                      : 'border-slate-200 text-slate-400 hover:text-slate-600'
                  }`}
                  title="Mark for Review"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>

              {/* Question Input Based on Type */}
              <div className="space-y-3 pt-2">
                {/* 1. MCQ */}
                {currentQ.type === 'mcq' && currentQ.options && (
                  <div className="grid grid-cols-1 gap-2.5">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = answers[currentQ.id]?.userMcqIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAnswerChange(currentQ.id, { userMcqIndex: idx })}
                          className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span
                              className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                                isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. TRUE / FALSE */}
                {currentQ.type === 'true_false' && (
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { val: true, label: 'True' },
                      { val: false, label: 'False' }
                    ].map(item => {
                      const isSelected = answers[currentQ.id]?.userBoolean === item.val;
                      return (
                        <button
                          key={String(item.val)}
                          type="button"
                          onClick={() => handleAnswerChange(currentQ.id, { userBoolean: item.val })}
                          className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 3. FILL IN BLANKS */}
                {currentQ.type === 'fill_blank' && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600">
                      Type your answer below (separate multiple blanks with a comma):
                    </label>
                    <input
                      type="text"
                      value={answers[currentQ.id]?.userText || ''}
                      onChange={e => handleAnswerChange(currentQ.id, { userText: e.target.value })}
                      placeholder="e.g. 10, 11 or byte"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                )}

                {/* 4. SHORT / LONG ANSWER */}
                {(currentQ.type === 'short_answer' || currentQ.type === 'long_answer') && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Type complete working steps, definitions, or algorithms:</span>
                      <span className="font-mono">
                        {(answers[currentQ.id]?.userText || '').length} characters
                      </span>
                    </div>
                    <textarea
                      rows={currentQ.type === 'long_answer' ? 8 : 5}
                      value={answers[currentQ.id]?.userText || ''}
                      onChange={e => handleAnswerChange(currentQ.id, { userText: e.target.value })}
                      placeholder="Write your detailed answer here. Show all working steps, formula used, or algorithm flow..."
                      className="w-full p-4 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono leading-relaxed"
                    />
                    {currentQ.markingCriteria && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                        <span className="font-bold text-slate-700">ICSE Marking Rubric Hints:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                          {currentQ.markingCriteria.map((crit, cIdx) => (
                            <li key={cIdx}>{crit}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Upload Handwritten Solution / Answer Sheet */}
                    <div className="pt-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Upload Solved Sheet / Photo of Work (Optional):
                      </label>

                      {answers[currentQ.id]?.uploadedAttachment ? (
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200">
                          <div className="flex items-center space-x-3 min-w-0">
                            {answers[currentQ.id].uploadedAttachment!.type === 'image' ? (
                              <img
                                src={answers[currentQ.id].uploadedAttachment!.dataUrl}
                                alt="Solved sheet"
                                className="w-12 h-12 object-cover rounded-xl border border-indigo-200 shrink-0 cursor-pointer"
                                onClick={() => setZoomAttachment(answers[currentQ.id].uploadedAttachment)}
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0">
                                PDF
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-800 truncate">
                                {answers[currentQ.id].uploadedAttachment!.name}
                              </div>
                              <button
                                type="button"
                                onClick={() => setZoomAttachment(answers[currentQ.id].uploadedAttachment)}
                                className="text-[10px] text-indigo-600 font-bold hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>View Solved Sheet</span>
                              </button>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAnswerChange(currentQ.id, { uploadedAttachment: undefined })}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-100 transition-colors"
                            title="Remove uploaded answer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center justify-between p-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50/60 hover:bg-indigo-50/30 cursor-pointer transition-all">
                          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs">
                            <Camera className="w-4 h-4" />
                            <span>📸 Snap Photo / Upload Solved Sheet</span>
                          </div>
                          <span className="text-[11px] text-slate-400">JPG, PNG, PDF</span>
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            capture="environment"
                            onChange={e => handleFileUpload(currentQ.id, e)}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                )}

                {/* Hint Toggle */}
                {currentQ.mantraHint && (
                  <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start space-x-2.5 text-xs text-amber-900">
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-800">Uma Ma'am's Exam Hint: </span>
                      <span>{currentQ.mantraHint}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              No questions found for this test.
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-7 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-x-auto max-w-sm sm:max-w-md py-1">
            {questions.map((q, idx) => {
              const isAns = answers[q.id] !== undefined;
              const isCurr = idx === currentIndex;
              const isFlg = flagged[q.id];

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    isCurr
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-500/30'
                      : isFlg
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : isAns
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center space-x-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <span>Review & Submit</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
              <FileCheck className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-bold text-slate-900">Submit Test for Evaluation?</h4>
              <p className="text-xs text-slate-500 mt-1">
                You have answered <strong>{answeredCount} of {questions.length}</strong> questions.
                Objective questions will be evaluated instantly, and subjective questions will be sent to Director Uma Shukla.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Continue Solving
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1"
              >
                <span>Confirm Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Answer Sheet Zoom Modal */}
      {zoomAttachment && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-bold">{zoomAttachment.name}</span>
              <button
                type="button"
                onClick={() => setZoomAttachment(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto flex items-center justify-center bg-slate-100 max-h-[80vh]">
              {zoomAttachment.type === 'image' ? (
                <img
                  src={zoomAttachment.dataUrl}
                  alt="Enlarged handwritten sheet"
                  className="max-h-[75vh] object-contain rounded-xl shadow-md"
                />
              ) : (
                <iframe
                  src={zoomAttachment.dataUrl}
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
