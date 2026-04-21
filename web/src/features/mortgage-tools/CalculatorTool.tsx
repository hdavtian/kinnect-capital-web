import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { findToolById, type ToolId } from "../../data/mortgageTools";
import { ROUTES } from "../../routes";
import {
  calculateMortgagePayment,
  clamp,
  formatCurrency,
  refinanceBreakEvenMonths,
  round,
  totalMortgageInterest,
} from "../../utils/calculators";
import { assetPath } from "../../utils/assetPath";
import "./MortgageTools.css";

const TERM_OPTIONS = [10, 15, 20, 25, 30] as const;

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  format?: "number" | "currency" | "percent";
}

function formatFieldValue(
  value: number,
  format: "number" | "currency" | "percent",
): string {
  const normalizedValue = Number.isFinite(value) ? value : 0;

  if (format === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(normalizedValue);
  }

  if (format === "percent") {
    return `${new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(normalizedValue)}%`;
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(normalizedValue);
}

function cleanNumericDraft(rawValue: string): string {
  const cleaned = rawValue.replace(/[^0-9.-]/g, "");
  if (!cleaned) {
    return "";
  }

  const hasMinus = cleaned.startsWith("-");
  const unsigned = cleaned.replace(/-/g, "");
  const [whole, ...rest] = unsigned.split(".");
  const decimal = rest.join("");
  const hasDot = unsigned.includes(".");
  const normalizedWhole = whole || (hasDot ? "0" : "");

  return `${hasMinus ? "-" : ""}${normalizedWhole}${hasDot ? `.${decimal}` : ""}`;
}

function NumberField({
  label,
  value,
  onChange,
  step = 1,
  min = 0,
  format = "number",
}: NumberFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [draftValue, setDraftValue] = useState("");

  function handleFocus() {
    setDraftValue(value === 0 ? "" : String(value));
    setIsFocused(true);
  }

  function handleBlur() {
    const parsed = Number.parseFloat(draftValue);
    const normalized = Number.isFinite(parsed) ? parsed : min;
    onChange(Math.max(min, normalized));
    setIsFocused(false);
  }

  const displayValue = isFocused ? draftValue : formatFieldValue(value, format);

  return (
    <label className="tool-field">
      <span>{label}</span>
      <input
        type="text"
        inputMode={step < 1 ? "decimal" : "numeric"}
        value={displayValue}
        step={step}
        min={min}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(event) =>
          setDraftValue(cleanNumericDraft(event.target.value))
        }
      />
    </label>
  );
}

interface InlineRateFieldProps {
  value: number;
  onChange: (value: number) => void;
}

