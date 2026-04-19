export const ROUTES = {
  home: "/",
  about: "/about",
  team: "/team",
  residential: "/residential-mortgage-options",
  commercial: "/commercial-financing",
  buyHome: "/resources/buy-a-home",
  refinance: "/resources/refinance",
  calculator: "/tools/mortgage-calculator",
  valuation: "/tools/home-valuation",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-of-use",
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
