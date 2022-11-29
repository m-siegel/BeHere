/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import "../../stylesheets/IconButtonDropdown.css";

/**
 * Returns a dropdown button with the specified icon and text that controls a dropdown menu of the given items.
 */
function IconButtonDropdown(props) {
  return (
    <div
      className={`IconButton IconButtonDropdown dropdown-center col ${props.className}`}
    >
      <div data-bs-toggle="dropdown">
        <button className="btn col" type="button" aria-expanded="false">
          {props.icon}
          <p>
            <small className="timea-text-muted">{props.descriptionText}</small>
          </p>
        </button>

        <ul className="dropdown-menu">
          {props.dropdownMenu.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

IconButtonDropdown.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  descriptionText: PropTypes.string.isRequired,
  dropdownMenu: PropTypes.arrayOf(PropTypes.element),
};

export default IconButtonDropdown;
