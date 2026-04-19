export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: "April 18, 2026",
  sections: [
    {
      id: "privacy-intro",
      heading: "Overview",
      paragraphs: [
        "Kinnect Capital is committed to protecting your privacy and handling personal information responsibly.",
        "This policy explains what information may be collected through this website, how it is used, and the options available to you.",
      ],
    },
    {
      id: "privacy-collection",
      heading: "Information We Collect",
      paragraphs: [
        "We may collect contact and inquiry information that you provide directly, including name, email, phone number, property address, and message content.",
        "We may also collect technical usage data such as browser type, device data, referral source, and page interactions to improve site performance and user experience.",
      ],
    },
    {
      id: "privacy-use",
      heading: "How Information Is Used",
      paragraphs: [
        "Information may be used to respond to inquiries, provide requested mortgage-related guidance, follow up on valuation requests, and improve website functionality.",
        "Contact information may be used to communicate by phone, email, or text where consent is provided.",
      ],
    },
    {
      id: "privacy-sharing",
      heading: "Information Sharing",
      paragraphs: [
        "Kinnect Capital does not sell personal information.",
        "Information may be shared with trusted service providers and partners supporting website operations, communications, compliance, and lending workflow execution.",
      ],
    },
    {
      id: "privacy-messaging",
      heading: "Calls, Text Messages, and Email",
      paragraphs: [
        "If you provide consent, you may receive communications related to mortgage and real-estate services by call, email, and text.",
        "You can opt out of text communications at any time by replying stop and request assistance by replying help. Message and data rates may apply, and message frequency may vary.",
      ],
    },
    {
      id: "privacy-cookies",
      heading: "Cookies and Analytics",
      paragraphs: [
        "This website may use cookies or similar technologies to remember preferences, understand usage patterns, and support product improvements.",
        "You can manage cookie behavior through your browser settings; disabling cookies may affect some site functionality.",
      ],
    },
    {
      id: "privacy-california",
      heading: "California Privacy Rights",
      paragraphs: [
        "California residents may have rights regarding access, deletion, correction, and portability of personal information, subject to legal exceptions.",
        "To submit a privacy request, use the Contact page and include enough detail for verification and response handling.",
      ],
    },
    {
      id: "privacy-security",
      heading: "Data Security and Retention",
      paragraphs: [
        "Reasonable safeguards are used to protect personal information; however, no internet transmission or storage method can be guaranteed 100 percent secure.",
        "Information is retained for as long as reasonably necessary for service, legal, and business purposes.",
      ],
    },
    {
      id: "privacy-ai",
      heading: "AI and Automated Assistance",
      paragraphs: [
        "Some website experiences may use automated or AI-assisted tooling to support content delivery and operational workflows.",
        "AI-assisted outputs are reviewed within business processes and are not a substitute for formal lending disclosures, legal guidance, or final underwriting decisions.",
      ],
    },
    {
      id: "privacy-updates",
      heading: "Policy Updates",
      paragraphs: [
        "This policy may be updated over time to reflect legal, operational, or technology changes.",
        "Material updates will be reflected by revising the last-updated date at the top of this page.",
      ],
    },
  ],
};

export const termsOfUse: LegalDocument = {
  title: "Terms of Use",
  lastUpdated: "April 18, 2026",
  sections: [
    {
      id: "terms-acceptance",
      heading: "Acceptance of Terms",
      paragraphs: [
        "By using this website, you agree to these Terms of Use and all applicable laws and regulations.",
        "If you do not agree with these terms, please discontinue use of the site.",
      ],
    },
    {
      id: "terms-no-offer",
      heading: "Informational Purpose",
      paragraphs: [
        "Content on this website is provided for general informational purposes and does not constitute a commitment to lend, legal advice, tax advice, or financial advice.",
        "Loan availability, rates, and terms depend on borrower qualifications, property criteria, lender guidelines, and market conditions.",
      ],
    },
    {
      id: "terms-accuracy",
      heading: "No Guarantee of Accuracy",
      paragraphs: [
        "Information is believed to be reliable but is not guaranteed. Visitors are responsible for independently verifying material details before making decisions.",
      ],
    },
    {
      id: "terms-tools",
      heading: "Calculator and Valuation Tools",
      paragraphs: [
        "Mortgage calculator and valuation features are estimates only and should not be interpreted as final approvals, appraisals, or guaranteed payment outcomes.",
        "Final loan terms and approvals are determined through lender underwriting and documented disclosures.",
      ],
    },
    {
      id: "terms-intellectual-property",
      heading: "Intellectual Property",
      paragraphs: [
        "Site content, branding, and design elements are the property of Kinnect Capital or used with permission.",
        "You may not reproduce, distribute, modify, or commercially exploit site content without prior written authorization.",
      ],
    },
    {
      id: "terms-prohibited",
      heading: "Prohibited Use",
      paragraphs: [
        "You agree not to use the site for unlawful activity, security testing without permission, interference with service, or transmission of malicious code.",
      ],
    },
    {
      id: "terms-third-party",
      heading: "Third-Party Links and Services",
      paragraphs: [
        "This website may link to third-party services. Kinnect Capital is not responsible for third-party content, privacy practices, or service performance.",
      ],
    },
    {
      id: "terms-liability",
      heading: "Limitation of Liability",
      paragraphs: [
        "To the fullest extent permitted by law, Kinnect Capital is not liable for direct, indirect, incidental, or consequential damages arising from use of this website.",
      ],
    },
    {
      id: "terms-law",
      heading: "Governing Law",
      paragraphs: [
        "These terms are governed by applicable laws of the State of California, without regard to conflict-of-law principles.",
      ],
    },
    {
      id: "terms-updates",
      heading: "Updates to Terms",
      paragraphs: [
        "Terms may be updated from time to time. Continued use of the website after updates indicates acceptance of revised terms.",
      ],
    },
  ],
};
