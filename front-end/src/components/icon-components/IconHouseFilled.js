/* Ilana-Mahmea */
import React from "react";
import PropTypes from "prop-types";

function IconHouseFilled({ size, color, className }) {
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
      className={`bi bi-house-fill ${className}`}
      viewBox="0 0 16 16"
    >
      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
      <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
    </svg>
  );
}

IconHouseFilled.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default IconHouseFilled;
