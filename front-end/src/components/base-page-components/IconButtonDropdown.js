/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import "../../stylesheets/IconButtonDropdown.css";

/**
 * Returns a dropdown button with the specified icon and text that controls a dropdown menu of the given items.
 */
function IconButtonDropdown({
  className,
  icon,
  disabled,
  descriptionText,
  dropdownMenu,
  buttonOptions,
  uniqueId,
}) {
  return (
    <div className={`IconButton IconButtonDropdown dropdown-center col`}>
      <div data-bs-toggle="dropdown" disabled={disabled}>
        <button
          className={`btn col ${className}`}
          type="button"
          aria-controls={`#${uniqueId}`}
          aria-expanded="false"
          disabled={disabled}
          {...buttonOptions}
        >
          {icon}
          <p>
            <small className="timea-text-muted">{descriptionText}</small>
          </p>
        </button>

        <ul className="dropdown-menu" id={uniqueId}>
          {dropdownMenu.map((d, i) => (
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
  disabled: PropTypes.bool,
  buttonOptions: PropTypes.object,
  uniqueId: PropTypes.string.isRequired,
};

export default IconButtonDropdown;
