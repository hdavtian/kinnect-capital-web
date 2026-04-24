import type { CSSProperties } from "react";
import { assetPath } from "../utils/assetPath";
import "./BannerExperimentPage.css";

type BannerVariant = {
  id: string;
  title: string;
  note: string;
  className: string;
  slogan?: string;
  sloganClass?: string;
};

type BannerCategory = {
  id: string;
  title: string;
  description: string;
  variantIds: string[];
};

const SHARED_BANNER_IMAGE = assetPath("/images/calculators/calculators.avif");

const BANNER_VARIANTS: BannerVariant[] = [
  {
    id: "V01",
    title: "Trust Vignette",
    note: "Soft edge vignette with subtle bottom density for headline safety.",
    className: "variant-trust-vignette",
  },
  {
    id: "V02",
    title: "Diagonal Finance Tint",
    note: "Diagonal accent wash using theme color to break stock-photo feel.",
    className: "variant-diagonal-tint",
    slogan: "CONFIDENCE IN EVERY BASIS POINT",
  },
  {
    id: "V03",
    title: "Double Frame",
    note: "Outer and inner frame for a premium report-style treatment.",
    className: "variant-double-frame",
  },
  {
    id: "V04",
    title: "Corner Brackets",
    note: "Minimal corner markers inspired by financial report callouts.",
    className: "variant-corner-brackets",
  },
  {
    id: "V05",
    title: "Ledger Grid",
    note: "Very light grid texture with disciplined lower overlay.",
    className: "variant-ledger-grid",
    slogan: "STRUCTURED LENDING. HUMAN GUIDANCE.",
  },
  {
    id: "V06",
    title: "Spotlight Fade",
    note: "Center spotlight with controlled side fade to direct focus.",
    className: "variant-spotlight-fade",
  },
  {
    id: "V07",
    title: "Top Ribbon",
    note: "Faint top ribbon band with accent keyline for brand posture.",
    className: "variant-top-ribbon",
  },
  {
    id: "V08",
    title: "Glass Panel",
    note: "Soft glass veil and border to elevate visual depth.",
    className: "variant-glass-panel",
    slogan: "RATE STRATEGY BUILT AROUND YOU",
  },
  {
    id: "V09",
    title: "Bottom Glow",
    note: "Low ambient glow anchored to accent hue for warmth.",
    className: "variant-bottom-glow",
  },
  {
    id: "V10",
    title: "Arc Mask",
    note: "Curved translucent mask to create a bespoke editorial look.",
    className: "variant-arc-mask",
  },
  {
    id: "V11",
    title: "All-Around Soft Fade",
    note: "Even edge fade from all sides with gentle center preservation.",
    className: "variant-allaround-soft",
  },
  {
    id: "V12",
    title: "All-Around Balanced Fade",
    note: "Balanced perimeter darkening to reduce generic stock-photo feel.",
    className: "variant-allaround-balanced",
  },
  {
    id: "V13",
    title: "All-Around Heavy Fade",
    note: "Stronger perimeter mask for dramatic emphasis and headline safety.",
    className: "variant-allaround-heavy",
  },
  {
    id: "V14",
    title: "All-Around Cool Tint",
    note: "Perimeter fade with cool accent tint and clean center image window.",
    className: "variant-allaround-cool",
  },
  {
    id: "V15",
    title: "All-Around Warm Tint",
    note: "Perimeter fade with warm-neutral cast for softer, advisory tone.",
    className: "variant-allaround-warm",
    slogan: "GUIDANCE THAT MOVES WITH THE MARKET",
  },
  {
    id: "V16",
    title: "Oval Window Mask",
    note: "Soft oval center reveal surrounded by controlled dark surround.",
    className: "variant-oval-window",
  },
  {
    id: "V17",
    title: "Diamond Fade Mask",
    note: "Geometric central clarity with diagonal edge fade pressure.",
    className: "variant-diamond-fade",
  },
  {
    id: "V18",
    title: "Soft Ring Mask",
    note: "Ring-like visual focus that keeps image detail in the middle third.",
    className: "variant-soft-ring",
  },
  {
    id: "V19",
    title: "Center Clear Periphery",
    note: "Crisp center window plus broad surrounding fade for copy overlays.",
    className: "variant-center-clear",
  },
  {
    id: "V20",
    title: "Four-Corner Fade",
    note: "Corner-only fade treatment to keep top and bottom center more open.",
    className: "variant-corner-fade",
  },
  {
    id: "V21",
    title: "Inset Financial Frame",
    note: "Inner line frame with subtle edge mask and audit-report character.",
    className: "variant-inset-financial",
  },
  {
    id: "V22",
    title: "Accent Side Rails",
    note: "Left-right accent rails with side fade to shape visual composition.",
    className: "variant-side-rails",
  },
  {
    id: "V23",
    title: "Triple Bottom Rule",
    note: "Layered bottom rules for a polished statement-banner feel.",
    className: "variant-triple-rule",
    slogan: "CLARITY FOR EVERY FINANCING PATH",
  },
  {
    id: "V24",
    title: "Vertical Ledger Bars",
    note: "Vertical patterning with subdued mask for structured financial styling.",
    className: "variant-ledger-bars",
  },
  {
    id: "V25",
    title: "Blueprint Hatch",
    note: "Fine hatch texture blended with top-down fade for depth.",
    className: "variant-blueprint-hatch",
  },
  {
    id: "V26",
    title: "Frosted Edge",
    note: "Soft bright edge veil that frames the artwork and lifts contrast.",
    className: "variant-frosted-edge",
  },
  {
    id: "V27",
    title: "Light Leak Corners",
    note: "Corner glow pulses balanced by low film fade to avoid harshness.",
    className: "variant-light-leak",
  },
  {
    id: "V28",
    title: "Dark Film Strip",
    note: "Letterbox-inspired edge treatment for cinematic confidence.",
    className: "variant-dark-film",
  },
  {
    id: "V29",
    title: "Spotlight Frame",
    note: "Spotlight center plus perimeter frame for premium card-like composition.",
    className: "variant-spotlight-frame",
  },
  {
    id: "V30",
    title: "Top-Bottom Arc Mask",
    note: "Curved top and bottom arc fades with light center readability.",
    className: "variant-arc-dual",
  },
  {
    id: "V31",
    title: "Split Tone Gradient",
    note: "Left-right tonal split and edge darkening for directional energy.",
    className: "variant-split-tone",
  },
  {
    id: "V32",
    title: "Cinematic Bands",
    note: "Top and bottom gradient bands with minimal center interruption.",
    className: "variant-cinematic-bands",
    slogan: "DISCIPLINE, SPEED, AND SMART STRUCTURE",
  },
  {
    id: "V33",
    title: "X-Cross Fade",
    note: "Cross directional fades to break uniformity while preserving focus.",
    className: "variant-x-cross",
  },
  {
    id: "V34",
    title: "Rounded Mask Window",
    note: "Rounded mask opening that reduces edge distractions elegantly.",
    className: "variant-rounded-window",
  },
  {
    id: "V35",
    title: "Perforated Edge",
    note: "Ticket-like edge rhythm paired with subtle all-around fade.",
    className: "variant-perforated-edge",
  },
  {
    id: "V36",
    title: "Embossed Border",
    note: "Raised border illusion with dual highlight/shadow frame lines.",
    className: "variant-embossed-border",
  },
  {
    id: "V37",
    title: "Noise Veil",
    note: "Gentle grain-like overlay and perimeter fade for editorial realism.",
    className: "variant-noise-veil",
  },
  {
    id: "V38",
    title: "Checker Fade",
    note: "Micro checker texture blended with side fade for modern polish.",
    className: "variant-checker-fade",
  },
  {
    id: "V39",
    title: "Halo Curtains",
    note: "Subtle central halo with side curtains to guide eye flow.",
    className: "variant-halo-curtains",
  },
  {
    id: "V40",
    title: "Premium Signature Blend",
    note: "Layered mask, tint, and frame combination for final-candidate richness.",
    className: "variant-signature-blend",
    slogan: "CAPITAL PLANNING WITH HUMAN PRECISION",
  },
  {
    id: "V41",
    title: "Checker Fade - Low Density",
    note: "Larger checker cells with softer contrast for a cleaner texture.",
    className: "variant-checker-fade-low",
  },
  {
    id: "V42",
    title: "Checker Fade - Ultra Low Density",
    note: "Very sparse checker pattern for subtle structure with minimal noise.",
    className: "variant-checker-fade-ultra",
  },
  {
    id: "V43",
    title: "Text Monument - Bottom XXL",
    note: "Large bottom-anchored slogan with heavy letter spacing for brand weight.",
    className: "variant-text-monument-bottom",
    slogan: "FINANCING BUILT AROUND YOUR FUTURE",
    sloganClass: "banner-lab-slogan--xxl banner-lab-slogan--bottom-band",
  },
  {
    id: "V44",
    title: "Text Monument - Center XL",
    note: "Centered oversized text to test bold copy-led hero direction.",
    className: "variant-text-monument-center",
    slogan: "CAPITAL STRATEGY. HUMAN CLARITY.",
    sloganClass: "banner-lab-slogan--xl banner-lab-slogan--center",
  },
  {
    id: "V45",
    title: "Text Vertical Side Label",
    note: "Vertical side statement for editorial, high-design treatment.",
    className: "variant-text-vertical-side",
    slogan: "KINNECT CAPITAL",
    sloganClass: "banner-lab-slogan--lg banner-lab-slogan--vertical",
  },
  {
    id: "V46",
    title: "Text Top-Left Anchor",
    note: "Large top-left headline lockup with subtle underlay for readability.",
    className: "variant-text-top-left",
    slogan: "A SMARTER LENDING PATH",
    sloganClass: "banner-lab-slogan--xl banner-lab-slogan--top-left",
  },
  {
    id: "V47",
    title: "Text Two-Line Headline",
    note: "Multi-line oversized headline style for campaign-style messaging.",
    className: "variant-text-two-line",
    slogan: "RATE GUIDANCE\nTHAT MOVES WITH YOU",
    sloganClass: "banner-lab-slogan--xl banner-lab-slogan--two-line",
  },
  {
    id: "V48",
    title: "Text Outline Ghost",
    note: "Huge outlined ghost text for atmospheric branded depth.",
    className: "variant-text-outline-ghost",
    slogan: "KINNECT",
    sloganClass: "banner-lab-slogan--hero banner-lab-slogan--ghost",
  },
  {
    id: "V49",
    title: "Feathered Square Edge",
    note: "Directly mirrors the residential card feathering with soft radial edge fade.",
    className: "variant-feathered-square",
  },
  {
    id: "V50",
    title: "Soft Rounded Corner Cut",
    note: "Rounded corners with progressive corner-only fade for gentler framing.",
    className: "variant-rounded-corner-cut",
  },
  {
    id: "V51",
    title: "Diamond Corner Burn",
    note: "Diagonal corner burns with preserved center for stronger edge character.",
    className: "variant-diamond-corner-burn",
  },
  {
    id: "V52",
    title: "Windowpane Edge Soften",
    note: "Perimeter mask ring that feels like frosted glass around a clear center.",
    className: "variant-windowpane-edge",
  },
  {
    id: "V53",
    title: "Inverted Corner Veil",
    note: "Corner veil with subtle center lift for high-contrast edge compositing.",
    className: "variant-inverted-corner-veil",
  },
];

