// Tim C
import React from "react";
import PropTypes from "prop-types";

function Alert(type, heading, message) {
  // TODO: validate type is "warning", "success", etc.
  return (
    <div className="Alert">
      <div
        class={`alert alert-${type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{heading}</strong> {message}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Alert;
