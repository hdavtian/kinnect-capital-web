import ContactForm from "../features/contact/ContactForm";
import { assetPath } from "../utils/assetPath";

function ContactPage() {
  return (
    <section className="contact-section contact-page">
      <div className="contact-page-head">
        <div
          className="contact-page-avatar"
          style={{
            backgroundImage: `url(${assetPath("/images/ak/arthur-kumas.avif")})`,
          }}
          role="img"
          aria-label="Arthur Kumasian"
        />

        <div className="contact-page-copy">
          <h1>Let's Discuss Your Loan Scenario</h1>
          <p className="contact-page-intro">
            Whether you are looking to make a purchase, refinance, or need cash
            out, we are ready to work for you.
          </p>
          <p className="contact-page-meta">Arthur Kumasian | NMLS: #2248484</p>
        </div>
      </div>

      <ContactForm />
    </section>
  );
}

export default ContactPage;
