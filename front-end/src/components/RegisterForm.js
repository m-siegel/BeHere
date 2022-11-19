import React from "react";
import PropTypes from "prop-types";
import RegisterFormInput from "./RegisterFormInput";

// TODO: validation of password and password confirmation? validation of email?

// TODO: onChange -- track what's in each (and validate?)
// on update state variables on every change, then they're there
// when submit is clicked

function RegisterForm() {
  return (
    <div className="RegisterForm">
      <form id="registerForm">
        <RegisterFormInput
          type="text"
          idAndName="firstName"
          text="First Name"
        />
        <RegisterFormInput type="text" idAndName="lastName" text="Last Name" />
        <RegisterFormInput type="text" idAndName="username" text="Username" />
        <RegisterFormInput
          type="email"
          idAndName="orgEmail"
          text="Organization Email"
        />
        <RegisterFormInput
          type="password"
          idAndName="password"
          text="Password"
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
