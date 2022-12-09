/* Ilana-Mahmea */

import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import { Link } from "react-router-dom";

/**
 * Form for registering for an account.
 */
function RegisterForm({ setAlert }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(evt) {
    evt.preventDefault();
    setAlert({
      type: "info",
      heading: "",
      message: <div>Attempting registration...</div>,
    });

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        orgEmail: orgEmail,
        contactEmail: orgEmail,
        password: password,
      }),
    });
    const resJSON = await res.json();

    alertUser(resJSON);
    if (resJSON.success) {
      clearForm();
    }
  }

  function alertUser(info) {
    if (info.success) {
      setAlert({
        type: "success",
        heading: "Registration successful!",
        message: (
          <div>
            Head over to <Link to="/login">login</Link>
          </div>
        ),
      });
    } else {
      switch (info.reason) {
        case "database":
          setAlert({
            type: "danger",
            heading: "Uh oh.",
            message: (
              <div>
                <p>We encountered a problem with our database.</p>
                <p>Please try again later.</p>
              </div>
            ),
          });
          break;
        case "route":
          setAlert({
            type: "danger",
            heading: "Uh oh.",
            message: (
              <div>
                <p>We encountered a problem with our database.</p>
                <p>Please try again later.</p>
              </div>
            ),
          });
          break;
        default:
          setAlert({
            type: "warning",
            heading: "Registration unsuccessful.",
            message: <div>{info.reason}</div>,
          });
      }
    }
  }

  function clearForm() {
    setFirstName("");
    setLastName("");
    setUsername("");
    setOrgEmail("");
    setPassword("");
  }

  return (
    <div className="RegisterForm">
      <form id="registerForm" onSubmit={onSubmit}>
        <FormInput
          type="text"
          idAndName="firstName"
          labelContent="First Name"
          value={firstName}
          onChange={(evt) => setFirstName(evt.target.value)}
        />
        <FormInput
          type="text"
          idAndName="lastName"
          labelContent="Last Name"
          value={lastName}
          onChange={(evt) => setLastName(evt.target.value)}
        />
        <FormInput
          type="text"
          idAndName="username"
          labelContent="Username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <FormInput
          type="email"
          idAndName="orgEmail"
          labelContent="Organization Email"
          value={orgEmail}
          onChange={(evt) => setOrgEmail(evt.target.value)}
        />
        <FormInput
          type="password"
          idAndName="password"
          labelContent="Password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button type="submit" className="btn btn-action mb-5">
          Register
        </button>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default RegisterForm;
