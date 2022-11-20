import React from "react";
import PropTypes from "prop-types";

function FormInput({ type, idAndName, labelContent }) {
  return (
    <div className="FromInput">
      <div className="mb-3">
        <label className="form-label">
          {labelContent}
          <input
            type={type}
            className="form-control"
            id={idAndName}
            name={idAndName}
            required
          />
        </label>
      </div>
    </div>
  );
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  idAndName: PropTypes.string.isRequired,
  labelContent: PropTypes.string.isRequired, // Could be an element instead
};

export default FormInput;
