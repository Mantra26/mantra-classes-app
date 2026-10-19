import { storage } from './storage';
import { SmsGatewayConfig, OtpDispatchLog } from '../types';

export interface OtpSession {
  mobile: string;
  code: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
  studentName: string;
  lastResendAt: number;
}

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const RESEND_COOLDOWN_MS = 30 * 1000; // 30 seconds
const MAX_ATTEMPTS = 4;
const OTP_STORAGE_KEY = 'mantra_active_otp_session';

export const otpService = {
  /**
   * Generates a 6-digit numeric verification code.
   */
  generateCode(): string {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const arr = new Uint32Array(1);
      window.crypto.getRandomValues(arr);
      return String(100000 + (arr[0] % 900000));
    }
    return String(Math.floor(100000 + Math.random() * 900000));
  },

  /**
   * Mask mobile for privacy: 9812345678 -> +91 ••••••5678
   */
  maskMobile(mobile: string): string {
    const clean = mobile.replace(/\D/g, '').slice(-10);
    if (clean.length < 4) return '+91 ••••••••••';
    return `+91 ••••••${clean.slice(-4)}`;
  },

  /**
   * Formats direct WhatsApp link to deliver the OTP to student's phone
   */
  buildWhatsAppUrl(cleanMobile: string, code: string, studentName?: string): string {
    const greeting = studentName ? `Dear *${studentName.trim()}*,` : 'Hello Scholar,';
    const message = `*Mantra Classes - Mobile Login Verification*\n\n${greeting}\nYour one-time login OTP is: *${code}*\n\n⏱️ Valid for 5 minutes.\nDo not share this code with anyone.\n\n— Director Uma Shukla, Mantra Classes\nhttps://mantra26.github.io/mantra-classes-app/`;
    return `https://api.whatsapp.com/send?phone=91${cleanMobile}&text=${encodeURIComponent(message)}`;
  },

  /**
   * Formats device SMS URI scheme for native mobile messaging apps
   */
  buildSmsUrl(cleanMobile: string, code: string): string {
    const body = `Mantra Classes login verification code: ${code}. Valid for 5 minutes. (Director Uma Shukla)`;
    return `sms:+91${cleanMobile}?body=${encodeURIComponent(body)}`;
  },

  /**
   * Get active OTP session from sessionStorage (not visible in DOM)
   */
  getActiveSession(cleanMobile: string): OtpSession | null {
    try {
      const raw = sessionStorage.getItem(`${OTP_STORAGE_KEY}_${cleanMobile}`);
      if (!raw) return null;
      const session: OtpSession = JSON.parse(raw);
      // If already expired, cleanup
      if (Date.now() > session.expiresAt) {
        sessionStorage.removeItem(`${OTP_STORAGE_KEY}_${cleanMobile}`);
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },

  /**
   * Check seconds remaining in 30s resend cooldown
   */
  getRemainingCooldown(cleanMobile: string): number {
    const session = this.getActiveSession(cleanMobile);
    if (!session) return 0;
    const elapsed = Date.now() - session.lastResendAt;
    if (elapsed >= RESEND_COOLDOWN_MS) return 0;
    return Math.ceil((RESEND_COOLDOWN_MS - elapsed) / 1000);
  },

  /**
   * Sends or resends an OTP to the given mobile number.
   */
  async sendOtp(
    mobile: string,
    studentName: string = 'Student'
  ): Promise<{
    success: boolean;
    maskedMobile: string;
    expiresAt: number;
    whatsappUrl: string;
    smsUrl: string;
    message: string;
    isGatewayActive: boolean;
    code?: string;
  }> {
    const cleanMobile = mobile.replace(/\D/g, '').slice(-10);
    const existing = this.getActiveSession(cleanMobile);

    // Check cooldown
    if (existing) {
      const cooldown = this.getRemainingCooldown(cleanMobile);
      if (cooldown > 0) {
        return {
          success: false,
          maskedMobile: this.maskMobile(cleanMobile),
          expiresAt: existing.expiresAt,
          whatsappUrl: this.buildWhatsAppUrl(cleanMobile, existing.code, studentName),
          smsUrl: this.buildSmsUrl(cleanMobile, existing.code),
          message: `Please wait ${cooldown}s before requesting a new OTP.`,
          isGatewayActive: false,
          code: existing.code
        };
      }
    }

    const code = this.generateCode();
    const now = Date.now();
    const session: OtpSession = {
      mobile: cleanMobile,
      code,
      createdAt: now,
      expiresAt: now + OTP_EXPIRY_MS,
      attempts: 0,
      studentName: studentName.trim() || 'Student',
      lastResendAt: now
    };

    // Store in private session storage
    try {
      sessionStorage.setItem(`${OTP_STORAGE_KEY}_${cleanMobile}`, JSON.stringify(session));
    } catch (e) {
      console.warn('Could not save OTP session in sessionStorage', e);
    }

    // Save audit log for Director Uma Shukla
    const gatewayConfig = storage.getSmsGatewayConfig();
    let channel: OtpDispatchLog['channel'] = 'whatsapp';
    let isGatewayActive = false;

    // Optional automated SMS Gateway dispatch (Fast2SMS or custom webhook)
    if (gatewayConfig.enabled && gatewayConfig.apiKey && gatewayConfig.provider === 'fast2sms') {
      try {
        channel = 'sms_gateway';
        isGatewayActive = true;
        // Fast2SMS OTP route
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${encodeURIComponent(gatewayConfig.apiKey)}&route=otp&variables_values=${code}&flash=0&numbers=${cleanMobile}`, {
          method: 'GET',
          mode: 'no-cors'
        }).catch(err => {
          console.warn('Fast2SMS background dispatch notice:', err);
        });
      } catch (err) {
        console.warn('SMS Gateway invocation warning:', err);
      }
    } else if (gatewayConfig.enabled && gatewayConfig.webhookUrl && gatewayConfig.provider === 'custom_webhook') {
      try {
        channel = 'sms_gateway';
        isGatewayActive = true;
        fetch(gatewayConfig.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mobile: cleanMobile,
            code,
            studentName,
            sentAt: new Date().toISOString()
          })
        }).catch(err => console.warn('Custom webhook dispatch notice:', err));
      } catch (err) {
        console.warn('Webhook dispatch error:', err);
      }
    }

    // Record audit entry
    storage.addOtpLog({
      id: `otp-log-${Date.now()}`,
      maskedMobile: this.maskMobile(cleanMobile),
      studentName: session.studentName,
      timestamp: new Date().toISOString(),
      channel,
      status: 'dispatched',
      code
    });

    const whatsappUrl = this.buildWhatsAppUrl(cleanMobile, code, studentName);
    const smsUrl = this.buildSmsUrl(cleanMobile, code);

    return {
      success: true,
      maskedMobile: this.maskMobile(cleanMobile),
      code,
      expiresAt: session.expiresAt,
      whatsappUrl,
      smsUrl,
      message: `OTP generated for ${this.maskMobile(cleanMobile)}.`,
      isGatewayActive
    };
  },

  /**
   * Verifies the user entered OTP against the active session.
   * Also supports Director Uma Shukla's emergency classroom bypass with authorization PIN.
   */
  verifyOtp(
    mobile: string,
    inputCode: string,
    options?: {
      adminBypassPin?: string;
      validAdminPin?: string;
      validFacultyPin?: string;
    }
  ): {
    success: boolean;
    reason?: 'expired' | 'max_attempts' | 'mismatch' | 'not_found' | 'admin_bypass';
    message: string;
  } {
    const cleanMobile = mobile.replace(/\D/g, '').slice(-10);

    // 1. Check Educator Emergency Classroom Bypass
    if (options?.adminBypassPin) {
      const pin = options.adminBypassPin.trim();
      const adminPin = (options.validAdminPin || '1234').trim();
      const facPin = (options.validFacultyPin || '1234').trim();

      if (pin === adminPin || pin === facPin) {
        // Record bypass log
        storage.addOtpLog({
          id: `otp-log-${Date.now()}`,
          maskedMobile: this.maskMobile(cleanMobile),
          studentName: 'Classroom Lecture (Educator Bypass)',
          timestamp: new Date().toISOString(),
          channel: 'admin_bypass',
          status: 'verified'
        });

        // Clean session
        sessionStorage.removeItem(`${OTP_STORAGE_KEY}_${cleanMobile}`);

        return {
          success: true,
          reason: 'admin_bypass',
          message: 'Authorized via Educator Offline PIN.'
        };
      } else {
        return {
          success: false,
          reason: 'mismatch',
          message: 'Incorrect Director / Educator PIN. Offline bypass denied.'
        };
      }
    }

    // 2. Normal Student Mobile Verification
    const session = this.getActiveSession(cleanMobile);
    if (!session) {
      return {
        success: false,
        reason: 'not_found',
        message: 'No active OTP found or code has expired. Please request a new OTP.'
      };
    }

    // Check expiry
    if (Date.now() > session.expiresAt) {
      sessionStorage.removeItem(`${OTP_STORAGE_KEY}_${cleanMobile}`);
      storage.addOtpLog({
        id: `otp-log-${Date.now()}`,
        maskedMobile: this.maskMobile(cleanMobile),
        studentName: session.studentName,
        timestamp: new Date().toISOString(),
        channel: 'whatsapp',
        status: 'expired'
      });
      return {
        success: false,
        reason: 'expired',
        message: 'OTP has expired (valid for 5 minutes). Please click "Resend Code".'
      };
    }

    // Check max attempts
    if (session.attempts >= MAX_ATTEMPTS) {
      sessionStorage.removeItem(`${OTP_STORAGE_KEY}_${cleanMobile}`);
      storage.addOtpLog({
        id: `otp-log-${Date.now()}`,
        maskedMobile: this.maskMobile(cleanMobile),
        studentName: session.studentName,
        timestamp: new Date().toISOString(),
        channel: 'whatsapp',
        status: 'failed'
      });
      return {
        success: false,
        reason: 'max_attempts',
        message: 'Too many incorrect attempts. For security, please request a fresh OTP.'
      };
    }

    const cleanInput = inputCode.trim().replace(/\D/g, '');

    // Compare codes (Note: Master dev fallback '123456' or '1234' for local testing)
    const isCodeMatch = cleanInput === session.code || cleanInput === '123456' || cleanInput === '1234';

    if (!isCodeMatch) {
      session.attempts += 1;
      sessionStorage.setItem(`${OTP_STORAGE_KEY}_${cleanMobile}`, JSON.stringify(session));
      const remaining = MAX_ATTEMPTS - session.attempts;
      return {
        success: false,
        reason: 'mismatch',
        message: `Incorrect OTP entered. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
      };
    }

    // Code verified successfully!
    sessionStorage.removeItem(`${OTP_STORAGE_KEY}_${cleanMobile}`);
    storage.addOtpLog({
      id: `otp-log-${Date.now()}`,
      maskedMobile: this.maskMobile(cleanMobile),
      studentName: session.studentName,
      timestamp: new Date().toISOString(),
      channel: 'whatsapp',
      status: 'verified'
    });

    return {
      success: true,
      message: 'Mobile number verified successfully!'
    };
  }
};
