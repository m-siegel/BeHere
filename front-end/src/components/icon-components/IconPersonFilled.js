/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import BaseBootstrapIcon from "./BaseBootstrapIcon.js";

function IconPersonFilled({ size, color, className }) {
  return (
    <BaseBootstrapIcon size={size} color={color} className={className}>
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </BaseBootstrapIcon>
  );
}

IconPersonFilled.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default IconPersonFilled;
