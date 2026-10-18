import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_CHAPTERS, ICSE_SUBJECTS } from '../../data/icseCurriculum';
import { SubjectId } from '../../types';
import {
  HelpCircle,
  Plus,
  CheckCircle2,
  Clock,
  Trash2,
  Sparkles,
  Send,
  MessageSquare,
  Image as ImageIcon,
  X,
  Camera,
  ExternalLink,
  UserCheck,
  ShieldCheck,
  Paperclip,
  Phone
} from 'lucide-react';

export const DoubtsView: React.FC = () => {
  const {
    doubts,
    addDoubtNote,
    toggleDoubtStatus,
    deleteDoubtNote,
    replyToDoubtNote,
    facultyMembers,
    user,
    currentRole,
    activeBoard,
    activeGrade
  } = useApp();

  const [showAddForm, setShowAddForm] = useState(false);
  const [recipientRole, setRecipientRole] = useState<'admin' | 'faculty'>('admin');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>(facultyMembers[0]?.id || 'fac-1');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('mathematics');
  const [selectedChapterId, setSelectedChapterId] = useState(ICSE_CHAPTERS[0]?.id || 'general');
  const [topicInput, setTopicInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [attachedImage, setAttachedImage] = useState<{ name: string; dataUrl: string } | null>(null);
  const [previewModalImg, setPreviewModalImg] = useState<{ title: string; url: string } | null>(null);

  // Staff reply form state (for admin/faculty replying to doubts)
  const [replyingDoubtId, setReplyingDoubtId] = useState<string | null>(null);
  const [staffReplyText, setStaffReplyText] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please attach a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAttachedImage({
          name: file.name,
          dataUrl: reader.result
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;

    const ch = ICSE_CHAPTERS.find(c => c.id === selectedChapterId);
    const sub = ICSE_SUBJECTS.find(s => s.id === selectedSubjectId);
    const faculty = facultyMembers.find(f => f.id === selectedFacultyId);

    addDoubtNote(
      selectedChapterId,
      topicInput || ch?.title || `${sub?.name || 'Academic'} Query`,
      noteInput,
      {
        recipientRole,
        recipientId: recipientRole === 'faculty' ? faculty?.id : 'admin-director',
        recipientName: recipientRole === 'faculty' ? faculty?.name : 'Uma Shukla (Director)',
        subjectId: selectedSubjectId,
        subjectName: sub?.name,
        attachmentUrl: attachedImage?.dataUrl,
        attachmentName: attachedImage?.name
      }
    );

    setTopicInput('');
    setNoteInput('');
    setAttachedImage(null);
    setShowAddForm(false);
  };

  const handleStaffReplySubmit = (doubtId: string) => {
    if (!staffReplyText.trim()) return;
    const authorName = currentRole === 'admin' ? 'Uma Shukla (Director)' : 'Faculty Mentor';
    replyToDoubtNote(doubtId, staffReplyText.trim(), authorName);
    setStaffReplyText('');
    setReplyingDoubtId(null);
  };

  // Filter messages for current student vs staff view
  const visibleDoubts = currentRole === 'student'
    ? doubts.filter(d => !d.studentId || d.studentId === user.id || d.studentMobile === user.mobileNumber)
    : doubts;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              Student Guidance & Helpdesk
            </span>
            <span className="text-xs text-slate-400">Direct Communication with Faculty & Director</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Messages & Academic Doubts Desk
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
            Send direct questions, syllabus inquiries, or attach photos of notebook exercises to <strong>Director Uma Shukla</strong> or designated faculty mentors. Every message receives personalized guidance.
          </p>
        </div>

        {currentRole === 'student' && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Close Form' : 'Send New Message / Doubt'}</span>
          </button>
        )}
      </div>

      {/* Add Doubt Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border-2 border-indigo-200 p-6 sm:p-7 shadow-md space-y-5 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <span>Compose Message to Educator</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 1. Recipient Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Send Message To:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRecipientRole('admin')}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center space-x-3 ${
                  recipientRole === 'admin'
                    ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-400/30'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 font-black flex items-center justify-center text-sm">
                  US
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Director Uma Shukla (Admin)</div>
                  <div className="text-[10px] text-slate-500">Academic Director & Senior Mentor</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRecipientRole('faculty')}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center space-x-3 ${
                  recipientRole === 'faculty'
                    ? 'border-purple-500 bg-purple-50/70 text-purple-950 ring-2 ring-purple-400/30'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-700 font-black flex items-center justify-center text-sm">
                  FC
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Subject Faculty Mentor</div>
                  <div className="text-[10px] text-slate-500">Physics, Maths, Biology, Accounts</div>
                </div>
              </button>
            </div>
          </div>

          {recipientRole === 'faculty' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Select Faculty Mentor:
              </label>
              <select
                value={selectedFacultyId}
                onChange={e => setSelectedFacultyId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium bg-white text-slate-800"
              >
                {facultyMembers.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {m.designation}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 2. Subject & Chapter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Subject:
              </label>
              <select
                value={selectedSubjectId}
                onChange={e => setSelectedSubjectId(e.target.value as SubjectId)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium bg-white text-slate-800"
              >
                {ICSE_SUBJECTS.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Specific Chapter / Topic:
              </label>
              <input
                type="text"
                value={topicInput}
                onChange={e => setTopicInput(e.target.value)}
                placeholder="e.g. Chapter 3 Exercise 3.2 Q5 or Ray Diagram"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* 3. Detailed Query / Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Your Message or Doubt in Detail: <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={noteInput}
              onChange={e => setNoteInput(e.target.value)}
              placeholder="Explain where you got stuck, the exact step you need clarification on, or feedback for ma'am..."
              className="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-xs sm:text-sm text-slate-800 font-medium leading-relaxed"
            />
          </div>

          {/* 4. Photo / Document Attachment */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Attach Photo of Notebook / Question (Optional):
            </label>

            {attachedImage ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200">
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={attachedImage.dataUrl}
                    alt="Attached preview"
                    className="w-12 h-12 object-cover rounded-xl border border-indigo-200 shrink-0 cursor-pointer"
                    onClick={() => setPreviewModalImg({ title: attachedImage.name, url: attachedImage.dataUrl })}
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">{attachedImage.name}</div>
                    <div className="text-[10px] text-indigo-600 font-medium">Click thumbnail to preview</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAttachedImage(null)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-100 transition-colors"
                  title="Remove attachment"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50/60 hover:bg-indigo-50/30 cursor-pointer transition-all">
                <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs mb-1">
                  <Camera className="w-4 h-4" />
                  <span>Take Photo or Upload Image from Device</span>
                </div>
                <p className="text-[11px] text-slate-400">Supports JPG, PNG photos of handwritten steps up to 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Send Message to Educator</span>
            </button>
          </div>
        </form>
      )}

      {/* Messages & Doubts Feed */}
      <div className="space-y-4">
        {visibleDoubts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 space-y-2">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No Messages or Doubts Sent Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Got a confusing math step or biology concept? Click "Send New Message / Doubt" to get personalized assistance.
            </p>
          </div>
        ) : (
          visibleDoubts.map(item => {
            const isResolved = item.status === 'resolved';
            const isReplying = replyingDoubtId === item.id;

            return (
              <div
                key={item.id}
                className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-4 ${
                  isResolved
                    ? 'bg-white border-slate-200'
                    : 'bg-indigo-50/20 border-indigo-200 ring-2 ring-indigo-500/10'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
                      {item.recipientName || 'Director Uma Shukla'}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-xl">
                      {item.questionOrTopic}
                    </span>
                    {item.studentName && (
                      <span className="text-[11px] text-slate-500 flex items-center space-x-1.5">
                        <span>From: <strong className="text-slate-800">{item.studentName}</strong></span>
                        {item.studentMobile && (
                          <a
                            href={`tel:${item.studentMobile}`}
                            className="inline-flex items-center space-x-0.5 px-2 py-0.2 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-bold"
                            title="Call student"
                          >
                            <Phone className="w-2.5 h-2.5 text-emerald-600" />
                            <span>{item.studentMobile}</span>
                          </a>
                        )}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 self-start sm:self-auto">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-xl flex items-center gap-1 ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {isResolved ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Clarified & Replied</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Under Review</span>
                        </>
                      )}
                    </span>

                    {currentRole !== 'student' && (
                      <button
                        onClick={() => toggleDoubtStatus(item.id)}
                        className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1 bg-slate-100 rounded-lg"
                      >
                        {isResolved ? 'Mark Pending' : 'Mark Done'}
                      </button>
                    )}

                    <button
                      onClick={() => deleteDoubtNote(item.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="text-sm text-slate-800 leading-relaxed font-medium">
                  {item.noteText}
                </div>

                {/* Attached Photo Preview if any */}
                {item.attachmentUrl && (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-3 w-fit">
                    <img
                      src={item.attachmentUrl}
                      alt="Student attachment"
                      className="w-16 h-16 object-cover rounded-xl border border-slate-300 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setPreviewModalImg({ title: item.attachmentName || 'Student Notebook Photo', url: item.attachmentUrl! })}
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {item.attachmentName || 'Student Attached Notebook Image'}
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewModalImg({ title: item.attachmentName || 'Student Notebook Photo', url: item.attachmentUrl! })}
                        className="text-[11px] text-indigo-600 font-bold hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View Full Size Image</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Mentor Reply Box */}
                {item.mentorReply && (
                  <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between font-bold text-amber-900">
                      <div className="flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600 fill-amber-600" />
                        <span>Official Reply from {item.repliedBy || 'Director Uma Shukla'}:</span>
                      </div>
                      {item.repliedAt && (
                        <span className="text-[10px] text-amber-700/80 font-normal">
                          {new Date(item.repliedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <p className="leading-relaxed text-slate-800 font-serif italic text-sm">
                      "{item.mentorReply}"
                    </p>
                  </div>
                )}

                {/* Staff Reply Action (for admin / faculty) */}
                {currentRole !== 'student' && !isReplying && (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setReplyingDoubtId(item.id);
                        setStaffReplyText(item.mentorReply || '');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition-colors flex items-center space-x-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{item.mentorReply ? 'Edit Reply to Student' : 'Write Reply to Student'}</span>
                    </button>
                  </div>
                )}

                {isReplying && (
                  <div className="p-4 rounded-2xl bg-white border border-indigo-300 space-y-3 pt-3 shadow-xs">
                    <div className="text-xs font-bold text-slate-800">
                      Reply as {currentRole === 'admin' ? 'Uma Shukla (Director)' : 'Faculty Mentor'}:
                    </div>
                    <textarea
                      rows={3}
                      value={staffReplyText}
                      onChange={e => setStaffReplyText(e.target.value)}
                      placeholder="Write your explanation, formula correction, or encouraging advice here..."
                      className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setReplyingDoubtId(null)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleStaffReplySubmit(item.id)}
                        className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-xs"
                      >
                        Send Reply to Student
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Full-Screen Image Zoom Modal */}
      {previewModalImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-bold">{previewModalImg.title}</span>
              <button
                onClick={() => setPreviewModalImg(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto flex items-center justify-center bg-slate-100 max-h-[80vh]">
              <img
                src={previewModalImg.url}
                alt="Enlarged notebook attachment"
                className="max-h-[75vh] object-contain rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
