/**
 * Format a number as Turkish Lira (TRY) currency
 * @param amount The amount to format
 * @returns Formatted string like "150,00 ₺"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Parse a formatted currency string back to a number
 * @param currencyString Formatted string like "150,00 ₺"
 * @returns The numeric value
 */
export function parseCurrency(currencyString: string): number {
  const cleanedString = currencyString
    .replace(/[₺\s]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  return parseFloat(cleanedString) || 0;
}
