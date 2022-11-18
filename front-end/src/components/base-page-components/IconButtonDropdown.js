import React from "react";
import "../../stylesheets/IconButtonDropdown.css";
// TODO: propTypes

function IconButtonDropdown(props) {
  return (
    <div className="dropdown">
      <button
        className="btn"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {/* <img src={props.iconPath} alt={`${props.descriptionText} icon`}></img> */}
        {props.icon}
        <p>
          <small className="text-muted">{props.descriptionText}</small>
        </p>
      </button>

      <ul className="dropdown-menu">
        {props.dropdownMenu.map((d) => (
          <li>
            <button className="dropdown-item" type="button" onClick={d.onClick}>
              {d.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IconButtonDropdown;
