import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";

interface ContactFormState {
  fullName: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
}

function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isContactFormValid(state: ContactFormState): boolean {
  return (
    state.fullName.trim().length >= 2 &&
    normalizePhoneDigits(state.phone).length >= 10 &&
    isValidEmail(state.email.trim()) &&
    state.message.trim().length >= 10 &&
    state.consent
  );
}

const INITIAL_STATE: ContactFormState = {
  fullName: "",
  phone: "",
  email: "",
  message: "",
  consent: false,
};

function ContactForm() {
  const [formState, setFormState] = useState<ContactFormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = useMemo(() => isContactFormValid(formState), [formState]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setSubmitted(true);
  }

  function resetForm() {
    setFormState(INITIAL_STATE);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="contact-success" role="status" aria-live="polite">
        <h2>Thank you for reaching out.</h2>
        <p>
          Your message has been captured and our team will follow up shortly.
        </p>
        <button type="button" onClick={resetForm}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-form-grid">
        <div className="contact-form-fields">
          <label className="contact-label">
            Full Name
            <input
              type="text"
              value={formState.fullName}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  fullName: event.target.value,
                }))
              }
              required
            />
          </label>

          <label className="contact-label">
            Phone Number
            <input
              type="tel"
              value={formState.phone}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  phone: event.target.value,
                }))
              }
              required
            />
          </label>

          <label className="contact-label">
            Email Address
            <input
              type="email"
              value={formState.email}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            />
          </label>
        </div>

        <div className="contact-form-message">
          <label className="contact-label contact-message-field">
            Message
            <textarea
              value={formState.message}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  message: event.target.value,
                }))
              }
              rows={7}
              required
            />
          </label>
        </div>
      </div>

      <label className="consent-checkbox">
        <input
          type="checkbox"
          checked={formState.consent}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, consent: event.target.checked }))
          }
          required
        />
        <span>
          I agree to be contacted by Kinnect Capital via call, email, and text
          for real estate services. To opt out, you can reply &apos;stop&apos;
          at any time or reply &apos;help&apos; for assistance. You can also
          click the unsubscribe link in emails. Message and data rates may
          apply. Message frequency may vary. See our{" "}
          <Link to={ROUTES.privacy}>privacy policy</Link>.
        </span>
      </label>

      <div className="contact-actions">
        <button type="submit" disabled={!canSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
