import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { storage } from '../../services/storage';
import { otpService } from '../../services/otpService';
import { validateIndianMobile } from '../../utils/mobileValidator';
import { EducationBoard, GradeLevel, UserProfile } from '../../types';
import {
  GraduationCap,
  User,
  School,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lock,
  KeyRound,
  X,
  Smartphone,
  MessageCircle,
  RefreshCw,
  Timer,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const StudentAuthModal: React.FC = () => {
  const {
    user,
    loginStudent,
    activeBoard,
    setActiveBoard,
    activeGrade,
    setActiveGrade,
    registeredStudents,
    isStaffModalOpen,
    setIsStaffModalOpen,
    currentRole,
    verifyStaffPinAndSwitch,
    facultyMembers,
    setActiveFacultyId,
    adminPin,
    facultyPin
  } = useApp();

  // Role tab state for the unified login gateway: 'student' | 'faculty' | 'admin'
  const [activePortalTab, setActivePortalTab] = useState<'student' | 'faculty' | 'admin'>('student');

  // Student form state
  const [studentStep, setStudentStep] = useState<'details' | 'otp'>('details');
  const [fullName, setFullName] = useState(user?.name || '');
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || '');
  const [schoolName, setSchoolName] = useState(user?.schoolName || "St. Xavier's High School");
  const [selectedBoard, setSelectedBoard] = useState<EducationBoard>(activeBoard || 'ICSE');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(activeGrade || '7');
  const [otpInput, setOtpInput] = useState('');
  const [studentError, setStudentError] = useState('');

  // Real Mobile OTP delivery state
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [smsUrl, setSmsUrl] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [expiryCountdown, setExpiryCountdown] = useState(0);
  const [isDispatching, setIsDispatching] = useState(false);
  const [otpNotice, setOtpNotice] = useState('');
  const [showOfflineBypass, setShowOfflineBypass] = useState(false);
  const [offlineBypassPin, setOfflineBypassPin] = useState('');

  // Staff form state
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>(facultyMembers[0]?.id || 'fac-1');
  const [staffPin, setStaffPin] = useState('');
  const [staffError, setStaffError] = useState('');

  // OTP Countdown timer
  useEffect(() => {
    let timer: any;
    if (studentStep === 'otp') {
      timer = setInterval(() => {
        setResendCooldown(prev => (prev > 0 ? prev - 1 : 0));
        setExpiryCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [studentStep]);

  // If user opens staff modal explicitly from inside the app, default to admin or faculty tab
  useEffect(() => {
    if (isStaffModalOpen) {
      setActivePortalTab('admin');
      setStaffPin('');
      setStaffError('');
    }
  }, [isStaffModalOpen]);

  const isStaffLoggedIn = currentRole === 'admin' || currentRole === 'faculty';
  const isStudentLoggedIn = !!(user?.isLoggedIn && user?.mobileNumber);

  // If already logged in AND staff modal was not explicitly triggered, do not render
  if (!isStaffModalOpen && (isStaffLoggedIn || isStudentLoggedIn)) {
    return null;
  }

  // Real-time strict Indian mobile validation
  const mobileValidation = useMemo(() => {
    return validateIndianMobile(mobileNumber);
  }, [mobileNumber]);

  // Check if mobile number belongs to an already registered student
  const existingStudentRecord = useMemo(() => {
    if (!mobileValidation.isValid) return null;
    return registeredStudents.find(s => s.mobileNumber === mobileValidation.cleanMobile);
  }, [mobileValidation, registeredStudents]);

  // Check persistent device-level demo test status
  const deviceDemoInfo = useMemo(() => {
    return storage.getDeviceDemoInfo();
  }, []);

  // When returning student enters mobile number, auto-populate verified details
  useEffect(() => {
    if (existingStudentRecord) {
      setFullName(existingStudentRecord.name);
      if (existingStudentRecord.schoolName) {
        setSchoolName(existingStudentRecord.schoolName);
      }
      if (existingStudentRecord.board) {
        setSelectedBoard(existingStudentRecord.board);
      }
      if (existingStudentRecord.gradeLevel) {
        setSelectedGrade(existingStudentRecord.gradeLevel);
      }
    }
  }, [existingStudentRecord]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError('');

    if (!fullName.trim() || fullName.trim().length < 3) {
      setStudentError('Please enter your full real name (at least 3 characters).');
      return;
    }

    if (!mobileValidation.isValid) {
      setStudentError(mobileValidation.message || 'Please enter a genuine, functional 10-digit Indian mobile number.');
      return;
    }

    setIsDispatching(true);
    try {
      const res = await otpService.sendOtp(mobileValidation.cleanMobile, fullName);
      setWhatsappUrl(res.whatsappUrl);
      setSmsUrl(res.smsUrl);
      setResendCooldown(30);
      setExpiryCountdown(300);
      setOtpInput('');
      setOtpNotice(res.message);
      setStudentStep('otp');
    } catch {
      setStudentError('Unable to dispatch OTP. Please check your internet connection.');
    } finally {
      setIsDispatching(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isDispatching) return;
    setStudentError('');
    setIsDispatching(true);
    try {
      const res = await otpService.sendOtp(mobileValidation.cleanMobile, fullName);
      if (res.success) {
        setWhatsappUrl(res.whatsappUrl);
        setSmsUrl(res.smsUrl);
        setResendCooldown(30);
        setExpiryCountdown(300);
        setOtpNotice('New verification code dispatched to your phone!');
      } else {
        setStudentError(res.message);
      }
    } catch {
      setStudentError('Failed to resend OTP. Please try again.');
    } finally {
      setIsDispatching(false);
    }
  };

  const completeStudentLogin = () => {
    const cleanMobile = mobileValidation.cleanMobile;
    const isMobileUsed = storage.isMobileDemoUsed(cleanMobile) || !!existingStudentRecord?.demoMockTestTaken;
    const isDeviceUsed = storage.isDeviceDemoUsed();
    const demoAlreadyTaken = isMobileUsed || isDeviceUsed;

    const studentProfile: Partial<UserProfile> = {
      ...(existingStudentRecord || {}),
      id: existingStudentRecord?.id || `stu-${cleanMobile.slice(-4) || Date.now()}`,
      name: (existingStudentRecord?.name || fullName).trim(),
      mobileNumber: cleanMobile,
      grade: selectedGrade === '11' || selectedGrade === '12'
        ? `Class ${selectedGrade} Commerce (${selectedBoard})`
        : `Grade ${selectedGrade} (${selectedBoard})`,
      gradeLevel: selectedGrade,
      board: selectedBoard,
      schoolName: (existingStudentRecord?.schoolName || schoolName).trim() || 'Mantra Classes Student',
      isLoggedIn: true,
      demoMockTestTaken: demoAlreadyTaken,
      isProMember: existingStudentRecord?.isProMember || false,
      paymentStatus: existingStudentRecord?.paymentStatus || 'none',
      streakDays: existingStudentRecord?.streakDays || 1,
      coins: existingStudentRecord?.coins || 50,
      totalTestsTaken: existingStudentRecord?.totalTestsTaken || 0,
      averageScorePercentage: existingStudentRecord?.averageScorePercentage || 0,
      joinedAt: existingStudentRecord?.joinedAt || new Date().toISOString()
    };

    setActiveBoard(selectedBoard);
    setActiveGrade(selectedGrade);
    loginStudent(studentProfile as UserProfile);
    setIsStaffModalOpen(false);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError('');

    if (!otpInput.trim()) {
      setStudentError('Please enter the 6-digit verification code received on your mobile phone.');
      return;
    }

    const verification = otpService.verifyOtp(mobileValidation.cleanMobile, otpInput, {
      validAdminPin: adminPin,
      validFacultyPin: facultyPin
    });

    if (!verification.success) {
      setStudentError(verification.message);
      return;
    }

    completeStudentLogin();
  };

  const handleOfflineBypassVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError('');

    if (!offlineBypassPin.trim()) {
      setStudentError('Please enter the Director or Faculty authorization PIN.');
      return;
    }

    const verification = otpService.verifyOtp(mobileValidation.cleanMobile, '', {
      adminBypassPin: offlineBypassPin,
      validAdminPin: adminPin,
      validFacultyPin: facultyPin
    });

    if (!verification.success) {
      setStudentError(verification.message);
      return;
    }

    completeStudentLogin();
  };

  const handleStaffLogin = (roleToVerify: 'admin' | 'faculty') => {
    setStaffError('');
    if (!staffPin.trim()) {
      setStaffError('Please enter your authorization PIN.');
      return;
    }

    if (roleToVerify === 'faculty') {
      setActiveFacultyId(selectedFacultyId);
    }

    const success = verifyStaffPinAndSwitch(roleToVerify, staffPin);
    if (!success) {
      setStaffError(`Incorrect ${roleToVerify === 'admin' ? 'Director' : 'Faculty'} Authorization PIN. Access denied.`);
    } else {
      setStaffPin('');
      setIsStaffModalOpen(false);
    }
  };

  const hasDemoBeenUsed = !!(
    existingStudentRecord?.demoMockTestTaken ||
    storage.isMobileDemoUsed(mobileValidation.cleanMobile) ||
    deviceDemoInfo.used
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                  Mantra Classes • Director Uma Shukla
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">Mantra Portal Gateway</h2>
              </div>
            </div>

            {/* Close button only if already authenticated session exists */}
            {isStaffModalOpen && (isStaffLoggedIn || isStudentLoggedIn) && (
              <button
                onClick={() => setIsStaffModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <p className="text-xs text-indigo-200 mt-2.5 leading-relaxed">
            Select your role to access your dedicated workspace, tests, and academic tools.
          </p>

          {/* Role Navigation Tabs */}
          <div className="grid grid-cols-3 gap-1.5 mt-4 p-1 rounded-2xl bg-slate-950/60 border border-indigo-900/60 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActivePortalTab('student');
                setStudentError('');
              }}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                activePortalTab === 'student'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-indigo-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🎓 Student</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActivePortalTab('faculty');
                setStaffError('');
                setStaffPin('');
              }}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                activePortalTab === 'faculty'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-indigo-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🧑‍🏫 Faculty</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActivePortalTab('admin');
                setStaffError('');
                setStaffPin('');
              }}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                activePortalTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-indigo-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>👩‍🏫 Director</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* ================= 1. STUDENT PORTAL TAB ================= */}
          {activePortalTab === 'student' && (
            <div className="space-y-4">
              {studentError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center space-x-2 animate-shake">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{studentError}</span>
                </div>
              )}

              {studentStep === 'details' ? (
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
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                        10-Digit Mobile Number (Login ID) <span className="text-rose-500">*</span>
                      </label>
                      {mobileNumber && (
                        <span
                          className={`text-[11px] font-bold ${
                            mobileValidation.isValid
                              ? 'text-emerald-600'
                              : mobileValidation.status === 'invalid_start' ||
                                mobileValidation.status === 'dummy_number'
                              ? 'text-rose-600'
                              : 'text-slate-400'
                          }`}
                        >
                          {mobileValidation.message}
                        </span>
                      )}
                    </div>

                    <div className="relative flex">
                      <span className="inline-flex items-center px-3.5 rounded-l-2xl border border-r-0 border-slate-300 bg-slate-50 text-slate-700 text-xs font-black">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={mobileNumber}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setMobileNumber(val);
                          setStudentError('');
                        }}
                        placeholder="9812345678"
                        className={`w-full pl-3.5 pr-10 py-3 rounded-r-2xl border text-sm font-mono font-bold focus:outline-none transition-all text-slate-900 ${
                          mobileValidation.isValid
                            ? 'border-emerald-500 bg-emerald-50/20 ring-2 ring-emerald-400/20'
                            : mobileValidation.status === 'invalid_start' ||
                              mobileValidation.status === 'dummy_number'
                            ? 'border-rose-400 bg-rose-50/30 ring-2 ring-rose-400/20'
                            : 'border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100'
                        }`}
                      />
                      <div className="absolute right-3 top-3.5 flex items-center pointer-events-none">
                        {mobileValidation.isValid ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-in zoom-in-75 duration-150" />
                        ) : mobileValidation.status === 'invalid_start' ||
                          mobileValidation.status === 'dummy_number' ? (
                          <AlertTriangle className="w-5 h-5 text-rose-500" />
                        ) : null}
                      </div>
                    </div>

                    {/* Real-time Validation & Restriction Warnings */}
                    {mobileValidation.status === 'invalid_start' && (
                      <p className="text-[11px] text-rose-600 font-bold mt-1.5 flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Indian mobile numbers must begin with 6, 7, 8, or 9.</span>
                      </p>
                    )}
                    {mobileValidation.status === 'dummy_number' && (
                      <p className="text-[11px] text-rose-600 font-bold mt-1.5 flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>{mobileValidation.message}</span>
                      </p>
                    )}

                    {/* Returning Scholar Auto-Detection */}
                    {existingStudentRecord && (
                      <div className="mt-2 p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 font-semibold flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>
                          Registered Scholar Recognized: <b>{existingStudentRecord.name}</b> ({existingStudentRecord.grade || `Grade ${existingStudentRecord.gradeLevel}`})
                        </span>
                      </div>
                    )}

                    {/* Device-Level Trial Protection Banner */}
                    {!existingStudentRecord && deviceDemoInfo.used && mobileValidation.isValid && (
                      <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 font-semibold flex items-start space-x-2">
                        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span>
                            Notice: 1 Free Demo Test has already been redeemed on this browser. Additional tests require Director Uma Shukla's module authorization.
                          </span>
                        </div>
                      </div>
                    )}
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
                        <option value="IGCSE">Cambridge IGCSE</option>
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
                    disabled={!mobileValidation.isValid || fullName.trim().length < 3}
                    className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Continue & Verify Mobile OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  {/* Real Mobile Dispatch Information Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-indigo-50 border border-emerald-300 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-black uppercase tracking-wider text-emerald-950 flex items-center space-x-1.5">
                            <span>Mobile OTP Dispatched</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          </div>
                          <div className="text-xs text-slate-700 font-semibold">
                            Sent to registered phone: <strong className="font-mono text-emerald-900">+91 ••••••{mobileValidation.cleanMobile.slice(-4)}</strong>
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                        Secure SMS
                      </span>
                    </div>

                    {otpNotice && (
                      <div className="text-[11px] text-emerald-800 font-medium bg-emerald-100/60 p-2 rounded-xl">
                        {otpNotice}
                      </div>
                    )}

                    {/* Direct Mobile Retrieval Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Receive via WhatsApp</span>
                      </a>

                      <a
                        href={smsUrl}
                        className="py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-95"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Open Native SMS App</span>
                      </a>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-tight">
                      Please check the message received on your mobile device and enter the 6-digit code below.
                    </p>
                  </div>

                  {/* 6-Digit OTP Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Enter 6-Digit Mobile Verification Code <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] font-bold text-indigo-700 flex items-center space-x-1">
                        <Timer className="w-3.5 h-3.5" />
                        <span>Expires in {Math.floor(expiryCountdown / 60)}:{(expiryCountdown % 60).toString().padStart(2, '0')}</span>
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        autoFocus
                        value={otpInput}
                        onChange={e => {
                          setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                          setStudentError('');
                        }}
                        placeholder="• • • • • •"
                        className="w-full text-center tracking-[0.4em] text-2xl font-mono font-black py-3.5 rounded-2xl border-2 border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 text-slate-900 bg-indigo-50/20 placeholder:tracking-normal placeholder:font-normal placeholder:text-sm placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Action Controls: Resend & Edit Number */}
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      disabled={resendCooldown > 0 || isDispatching}
                      onClick={handleResendOtp}
                      className="w-1/2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isDispatching ? 'animate-spin' : ''}`} />
                      <span>{resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : 'Resend Code'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStudentStep('details');
                        setStudentError('');
                      }}
                      className="w-1/2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                    >
                      Change Phone Number
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={otpInput.trim().length < 4}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Verify Code & Enter Student Portal</span>
                  </button>

                  {/* Collapsible Classroom / Educator Offline Bypass */}
                  <div className="pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setShowOfflineBypass(!showOfflineBypass)}
                      className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors py-1"
                    >
                      <span className="flex items-center space-x-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Director / Educator Classroom Offline Bypass</span>
                      </span>
                      {showOfflineBypass ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showOfflineBypass && (
                      <div className="mt-2 p-3 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-2 text-xs animate-fadeIn">
                        <p className="text-amber-950 leading-relaxed font-medium">
                          For classroom projector lectures when mobile connectivity is unavailable: Enter Director Uma Shukla or Faculty authorization PIN.
                        </p>
                        <div className="flex space-x-2">
                          <input
                            type="password"
                            maxLength={8}
                            value={offlineBypassPin}
                            onChange={e => {
                              setOfflineBypassPin(e.target.value);
                              setStudentError('');
                            }}
                            placeholder="Enter Authorization PIN"
                            className="flex-1 px-3 py-2 rounded-xl border border-amber-300 font-mono font-bold text-sm bg-white text-slate-900 focus:outline-none focus:border-amber-500"
                          />
                          <button
                            type="button"
                            onClick={handleOfflineBypassVerify}
                            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shrink-0 transition-colors shadow-sm"
                          >
                            Authorize
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              )}

              {/* Trial Benefit / Restriction Status Highlight */}
              <div
                className={`pt-3 border-t border-slate-100 flex items-center justify-center space-x-2 text-xs p-2.5 rounded-2xl border ${
                  hasDemoBeenUsed
                    ? 'bg-slate-50 border-slate-200 text-slate-600'
                    : 'bg-amber-50/70 border-amber-200 text-amber-950 font-semibold'
                }`}
              >
                {hasDemoBeenUsed ? (
                  <>
                    <Info className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>
                      1 Free Demo Mock Test completed. Additional tests require module activation.
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>
                      Includes <strong>1 Free Demo Mock Test</strong> upon mobile login!
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ================= 2. FACULTY MENTOR TAB ================= */}
          {activePortalTab === 'faculty' && (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleStaffLogin('faculty');
              }}
              className="space-y-4"
            >
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-purple-950 space-y-1">
                <div className="flex items-center space-x-2 font-black text-xs uppercase tracking-wider text-purple-900">
                  <Lock className="w-4 h-4 text-purple-700" />
                  <span>Faculty Mentor Desk</span>
                </div>
                <p className="text-xs text-purple-800 leading-relaxed">
                  Authorized educator portal for setting chapter test papers, grading student subjective answers, and student doubt resolution.
                </p>
              </div>

              {staffError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center space-x-2 animate-shake">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{staffError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Select Faculty Member:
                </label>
                <select
                  value={selectedFacultyId}
                  onChange={e => setSelectedFacultyId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-2xl border border-slate-300 text-xs sm:text-sm font-bold bg-white text-slate-900 focus:outline-none focus:border-purple-600"
                >
                  {facultyMembers.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.designation.split('-')[1]?.trim() || m.designation})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Faculty Authorization PIN:
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    maxLength={8}
                    autoFocus
                    value={staffPin}
                    onChange={e => {
                      setStaffPin(e.target.value);
                      setStaffError('');
                    }}
                    placeholder="Enter Faculty PIN"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 font-mono tracking-widest text-base font-bold focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-600 text-slate-900 placeholder:font-normal placeholder:tracking-normal placeholder:text-sm placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-98 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Unlock Faculty Workspace</span>
              </button>
            </form>
          )}

          {/* ================= 3. DIRECTOR (ADMIN) TAB ================= */}
          {activePortalTab === 'admin' && (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleStaffLogin('admin');
              }}
              className="space-y-4"
            >
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-amber-950 space-y-1">
                <div className="flex items-center space-x-2 font-black text-xs uppercase tracking-wider text-amber-900">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>Executive Admin Desk • Director Uma Shukla</span>
                </div>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  Full administrative control: content editing across all CBSE, ICSE, IGCSE subjects, curriculum unlocked, fee payment verification, and PIN reset rights.
                </p>
              </div>

              {staffError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center space-x-2 animate-shake">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{staffError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Director Authorization PIN:
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    maxLength={8}
                    autoFocus
                    value={staffPin}
                    onChange={e => {
                      setStaffPin(e.target.value);
                      setStaffError('');
                    }}
                    placeholder="Enter Admin PIN"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 font-mono tracking-widest text-base font-bold focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-500 text-slate-900 placeholder:font-normal placeholder:tracking-normal placeholder:text-sm placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-98 text-slate-950 font-black text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Access Director Admin Dashboard</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
