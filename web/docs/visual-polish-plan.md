## Visual Polish Plan

A focused pass to elevate the site from functional scaffold to premium presentation before returning to the deployment and integration stages.

**Status:** In progress — collecting design direction before execution

---

### Scope

This plan sits between Phase 1 completion and Phase 4 delivery. It does not introduce new features or data — it improves the visual and interactive quality of what already exists.

---

### Sections to Review

1. **Typography** — sizing scale, line-height, letter-spacing, font weight usage across headings and body
2. **Color & Theme Palettes** — saturation, contrast ratios, surface layering, accent usage
3. **Spacing & Layout** — section padding, column gutters, max-width rhythm, card spacing
4. **Header & Navigation** — logo treatment, dropdown polish, mobile menu animation, active states
5. **Hero Sections** — image composition, hero copy hierarchy, CTA button sizing and placement
6. **Cards & Modules** — loan product cards, testimonial cards, process step components
7. **Forms & Widgets** — valuation wizard styling, calculator form controls, input focus states
8. **Micro-interactions** — hover timing, transitions, focus rings, button press feedback
9. **Footer** — layout, link density, legal text treatment
10. **Placeholder Images** — sizing, aspect ratios, framing — readiness for real photo swap

---

### Design Direction (to be filled in)

> _User to provide feedback here. Describe the feeling, references, or specific complaints that should drive this pass._

---

### Identified Issues (pre-session)

- [ ] Dropdown animation: no easing/slide — appears abruptly
- [ ] Mobile menu: no open/close transition (accordion snaps)
- [ ] Hero sections: placeholder SVGs are visible scaffolding — proportions may need adjustment once real images are in
- [ ] Button styles: CTA button may need size/weight/shadow upgrade to read as primary action
- [ ] Card hover states: loan product cards have no hover feedback
- [ ] Section rhythm: spacing between sections may feel inconsistent on mid-size screens

---

### Decisions

- Changes will be CSS-only wherever possible (no component restructuring)
- No new features, routes, or data changes in this pass
- Real photography swap is a future step — polish should work with or without real images
- Theme system stays in place; improvements apply to all themes via token updates

---

### Return Path

Once this polish pass is complete and reviewed, return to:

- **Phase 4, Step 18** — GitHub Pages deployment setup
- **Deferred:** Google Places production API key / billing configuration
