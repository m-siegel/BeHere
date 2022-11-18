/* Ilana-Mahmea */
import React from "react";
import PropTypes from "prop-types";

function IconPersonFill({ size, color, className }) {
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
      className={`bi bi-person-fill ${className}`}
      viewBox="0 0 16 16"
    >
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  );
}

IconPersonFill.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default IconPersonFill;
