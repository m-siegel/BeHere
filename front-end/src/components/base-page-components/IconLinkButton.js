import React from "react";
import { Link } from "react-router-dom";
// TODO: propTypes

function IconLinkButton({ icon, descriptionText, linkPath }) {
  return (
    // TODO: option for without link if link is null?
    <Link to={linkPath} className="IconLinkButton">
      <button type="button" className="btn">
        {/* <img src={iconPath} alt={`${descriptionText} icon`}></img> */}
        {icon}
        <p>
          <small className="timea-text-muted">{descriptionText}</small>
        </p>
      </button>
    </Link>
  );
}

export default IconLinkButton;
