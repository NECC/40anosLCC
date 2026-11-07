import { isObject, isValidEmail } from "../utils";

export type SignUpDetails = {
  name: string;
  email: string;
  password: string;
  isStudent: boolean;
  studyYear: number | null;
};

export type SignInDetails = {
  email: string;
  password: string;
};

// TODO: Add password strength validation (e.g., at least one uppercase letter, one lowercase letter, one number, and one special character)

export function validateSignInDetails(value: unknown): value is SignInDetails {
  if (!isObject(value)) return false;

  const email = typeof value.email === "string" ? value.email.trim() : "";
  const password = typeof value.password === "string" ? value.password : "";

  return isValidEmail(email) && password.length >= 8 && password.length <= 128;
}

export function validateSignUpDetails(value: unknown): value is SignUpDetails {
  if (!isObject(value)) return false;

  const name = typeof value.name === "string" ? value.name.trim() : "";
  const email = typeof value.email === "string" ? value.email.trim() : "";
  const password = typeof value.password === "string" ? value.password : "";

  if (name.length < 2 || name.length > 100 || !isValidEmail(email)) return false;
  if (password.length < 8 || password.length > 128) return false;
  if (typeof value.isStudent !== "boolean") return false;

  if (value.isStudent) {
    return Number.isInteger(value.studyYear) && Number(value.studyYear) >= 1 && Number(value.studyYear) <= 3;
  }

  return value.studyYear === null;
}

export function validateSignUpVerification(
  value: unknown,
): value is SignUpDetails & { otp: string } {
  if (!isObject(value)) return false;

  const otp = typeof value.otp === "string" ? value.otp.trim() : "";
  if (!/^\d{6}$/.test(otp) || !validateSignUpDetails(value)) return false;
  else return true;
}
