import {
  format,
  parse,
  addDays,
  addBusinessDays as dfAddBusinessDays,
  parseISO,
  isWeekend,
} from "date-fns";
import { tr } from "date-fns/locale";

/**
 * Default timezone: Europe/Istanbul
 * DB stores all timestamps in UTC.
 *
 * Usage:
 * - formatDate(new Date(), 'P') → "27.10.2025" (Turkish short date)
 * - formatDateTime(new Date(), 'Pp') → "27.10.2025 14:30" (Turkish date + time)
 * - parseISODate('2025-10-27') → Date object
 * - addBusinessDays(new Date(), 3) → +3 business days (skip weekends)
 */

/**
 * Format date with TR locale.
 * @param date - Date object or ISO string
 * @param formatStr - date-fns format string (default: 'P' for short date)
 * @example formatDate(new Date(), 'P') → "27.10.2025"
 */
export function formatDate(date: Date | string, formatStr = "P"): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, formatStr, { locale: tr });
}

/**
 * Format date and time with TR locale.
 * @param date - Date object or ISO string
 * @param formatStr - date-fns format string (default: 'Pp' for short date + time)
 * @example formatDateTime(new Date(), 'Pp') → "27.10.2025 14:30"
 */
export function formatDateTime(date: Date | string, formatStr = "Pp"): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, formatStr, { locale: tr });
}

/**
 * Parse ISO date string (YYYY-MM-DD) to Date object.
 * @param isoDate - ISO date string
 * @example parseISODate('2025-10-27') → Date object
 */
export function parseISODate(isoDate: string): Date {
  return parseISO(isoDate);
}

/**
 * Add business days (skipping weekends).
 * @param date - Starting date
 * @param days - Number of business days to add
 * @example addBusinessDays(new Date('2025-10-24'), 1) → 2025-10-27 (Monday, skipping weekend)
 */
export function addBusinessDays(date: Date | string, days: number): Date {
  const d = typeof date === "string" ? parseISO(date) : date;
  return dfAddBusinessDays(d, days);
}

/**
 * Check if a date falls on a weekend (Saturday or Sunday).
 * @param date - Date to check
 * @example isWeekendDay(new Date('2025-10-26')) → true (Sunday)
 */
export function isWeekendDay(date: Date | string): boolean {
  const d = typeof date === "string" ? parseISO(date) : date;
  return isWeekend(d);
}

/**
 * Format time string for display (HH:mm → HH:mm).
 * No conversion needed—just validation.
 * @param time - Time string in HH:mm format
 * @example formatTime('14:30') → "14:30"
 */
export function formatTime(time: string): string {
  // Basic validation: should match HH:mm
  if (!/^\d{2}:\d{2}$/.test(time)) {
    throw new Error(`Invalid time format: ${time}. Expected HH:mm.`);
  }
  return time;
}

/**
 * Get current date in Europe/Istanbul timezone as ISO date string.
 * @example getCurrentDateISO() → "2025-10-27"
 */
export function getCurrentDateISO(): string {
  // Convert to Istanbul timezone (UTC+3)
  const now = new Date();
  const istanbulTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Istanbul" })
  );
  return format(istanbulTime, "yyyy-MM-dd");
}

/**
 * Get current time in Europe/Istanbul timezone as HH:mm string.
 * @example getCurrentTimeHHMM() → "14:30"
 */
export function getCurrentTimeHHMM(): string {
  const now = new Date();
  const istanbulTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Istanbul" })
  );
  return format(istanbulTime, "HH:mm");
}
