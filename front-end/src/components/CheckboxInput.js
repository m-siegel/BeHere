import React from "react";
import PropTypes from "prop-types";

function CheckboxInput({ type, idNameValue, labelContent, onChange }) {
  return (
    <div className="form-check form-check-inline">
      <label className="form-check-label">
        {labelContent}
        <input
          type={type}
          className="form-check-input"
          id={idNameValue}
          name={idNameValue}
          value={idNameValue}
          onChange={onChange}
          required
        ></input>
      </label>
    </div>
  );
}

CheckboxInput.propTypes = {
  type: PropTypes.string.isRequired,
  idNameValue: PropTypes.string.isRequired,
  labelContent: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxInput;
