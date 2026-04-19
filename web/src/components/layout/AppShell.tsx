import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function AppShell() {
  return (
    <div className="site-shell">
      <Header />
      <div className="header-spacer" aria-hidden="true" />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppShell;
