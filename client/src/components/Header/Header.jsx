import { Link, useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import "./Header.css"; // ✅ Import CSS

const Header = () => {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    navigate("/");
    Auth.logout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div>
          <Link to="/" className="header-logo">
            <h1>AppName</h1>
          </Link>
          <p className="header-subtitle">Mission Statement</p>
        </div>

        {/* ✅ Navigation Links */}
        <div className="nav-links">
          <Link to="/blog" className="nav-button">Blog</Link>
          
          {Auth.loggedIn() ? (
            <>
              <Link to="/me" className="nav-button">Profile</Link>
              <button onClick={logout} className="nav-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button">Login</Link>
              <Link to="/signup" className="nav-button">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;