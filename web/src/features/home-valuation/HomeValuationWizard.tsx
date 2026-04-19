import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";

interface ContactState {
  fullName: string;
  email: string;
  phone: string;
  consent: boolean;
}

interface AddressSuggestion {
  id: string;
  description: string;
  placeId?: string;
}

const MOCK_ADDRESS_SUGGESTIONS = [
  "123 Main Street, Los Angeles, CA 90012",
  "123 Main Street, Glendale, CA 91203",
  "123 Main Street, Pasadena, CA 91101",
  "123 Main Avenue, Santa Monica, CA 90401",
  "123 Main Court, Long Beach, CA 90802",
];

function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isStepTwoValid(contact: ContactState): boolean {
  return (
    contact.fullName.trim().length >= 2 &&
    isValidEmail(contact.email.trim()) &&
    normalizePhoneDigits(contact.phone).length >= 10 &&
    contact.consent
  );
}

function HomeValuationWizard() {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as
    | string
    | undefined;
  const hasGooglePlacesAtLoad = Boolean(
    (window as unknown as { google?: { maps?: { places?: unknown } } }).google
      ?.maps?.places,
  );

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [addressInput, setAddressInput] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [googleStatus, setGoogleStatus] = useState<
    "loading" | "ready" | "unavailable"
  >(
    googleMapsApiKey
      ? hasGooglePlacesAtLoad
        ? "ready"
        : "loading"
      : "unavailable",
  );
  const [googleSuggestions, setGoogleSuggestions] = useState<
    AddressSuggestion[]
  >([]);
  const [contact, setContact] = useState<ContactState>({
    fullName: "",
    email: "",
    phone: "",
    consent: false,
  });

  useEffect(() => {
    if (!googleMapsApiKey) {
      return;
    }

    const googleWindow = window as unknown as {
      google?: {
        maps?: {
          places?: unknown;
        };
      };
    };

    if (googleWindow.google?.maps?.places) {
      return;
    }

    const scriptId = "google-maps-places-script";
    const existingScript = document.getElementById(
      scriptId,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => setGoogleStatus("ready"), {
        once: true,
      });
      existingScript.addEventListener(
        "error",
        () => setGoogleStatus("unavailable"),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => setGoogleStatus("ready"), {
      once: true,
    });
    script.addEventListener("error", () => setGoogleStatus("unavailable"), {
      once: true,
    });
    document.head.appendChild(script);
  }, [googleMapsApiKey]);

  useEffect(() => {
    const query = addressInput.trim();

    if (query.length < 3) {
      return;
    }

    if (googleStatus !== "ready") {
      return;
    }

    const googleWindow = window as unknown as {
      google?: {
        maps?: {
          places?: {
            AutocompleteService: new () => {
              getPlacePredictions: (
                request: {
                  input: string;
                  componentRestrictions?: { country: string };
                  types?: string[];
                },
                callback: (
                  predictions: Array<{
                    description: string;
                    place_id: string;
                  }> | null,
                  status: string,
                ) => void,
              ) => void;
            };
            PlacesServiceStatus: {
              OK: string;
            };
          };
        };
      };
    };

    if (!googleWindow.google?.maps?.places) {
      return;
    }

    const service = new googleWindow.google.maps.places.AutocompleteService();
    const timeout = window.setTimeout(() => {
      service.getPlacePredictions(
        {
          input: query,
          componentRestrictions: { country: "us" },
          types: ["address"],
        },
        (predictions, status) => {
          const okStatus =
            googleWindow.google?.maps?.places?.PlacesServiceStatus.OK;
          if (status !== okStatus || !predictions) {
            setGoogleSuggestions([]);
            return;
          }

          setGoogleSuggestions(
            predictions.map((item) => ({
              id: item.place_id,
              description: item.description,
              placeId: item.place_id,
            })),
          );
        },
      );
    }, 180);

    return () => window.clearTimeout(timeout);
  }, [addressInput, googleStatus]);

  const fallbackSuggestions = useMemo<AddressSuggestion[]>(() => {
    const query = addressInput.trim().toLowerCase();
    if (query.length < 3) {
      return [] as AddressSuggestion[];
    }

    return MOCK_ADDRESS_SUGGESTIONS.filter((entry) =>
      entry.toLowerCase().includes(query),
    ).map((entry) => ({
      id: `mock-${entry}`,
      description: entry,
    }));
  }, [addressInput]);

  const suggestions = useMemo<AddressSuggestion[]>(() => {
    const query = addressInput.trim();
    if (query.length < 3) {
      return [] as AddressSuggestion[];
    }

    return googleStatus === "ready" ? googleSuggestions : fallbackSuggestions;
  }, [addressInput, fallbackSuggestions, googleStatus, googleSuggestions]);

  const canContinueStepOne = selectedAddress.length > 0;
  const canContinueStepTwo = isStepTwoValid(contact);

  const mapUrl = useMemo(() => {
    const query = selectedAddress || addressInput;
    if (!query) {
      return "";
    }

    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  }, [addressInput, selectedAddress]);

  const openGoogleMapsUrl = useMemo(() => {
    const query = selectedAddress || addressInput;
    if (!query) {
      return "";
    }

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }, [addressInput, selectedAddress]);

  const addressSourceMessage =
    googleStatus === "ready"
      ? "Address autocomplete powered by Google Places."
      : "Using local fallback suggestions. Add VITE_GOOGLE_MAPS_API_KEY to enable Google Places.";

  function onAddressInputChange(nextValue: string) {
    setAddressInput(nextValue);

    if (selectedAddress && nextValue !== selectedAddress) {
      setSelectedAddress("");
      setSelectedPlaceId(null);
    }
  }

  function onSelectAddress(value: string, placeId?: string) {
    setAddressInput(value);
    setSelectedAddress(value);
    setSelectedPlaceId(placeId ?? null);
    setGoogleSuggestions([]);
  }

  function goToStepTwo() {
    if (canContinueStepOne) {
      setCurrentStep(2);
    }
  }

  function goToStepThree() {
    if (canContinueStepTwo) {
      setCurrentStep(3);
    }
  }

  return (
    <section className="valuation-section">
      <h1>Home Valuation</h1>
      <p>Get your estimated property value in three quick steps.</p>

      <div className="valuation-steps" aria-label="Valuation progress">
        <div className={`step-pill ${currentStep === 1 ? "active" : ""}`}>
          1
        </div>
        <div className={`step-pill ${currentStep === 2 ? "active" : ""}`}>
          2
        </div>
        <div className={`step-pill ${currentStep === 3 ? "active" : ""}`}>
          3
        </div>
      </div>

      {currentStep === 1 ? (
        <div className="valuation-card">
          <div>
            <h2>What&apos;s Your Property Worth?</h2>
            <label className="valuation-label">
              Property Address
              <input
                type="text"
                value={addressInput}
                onChange={(event) => onAddressInputChange(event.target.value)}
                placeholder="123 Main Street, Los Angeles, CA"
              />
            </label>

            {suggestions.length > 0 ? (
              <ul className="address-suggestions">
                {suggestions.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() =>
                        onSelectAddress(item.description, item.placeId)
                      }
                      className={
                        selectedAddress === item.description ? "selected" : ""
                      }
                    >
                      {item.description}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="address-source-note">{addressSourceMessage}</p>

            <button
              type="button"
              onClick={goToStepTwo}
              disabled={!canContinueStepOne}
            >
              Continue
            </button>
          </div>

          <div className="valuation-map-wrap">
            <h3>Map Preview</h3>
            {mapUrl ? (
              <>
                <iframe
                  title="Property map preview"
                  src={mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a href={openGoogleMapsUrl} target="_blank" rel="noreferrer">
                  Open in Google Maps
                </a>
              </>
            ) : (
              <p>Start typing an address to preview the location.</p>
            )}
          </div>
        </div>
      ) : null}

      {currentStep === 2 ? (
        <div className="valuation-card">
          <div>
            <h2>Contact Information</h2>
            <p className="selected-address">
              Selected address: {selectedAddress}
            </p>
            {selectedPlaceId ? (
              <p className="selected-address-meta">
                Place ID: {selectedPlaceId}
              </p>
            ) : null}

            <div className="valuation-form-grid">
              <label className="valuation-label">
                Full Name
                <input
                  type="text"
                  value={contact.fullName}
                  onChange={(event) =>
                    setContact((prev) => ({
                      ...prev,
                      fullName: event.target.value,
                    }))
                  }
                />
              </label>

              <label className="valuation-label">
                Email Address
                <input
                  type="email"
                  value={contact.email}
                  onChange={(event) =>
                    setContact((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
              </label>

              <label className="valuation-label">
                Phone Number
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(event) =>
                    setContact((prev) => ({
                      ...prev,
                      phone: event.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <label className="consent-checkbox">
              <input
                type="checkbox"
                checked={contact.consent}
                onChange={(event) =>
                  setContact((prev) => ({
                    ...prev,
                    consent: event.target.checked,
                  }))
                }
              />
              <span>
                I agree to be contacted by Kinnect Capital via call, email, and
                text for real estate services. To opt out, you can reply
                &apos;stop&apos; at any time or reply &apos;help&apos; for
                assistance. You can also click the unsubscribe link in the
                emails. Message and data rates may apply. Message frequency may
                vary. See our <Link to={ROUTES.privacy}>privacy policy</Link>.
              </span>
            </label>

            <div className="valuation-actions">
              <button type="button" onClick={() => setCurrentStep(1)}>
                Back
              </button>
              <button
                type="button"
                onClick={goToStepThree}
                disabled={!canContinueStepTwo}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {currentStep === 3 ? (
        <div className="valuation-card">
          <div className="thank-you-panel">
            <h2>Thank You</h2>
            <p>
              I am gathering your property information. Your home valuation
              report will arrive in your inbox.
            </p>
            <div className="valuation-actions">
              <button type="button" onClick={() => setCurrentStep(2)}>
                Back
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default HomeValuationWizard;
