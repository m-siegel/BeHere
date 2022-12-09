/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";

/**
 * Returns a form input component with input of the given type, the givent id and name, and the given onChange callback.
 */
function FormInput({
  type,
  idAndName,
  labelContent,
  value,
  onChange,
  minValue,
}) {
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
            value={value}
            onChange={onChange}
            min={minValue ? minValue : ""}
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
  value: PropTypes.string.isRequired, // Error if not required
  onChange: PropTypes.func.isRequired,
};

export default FormInput;
