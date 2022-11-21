// Tim C
import React from "react";
import PropTypes from "prop-types";
import "../../stylesheets/Alert.css";

function Alert({ type, heading, message }) {
  // TODO: validate type is "warning", "success", etc.
  type = type ? type : "info";

  if (heading || message) {
    return (
      <div className="Alert">
        <div
          className={`alert alert-${type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{`${heading}`}</strong> {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  message: PropTypes.element.isRequired,
};

export default Alert;
