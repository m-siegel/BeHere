/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function IconLinkButton({ icon, descriptionText, linkPath, className }) {
  return (
    // TODO: option for without link if link is null?
    <Link to={linkPath} className={`IconButton IconLinkButton ${className}`}>
      <button type="button" className="btn">
        {icon}
        <p>
          <small className="timea-text-muted">{descriptionText}</small>
        </p>
      </button>
    </Link>
  );
}

IconLinkButton.propTypes = {
  icon: PropTypes.element.isRequired,
  descriptionText: PropTypes.string.isRequired,
  linkPath: PropTypes.string,
  className: PropTypes.string,
};

export default IconLinkButton;
