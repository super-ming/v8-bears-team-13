export default function (amount) {
  const amountString = `${amount}`;

  // No decimal
  if (!amountString.includes('.')) return `${amountString}.00`;

  // 1 Decimal
  const [dollars, cents] = amountString.split('.');

  // e.g. 10.1 -> 10.10
  if (cents.length === 1) return `${amountString}.0`;

  // Already in correct format
  return amountString;
}
