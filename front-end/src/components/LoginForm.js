// By Tim

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/LoginForm.css";

/**
 * Form to log into the website.
 */
function LoginForm({ setAlert }) {
  const navigate = useNavigate();

  const [contactEmail, setContactEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(evt) {
    evt.preventDefault();
    setAlert({
      type: "info",
      heading: "",
      message: <div>Authenticating...</div>,
    });
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactEmail: contactEmail,
        password: password,
      }),
    });
    const resJSON = await res.json();

    if (resJSON.authenticated) {
      navigate("/event-feed", { replace: true });
    } else {
      setAlert({
        type: "failure",
        heading: "Try again",
        message: (
          <div>
            <p>Incorrect credentials. Please try again.</p>
          </div>
        ),
      });
      setContactEmail("");
      setPassword("");
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2>Log In</h2>
        <form id="login-form" onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="contactEmail">
              Contact email:
            </label>
            <input
              className="form-control"
              type="email"
              name="contactEmail"
              id="email"
              required
              value={contactEmail}
              onChange={(evt) => setContactEmail(evt.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" id="btnSignUp" type="submit">
              Log In
            </button>
          </div>
          <br />
          <p id="under-btn">
            Not a member? <Link to="/register">Sign up</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default LoginForm;
