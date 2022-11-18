/* Ilana-Mahmea */
// TODO: is this helpful at all as something that could receive just the path string?
import React from "react";
import PropTypes from "prop-types";

function BaseBootstrapIcon({ size, color, className, path }) {
  // TODO: do validation?
  size = size ? size : 16;
  color = color ? color : "#000000";
  return (
    // Bootstrap icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      fill={`${color}`}
      className={`${className}`}
      viewBox="0 0 16 16"
    >
      {path}
    </svg>
  );
}

BaseBootstrapIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  path: PropTypes.element.isRequired,
};

export default BaseBootstrapIcon;
