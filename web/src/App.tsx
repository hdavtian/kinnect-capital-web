import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import AboutPage from "./pages/AboutPage";
import BuyHomePage from "./pages/BuyHomePage";
import CommercialFinancingPage from "./pages/CommercialFinancingPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import HomeValuationPage from "./pages/HomeValuationPage";
import MortgageCalculatorPage from "./pages/MortgageCalculatorPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RefinancePage from "./pages/RefinancePage";
import ResidentialOptionsPage from "./pages/ResidentialOptionsPage";
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
          <Route
            path={ROUTES.calculator}
            element={<MortgageCalculatorPage />}
          />
          <Route path={ROUTES.valuation} element={<HomeValuationPage />} />
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path={ROUTES.privacy} element={<PrivacyPolicyPage />} />
          <Route path={ROUTES.terms} element={<TermsOfUsePage />} />
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
