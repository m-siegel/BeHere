/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";

function IconOnClickButton({
  icon,
  descriptionText,
  onClick,
  className,
  inline = false,
}) {
  return (
    <button
      type="button"
      className={`IconButton IconOnClickButton btn ${className}`}
      onClick={onClick}
    >
      {icon}
      {inline ? (
        <span>
          <small className="timea-text-muted">{descriptionText}</small>
        </span>
      ) : (
        <p>
          <small className="timea-text-muted">{descriptionText}</small>
        </p>
      )}
    </button>
  );
}

IconOnClickButton.propTypes = {
  icon: PropTypes.element.isRequired,
  descriptionText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool,
};

export default IconOnClickButton;
