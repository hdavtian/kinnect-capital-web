import { ROUTES } from "../routes";
import type { NavGroup } from "../types/content";

export const topNav: NavGroup[] = [
  {
    id: "home",
    label: "Home",
    href: ROUTES.home,
    children: [],
  },
  {
    id: "about",
    label: "About",
    href: null,
    children: [
      {
        id: "about-company",
        label: "About Kinnect Capital",
        href: ROUTES.about,
      },
      { id: "about-team", label: "Meet the Team", href: ROUTES.team },
    ],
  },
  {
    id: "residential",
    label: "Residential Mortgage Options",
    href: ROUTES.residential,
    children: [],
  },
  {
    id: "commercial",
    label: "Commercial Financing",
    href: ROUTES.commercial,
    children: [],
  },
  {
    id: "resources",
    label: "Resources",
    href: null,
    children: [
      { id: "buy-home", label: "Buy a Home", href: ROUTES.buyHome },
      { id: "refinance", label: "Refinance", href: ROUTES.refinance },
    ],
  },
  {
    id: "tools",
    label: "Mortgage Tools",
    href: null,
    children: [
      {
        id: "calculator",
        label: "Mortgage Calculator",
        href: ROUTES.calculator,
      },
      { id: "valuation", label: "Home Valuation", href: ROUTES.valuation },
    ],
  },
];

export const contactCta = {
  label: "Let's Connect",
  href: ROUTES.contact,
};
