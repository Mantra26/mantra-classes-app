import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EducationBoard, GradeLevel, UserProfile } from '../../types';
import { DEMO_STUDENT } from '../../data/defaultUser';
import {
  GraduationCap,
  Phone,
  User,
  School,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  BookOpen
} from 'lucide-react';

export const StudentAuthModal: React.FC = () => {
  const { user, loginStudent, activeBoard, setActiveBoard, activeGrade, setActiveGrade } = useApp();

  // If already logged in, do not render modal
  if (user?.isLoggedIn && user?.mobileNumber) return null;

  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [fullName, setFullName] = useState(user.name || '');
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber || '');
  const [schoolName, setSchoolName] = useState(user.schoolName || "St. Xavier's High School");
  const [selectedBoard, setSelectedBoard] = useState<EducationBoard>(activeBoard || 'ICSE');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(activeGrade || '7');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('1234');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    // Generate simulated 4-digit OTP
    const mockOtp = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(mockOtp);
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.trim() !== generatedOtp && otpInput.trim() !== '1234') {
      setErrorMsg('Invalid OTP. Please enter the 4-digit code shown on screen.');
      return;
    }

    const studentProfile: Partial<UserProfile> = {
      id: `stu-${mobileNumber.slice(-4) || Date.now()}`,
      name: fullName.trim(),
      mobileNumber: mobileNumber.replace(/\D/g, ''),
      grade: selectedGrade === '11' || selectedGrade === '12'
        ? `Class ${selectedGrade} Commerce (${selectedBoard})`
        : `Grade ${selectedGrade} (${selectedBoard})`,
      gradeLevel: selectedGrade,
      board: selectedBoard,
      schoolName: schoolName.trim() || 'Mantra Classes Student',
      isLoggedIn: true,
      streakDays: user.streakDays || 1,
      coins: user.coins || 100,
      joinedAt: new Date().toISOString()
    };

    setActiveBoard(selectedBoard);
    setActiveGrade(selectedGrade);
    loginStudent(studentProfile as UserProfile);
  };

  const handleQuickDemoLogin = () => {
    setActiveBoard(DEMO_STUDENT.board || 'ICSE');
    setActiveGrade(DEMO_STUDENT.gradeLevel || '7');
    loginStudent(DEMO_STUDENT);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-300/30 flex items-center justify-center shadow-inner">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                Mantra Classes • Director Uma Shukla
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Student Portal Login</h2>
            </div>
          </div>

          <p className="text-xs text-indigo-100 max-w-md leading-relaxed">
            Personalized ICSE & CBSE learning desk. Enter your mobile number to access interactive chapters, faculty-reviewed tests, and doubt clearing.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold animate-shake">
              {errorMsg}
            </div>
          )}

          {step === 'details' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Student Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  10-Digit Mobile Number (Login ID) <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3.5 rounded-l-2xl border border-r-0 border-slate-300 bg-slate-50 text-slate-600 text-xs font-bold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobileNumber}
                    onChange={e => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-3.5 pr-4 py-3 rounded-r-2xl border border-slate-300 text-sm font-mono font-bold focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-slate-900"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Your registered mobile number will be your permanent Student ID.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Education Board
                  </label>
                  <select
                    value={selectedBoard}
                    onChange={e => setSelectedBoard(e.target.value as EducationBoard)}
                    className="w-full px-3.5 py-3 rounded-2xl border border-slate-300 text-xs sm:text-sm font-bold bg-white text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    <option value="ICSE">ICSE Board (CISCE)</option>
                    <option value="CBSE">CBSE Board (NCERT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Class / Grade
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={e => setSelectedGrade(e.target.value as GradeLevel)}
                    className="w-full px-3.5 py-3 rounded-2xl border border-slate-300 text-xs sm:text-sm font-bold bg-white text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    <optgroup label="Senior Secondary (Commerce)">
                      <option value="12">Class 12 Commerce</option>
                      <option value="11">Class 11 Commerce</option>
                    </optgroup>
                    <optgroup label="Middle School">
                      <option value="7">Grade 7</option>
                      <option value="6">Grade 6</option>
                    </optgroup>
                    <optgroup label="Primary School">
                      <option value="5">Grade 5</option>
                      <option value="4">Grade 4</option>
                      <option value="3">Grade 3</option>
                      <option value="2">Grade 2</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  School Name (Optional)
                </label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={schoolName}
                    onChange={e => setSchoolName(e.target.value)}
                    placeholder="e.g. St. Xavier's Boys' Academy"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm font-medium focus:outline-none focus:border-indigo-600 transition-all text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Continue & Verify Mobile OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                <div className="flex items-center space-x-2 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Simulated OTP Code</span>
                </div>
                <div className="text-xs text-amber-800">
                  Verification code sent to <strong>+91 {mobileNumber}</strong>:
                </div>
                <div className="text-2xl font-black font-mono tracking-widest text-indigo-700 pt-1">
                  {generatedOtp}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Enter 4-Digit Verification Code:
                </label>
                <input
                  type="text"
                  maxLength={4}
                  autoFocus
                  value={otpInput}
                  onChange={e => setOtpInput(e.target.value)}
                  placeholder="Enter 4-digit code"
                  className="w-full text-center tracking-widest text-2xl font-mono font-black py-3 rounded-2xl border-2 border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 text-slate-900"
                />
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setOtpInput(generatedOtp)}
                  className="w-1/2 py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition-colors"
                >
                  ⚡ Auto-Fill OTP ({generatedOtp})
                </button>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-1/2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  Edit Mobile Number
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-98 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Verify & Enter Student Portal</span>
              </button>
            </form>
          )}

          {/* Quick Demo Login Option */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-bold text-xs border border-slate-200 transition-colors flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Instant Demo Student Access (Aarav Sharma • +91 9876543210)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
