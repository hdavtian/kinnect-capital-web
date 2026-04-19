import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

function NotFoundPage() {
  return (
    <section>
      <h1>Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <Link to={ROUTES.home}>Return Home</Link>
    </section>
  );
}

export default NotFoundPage;
