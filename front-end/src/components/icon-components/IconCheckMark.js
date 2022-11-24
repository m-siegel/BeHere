/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import BaseBootstrapIcon from "./BaseBootstrapIcon.js";

function IconCheckMark({ size, color, className }) {
  return (
    <BaseBootstrapIcon size={size} color={color} className={className}>
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
    </BaseBootstrapIcon>
  );
}

IconCheckMark.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default IconCheckMark;
