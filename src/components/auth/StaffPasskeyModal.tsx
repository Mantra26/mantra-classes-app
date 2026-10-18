import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  ShieldAlert,
  Lock,
  KeyRound,
  CheckCircle2,
  X,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const StaffPasskeyModal: React.FC = () => {
  const { isStaffModalOpen, setIsStaffModalOpen, verifyStaffPinAndSwitch, facultyMembers, setActiveFacultyId } = useApp();

  if (!isStaffModalOpen) return null;

  const [selectedRole, setSelectedRole] = useState<'admin' | 'faculty'>('admin');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>(facultyMembers[0]?.id || 'fac-1');
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (selectedRole === 'faculty') {
      setActiveFacultyId(selectedFacultyId);
    }

    const success = verifyStaffPinAndSwitch(selectedRole, pin);
    if (!success) {
      setErrorMsg(
        selectedRole === 'admin'
          ? 'Invalid Director Admin PIN. (Default Director PIN: 8707)'
          : 'Invalid Faculty Authorization PIN. (Default Faculty PIN: 1234)'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                Restricted Access
              </div>
              <h3 className="text-base font-bold text-white">Faculty & Admin Passkey</h3>
            </div>
          </div>

          <button
            onClick={() => {
              setIsStaffModalOpen(false);
              setPin('');
              setErrorMsg('');
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            Students are strictly restricted to the Student Portal. Authorized educators and mentors must enter their secure PIN to unlock the educator workspace.
          </p>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Select Staff Role:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('admin');
                  setErrorMsg('');
                }}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedRole === 'admin'
                    ? 'border-amber-500 bg-amber-50/80 text-amber-950 ring-2 ring-amber-400/30 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                }`}
              >
                <div className="text-xs font-bold">👩‍🏫 Director (Admin)</div>
                <div className="text-[10px] text-slate-500">Uma Shukla</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('faculty');
                  setErrorMsg('');
                }}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedRole === 'faculty'
                    ? 'border-purple-500 bg-purple-50/80 text-purple-950 ring-2 ring-purple-400/30 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                }`}
              >
                <div className="text-xs font-bold">🧑‍🏫 Faculty Mentor</div>
                <div className="text-[10px] text-slate-500">Subject Teachers</div>
              </button>
            </div>
          </div>

          {selectedRole === 'faculty' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Select Faculty Member:
              </label>
              <select
                value={selectedFacultyId}
                onChange={e => setSelectedFacultyId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium bg-white text-slate-800"
              >
                {facultyMembers.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.designation.split('-')[1]?.trim() || m.designation})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Enter Authorization PIN:
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                autoFocus
                maxLength={8}
                value={pin}
                onChange={e => setPin(e.target.value)}
                placeholder={selectedRole === 'admin' ? 'Enter Admin PIN (8707)' : 'Enter Faculty PIN (1234)'}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 font-mono tracking-widest text-base font-bold focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 text-slate-900"
              />
            </div>
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
              <span>{selectedRole === 'admin' ? 'Default Admin PIN: 8707' : 'Default Faculty PIN: 1234'}</span>
              <button
                type="button"
                onClick={() => setPin(selectedRole === 'admin' ? '8707' : '1234')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Quick-Fill
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsStaffModalOpen(false);
                setPin('');
                setErrorMsg('');
              }}
              className="w-1/3 py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-2/3 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Unlock Staff Workspace</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
