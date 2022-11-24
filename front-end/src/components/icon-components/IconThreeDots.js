/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import BaseBootstrapIcon from "./BaseBootstrapIcon.js";

function IconThreeDots({ size, color, className }) {
  return (
    <BaseBootstrapIcon size={size} color={color} className={className}>
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </BaseBootstrapIcon>
  );
}

IconThreeDots.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default IconThreeDots;
