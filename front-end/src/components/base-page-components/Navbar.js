import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import IconLinkButton from "./IconLinkButton.js";
import IconButtonDropdown from "./IconButtonDropdown.js";
import IconHouseOutline from "../icon-components/IconHouseOutline.js";
import IconHouseFilled from "../icon-components/IconHouseFilled.js";
import IconPlusSquareOutline from "../icon-components/IconPlusSquareOutline.js";
import IconPlusSquareFilled from "../icon-components/IconPlusSquareFilled.js";
import IconCalendarWeekOutline from "../icon-components/IconCalendarWeekOutline.js";
import IconCalendarWeekFilled from "../icon-components/IconCalendarWeekFilled.js";
import IconPersonOutline from "../icon-components/IconPersonOutline.js";
import IconPersonFilled from "../icon-components/IconPersonFilled.js";

// TODO: refactor icon buttons and figure out where active state/prop for style should go

function Navbar(props) {
  const pathname = window.location.pathname;

  // TODO: change whole column to be clickable?

  // TODO: change active based on props
  return (
    <div className="Navbar">
      <nav className="row text-center Navbar">
        <IconLinkButton
          className="nav-a col"
          aria-current="page" // TODO: keep this?
          icon={
            pathname === "/home" ? ( // TODO: or === /event:id
              <IconHouseFilled
                className="icon active"
                color="blue"
                size="1.5em"
              />
            ) : (
              <IconHouseOutline className="icon" color="#282323" size="1.5em" /> // TODO: figure out color
            )
          }
          descriptionText="Home"
          linkPath={"/home"}
        ></IconLinkButton>

        <IconLinkButton
          className="nav-a col" // TODO: with url params
          icon={
            pathname === "/edit" ? (
              <IconPlusSquareFilled
                className="active"
                color="blue"
                size="1.5em"
              />
            ) : (
              <IconPlusSquareOutline color="#282323" size="1.5em" />
            )
          }
          descriptionText="Create"
          linkPath={"/edit"} // TODO: edit without id creates one
        ></IconLinkButton>

        <IconLinkButton
          className="nav-a col"
          icon={
            pathname === "/dashboard" ? (
              <IconCalendarWeekFilled
                className="active"
                color="blue"
                size="1.5em"
              />
            ) : (
              <IconCalendarWeekOutline color="#282323" size="1.5em" />
            )
          }
          descriptionText="Dashboard"
          linkPath={"/dashboard"}
        ></IconLinkButton>

        <IconButtonDropdown
          className="col" // TODO: with url params
          icon={
            pathname === "/settings" ? (
              <IconPersonFilled className="active" color="blue" size="1.5em" />
            ) : (
              <IconPersonOutline color="#282323" className="col" size="1.5em" />
            )
          }
          descriptionText="Me"
          dropdownMenu={[
            // TODO: change dropdown to allow for icon buttons in this menu, too
            // TODO: link now working when sent to IconButton
            <Link className="dropdown-item" to="/settings">
              Settings
            </Link>,
            <button
              className="dropdown-item"
              type="button"
              onClick={() => console.log("clicked log out")}
            >
              Log Out
            </button>,
          ]}
        ></IconButtonDropdown>
      </nav>
    </div>
  );
}

Navbar.propTypes = {};

export default Navbar;
