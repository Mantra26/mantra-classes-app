/**
 * Strict Indian Mobile Number Validator for Mantra Classes Student Portal
 * Ensures only genuine, functional 10-digit Indian mobile numbers (starting with 6, 7, 8, 9)
 * can register, while rejecting dummy, repetitive, and sequential test numbers.
 */

export type MobileValidationStatus =
  | 'empty'
  | 'typing'
  | 'invalid_start'
  | 'dummy_number'
  | 'invalid_length'
  | 'valid';

export interface MobileValidationResult {
  isValid: boolean;
  cleanMobile: string;
  status: MobileValidationStatus;
  message: string;
}

// Known common dummy and mock numbers to block
const BLOCKED_DUMMY_NUMBERS = new Set([
  '1234567890',
  '0123456789',
  '9876543210',
  '8765432109',
  '7654321098',
  '6543210987',
  '9898989898',
  '9191919191',
  '9090909090',
  '9123456789',
  '9999988888',
  '9999900000',
  '9876598765',
  '9000000000',
  '9800000000',
  '9900000000'
]);

export function validateIndianMobile(rawInput: string): MobileValidationResult {
  const cleanMobile = (rawInput || '').replace(/\D/g, '');

  if (!cleanMobile) {
    return {
      isValid: false,
      cleanMobile: '',
      status: 'empty',
      message: 'Enter 10-digit mobile number'
    };
  }

  // First digit must be 6, 7, 8, or 9
  const firstDigit = cleanMobile[0];
  if (!['6', '7', '8', '9'].includes(firstDigit)) {
    return {
      isValid: false,
      cleanMobile,
      status: 'invalid_start',
      message: 'Indian mobile numbers must start with 6, 7, 8, or 9'
    };
  }

  // If still typing (1-9 digits)
  if (cleanMobile.length < 10) {
    return {
      isValid: false,
      cleanMobile,
      status: 'typing',
      message: `${cleanMobile.length}/10 digits entered`
    };
  }

  // Exactly 10 digits check
  if (cleanMobile.length > 10) {
    return {
      isValid: false,
      cleanMobile: cleanMobile.slice(0, 10),
      status: 'invalid_length',
      message: 'Mobile number cannot exceed 10 digits'
    };
  }

  // Reject all identical digits (e.g. 9999999999, 8888888888, 7777777777, 6666666666)
  if (/^(\d)\1{9}$/.test(cleanMobile)) {
    return {
      isValid: false,
      cleanMobile,
      status: 'dummy_number',
      message: 'Dummy numbers with identical digits are not allowed.'
    };
  }

  // Reject numbers with 6 or more consecutive identical digits (e.g. 9999991234, 9800000000)
  if (/(\d)\1{5,}/.test(cleanMobile)) {
    return {
      isValid: false,
      cleanMobile,
      status: 'dummy_number',
      message: 'Repetitive test sequences are not allowed. Please enter your genuine functional number.'
    };
  }

  // Reject known sequential or dummy numbers
  if (BLOCKED_DUMMY_NUMBERS.has(cleanMobile)) {
    return {
      isValid: false,
      cleanMobile,
      status: 'dummy_number',
      message: 'Test or dummy sequence detected. Please enter your functional personal mobile number.'
    };
  }

  // Regex check for genuine Indian mobile: starts with 6-9, followed by 9 digits
  const validPattern = /^[6-9]\d{9}$/;
  if (!validPattern.test(cleanMobile)) {
    return {
      isValid: false,
      cleanMobile,
      status: 'invalid_start',
      message: 'Please enter a valid 10-digit Indian mobile number.'
    };
  }

  return {
    isValid: true,
    cleanMobile,
    status: 'valid',
    message: '✓ Functional Indian Mobile Number (+91)'
  };
}
