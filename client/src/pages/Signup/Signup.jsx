import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER, VERIFY_EMAIL } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./Signup.css"; // ✅ Import CSS

const Signup = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const [addUser] = useMutation(ADD_USER);
  const [verifyEmail] = useMutation(VERIFY_EMAIL);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(formState.email)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    setErrorMessage("");
    setInfoMessage("");

    try {
      const { data } = await addUser({ variables: { ...formState } });

      if (data?.addUser) {
        const message = data.addUser;
        if (message.includes("User already exists but is unverified")) {
          setInfoMessage("Your account is not verified. A new verification code has been sent.");
        } else {
          setInfoMessage("A verification code has been sent to your email.");
        }
        setShowVerificationModal(true);
      } else {
        setErrorMessage("Unexpected error. Please try again.");
      }
    } catch (e) {
      setErrorMessage(e.message || "Error signing up. Please try again.");
    }
  };

  const handleVerificationSubmit = async () => {
    setErrorMessage("");
    setInfoMessage("");

    try {
      const { data } = await verifyEmail({
        variables: { email: formState.email, verificationCode },
      });

      if (data.verifyEmail) {
        Auth.login(data.verifyEmail.token);
        navigate("/");
      }
    } catch (e) {
      setErrorMessage("Invalid verification code. Please try again.");
    }
  };

  return (
    <main className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>

        {!showVerificationModal ? (
          <form onSubmit={handleFormSubmit}>
            <div className="signup-inputs">
              <input className="signup-input" placeholder="Username" name="username" type="text" value={formState.username} onChange={handleChange} required />
              <input className="signup-input" placeholder="Email" name="email" type="email" value={formState.email} onChange={handleChange} required />
              <input className="signup-input" placeholder="Password" name="password" type="password" value={formState.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
        ) : (
          <div className="verification-container">
            <h3 className="verification-title">Enter Verification Code</h3>
            <input className="verification-input" type="text" placeholder="Verification Code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            <button className="verification-button" onClick={handleVerificationSubmit}>Verify</button>
          </div>
        )}

        {infoMessage && <div className="info-message">{infoMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {!showVerificationModal && (
          <p className="signup-footer">
            Already have an account? <Link to="/login" className="signup-link">Log in</Link>
          </p>
        )}
      </div>
    </main>
  );
};

export default Signup;