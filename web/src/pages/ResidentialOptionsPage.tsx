import residentialLoanOptions from "../data/residentialLoanOptions.json";
import ResidentialOptionCard, {
  type ResidentialOptionItem,
} from "../features/residential-options/ResidentialOptionCard";
import "../features/residential-options/ResidentialOptions.css";

function ResidentialOptionsPage() {
  return (
    <section className="residential-options-section">
      <header className="residential-options-header">
        <h1>Residential Mortgage Options</h1>
        <p>
          Flexible loan programs designed for self-employed borrowers,
          investors, and complex income scenarios.
        </p>
      </header>

      <div className="residential-options-grid">
        {(residentialLoanOptions as ResidentialOptionItem[]).map((item) => (
          <ResidentialOptionCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default ResidentialOptionsPage;
