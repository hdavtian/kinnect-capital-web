import { useMemo, useState } from "react";
import { assetPath } from "../../utils/assetPath";
import ToolsSidebarNav from "../mortgage-tools/ToolsSidebarNav";

type TermYears = 10 | 15 | 20 | 25 | 30;

interface CalculatorValues {
  homePrice: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  interestRate: number;
  insuranceYearly: number;
  termYears: TermYears;
  propertyTaxMonthly: number;
  hoaMonthly: number;
}

interface PaymentBreakdown {
  principalAndInterest: number;
  propertyTax: number;
  hoa: number;
  insurance: number;
  total: number;
}

const DEFAULT_VALUES: CalculatorValues = {
  homePrice: 950000,
  downPaymentAmount: 190000,
  downPaymentPercent: 20,
  interestRate: 6.75,
  insuranceYearly: 1800,
  termYears: 30,
  propertyTaxMonthly: 980,
  hoaMonthly: 0,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

function toCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function toCurrencyWithCents(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function calculatePrincipalAndInterest(
  loanAmount: number,
  annualRate: number,
  termYears: number,
): number {
  const payments = termYears * 12;

  if (loanAmount <= 0 || payments <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return loanAmount / payments;
  }

  const numerator =
    loanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments);
  const denominator = Math.pow(1 + monthlyRate, payments) - 1;

  if (denominator === 0) {
    return 0;
  }

  return numerator / denominator;
}

function getBreakdown(values: CalculatorValues): PaymentBreakdown {
  const loanAmount = Math.max(0, values.homePrice - values.downPaymentAmount);
  const principalAndInterest = calculatePrincipalAndInterest(
    loanAmount,
    values.interestRate,
    values.termYears,
  );
  const propertyTax = Math.max(0, values.propertyTaxMonthly);
  const hoa = Math.max(0, values.hoaMonthly);
  const insurance = Math.max(0, values.insuranceYearly / 12);
  const total = principalAndInterest + propertyTax + hoa + insurance;

  return {
    principalAndInterest,
    propertyTax,
    hoa,
    insurance,
    total,
  };
}

function getPercent(part: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return (part / total) * 100;
}

// ── Masked input ──────────────────────────────────────────────────────────────

interface MaskedInputProps {
  value: number;
  onCommit: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}

function formatMasked(value: number, prefix: string, suffix: string): string {
  const formatted = value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
  return `${prefix}${formatted}${suffix}`;
}

function MaskedInput({
  value,
  onCommit,
  prefix = "",
  suffix = "",
  min,
  max,
  step,
}: MaskedInputProps) {
  const [focused, setFocused] = useState(false);
  const [inputStr, setInputStr] = useState("");

  function handleFocus() {
    setInputStr(value === 0 ? "" : String(value));
    setFocused(true);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Allow digits, one decimal point, and leading minus (for future use)
    const cleaned = event.target.value.replace(/[^0-9.]/g, "");
    setInputStr(cleaned);
  }

  function handleBlur() {
    const parsed = parseFloat(inputStr);
    let final = isNaN(parsed) ? 0 : parsed;
    if (min !== undefined) final = Math.max(min, final);
    if (max !== undefined) final = Math.min(max, final);
    onCommit(final);
    setFocused(false);
  }

  const displayValue = focused ? inputStr : formatMasked(value, prefix, suffix);

  return (
    <input
      type="text"
      inputMode={step !== undefined && step < 1 ? "decimal" : "numeric"}
      value={displayValue}
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function MortgageCalculator() {
  const headerImageSrc = assetPath(
    "/images/calculators/headers/mortgage-calculator.png",
  );

  const [values, setValues] = useState<CalculatorValues>(DEFAULT_VALUES);

  const breakdown = useMemo(() => getBreakdown(values), [values]);

  const percentages = useMemo(
    () => ({
      principalAndInterest: getPercent(
        breakdown.principalAndInterest,
        breakdown.total,
      ),
      propertyTax: getPercent(breakdown.propertyTax, breakdown.total),
      hoa: getPercent(breakdown.hoa, breakdown.total),
      insurance: getPercent(breakdown.insurance, breakdown.total),
    }),
    [breakdown],
  );

  const donutStyle = useMemo(() => {
    const principal = percentages.principalAndInterest;
    const tax = principal + percentages.propertyTax;
    const hoa = tax + percentages.hoa;

    return {
      background: `conic-gradient(
        #0f5aa6 0% ${principal}%,
        #3f88c5 ${principal}% ${tax}%,
        #98c1d9 ${tax}% ${hoa}%,
        #b6d8f2 ${hoa}% 100%
      )`,
    };
  }, [percentages]);

  function updateWithHomePrice(nextHomePrice: number) {
    const clampedHomePrice = Math.max(0, nextHomePrice);
    const nextDownPaymentAmount = roundToTwo(
      (clampedHomePrice * values.downPaymentPercent) / 100,
    );

    setValues((prev) => ({
      ...prev,
      homePrice: clampedHomePrice,
      downPaymentAmount: clamp(nextDownPaymentAmount, 0, clampedHomePrice),
    }));
  }

  function updateWithDownPaymentAmount(nextDownPaymentAmount: number) {
    const clampedAmount = clamp(nextDownPaymentAmount, 0, values.homePrice);
    const nextPercent =
      values.homePrice > 0 ? (clampedAmount / values.homePrice) * 100 : 0;

    setValues((prev) => ({
      ...prev,
      downPaymentAmount: roundToTwo(clampedAmount),
      downPaymentPercent: roundToTwo(clamp(nextPercent, 0, 100)),
    }));
  }

  function updateWithDownPaymentPercent(nextDownPaymentPercent: number) {
    const clampedPercent = clamp(nextDownPaymentPercent, 0, 100);
    const nextAmount = roundToTwo((values.homePrice * clampedPercent) / 100);

    setValues((prev) => ({
      ...prev,
      downPaymentPercent: roundToTwo(clampedPercent),
      downPaymentAmount: roundToTwo(clamp(nextAmount, 0, values.homePrice)),
    }));
  }

  function updateValue<K extends keyof CalculatorValues>(
    key: K,
    value: CalculatorValues[K],
  ) {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetValues() {
    setValues(DEFAULT_VALUES);
  }

  function onCalculateClick() {
    // Calculations are live; this keeps button behavior explicit for users.
    setValues((prev) => ({ ...prev }));
  }

  return (
    <section className="calculator-section">
      <div className="tools-page-layout">
        <ToolsSidebarNav />
        <div className="tools-page-content">
          <h1>Mortgage Calculator</h1>
          <p>Adjust values below to estimate your monthly payment.</p>

          <div
            className="calculator-page-hero"
            style={{ backgroundImage: `url(${headerImageSrc})` }}
            role="img"
            aria-label="Mortgage calculator infographic header"
          />

          <div className="calculator-grid">
            <form
              className="calculator-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="calculator-form-grid">
                <label>
                  Home Price
                  <MaskedInput
                    value={values.homePrice}
                    onCommit={updateWithHomePrice}
                    prefix="$"
                    min={0}
                  />
                </label>

                <label>
                  Term
                  <select
                    value={values.termYears}
                    onChange={(event) =>
                      updateValue(
                        "termYears",
                        Number(event.target.value) as TermYears,
                      )
                    }
                  >
                    <option value={10}>10-year fixed</option>
                    <option value={15}>15-year fixed</option>
                    <option value={20}>20-year fixed</option>
                    <option value={25}>25-year fixed</option>
                    <option value={30}>30-year fixed</option>
                  </select>
                </label>

                <label>
                  Down Payment
                  <MaskedInput
                    value={values.downPaymentAmount}
                    onCommit={updateWithDownPaymentAmount}
                    prefix="$"
                    min={0}
                  />
                </label>

                <label>
                  Property Tax / month
                  <MaskedInput
                    value={values.propertyTaxMonthly}
                    onCommit={(n) => updateValue("propertyTaxMonthly", n)}
                    prefix="$"
                    min={0}
                    step={0.01}
                  />
                </label>

                <label>
                  Down Payment %
                  <MaskedInput
                    value={values.downPaymentPercent}
                    onCommit={updateWithDownPaymentPercent}
                    suffix="%"
                    min={0}
                    max={100}
                    step={0.01}
                  />
                </label>

                <label>
                  HOA Dues / month
                  <MaskedInput
                    value={values.hoaMonthly}
                    onCommit={(n) => updateValue("hoaMonthly", n)}
                    prefix="$"
                    min={0}
                    step={0.01}
                  />
                </label>

                <label>
                  Interest Rate %
                  <MaskedInput
                    value={values.interestRate}
                    onCommit={(n) => updateValue("interestRate", n)}
                    suffix="%"
                    min={0}
                    max={100}
                    step={0.01}
                  />
                </label>

                <label>
                  Homeowner&apos;s Insurance / year
                  <MaskedInput
                    value={values.insuranceYearly}
                    onCommit={(n) => updateValue("insuranceYearly", n)}
                    prefix="$"
                    min={0}
                    step={0.01}
                  />
                </label>
              </div>

              <div className="calculator-actions">
                <button type="button" onClick={resetValues}>
                  Reset
                </button>
                <button type="button" onClick={onCalculateClick}>
                  Calculate
                </button>
              </div>
            </form>

            <div className="calculator-result">
              <div className="donut-wrap">
                <div
                  className="donut"
                  style={donutStyle}
                  aria-label="Payment breakdown donut chart"
                >
                  <div className="donut-center">
                    <strong>{toCurrency(Math.round(breakdown.total))}</strong>
                    <span>Your Monthly Payment</span>
                  </div>
                </div>
              </div>

              <ul className="breakdown-list">
                <li>
                  <span>Principal and Interest</span>
                  <strong>
                    {toCurrencyWithCents(breakdown.principalAndInterest)} (
                    {Math.round(percentages.principalAndInterest)}%)
                  </strong>
                </li>
                <li>
                  <span>Property Taxes</span>
                  <strong>
                    {toCurrencyWithCents(breakdown.propertyTax)} (
                    {Math.round(percentages.propertyTax)}%)
                  </strong>
                </li>
                <li>
                  <span>HOA Dues</span>
                  <strong>
                    {toCurrencyWithCents(breakdown.hoa)} (
                    {Math.round(percentages.hoa)}%)
                  </strong>
                </li>
                <li>
                  <span>Homeowner&apos;s Insurance</span>
                  <strong>
                    {toCurrencyWithCents(breakdown.insurance)} (
                    {Math.round(percentages.insurance)}%)
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MortgageCalculator;
