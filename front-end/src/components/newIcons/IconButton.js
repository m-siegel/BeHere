// TODO: delete

import React from "react";
import PropTypes from "prop-types";

function IconButton({ icon, descriptionText, buttonAttributes }) {
  return (
    <button type="button" className="btn">
      {icon}
      <p>
        <small className="timea-text-muted">{descriptionText}</small>
      </p>
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  descriptionText: PropTypes.string.isRequired,
};

export default IconButton;
