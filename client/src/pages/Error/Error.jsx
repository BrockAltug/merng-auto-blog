import { useRouteError, useNavigate } from "react-router-dom";
import "./Error.css"; // ✅ Import CSS

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div id="error-page" className="error-container">
      <h1 className="error-title">Oops! Something Went Wrong</h1>
      <p className="error-subtitle">
        The page you're looking for doesn't exist or an unexpected error has occurred.
      </p>
      <p className="error-message">Error: {error.statusText || error.message}</p>

      <div className="error-buttons">
        <button className="error-button" onClick={() => navigate("/")}>
          Go Home
        </button>
        <button className="error-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}