const BANNER_CATEGORIES: BannerCategory[] = [
  {
    id: "border-frame",
    title: "Border And Frame Effects",
    description: "Decorative line systems, rails, rules, and structural framing treatments.",
    variantIds: ["V03", "V04", "V07", "V21", "V22", "V23", "V28", "V29", "V35", "V36"],
  },
  {
    id: "mask-fade",
    title: "Mask And Fade Effects",
    description: "Directional fades, arc masks, vignettes, and tonal edge shaping treatments.",
    variantIds: [
      "V01",
      "V06",
      "V09",
      "V10",
      "V11",
      "V12",
      "V13",
      "V14",
      "V15",
      "V16",
      "V17",
      "V18",
      "V19",
      "V20",
      "V26",
      "V27",
      "V30",
      "V31",
      "V33",
      "V34",
      "V39",
      "V40",
    ],
  },
  {
    id: "pattern-texture",
    title: "Pattern And Texture Effects",
    description: "Ledger, hatch, checker, and grain overlays with controlled density options.",
    variantIds: ["V05", "V24", "V25", "V37", "V38", "V41", "V42"],
  },
  {
    id: "corner-edge-masks",
    title: "Corner And Edge Mask Effects",
    description: "Image-edge and corner treatments inspired by residential option card styling.",
    variantIds: ["V49", "V50", "V51", "V52", "V53"],
  },
  {
    id: "text-effects",
    title: "Text Effects",
    description: "Large messaging overlays with position and scale variants for banner typography exploration.",
    variantIds: ["V02", "V08", "V32", "V43", "V44", "V45", "V46", "V47", "V48"],
  },
];

