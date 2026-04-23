import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function AppShell() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

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
