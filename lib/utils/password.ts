import { hash, compare } from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hash a plain-text password using bcryptjs.
 * @param password - Plain-text password
 * @returns Hashed password string
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS);
}

/**
 * Verify a plain-text password against a hashed password.
 * @param password - Plain-text password
 * @param hashedPassword - Hashed password from database
 * @returns True if passwords match, false otherwise
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}
