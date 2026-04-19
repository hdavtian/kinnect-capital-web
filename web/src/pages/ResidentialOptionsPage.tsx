import { loanProducts } from "../data/loanProducts";

function ResidentialOptionsPage() {
  return (
    <section>
      <h1>Residential Mortgage Options</h1>
      <ul>
        {loanProducts.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.summary}</p>
            <ul>
              {product.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ResidentialOptionsPage;
