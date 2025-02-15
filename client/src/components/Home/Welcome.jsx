import { Link } from "react-router-dom";
import "../../pages/Home/Home.css";

const Welcome = () => {
  return (
    <main className="home-container">
      <div className="home-card">
        <h1 className="home-title">Welcome!</h1>
        <p className="home-subtitle">In Development. Check Things Out!</p>
        <div>
          <Link to="/signup" className="home-button">
            Sign Up
          </Link>
          <Link to="/login" className="home-button">
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Welcome;