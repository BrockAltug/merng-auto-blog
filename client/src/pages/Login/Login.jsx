import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./Login.css"; // ✅ Import CSS

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({ email: "", password: "" });
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {data ? (
          <p className="login-success">
            Success! You may now head{" "}
            <Link to="/" className="login-link">
              back to the homepage.
            </Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="login-inputs">
              <input
                className="login-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="login-input"
                placeholder="Your password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="login-button">
              Submit
            </button>
          </form>
        )}
        {error && <div className="login-error">{error.message}</div>}
      </div>
    </main>
  );
};

export default Login;