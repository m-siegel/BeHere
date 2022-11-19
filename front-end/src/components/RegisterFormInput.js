import React from "react";
import PropTypes from "prop-types";

function RegisterFormInput({ type, idAndName, text }) {
  return (
    <div className="mb-3">
      <label className="form-label">
        {text}
        <input
          type={type}
          className="form-control"
          id={idAndName}
          name={idAndName}
          required
        />
      </label>
    </div>
  );
}

export default RegisterFormInput;
