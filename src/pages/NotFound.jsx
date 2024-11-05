import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>This page not found</h1>
      <p>
        Go to <Link to={`/`}>Home page</Link>
      </p>
    </div>
  );
}
