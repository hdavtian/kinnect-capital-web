import { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import residentialLoanOptions from "../data/residentialLoanOptions.json";
import ResidentialOptionCard, {
  type ResidentialOptionItem,
} from "../features/residential-options/ResidentialOptionCard";
import "../features/residential-options/ResidentialOptions.css";

function ResidentialOptionsPage() {
  const residentialItems = useMemo(
    () => residentialLoanOptions as ResidentialOptionItem[],
    [],
  );
  const [activeSectionId, setActiveSectionId] = useState(
    residentialItems[0]?.id ?? "",
  );

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();

    const section = document.getElementById(id);
    if (!section) {
      return;
    }

    const topOffset = 170;
    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY - topOffset;

    window.scrollTo({
      top: Math.max(0, sectionTop),
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${id}`);
    setActiveSectionId(id);
  };

  useEffect(() => {
    if (residentialItems.length === 0) {
      return;
    }

    const topOffset = 170;
    const boundaryHysteresis = 34;

    const getSectionOffsets = () =>
      residentialItems
        .map((item) => {
          const section = document.getElementById(item.id);
          return section
            ? {
                id: item.id,
                top: section.offsetTop,
              }
            : null;
        })
        .filter((entry): entry is { id: string; top: number } => entry !== null);

    let sectionOffsets = getSectionOffsets();
    let rafId = 0;

    const findIndexById = (id: string) =>
      Math.max(
        0,
        sectionOffsets.findIndex((entry) => entry.id === id),
      );

    let currentIndex = findIndexById(activeSectionId);

    const updateActiveFromScroll = () => {
      if (sectionOffsets.length === 0) {
        return;
      }

      const scrollPosition = window.scrollY + topOffset;
      while (
        currentIndex < sectionOffsets.length - 1 &&
        scrollPosition >= sectionOffsets[currentIndex + 1].top + boundaryHysteresis
      ) {
        currentIndex += 1;
      }

      while (
        currentIndex > 0 &&
        scrollPosition < sectionOffsets[currentIndex].top - boundaryHysteresis
      ) {
        currentIndex -= 1;
      }

      const nextActive = sectionOffsets[currentIndex].id;
      setActiveSectionId((prev) => (prev === nextActive ? prev : nextActive));
    };

    const requestUpdate = () => {
      if (rafId !== 0) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateActiveFromScroll();
      });
    };

    const handleResize = () => {
      sectionOffsets = getSectionOffsets();
      currentIndex = findIndexById(activeSectionId);
      requestUpdate();
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [residentialItems]);

  return (
    <section className="residential-options-section">
      <header className="residential-options-header">
        <h1>Residential Mortgage Products</h1>
        <p>
          Loan products for self-employed borrowers, investors, and complex
          income scenarios.
        </p>
      </header>

      <div className="residential-options-layout">
        <aside className="residential-options-toc" aria-label="On this page">
          <h2>On This Page</h2>
          <nav>
            <ul>
              {residentialItems.map((item) => (
                <li key={`toc-${item.id}`}>
                  <a
                    href={`#${item.id}`}
                    aria-current={
                      activeSectionId === item.id ? "true" : undefined
                    }
                    onClick={(event) => scrollToSection(event, item.id)}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="residential-options-grid">
          {residentialItems.map((item) => (
            <ResidentialOptionCard
              key={item.id}
              item={item}
              isActive={activeSectionId === item.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResidentialOptionsPage;
