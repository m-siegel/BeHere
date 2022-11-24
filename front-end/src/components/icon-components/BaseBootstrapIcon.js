/* Ilana-Mahmea */
import React from "react";
import PropTypes from "prop-types";

function BaseBootstrapIcon({ children, className, size, color, viewBox }) {
  // TODO: do validation?
  size = size ? size : "1.5em";
  color = color ? color : "currentColor";
  viewBox = viewBox ? viewBox : "0 0 16 16";

  return (
    // Bootstrap icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      fill={`${color}`}
      className={`Icon BaseBootstrapIcon ${className}`}
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
}

BaseBootstrapIcon.propTypes = {
  children: PropTypes.element.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  viewBox: PropTypes.string,
};

export default BaseBootstrapIcon;
