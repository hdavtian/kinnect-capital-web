export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface NavGroup {
  id: string;
  label: string;
  href: string | null;
  children: NavLink[];
}

export interface FooterContent {
  email: string;
  officePhone: string;
  mobilePhone: string;
  addressLines: string[];
  nmlsCompany: string;
  dreCompany: string;
  nmlsArthur: string;
  disclaimer: string;
}

export interface LoanProduct {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface Testimonial {
  id: string;
  name: string;
  body: string;
  attribution: string;
  isDraft: boolean;
}

export interface PageSection {
  id: string;
  heading: string;
  subheading?: string;
  body: string[];
  bullets?: string[];
  cta?: {
    label: string;
    href: string;
  };
}
