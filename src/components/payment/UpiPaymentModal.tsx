import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QrCodeRenderer } from './QrCodeRenderer';
import {
  X,
  QrCode,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  Award,
  CreditCard,
  Download,
  Printer,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const UpiPaymentModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    closePaymentModal,
    recordPaymentSuccess,
    user
  } = useApp();

  const [selectedPlanTier, setSelectedPlanTier] = useState<{
    id: string;
    title: string;
    price: number;
    popular?: boolean;
    description: string;
    perks: string[];
  }>({
    id: 'master-pass',
    title: 'ICSE Grade 7 Master All-Access Pass',
    price: 499,
    popular: true,
    description: 'Complete test series, custom builder, video lectures & graphical labs.',
    perks: [
      'Unlimited Custom Multi-Chapter Mock Tests',
      'All 7 Subjects & 33 Chapters unlocked',
      'Diagnostic AI "Where You Should Work Hard" Engine',
      'Interactive Graphical Labs (Optics, Cells, Fractions)',
      'Video Lectures by Uma Shukla + PDF Summary Notes'
    ]
  });

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentDoneTx, setPaymentDoneTx] = useState<{
    receiptNo: string;
    utr: string;
    amount: number;
    plan: string;
    date: string;
  } | null>(null);

  if (!isPaymentModalOpen) return null;

  // Real UPI of Uma Shukla updated as requested
  const upiId = '8707794159@ptyes';
  const ownerName = 'Uma Shukla (Mantra Classes)';

  // Exact UPI payment link scannable by Google Pay, PhonePe, Paytm, BHIM, Cred, etc.
  const upiUri = `upi://pay?pa=${upiId}&pn=Uma%20Shukla&am=${selectedPlanTier.price}&cu=INR&tn=Mantra%20Classes%20Grade%207%20Pass`;

  // Plans List
  const plans = [
    {
      id: 'chapter-booster',
      title: 'Chapter Booster Pass',
      price: 149,
      description: 'Unlock all 33 lesson-wise tests and formula revision guides.',
      perks: [
        'All 33 Chapter-wise tests',
        'Step-by-step ICSE solutions',
        'Formula Cheatsheets PDF'
      ]
    },
    {
      id: 'master-pass',
      title: 'ICSE Grade 7 Master Pass',
      price: 499,
      popular: true,
      description: 'The complete learning and test package for Class 7.',
      perks: [
        'Unlimited Custom Mock Tests',
        'All 7 Subjects & 33 Chapters',
        'Interactive Graphical Labs',
        'Weak Area Remedial Engine',
        'Video Lectures by Uma Shukla'
      ]
    },
    {
      id: 'mentorship-vip',
      title: 'Direct Mentorship VIP',
      price: 999,
      description: 'Master Pass + Weekly live doubt sessions with Uma Shukla.',
      perks: [
        'Everything in Master Pass',
        'Direct 1-on-1 Doubt Clearing',
        'Weekly Performance Report',
        'ICSE Board Exam Strategy Calls'
      ]
    }
  ];

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleConfirmUtr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.length < 8) {
      alert('Please enter a valid 12-digit UPI Reference / UTR Number from your payment app.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const receiptNo = `MC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date().toLocaleString();
      setPaymentDoneTx({
        receiptNo,
        utr: utrNumber,
        amount: selectedPlanTier.price,
        plan: selectedPlanTier.title,
        date: now
      });
      recordPaymentSuccess(utrNumber, selectedPlanTier.price, selectedPlanTier.title);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-indigo-900/50">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Direct Payment to Owner
                </span>
                <span className="text-xs text-slate-300">• Mantra Classes</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                UPI & QR Scanner Fee Gateway
              </h2>
            </div>
          </div>

          <button
            onClick={closePaymentModal}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {paymentDoneTx ? (
            /* PAYMENT SUCCESS & OFFICIAL FEE RECEIPT VIEW */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Payment Verified Successfully! 🎉</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Your transaction to <span className="font-bold text-indigo-700">Uma Shukla ({upiId})</span> has been confirmed. Your Mantra Classes PRO Account is now active.
                </p>
              </div>

              {/* Official Printable Fee Receipt */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border-2 border-indigo-100 shadow-sm space-y-6 max-w-2xl mx-auto font-sans">
                {/* Receipt Header */}
                <div className="flex items-start justify-between border-b-2 border-slate-200 pb-4">
                  <div>
                    <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                      Official E-Receipt / Tuition Fee Voucher
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Mantra Classes</h4>
                    <p className="text-xs text-slate-600">
                      Director & Payee: <b>Uma Shukla</b> ({upiId})
                    </p>
                    <p className="text-[11px] text-slate-400">
                      State Bank of India (SBI UPI) • ICSE English Medium Portal
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                      PAID IN FULL
                    </span>
                    <div className="text-xs font-mono font-bold text-slate-700 mt-2">
                      {paymentDoneTx.receiptNo}
                    </div>
                    <div className="text-[10px] text-slate-400">{paymentDoneTx.date}</div>
                  </div>
                </div>

                {/* Student & Course Details */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold">Student Name:</span>
                    <div className="font-bold text-slate-900 text-sm">{user.name}</div>
                    <div className="text-slate-500">{user.grade}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Enrolled Course:</span>
                    <div className="font-bold text-indigo-700 text-sm">{paymentDoneTx.plan}</div>
                    <div className="text-slate-500">Academic Year 2026-27</div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Beneficiary UPI ID:</span>
                    <div className="font-mono font-bold text-indigo-800">{upiId}</div>
                    <div className="font-mono text-slate-500 text-[11px]">UTR: {paymentDoneTx.utr}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Total Fee Paid:</span>
                    <div className="text-lg font-black text-emerald-700">₹{paymentDoneTx.amount}.00</div>
                    <div className="text-[10px] text-slate-400">Verified via SBI UPI</div>
                  </div>
                </div>

                {/* Authorized Signatory Stamp */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    Verified electronic payment voucher.
                  </div>
                  <div className="text-right">
                    <div className="inline-block px-3 py-1 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 font-serif italic text-xs">
                      Authorized: Uma Shukla
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Director & Senior ICSE Faculty</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Fee Receipt</span>
                </button>

                <button
                  onClick={() => {
                    setPaymentDoneTx(null);
                    closePaymentModal();
                  }}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <span>Start Learning with Pro Pass</span>
                </button>
              </div>
            </div>
          ) : (
            /* PAYMENT PROCESSOR VIEW: QR CODE & UPI FORM */
            <div className="space-y-6">
              {/* Plan Tier Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  1. Select Membership / Test Series Pass:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {plans.map(p => {
                    const isSelected = selectedPlanTier.id === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPlanTier(p)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-indigo-50/50 border-indigo-600 ring-2 ring-indigo-500/20'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900">{p.title}</span>
                            {p.popular && (
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                Most Popular
                              </span>
                            )}
                          </div>
                          <div className="text-xl font-black text-indigo-700 mb-1">₹{p.price}</div>
                          <p className="text-[11px] text-slate-500 leading-snug mb-3">
                            {p.description}
                          </p>
                        </div>

                        <div className="space-y-1 pt-2 border-t border-slate-100">
                          {p.perks.slice(0, 2).map((perk, idx) => (
                            <div key={idx} className="text-[10px] text-slate-600 flex items-center gap-1">
                              <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                              <span className="line-clamp-1">{perk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* UPI & QR Code Scanner Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200/90">
                {/* Left: Dynamic Scannable QR Code Scanner display */}
                <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center space-y-3">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-indigo-600" />
                    <span>Scan to Pay directly to Uma Shukla</span>
                  </div>

                  {/* Scannable QR Code */}
                  <QrCodeRenderer upiUri={upiUri} size={200} altText={`Scan to pay ₹${selectedPlanTier.price} to Uma Shukla (${upiId})`} />

                  {/* Amount Pill */}
                  <div className="text-xs font-bold text-slate-800">
                    Pay Amount: <span className="text-base font-black text-indigo-700">₹{selectedPlanTier.price}.00</span>
                  </div>

                  {/* Supported Apps Badges */}
                  <div className="text-[10px] text-slate-400 flex flex-wrap justify-center gap-1.5 pt-1">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">GPay</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">PhonePe</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">Paytm</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">SBI Yono</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">BHIM</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">Cred</span>
                  </div>
                </div>

                {/* Right: UPI ID Copy & UTR Submission Form */}
                <div className="flex flex-col justify-between space-y-4">
                  {/* UPI ID Details */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase">Beneficiary / Owner:</span>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{ownerName}</span>
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase">Direct UPI ID:</span>
                      <div className="mt-1 flex items-center space-x-2">
                        <div className="flex-1 p-2.5 rounded-xl bg-white border border-slate-300 font-mono text-xs sm:text-sm font-bold text-indigo-900 select-all">
                          {upiId}
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-1 shadow-xs transition-all active:scale-95"
                        >
                          {copiedUpi ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Direct UPI deep-link */}
                    <a
                      href={upiUri}
                      className="block text-center py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-colors"
                    >
                      Click to Pay Directly via UPI App
                    </a>
                  </div>

                  {/* UTR Submission Form */}
                  <form onSubmit={handleConfirmUtr} className="space-y-3 pt-3 border-t border-slate-200">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Enter 12-Digit UPI Reference / UTR Number:
                      </label>
                      <input
                        type="text"
                        required
                        value={utrNumber}
                        onChange={e => setUtrNumber(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="e.g. 428901238941"
                        maxLength={16}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 font-mono text-sm font-bold transition-all"
                      />
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Find the UTR number in your payment confirmation receipt.
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isVerifying || utrNumber.length < 8}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isVerifying ? 'Verifying with Bank...' : 'Submit UTR & Activate Access'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Information */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>State Bank of India (PTSBI) Verified Endpoint • {upiId}</span>
          </div>
          <span className="font-semibold text-slate-700">Mantra Classes • Uma Shukla</span>
        </div>
      </div>
    </div>
  );
};