function InlineRateField({ value, onChange }: InlineRateFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [draftValue, setDraftValue] = useState("");

  function handleFocus() {
    setDraftValue(value === 0 ? "" : String(value));
    setIsFocused(true);
  }

  function handleBlur() {
    const parsed = Number.parseFloat(draftValue);
    const normalized = Number.isFinite(parsed) ? parsed : 0;
    onChange(Math.max(0, normalized));
    setIsFocused(false);
  }

  const displayValue = isFocused
    ? draftValue
    : formatFieldValue(value, "percent");

  return (
    <input
      className="tool-rate-input"
      type="text"
      inputMode="decimal"
      value={displayValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={(event) => setDraftValue(cleanNumericDraft(event.target.value))}
      aria-label="Adjust term rate"
    />
  );
}

function remainingMortgageBalance(
  principal: number,
  annualRate: number,
  termYears: number,
  monthsPaid: number,
): number {
  const loanAmount = Math.max(0, principal);
  const monthlyRate = Math.max(0, annualRate) / 1200;
  const termMonths = Math.max(1, termYears * 12);

  if (monthlyRate === 0) {
    const monthlyPrincipal = loanAmount / termMonths;
    return Math.max(0, loanAmount - monthlyPrincipal * monthsPaid);
  }

  const payment = calculateMortgagePayment({
    loanAmount,
    annualRate,
    termYears,
  });

  const power = Math.pow(1 + monthlyRate, monthsPaid);
  const current =
    loanAmount * power -
    payment * ((power - 1) / (monthlyRate === 0 ? 1 : monthlyRate));

  return Math.max(0, current);
}

function TermComparisonTool() {
  const [homePrice, setHomePrice] = useState(950000);
  const [downPayment, setDownPayment] = useState(190000);
  const [ratesByTerm, setRatesByTerm] = useState<Record<number, number>>({
    10: 6.05,
    15: 6.2,
    20: 6.45,
    25: 6.62,
    30: 6.75,
  });

  function updateRateForTerm(term: number, nextRate: number) {
    setRatesByTerm((prev) => ({
      ...prev,
      [term]: nextRate,
    }));
  }

  const rows = useMemo(() => {
    const loanAmount = Math.max(0, homePrice - downPayment);
    return TERM_OPTIONS.map((term) => {
      const rate = ratesByTerm[term] ?? 0;
      const monthly = calculateMortgagePayment({
        loanAmount,
        annualRate: rate,
        termYears: term,
      });
      const interest = totalMortgageInterest({
        loanAmount,
        annualRate: rate,
        termYears: term,
      });

      return {
        term,
        rate,
        monthly,
        interest,
        totalPaid: loanAmount + interest,
      };
    });
  }, [homePrice, downPayment, ratesByTerm]);

  return (
    <>
      <div className="tool-layout tool-layout--term">
        <form
          className="tool-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <NumberField
            label="Home Price"
            value={homePrice}
            onChange={setHomePrice}
            step={1000}
            format="currency"
          />
          <NumberField
            label="Down Payment"
            value={downPayment}
            onChange={setDownPayment}
            step={1000}
            format="currency"
          />
        </form>

        <div className="tool-results">
          <h3>Term Comparison</h3>
          <table className="tool-table">
            <thead>
              <tr>
                <th>Term</th>
                <th>Rate</th>
                <th>Monthly</th>
                <th>Total Interest</th>
                <th>Total Paid</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.term}>
                  <td>{row.term}-year</td>
                  <td>
                    <InlineRateField
                      value={row.rate}
                      onChange={(nextRate) =>
                        updateRateForTerm(row.term, nextRate)
                      }
                    />
                  </td>
                  <td>{formatCurrency(row.monthly)}</td>
                  <td>{formatCurrency(row.interest)}</td>
                  <td>{formatCurrency(row.totalPaid)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function RefinanceBreakEvenTool() {
  const [remainingLoanBalance, setRemainingLoanBalance] = useState(700000);
  const [currentRate, setCurrentRate] = useState(7.35);
  const [newRate, setNewRate] = useState(6.5);
  const [remainingYears, setRemainingYears] = useState(28);
  const [newTermYears, setNewTermYears] = useState(30);
  const [upfrontCostPercent, setUpfrontCostPercent] = useState(2.25);
  const [newApr, setNewApr] = useState(6.85);

  const summary = useMemo(() => {
    const financedFees = remainingLoanBalance * (upfrontCostPercent / 100);
    const refinancedBalance = remainingLoanBalance + financedFees;
    const currentPayment = calculateMortgagePayment({
      loanAmount: remainingLoanBalance,
      annualRate: currentRate,
      termYears: remainingYears,
    });
    const proposedPayment = calculateMortgagePayment({
      loanAmount: refinancedBalance,
      annualRate: newRate,
      termYears: newTermYears,
    });
    const monthlySavings = currentPayment - proposedPayment;
    const aprSpread = Math.max(0, newApr - newRate);
    const aprCostEquivalent = refinancedBalance * (aprSpread / 100);
    const effectiveCost = financedFees + aprCostEquivalent;
    const months = refinanceBreakEvenMonths(
      currentPayment,
      proposedPayment,
      effectiveCost,
    );

    return {
      currentPayment,
      proposedPayment,
      monthlySavings,
      financedFees,
      aprCostEquivalent,
      effectiveCost,
      months,
      oneYearNet: monthlySavings * 12 - effectiveCost,
      threeYearNet: monthlySavings * 36 - effectiveCost,
      fiveYearNet: monthlySavings * 60 - effectiveCost,
    };
  }, [
    remainingLoanBalance,
    currentRate,
    newRate,
    remainingYears,
    newTermYears,
    upfrontCostPercent,
    newApr,
  ]);

  return (
    <div className="tool-layout">
      <form className="tool-form" onSubmit={(event) => event.preventDefault()}>
        <NumberField
          label="Remaining Loan Balance"
          value={remainingLoanBalance}
          onChange={setRemainingLoanBalance}
          step={1000}
          format="currency"
        />
        <NumberField
          label="Current Rate (%)"
          value={currentRate}
          onChange={setCurrentRate}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="New Rate (%)"
          value={newRate}
          onChange={setNewRate}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="Current Remaining Term (years)"
          value={remainingYears}
          onChange={setRemainingYears}
        />
        <NumberField
          label="New Loan Term (years)"
          value={newTermYears}
          onChange={setNewTermYears}
        />
        <NumberField
          label="Upfront Costs (%)"
          value={upfrontCostPercent}
          onChange={(next) => setUpfrontCostPercent(clamp(next, 0, 6))}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="New Loan APR (%)"
          value={newApr}
          onChange={(next) => setNewApr(clamp(next, 0, 20))}
          step={0.01}
          format="percent"
        />
      </form>

      <div className="tool-results">
        <h3>Break-Even Summary</h3>
        <ul className="tool-kpis">
          <li>
            <span>Current Payment</span>
            <strong>{formatCurrency(summary.currentPayment)}</strong>
          </li>
          <li>
            <span>Proposed Payment</span>
            <strong>{formatCurrency(summary.proposedPayment)}</strong>
          </li>
          <li>
            <span>Monthly Savings</span>
            <strong>{formatCurrency(summary.monthlySavings)}</strong>
          </li>
          <li>
            <span>Financed Upfront Costs</span>
            <strong>{formatCurrency(summary.financedFees)}</strong>
          </li>
          <li>
            <span>APR Spread Cost Equivalent</span>
            <strong>{formatCurrency(summary.aprCostEquivalent)}</strong>
          </li>
          <li>
            <span>Effective Cost Basis</span>
            <strong>{formatCurrency(summary.effectiveCost)}</strong>
          </li>
          <li>
            <span>Estimated Break-Even</span>
            <strong>
              {Number.isFinite(summary.months)
                ? `${Math.ceil(summary.months)} months`
                : "No break-even"}
            </strong>
          </li>
          <li>
            <span>1-Year Net</span>
            <strong>{formatCurrency(summary.oneYearNet)}</strong>
          </li>
          <li>
            <span>3-Year Net</span>
            <strong>{formatCurrency(summary.threeYearNet)}</strong>
          </li>
          <li>
            <span>5-Year Net</span>
            <strong>{formatCurrency(summary.fiveYearNet)}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

function CashOutVsHelocHeloanTool() {
  const [homeValue, setHomeValue] = useState(1000000);
  const [currentBalance, setCurrentBalance] = useState(540000);
  const [cashNeeded, setCashNeeded] = useState(120000);
  const [cashOutRate, setCashOutRate] = useState(6.9);
  const [helocRate, setHelocRate] = useState(8.4);
  const [heloanRate, setHeloanRate] = useState(8.1);
  const [cashOutCostPercent, setCashOutCostPercent] = useState(2.5);
  const [helocCostPercent, setHelocCostPercent] = useState(1.5);
  const [heloanCostPercent, setHeloanCostPercent] = useState(1.5);
  const [helocDrawYears, setHelocDrawYears] = useState(10);
  const [helocRepayYears, setHelocRepayYears] = useState(20);

  const summary = useMemo(() => {
    const cashOutFees =
      (currentBalance + cashNeeded) * (cashOutCostPercent / 100);
    const cashOutLoan = currentBalance + cashNeeded + cashOutFees;
    const cashOutPayment = calculateMortgagePayment({
      loanAmount: cashOutLoan,
      annualRate: cashOutRate,
      termYears: 30,
    });
    const helocFees = cashNeeded * (helocCostPercent / 100);
    const heloanFees = cashNeeded * (heloanCostPercent / 100);
    const helocDrawPayment = (cashNeeded * helocRate) / 1200;
    const helocRepaymentPayment = calculateMortgagePayment({
      loanAmount: cashNeeded,
      annualRate: helocRate,
      termYears: helocRepayYears,
    });
    const helocTotalCost =
      helocDrawPayment * helocDrawYears * 12 +
      helocRepaymentPayment * helocRepayYears * 12 +
      helocFees;
    const heloanPayment = calculateMortgagePayment({
      loanAmount: cashNeeded + heloanFees,
      annualRate: heloanRate,
      termYears: 20,
    });
    const heloanTotalCost = heloanPayment * 20 * 12;
    const cashOutTotalCost = cashOutPayment * 30 * 12;
    const equityAfter = Math.max(0, homeValue - (currentBalance + cashNeeded));

    return [
      {
        label: "Cash-Out Refinance",
        payment: cashOutPayment,
        notes: `30-year payment, fees: ${formatCurrency(cashOutFees)}, total est: ${formatCurrency(cashOutTotalCost)}`,
      },
      {
        label: "HELOC (Draw Phase)",
        payment: helocDrawPayment,
        notes: `${helocDrawYears}-year interest-only draw`,
      },
      {
        label: "HELOC (Repayment Phase)",
        payment: helocRepaymentPayment,
        notes: `${helocRepayYears}-year amortized repayment, fees: ${formatCurrency(helocFees)}, total est: ${formatCurrency(helocTotalCost)}`,
      },
      {
        label: "HELOAN",
        payment: heloanPayment,
        notes: `20-year fixed second lien, fees: ${formatCurrency(heloanFees)}, total est: ${formatCurrency(heloanTotalCost)}`,
      },
      {
        label: "Estimated Remaining Equity",
        payment: equityAfter,
        notes: "Home value minus current balance and cash extracted",
      },
    ];
  }, [
    homeValue,
    currentBalance,
    cashNeeded,
    cashOutRate,
    helocRate,
    heloanRate,
    cashOutCostPercent,
    helocCostPercent,
    heloanCostPercent,
    helocDrawYears,
    helocRepayYears,
  ]);

  return (
    <div className="tool-layout">
      <form className="tool-form" onSubmit={(event) => event.preventDefault()}>
        <NumberField
          label="Home Value"
          value={homeValue}
          onChange={setHomeValue}
          step={1000}
          format="currency"
        />
        <NumberField
          label="Current Mortgage Balance"
          value={currentBalance}
          onChange={setCurrentBalance}
          step={1000}
          format="currency"
        />
        <NumberField
          label="Cash Needed"
          value={cashNeeded}
          onChange={setCashNeeded}
          step={1000}
          format="currency"
        />
        <NumberField
          label="Cash-Out Rate (%)"
          value={cashOutRate}
          onChange={setCashOutRate}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="HELOC Rate (%)"
          value={helocRate}
          onChange={setHelocRate}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="HELOAN Rate (%)"
          value={heloanRate}
          onChange={setHeloanRate}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="Cash-Out Costs (%)"
          value={cashOutCostPercent}
          onChange={(next) => setCashOutCostPercent(clamp(next, 0, 6))}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="HELOC Costs (%)"
          value={helocCostPercent}
          onChange={(next) => setHelocCostPercent(clamp(next, 0, 6))}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="HELOAN Costs (%)"
          value={heloanCostPercent}
          onChange={(next) => setHeloanCostPercent(clamp(next, 0, 6))}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="HELOC Draw Years"
          value={helocDrawYears}
          onChange={(next) => setHelocDrawYears(clamp(next, 1, 15))}
          min={1}
        />
        <NumberField
          label="HELOC Repay Years"
          value={helocRepayYears}
          onChange={(next) => setHelocRepayYears(clamp(next, 5, 30))}
          min={5}
        />
      </form>

      <div className="tool-results">
        <h3>Option Snapshot</h3>
        <ul className="tool-kpis">
          {summary.map((row) => (
            <li key={row.label}>
              <span>
                {row.label}
                <small>{row.notes}</small>
              </span>
              <strong>{formatCurrency(row.payment)}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ArmVsFixedTool() {
  const [loanAmount, setLoanAmount] = useState(760000);
  const [fixedRate, setFixedRate] = useState(6.75);
  const [armIntroRate, setArmIntroRate] = useState(5.95);
  const [armAdjustedRate, setArmAdjustedRate] = useState(7.85);
  const [armAnnualCap, setArmAnnualCap] = useState(2);
  const [armLifetimeCap, setArmLifetimeCap] = useState(6);
  const [armIntroYears, setArmIntroYears] = useState(5);
  const [termYears, setTermYears] = useState(30);

  const summary = useMemo(() => {
    const fixedPayment = calculateMortgagePayment({
      loanAmount,
      annualRate: fixedRate,
      termYears,
    });

    const introPayment = calculateMortgagePayment({
      loanAmount,
      annualRate: armIntroRate,
      termYears,
    });

    const annualCapRate = armIntroRate + armAnnualCap;
    const lifetimeCapRate = armIntroRate + armLifetimeCap;
    const cappedAdjustedRate = Math.min(
      Math.max(armAdjustedRate, 0),
      annualCapRate,
      lifetimeCapRate,
    );

    const remainingBalance = remainingMortgageBalance(
      loanAmount,
      armIntroRate,
      termYears,
      armIntroYears * 12,
    );
    const remainingYears = Math.max(1, termYears - armIntroYears);
    const adjustedPayment = calculateMortgagePayment({
      loanAmount: remainingBalance,
      annualRate: cappedAdjustedRate,
      termYears: remainingYears,
    });

    const firstFiveFixed = fixedPayment * armIntroYears * 12;
    const firstFiveArm = introPayment * armIntroYears * 12;

    return {
      fixedPayment,
      introPayment,
      cappedAdjustedRate,
      adjustedPayment,
      firstFiveSavings: firstFiveFixed - firstFiveArm,
    };
  }, [
    loanAmount,
    fixedRate,
    armIntroRate,
    armAdjustedRate,
    armAnnualCap,
    armLifetimeCap,
    armIntroYears,
    termYears,
  ]);

  return (
    <div className="tool-layout">
      <form className="tool-form" onSubmit={(event) => event.preventDefault()}>
        <NumberField
          label="Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          step={1000}
          format="currency"
        />
        <NumberField
          label="Fixed Rate (%)"
          value={fixedRate}
          onChange={setFixedRate}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="ARM Intro Rate (%)"
          value={armIntroRate}
          onChange={setArmIntroRate}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="ARM Adjusted Rate (%)"
          value={armAdjustedRate}
          onChange={setArmAdjustedRate}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="ARM Annual Cap (%)"
          value={armAnnualCap}
          onChange={(next) => setArmAnnualCap(clamp(next, 0, 5))}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="ARM Lifetime Cap (%)"
          value={armLifetimeCap}
          onChange={(next) => setArmLifetimeCap(clamp(next, 0, 10))}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="ARM Intro Years"
          value={armIntroYears}
          onChange={setArmIntroYears}
          min={1}
        />
        <NumberField
          label="Loan Term (years)"
          value={termYears}
          onChange={setTermYears}
          min={5}
        />
      </form>

      <div className="tool-results">
        <h3>Rate-Type Comparison</h3>
        <ul className="tool-kpis">
          <li>
            <span>Fixed Monthly Payment</span>
            <strong>{formatCurrency(summary.fixedPayment)}</strong>
          </li>
          <li>
            <span>ARM Intro Payment</span>
            <strong>{formatCurrency(summary.introPayment)}</strong>
          </li>
          <li>
            <span>ARM Adjusted Payment</span>
            <strong>{formatCurrency(summary.adjustedPayment)}</strong>
          </li>
          <li>
            <span>Capped ARM Adjusted Rate</span>
            <strong>{summary.cappedAdjustedRate.toFixed(2)}%</strong>
          </li>
          <li>
            <span>First {armIntroYears} Years ARM Advantage</span>
            <strong>{formatCurrency(summary.firstFiveSavings)}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SelfEmployedAffordabilityTool() {
  const [yearOneNetIncome, setYearOneNetIncome] = useState(240000);
  const [yearTwoNetIncome, setYearTwoNetIncome] = useState(260000);
  const [selfEmploymentTaxAdjustment, setSelfEmploymentTaxAdjustment] =
    useState(14.13);
  const [otherDebtPayments, setOtherDebtPayments] = useState(1800);
  const [dtiLimit, setDtiLimit] = useState(50);
  const [downPayment, setDownPayment] = useState(220000);
  const [estimatedRate, setEstimatedRate] = useState(7.25);
  const [termYears, setTermYears] = useState(30);

  const summary = useMemo(() => {
    const annualAverageNetIncome = (yearOneNetIncome + yearTwoNetIncome) / 2;
    const qualifyingIncome =
      (annualAverageNetIncome * (1 - selfEmploymentTaxAdjustment / 100)) / 12;
    const maxHousing = Math.max(
      0,
      qualifyingIncome * (dtiLimit / 100) - otherDebtPayments,
    );
    const estimatedLoan =
      (maxHousing /
        calculateMortgagePayment({
          loanAmount: 100000,
          annualRate: estimatedRate,
          termYears,
        })) *
      100000;
    const estimatedHomePrice = estimatedLoan + downPayment;
    const downPaymentPercent =
      estimatedHomePrice > 0 ? (downPayment / estimatedHomePrice) * 100 : 0;

    return {
      annualAverageNetIncome,
      qualifyingIncome,
      maxHousing,
      estimatedLoan,
      estimatedHomePrice,
      downPaymentPercent,
      needsHigherDownPayment: downPaymentPercent < 20,
    };
  }, [
    yearOneNetIncome,
    yearTwoNetIncome,
    selfEmploymentTaxAdjustment,
    otherDebtPayments,
    dtiLimit,
    downPayment,
    estimatedRate,
    termYears,
  ]);

  return (
    <div className="tool-layout">
      <form className="tool-form" onSubmit={(event) => event.preventDefault()}>
        <NumberField
          label="Year 1 Annual Business Net Income"
          value={yearOneNetIncome}
          onChange={setYearOneNetIncome}
          step={1000}
          format="currency"
        />
        <NumberField
          label="Year 2 Annual Business Net Income"
          value={yearTwoNetIncome}
          onChange={setYearTwoNetIncome}
          step={1000}
          format="currency"
        />
        <NumberField
          label="SE Tax Adjustment (%)"
          value={selfEmploymentTaxAdjustment}
          onChange={(next) =>
            setSelfEmploymentTaxAdjustment(clamp(next, 0, 30))
          }
          step={0.1}
          format="percent"
        />
        <NumberField
          label="Other Monthly Debt Payments"
          value={otherDebtPayments}
          onChange={setOtherDebtPayments}
          step={50}
          format="currency"
        />
        <NumberField
          label="Target Max DTI (%)"
          value={dtiLimit}
          onChange={(next) => setDtiLimit(clamp(next, 25, 60))}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="Down Payment"
          value={downPayment}
          onChange={setDownPayment}
          step={1000}
          format="currency"
        />
        <NumberField
          label="Estimated Rate (%)"
          value={estimatedRate}
          onChange={(next) => setEstimatedRate(clamp(next, 0, 20))}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="Term (years)"
          value={termYears}
          onChange={(next) => setTermYears(clamp(next, 10, 40))}
        />
      </form>

      <div className="tool-results">
        <h3>Affordability Estimate</h3>
        <ul className="tool-kpis">
          <li>
            <span>2-Year Average Annual Net Income</span>
            <strong>{formatCurrency(summary.annualAverageNetIncome)}</strong>
          </li>
          <li>
            <span>Estimated Qualifying Income</span>
            <strong>{formatCurrency(summary.qualifyingIncome)}</strong>
          </li>
          <li>
            <span>Estimated Housing Budget</span>
            <strong>{formatCurrency(summary.maxHousing)}</strong>
          </li>
          <li>
            <span>Estimated Loan Size</span>
            <strong>{formatCurrency(summary.estimatedLoan)}</strong>
          </li>
          <li>
            <span>Estimated Home Price</span>
            <strong>{formatCurrency(summary.estimatedHomePrice)}</strong>
          </li>
          <li>
            <span>Down Payment Ratio</span>
            <strong>{summary.downPaymentPercent.toFixed(1)}%</strong>
          </li>
          <li>
            <span>Qualification Guidance</span>
            <strong>
              {summary.needsHigherDownPayment
                ? "Self-employed scenarios often require 20%+ down"
                : "Down payment aligns with common self-employed thresholds"}
            </strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

function DscrTool() {
  const [propertyType, setPropertyType] = useState<
    "residential" | "commercial" | "condo"
  >("residential");
  const [monthlyRent, setMonthlyRent] = useState(6200);
  const [principalInterest, setPrincipalInterest] = useState(4100);
  const [propertyTax, setPropertyTax] = useState(780);
  const [insurance, setInsurance] = useState(190);
  const [hoa, setHoa] = useState(220);
  const [vacancyPercent, setVacancyPercent] = useState(5);
  const [maintenancePercent, setMaintenancePercent] = useState(1);
  const [propertyMgmtPercent, setPropertyMgmtPercent] = useState(8.5);
  const [capexPercent, setCapexPercent] = useState(1.5);

  const summary = useMemo(() => {
    const adjustedRent = monthlyRent * (1 - vacancyPercent / 100);
    const maintenanceReserve = monthlyRent * (maintenancePercent / 100);
    const propertyMgmtReserve = monthlyRent * (propertyMgmtPercent / 100);
    const capexReserve = monthlyRent * (capexPercent / 100);
    const applicableHoa = propertyType === "residential" ? 0 : hoa;
    const monthlyObligations =
      principalInterest +
      propertyTax +
      insurance +
      applicableHoa +
      maintenanceReserve +
      propertyMgmtReserve +
      capexReserve;
    const ratio =
      monthlyObligations > 0 ? adjustedRent / monthlyObligations : 0;
    let grade = "Strong (exceeds standard)";
    if (ratio < 1) {
      grade = "Below 1.00 (typically non-qualifying)";
    } else if (ratio < 1.2) {
      grade = "Marginal (1.20 is common minimum target)";
    } else if (ratio < 1.25) {
      grade = "Qualifying (meets common baseline)";
    }

    return {
      adjustedRent,
      maintenanceReserve,
      propertyMgmtReserve,
      capexReserve,
      applicableHoa,
      monthlyObligations,
      ratio,
      grade,
    };
  }, [
    propertyType,
    monthlyRent,
    principalInterest,
    propertyTax,
    insurance,
    hoa,
    vacancyPercent,
    maintenancePercent,
    propertyMgmtPercent,
    capexPercent,
  ]);

  return (
    <div className="tool-layout">
      <form className="tool-form" onSubmit={(event) => event.preventDefault()}>
        <label className="tool-field">
          <span>Property Type</span>
          <select
            value={propertyType}
            onChange={(event) =>
              setPropertyType(
                event.target.value as "residential" | "commercial" | "condo",
              )
            }
          >
            <option value="residential">Residential Rental</option>
            <option value="commercial">Commercial</option>
            <option value="condo">Condo / HOA Property</option>
          </select>
        </label>
        <NumberField
          label="Monthly Rent"
          value={monthlyRent}
          onChange={setMonthlyRent}
          step={50}
          format="currency"
        />
        <NumberField
          label="Principal & Interest"
          value={principalInterest}
          onChange={setPrincipalInterest}
          step={50}
          format="currency"
        />
        <NumberField
          label="Property Tax"
          value={propertyTax}
          onChange={setPropertyTax}
          step={10}
          format="currency"
        />
        <NumberField
          label="Insurance"
          value={insurance}
          onChange={setInsurance}
          step={10}
          format="currency"
        />
        {propertyType !== "residential" ? (
          <NumberField
            label="HOA"
            value={hoa}
            onChange={setHoa}
            step={10}
            format="currency"
          />
        ) : null}
        <NumberField
          label="Vacancy Buffer (%)"
          value={vacancyPercent}
          onChange={(next) => setVacancyPercent(clamp(next, 0, 20))}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="Maintenance Reserve (%)"
          value={maintenancePercent}
          onChange={(next) => setMaintenancePercent(clamp(next, 0, 5))}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="Property Mgmt Reserve (%)"
          value={propertyMgmtPercent}
          onChange={(next) => setPropertyMgmtPercent(clamp(next, 0, 20))}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="CapEx Reserve (%)"
          value={capexPercent}
          onChange={(next) => setCapexPercent(clamp(next, 0, 10))}
          step={0.1}
          format="percent"
        />
      </form>

      <div className="tool-results">
        <h3>DSCR Result</h3>
        <ul className="tool-kpis">
          <li>
            <span>Adjusted Rent</span>
            <strong>{formatCurrency(summary.adjustedRent)}</strong>
          </li>
          <li>
            <span>Maintenance Reserve</span>
            <strong>{formatCurrency(summary.maintenanceReserve)}</strong>
          </li>
          <li>
            <span>Property Mgmt Reserve</span>
            <strong>{formatCurrency(summary.propertyMgmtReserve)}</strong>
          </li>
          <li>
            <span>CapEx Reserve</span>
            <strong>{formatCurrency(summary.capexReserve)}</strong>
          </li>
          <li>
            <span>Applicable HOA</span>
            <strong>{formatCurrency(summary.applicableHoa)}</strong>
          </li>
          <li>
            <span>Monthly Obligations</span>
            <strong>{formatCurrency(summary.monthlyObligations)}</strong>
          </li>
          <li>
            <span>DSCR Ratio</span>
            <strong>{round(summary.ratio, 2).toFixed(2)}</strong>
          </li>
          <li>
            <span>Guidance</span>
            <strong>{summary.grade}</strong>
          </li>
          <li>
            <span>Common Target</span>
            <strong>1.20+ DSCR</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

function DebtConsolidationTool() {
  const [currentDebtBalance, setCurrentDebtBalance] = useState(90000);
  const [currentDebtRate, setCurrentDebtRate] = useState(19.5);
  const [currentDebtTerm, setCurrentDebtTerm] = useState(6);
  const [equityRate, setEquityRate] = useState(8.25);
  const [equityTerm, setEquityTerm] = useState(15);
  const [fees, setFees] = useState(2500);

  const summary = useMemo(() => {
    const currentPayment = calculateMortgagePayment({
      loanAmount: currentDebtBalance,
      annualRate: currentDebtRate,
      termYears: currentDebtTerm,
    });
    const newBalance = currentDebtBalance + fees;
    const equityPayment = calculateMortgagePayment({
      loanAmount: newBalance,
      annualRate: equityRate,
      termYears: equityTerm,
    });
    const currentInterest = totalMortgageInterest({
      loanAmount: currentDebtBalance,
      annualRate: currentDebtRate,
      termYears: currentDebtTerm,
    });
    const equityInterest = totalMortgageInterest({
      loanAmount: newBalance,
      annualRate: equityRate,
      termYears: equityTerm,
    });

    return {
      currentPayment,
      equityPayment,
      monthlyDifference: currentPayment - equityPayment,
      fiveYearDifference: (currentPayment - equityPayment) * 60,
      currentInterest,
      equityInterest,
      interestDifference: currentInterest - equityInterest,
      termExtensionYears: Math.max(0, equityTerm - currentDebtTerm),
    };
  }, [
    currentDebtBalance,
    currentDebtRate,
    currentDebtTerm,
    equityRate,
    equityTerm,
    fees,
  ]);

  return (
    <div className="tool-layout">
      <form className="tool-form" onSubmit={(event) => event.preventDefault()}>
        <NumberField
          label="Current Debt Balance"
          value={currentDebtBalance}
          onChange={setCurrentDebtBalance}
          step={500}
          format="currency"
        />
        <NumberField
          label="Current Debt Rate (%)"
          value={currentDebtRate}
          onChange={setCurrentDebtRate}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="Current Debt Payoff (years)"
          value={currentDebtTerm}
          onChange={setCurrentDebtTerm}
        />
        <NumberField
          label="Equity Loan Rate (%)"
          value={equityRate}
          onChange={setEquityRate}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="Equity Loan Term (years)"
          value={equityTerm}
          onChange={setEquityTerm}
        />
        <NumberField
          label="Fees"
          value={fees}
          onChange={setFees}
          step={100}
          format="currency"
        />
      </form>

      <div className="tool-results">
        <h3>Debt Consolidation Impact</h3>
        <ul className="tool-kpis">
          <li>
            <span>Current Payment</span>
            <strong>{formatCurrency(summary.currentPayment)}</strong>
          </li>
          <li>
            <span>Estimated Consolidated Payment</span>
            <strong>{formatCurrency(summary.equityPayment)}</strong>
          </li>
          <li>
            <span>Monthly Difference</span>
            <strong>{formatCurrency(summary.monthlyDifference)}</strong>
          </li>
          <li>
            <span>5-Year Difference</span>
            <strong>{formatCurrency(summary.fiveYearDifference)}</strong>
          </li>
          <li>
            <span>Total Interest (Current Debt)</span>
            <strong>{formatCurrency(summary.currentInterest)}</strong>
          </li>
          <li>
            <span>Total Interest (Consolidated)</span>
            <strong>{formatCurrency(summary.equityInterest)}</strong>
          </li>
          <li>
            <span>Interest Difference</span>
            <strong>{formatCurrency(summary.interestDifference)}</strong>
          </li>
          <li>
            <span>Term Extension</span>
            <strong>
              {summary.termExtensionYears > 0
                ? `${summary.termExtensionYears} years longer than current payoff`
                : "No extension"}
            </strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

function RateBuydownTool() {
  const [loanAmount, setLoanAmount] = useState(740000);
  const [marketRate, setMarketRate] = useState(6.75);
  const [termYears, setTermYears] = useState(30);
  const [points, setPoints] = useState(1.25);
  const [rateReductionPerPoint, setRateReductionPerPoint] = useState(0.25);
  const [buydownType, setBuydownType] = useState<"permanent" | "2-1" | "3-2-1">(
    "permanent",
  );

  const summary = useMemo(() => {
    const basePayment = calculateMortgagePayment({
      loanAmount,
      annualRate: marketRate,
      termYears,
    });
    const reducedRate = Math.max(
      0,
      marketRate - points * rateReductionPerPoint,
    );
    const permanentPayment = calculateMortgagePayment({
      loanAmount,
      annualRate: reducedRate,
      termYears,
    });
    const tempReductionYearOne = buydownType === "3-2-1" ? 3 : 2;
    const tempReductionYearTwo = buydownType === "3-2-1" ? 2 : 1;
    const tempReductionYearThree = buydownType === "3-2-1" ? 1 : 0;
    const tempYearOne = calculateMortgagePayment({
      loanAmount,
      annualRate: Math.max(0, marketRate - tempReductionYearOne),
      termYears,
    });
    const tempYearTwo = calculateMortgagePayment({
      loanAmount,
      annualRate: Math.max(0, marketRate - tempReductionYearTwo),
      termYears,
    });
    const tempYearThree = calculateMortgagePayment({
      loanAmount,
      annualRate: Math.max(0, marketRate - tempReductionYearThree),
      termYears,
    });
    const pointsCost = loanAmount * (points / 100);
    const monthlyPermanentSavings = basePayment - permanentPayment;
    const breakEvenMonths =
      monthlyPermanentSavings > 0
        ? pointsCost / monthlyPermanentSavings
        : Number.POSITIVE_INFINITY;

    return {
      basePayment,
      permanentPayment,
      tempYearOne,
      tempYearTwo,
      tempYearThree,
      pointsCost,
      breakEvenMonths,
      buydownType,
    };
  }, [
    loanAmount,
    marketRate,
    termYears,
    points,
    rateReductionPerPoint,
    buydownType,
  ]);

  return (
    <div className="tool-layout">
      <form className="tool-form" onSubmit={(event) => event.preventDefault()}>
        <label className="tool-field">
          <span>Buydown Type</span>
          <select
            value={buydownType}
            onChange={(event) =>
              setBuydownType(
                event.target.value as "permanent" | "2-1" | "3-2-1",
              )
            }
          >
            <option value="permanent">Permanent (Points)</option>
            <option value="2-1">Temporary 2-1</option>
            <option value="3-2-1">Temporary 3-2-1</option>
          </select>
        </label>
        <NumberField
          label="Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          step={1000}
          format="currency"
        />
        <NumberField
          label="Market/Contract Rate (%)"
          value={marketRate}
          onChange={setMarketRate}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="Points Purchased (%)"
          value={points}
          onChange={(next) => setPoints(clamp(next, 0, 5))}
          step={0.05}
          format="percent"
        />
        <NumberField
          label="Rate Reduction Per Point (%)"
          value={rateReductionPerPoint}
          onChange={(next) => setRateReductionPerPoint(clamp(next, 0.05, 0.5))}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="Loan Term (years)"
          value={termYears}
          onChange={setTermYears}
          min={5}
        />
      </form>

      <div className="tool-results">
        <h3>Buydown Impact</h3>
        <ul className="tool-kpis">
          <li>
            <span>Base Payment</span>
            <strong>{formatCurrency(summary.basePayment)}</strong>
          </li>
          <li>
            <span>Permanent Buydown Payment</span>
            <strong>{formatCurrency(summary.permanentPayment)}</strong>
          </li>
          <li>
            <span>{summary.buydownType} Year 1 Payment</span>
            <strong>{formatCurrency(summary.tempYearOne)}</strong>
          </li>
          <li>
            <span>{summary.buydownType} Year 2 Payment</span>
            <strong>{formatCurrency(summary.tempYearTwo)}</strong>
          </li>
          {summary.buydownType === "3-2-1" ? (
            <li>
              <span>3-2-1 Year 3 Payment</span>
              <strong>{formatCurrency(summary.tempYearThree)}</strong>
            </li>
          ) : null}
          <li>
            <span>Points Cost</span>
            <strong>{formatCurrency(summary.pointsCost)}</strong>
          </li>
          <li>
            <span>Permanent Break-Even</span>
            <strong>
              {Number.isFinite(summary.breakEvenMonths)
                ? `${Math.ceil(summary.breakEvenMonths)} months`
                : "No break-even"}
            </strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

function RentVsBuyTool() {
  const [rentMonthly, setRentMonthly] = useState(4300);
  const [rentGrowth, setRentGrowth] = useState(4);
  const [homePrice, setHomePrice] = useState(900000);
  const [downPayment, setDownPayment] = useState(180000);
  const [rate, setRate] = useState(6.7);
  const [tax, setTax] = useState(880);
  const [insurance, setInsurance] = useState(170);
  const [hoa, setHoa] = useState(0);
  const [maintenancePercent, setMaintenancePercent] = useState(1);
  const [taxGrowthRate, setTaxGrowthRate] = useState(1.5);
  const [insuranceGrowthRate, setInsuranceGrowthRate] = useState(4);
  const [appreciation, setAppreciation] = useState(3.5);
  const [sellingCostPercent, setSellingCostPercent] = useState(6.5);
  const [downPaymentReturn, setDownPaymentReturn] = useState(7);
  const [years, setYears] = useState(7);

  const summary = useMemo(() => {
    const loanAmount = Math.max(0, homePrice - downPayment);
    const mortgage = calculateMortgagePayment({
      loanAmount,
      annualRate: rate,
      termYears: 30,
    });
    let rentTotal = 0;
    let buyTotal = downPayment;
    let currentRent = rentMonthly;
    let currentTax = tax;
    let currentInsurance = insurance;
    const maintenanceMonthly = (homePrice * (maintenancePercent / 100)) / 12;

    for (let index = 0; index < years; index += 1) {
      rentTotal += currentRent * 12;
      const buyMonthly =
        mortgage + currentTax + currentInsurance + hoa + maintenanceMonthly;
      buyTotal += buyMonthly * 12;
      currentRent *= 1 + rentGrowth / 100;
      currentTax *= 1 + taxGrowthRate / 100;
      currentInsurance *= 1 + insuranceGrowthRate / 100;
    }

    const appreciatedValue =
      homePrice * Math.pow(1 + appreciation / 100, years);
    const remainingLoan = remainingMortgageBalance(
      loanAmount,
      rate,
      30,
      years * 12,
    );
    const sellCosts = appreciatedValue * (sellingCostPercent / 100);
    const equity = Math.max(0, appreciatedValue - remainingLoan - sellCosts);
    const buyNetOutflow = buyTotal - equity;
    const renterInvestmentGrowth =
      downPayment * (Math.pow(1 + downPaymentReturn / 100, years) - 1);
    const rentNetOutflow = rentTotal - renterInvestmentGrowth;

    return {
      rentTotal,
      rentNetOutflow,
      buyTotal,
      maintenanceMonthly,
      sellCosts,
      equity,
      buyNetOutflow,
      renterInvestmentGrowth,
      netAdvantage: rentNetOutflow - buyNetOutflow,
    };
  }, [
    rentMonthly,
    rentGrowth,
    homePrice,
    downPayment,
    rate,
    tax,
    insurance,
    hoa,
    maintenancePercent,
    taxGrowthRate,
    insuranceGrowthRate,
    appreciation,
    sellingCostPercent,
    downPaymentReturn,
    years,
  ]);

  return (
    <div className="tool-layout">
      <form className="tool-form" onSubmit={(event) => event.preventDefault()}>
        <NumberField
          label="Current Monthly Rent"
          value={rentMonthly}
          onChange={setRentMonthly}
          step={50}
          format="currency"
        />
        <NumberField
          label="Rent Growth (%)"
          value={rentGrowth}
          onChange={setRentGrowth}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="Home Price"
          value={homePrice}
          onChange={setHomePrice}
          step={1000}
          format="currency"
        />
        <NumberField
          label="Down Payment"
          value={downPayment}
          onChange={setDownPayment}
          step={1000}
          format="currency"
        />
        <NumberField
          label="Rate (%)"
          value={rate}
          onChange={setRate}
          step={0.01}
          format="percent"
        />
        <NumberField
          label="Property Tax / month"
          value={tax}
          onChange={setTax}
          step={10}
          format="currency"
        />
        <NumberField
          label="Insurance / month"
          value={insurance}
          onChange={setInsurance}
          step={10}
          format="currency"
        />
        <NumberField
          label="HOA / month"
          value={hoa}
          onChange={setHoa}
          step={10}
          format="currency"
        />
        <NumberField
          label="Maintenance (% of home value/yr)"
          value={maintenancePercent}
          onChange={(next) => setMaintenancePercent(clamp(next, 0, 3))}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="Property Tax Growth (%)"
          value={taxGrowthRate}
          onChange={(next) => setTaxGrowthRate(clamp(next, 0, 10))}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="Insurance Growth (%)"
          value={insuranceGrowthRate}
          onChange={(next) => setInsuranceGrowthRate(clamp(next, 0, 15))}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="Home Appreciation (%)"
          value={appreciation}
          onChange={setAppreciation}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="Selling Costs (%)"
          value={sellingCostPercent}
          onChange={(next) => setSellingCostPercent(clamp(next, 4, 10))}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="If Renting: Down Payment Return (%)"
          value={downPaymentReturn}
          onChange={(next) => setDownPaymentReturn(clamp(next, 0, 15))}
          step={0.1}
          format="percent"
        />
        <NumberField
          label="Hold Period (years)"
          value={years}
          onChange={(next) => setYears(clamp(next, 1, 15))}
          min={1}
        />
      </form>

      <div className="tool-results">
        <h3>Rent vs Buy Snapshot</h3>
        <ul className="tool-kpis">
          <li>
            <span>Total Rent Paid</span>
            <strong>{formatCurrency(summary.rentTotal)}</strong>
          </li>
          <li>
            <span>Renter Down Payment Growth</span>
            <strong>{formatCurrency(summary.renterInvestmentGrowth)}</strong>
          </li>
          <li>
            <span>Rent Net Outflow</span>
            <strong>{formatCurrency(summary.rentNetOutflow)}</strong>
          </li>
          <li>
            <span>Total Buy Outflow</span>
            <strong>{formatCurrency(summary.buyTotal)}</strong>
          </li>
          <li>
            <span>Maintenance / month</span>
            <strong>{formatCurrency(summary.maintenanceMonthly)}</strong>
          </li>
          <li>
            <span>Estimated Selling Costs</span>
            <strong>{formatCurrency(summary.sellCosts)}</strong>
          </li>
          <li>
            <span>Estimated Equity</span>
            <strong>{formatCurrency(summary.equity)}</strong>
          </li>
          <li>
            <span>Buy Net Outflow</span>
            <strong>{formatCurrency(summary.buyNetOutflow)}</strong>
          </li>
          <li>
            <span>Buy vs Rent Advantage</span>
            <strong>{formatCurrency(summary.netAdvantage)}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

function renderToolById(toolId: ToolId) {
  switch (toolId) {
    case "term-comparison":
      return <TermComparisonTool />;
    case "refinance-breakeven":
      return <RefinanceBreakEvenTool />;
    case "cash-out-vs-heloc-heloan":
      return <CashOutVsHelocHeloanTool />;
    case "arm-vs-fixed":
      return <ArmVsFixedTool />;
    case "self-employed-affordability":
      return <SelfEmployedAffordabilityTool />;
    case "dscr":
      return <DscrTool />;
    case "debt-consolidation-savings":
      return <DebtConsolidationTool />;
    case "rate-buydown":
      return <RateBuydownTool />;
    case "rent-vs-buy":
      return <RentVsBuyTool />;
    default:
      return null;
  }
}

interface CalculatorToolProps {
  toolId: ToolId;
}

function CalculatorTool({ toolId }: CalculatorToolProps) {
  const tool = findToolById(toolId);

  return (
    <section className="tool-page-section">
      <header className="tool-page-header">
        <p className="tool-page-kicker">Mortgage Tools</p>
        <h1>{tool.title}</h1>
        <p>{tool.description}</p>
      </header>

      {tool.headerImageSrc ? (
        <div
          className="tool-page-hero"
          style={{ backgroundImage: `url(${assetPath(tool.headerImageSrc)})` }}
          role="img"
          aria-label={tool.headerImageAlt ?? `${tool.title} infographic`}
        />
      ) : null}

      {renderToolById(toolId)}

      <aside className="tool-assumptions">
        <h3>Assumptions</h3>
        <p>
          This is an estimate tool. Actual eligibility, pricing, and final
          payment structure may vary by loan program, borrower profile, and
          lender overlays.
        </p>
      </aside>

      <div className="tool-cta-block">
        <h3>Want a custom scenario review?</h3>
        <p>
          Share your numbers and goals. Kinnect Capital can structure options
          around your income profile, property, and timeline.
        </p>
        <Link to={ROUTES.contact}>Talk to Arthur</Link>
      </div>
    </section>
  );
}

export default CalculatorTool;
