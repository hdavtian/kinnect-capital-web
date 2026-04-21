export interface MortgagePaymentInputs {
  loanAmount: number;
  annualRate: number;
  termYears: number;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function round(value: number, precision = 2): number {
  const multiplier = 10 ** precision;
  return Math.round(value * multiplier) / multiplier;
}

export function formatCurrency(value: number, cents = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: cents,
    minimumFractionDigits: cents,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${round(value, decimals)}%`;
}

export function calculateMortgagePayment({
  loanAmount,
  annualRate,
  termYears,
}: MortgagePaymentInputs): number {
  const principal = Math.max(0, loanAmount);
  const periods = Math.max(1, termYears * 12);
  const monthlyRate = Math.max(0, annualRate) / 1200;

  if (monthlyRate === 0) {
    return principal / periods;
  }

  const power = Math.pow(1 + monthlyRate, periods);
  return (principal * monthlyRate * power) / (power - 1);
}

export function totalMortgageInterest(inputs: MortgagePaymentInputs): number {
  const monthly = calculateMortgagePayment(inputs);
  const totalPaid = monthly * inputs.termYears * 12;
  return Math.max(0, totalPaid - Math.max(0, inputs.loanAmount));
}

export function refinanceBreakEvenMonths(
  currentPayment: number,
  proposedPayment: number,
  closingCosts: number,
): number {
  const monthlySavings = Math.max(0, currentPayment - proposedPayment);
  if (monthlySavings === 0) {
    return Number.POSITIVE_INFINITY;
  }

  return closingCosts / monthlySavings;
}

export function loanAmountFromLtv(
  homeValue: number,
  ltvPercent: number,
): number {
  return Math.max(0, homeValue) * (Math.max(0, ltvPercent) / 100);
}

export function monthlyRate(annualRate: number): number {
  return Math.max(0, annualRate) / 1200;
}
