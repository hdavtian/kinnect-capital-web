import ContactForm from "../features/contact/ContactForm";

function ContactPage() {
  return (
    <section className="contact-section">
      <h1>Let's Discuss Your Loan Scenario</h1>
      <p>
        Whether you are looking to make a purchase, refinance, or need cash out,
        we are ready to work for you.
      </p>
      <p>Arthur Kumasian | NMLS: #2248484</p>
      <ContactForm />
    </section>
  );
}

export default ContactPage;