const VARIANT_BY_ID = new Map(BANNER_VARIANTS.map((variant) => [variant.id, variant]));

function BannerExperimentPage() {
  const imageStyle = {
    "--banner-image": `url(${SHARED_BANNER_IMAGE})`,
  } as CSSProperties;

  return (
    <section className="banner-lab-page">
      <header className="banner-lab-header">
        <p className="banner-lab-kicker">Dev Banner Study</p>
        <h1>Banner Style Variants</h1>
        <p>
          Same source image repeated with fifty-three treatments. Compare masks,
          fades, overlays, and border systems before production rollout.
        </p>
      </header>

      <div className="banner-lab-layout">
        <aside className="banner-lab-nav" aria-label="Variant quick links">
          <p>On This Page</p>
          {BANNER_CATEGORIES.map((category) => (
            <section className="banner-lab-nav-group" key={category.id}>
              <h3>
                <a href={`#category-${category.id}`}>{category.title}</a>
              </h3>
              <ul>
                {category.variantIds.map((variantId) => {
                  const variant = VARIANT_BY_ID.get(variantId);
                  if (!variant) {
                    return null;
                  }

                  return (
                    <li key={`nav-${variant.id}`}>
                      <a href={`#variant-${variant.id.toLowerCase()}`}>
                        {variant.id} {variant.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </aside>

        <div className="banner-lab-content">
          <div className="banner-lab-source">
            Source image: /images/calculators/calculators.avif
          </div>

          {BANNER_CATEGORIES.map((category) => {
            const variants = category.variantIds
              .map((variantId) => VARIANT_BY_ID.get(variantId))
              .filter((variant): variant is BannerVariant => Boolean(variant));

            return (
              <section
                className="banner-lab-section"
                key={category.id}
                id={`category-${category.id}`}
              >
                <header className="banner-lab-section-header">
                  <h2>{category.title}</h2>
                  <p>{category.description}</p>
                </header>

                <div className="banner-lab-grid">
                  {variants.map((variant) => (
                    <article
                      className="banner-lab-card"
                      key={variant.id}
                      id={`variant-${variant.id.toLowerCase()}`}
                    >
                      <div className="banner-lab-card-head">
                        <span className="banner-lab-id">{variant.id}</span>
                        <h3>{variant.title}</h3>
                      </div>

                      <div
                        className={`banner-lab-preview ${variant.className}`}
                        style={imageStyle}
                        role="img"
                        aria-label={`${variant.title} treatment preview`}
                      >
                        {variant.slogan ? (
                          <span
                            className={`banner-lab-slogan ${variant.sloganClass ?? ""}`.trim()}
                          >
                            {variant.slogan}
                          </span>
                        ) : null}
                      </div>

                      <p>{variant.note}</p>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BannerExperimentPage;
