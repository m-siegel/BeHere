import React from "react";
import { Link } from "react-router-dom";
// TODO: propTypes

function IconLinkButton({ iconPath, descriptionText, linkPath }) {
  return (
    // TODO: option for without link if link is null?
    <Link to={linkPath}>
      <button type="button" className="btn">
        <img src={iconPath} alt={`${descriptionText} icon`}></img>
        <p>
          <small className="text-muted">{descriptionText}</small>
        </p>
      </button>
    </Link>
  );
}

export default IconLinkButton;
