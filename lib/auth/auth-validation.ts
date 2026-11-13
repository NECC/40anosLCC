import { isObject, isValidEmail } from "../utils";

export type SignUpDetails = {
  name: string;
  email: string;
};

export type SignInDetails = {
  email: string;
};

export function validateSignInDetails(value: unknown): value is SignInDetails {
  if (!isObject(value)) return false;

  const email = typeof value.email === "string" ? value.email.trim() : "";

  return isValidEmail(email) && email.length <= 254;
}

export function validateSignUpDetails(value: unknown): value is SignUpDetails {
  if (!isObject(value)) return false;

  const name = typeof value.name === "string" ? value.name.trim() : "";
  const email = typeof value.email === "string" ? value.email.trim() : "";

  return (
    name.length >= 2 &&
    name.length <= 100 &&
    isValidEmail(email) &&
    email.length <= 254
  );
}
