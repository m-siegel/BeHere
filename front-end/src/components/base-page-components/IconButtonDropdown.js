import React from "react";
import "../../stylesheets/IconButtonDropdown.css";
// TODO: propTypes

function IconButtonDropdown(props) {
  return (
    <div
      className={`IconButtonDropdown dropdown-center col ${props.className}`}
    >
      <div className={`IconButtonDropdown`} data-bs-toggle="dropdown">
        <button className="btn col" type="button" aria-expanded="false">
          {/* <img src={props.iconPath} alt={`${props.descriptionText} icon`}></img> */}
          {props.icon}
          <p>
            <small className="timea-text-muted">{props.descriptionText}</small>
          </p>
        </button>

        <ul className="dropdown-menu">
          {props.dropdownMenu.map((d, i) => (
            // TODO: figure out a better key
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IconButtonDropdown;
