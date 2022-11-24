/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import BaseBootstrapIcon from "./BaseBootstrapIcon.js";

function IconPlusSquareOutline({ size, color, className }) {
  return (
    <BaseBootstrapIcon size={size} color={color} className={className}>
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
    </BaseBootstrapIcon>
  );
}

IconPlusSquareOutline.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default IconPlusSquareOutline;
