import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/StyledTagComponent.css";

function StyledTagComponent({ tagName }) {
  return (
    <span className={`StyledTagComponent ${tagName.replace("/", "-")}`}>
      {tagName}{" "}
    </span>
  );
}

StyledTagComponent.propTypes = { tagName: PropTypes.string.isRequired };

export default StyledTagComponent;
