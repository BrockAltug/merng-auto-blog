import { useLocation, useNavigate } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaInstagram, FaArrowLeft } from "react-icons/fa";
import "./Footer.css"; // ✅ Import CSS

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        {location.pathname !== "/" && (
          <button className="back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft className="icon" />
          </button>
        )}
        <h4 className="footer-title">Your Placeholder Title</h4>
        <p className="footer-text">
          This is a placeholder for a mission statement or short description.
          Customize this section to reflect your app’s purpose and vision.
        </p>
        <div className="footer-socials">
          <button className="social-button" onClick={() => window.open("https://twitter.com", "_blank")}>
            <FaTwitter className="icon" />
          </button>
          <button className="social-button" onClick={() => window.open("https://www.linkedin.com", "_blank")}>
            <FaLinkedin className="icon" />
          </button>
          <button className="social-button" onClick={() => window.open("https://instagram.com", "_blank")}>
            <FaInstagram className="icon" />
          </button>
        </div>
        <p className="footer-rights">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;