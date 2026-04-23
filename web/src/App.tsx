import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import AboutPage from "./pages/AboutPage";
import ArmVsFixedPage from "./pages/ArmVsFixedPage";
import BuyHomePage from "./pages/BuyHomePage";
import CashOutVsHelocHeloanPage from "./pages/CashOutVsHelocHeloanPage";
import CommercialFinancingPage from "./pages/CommercialFinancingPage";
import ContactPage from "./pages/ContactPage";
import DebtConsolidationSavingsPage from "./pages/DebtConsolidationSavingsPage";
import DscrCalculatorPage from "./pages/DscrCalculatorPage";
import HomePage from "./pages/HomePage";
import HomeValuationPage from "./pages/HomeValuationPage";
import LoanTermComparisonPage from "./pages/LoanTermComparisonPage";
import MortgageCalculatorPage from "./pages/MortgageCalculatorPage";
import MortgageToolsPage from "./pages/MortgageToolsPage";
import NotFoundPage from "./pages/NotFoundPage";
import OrnamentPickerPage from "./pages/OrnamentPickerPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RateBuydownPage from "./pages/RateBuydownPage";
import RefinanceBreakEvenPage from "./pages/RefinanceBreakEvenPage";
import RefinancePage from "./pages/RefinancePage";
import RentVsBuyPage from "./pages/RentVsBuyPage";
import ResidentialOptionsPage from "./pages/ResidentialOptionsPage";
import SelfEmployedAffordabilityPage from "./pages/SelfEmployedAffordabilityPage";
import TeamPage from "./pages/TeamPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import { ROUTES } from "./routes";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.about} element={<AboutPage />} />
          <Route path={ROUTES.team} element={<TeamPage />} />
          <Route
            path={ROUTES.residential}
            element={<ResidentialOptionsPage />}
          />
          <Route
            path={ROUTES.commercial}
            element={<CommercialFinancingPage />}
          />
          <Route path={ROUTES.buyHome} element={<BuyHomePage />} />
          <Route path={ROUTES.refinance} element={<RefinancePage />} />
          <Route path={ROUTES.toolsHub} element={<MortgageToolsPage />} />
          <Route
            path={ROUTES.calculator}
            element={<MortgageCalculatorPage />}
          />
          <Route path={ROUTES.valuation} element={<HomeValuationPage />} />
          <Route
            path={ROUTES.termComparison}
            element={<LoanTermComparisonPage />}
          />
          <Route
            path={ROUTES.refinanceBreakeven}
            element={<RefinanceBreakEvenPage />}
          />
          <Route
            path={ROUTES.cashOutVsHelocHeloan}
            element={<CashOutVsHelocHeloanPage />}
          />
          <Route path={ROUTES.armVsFixed} element={<ArmVsFixedPage />} />
          <Route
            path={ROUTES.selfEmployedAffordability}
            element={<SelfEmployedAffordabilityPage />}
          />
          <Route path={ROUTES.dscr} element={<DscrCalculatorPage />} />
          <Route
            path={ROUTES.debtConsolidationSavings}
            element={<DebtConsolidationSavingsPage />}
          />
          <Route path={ROUTES.rateBuydown} element={<RateBuydownPage />} />
          <Route path={ROUTES.rentVsBuy} element={<RentVsBuyPage />} />
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path={ROUTES.privacy} element={<PrivacyPolicyPage />} />
          <Route path={ROUTES.terms} element={<TermsOfUsePage />} />
          <Route
            path={ROUTES.ornamentPicker}
            element={<OrnamentPickerPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route
          path="/index.html"
          element={<Navigate to={ROUTES.home} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
