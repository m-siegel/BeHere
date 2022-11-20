import React from "react";
// import PropTypes from "prop-types";
import FormInput from "./FormInput";

// TODO: validation of password and password confirmation? validation of email?

// TODO: onChange -- track what's in each (and validate?)
// on update state variables on every change, then they're there
// when submit is clicked

function RegisterForm() {
  return (
    <div className="RegisterForm">
      <form id="registerForm">
        <FormInput
          type="text"
          idAndName="firstName"
          labelContent="First Name"
        />
        <FormInput type="text" idAndName="lastName" labelContent="Last Name" />
        <FormInput type="text" idAndName="username" labelContent="Username" />
        <FormInput
          type="email"
          idAndName="orgEmail"
          labelContent="Organization Email"
        />
        <FormInput
          type="password"
          idAndName="password"
          labelContent="Password"
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
