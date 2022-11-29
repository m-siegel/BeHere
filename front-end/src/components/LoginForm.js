// By Tim

import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/LoginForm.css";

/**
 * Form to log into the website.
 */
function LoginForm() {
  return (
    <div className="card">
      <div className="card-body">
        <h2>Log In</h2>
        <form id="login-form" action="/login" method="POST">
          <div className="mb-3">
            <label className="form-label" htmlFor="contactEmail">
              Organization email:
            </label>
            <input
              className="form-control"
              type="email"
              name="contactEmail"
              id="email"
              required
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

LoginForm.propTypes = {};

export default LoginForm;
