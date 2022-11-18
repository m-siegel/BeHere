import React from "react";
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

import "../../stylesheets/Navbar.css";
// TODO: should change <Link> to link, but then it won't render

// Change "a" to "Link"
function Navbar(props) {
  const pathname = window.location.pathname;

  // TODO: change whole column to be clickable?

  // TODO: change active based on props
  return (
    <nav className="row text-center Navbar">
      <div className="col">
        <IconLinkButton
          className="nav-a"
          aria-current="page" // TODO: keep this?
          icon={
            pathname === "/home" ? ( // TODO: or === /event:id
              <IconHouseFilled className="icon active" color="blue" />
            ) : (
              <IconHouseOutline className="icon" color="#282323" /> // TODO: figure out color
            )
          }
          descriptionText="Home"
          linkPath={"/home"}
        ></IconLinkButton>
      </div>
      <div className="col">
        <IconLinkButton
          className="nav-a" // TODO: with url params
          icon={
            pathname === "/edit" ? (
              <IconPlusSquareFilled className="active" color="blue" />
            ) : (
              <IconPlusSquareOutline color="#282323" />
            )
          }
          descriptionText="Create"
          linkPath={"/edit"} // TODO: edit without id creates one
        ></IconLinkButton>
      </div>
      <div className="col">
        <IconLinkButton
          className="nav-a"
          icon={
            pathname === "/dashboard" ? (
              <IconCalendarWeekFilled className="active" color="blue" />
            ) : (
              <IconCalendarWeekOutline color="#282323" />
            )
          }
          descriptionText="Dashboard"
          linkPath={"/dashboard"}
        ></IconLinkButton>
      </div>
      <div className="col">
        <IconButtonDropdown // TODO: with url params
          icon={
            pathname === "/settings" ? (
              <IconPersonOutline className="active" color="blue" />
            ) : (
              <IconPersonOutline color="#282323" />
            )
          }
          descriptionText="Me"
          dropdownMenu={[
            // TODO: change dropdown to allow for icon buttons in this menu, too
            {
              text: "Settings",
              onClick: () => {
                console.log("clicked 'Settings'");
              },
            },
            {
              text: "Log Out",
              onClick: () => {
                console.log("clicked 'Log Out'");
              },
            },
          ]}
        ></IconButtonDropdown>
      </div>
    </nav>
    // TODO: get this working
    // TODO: style
    // <nav className="navbar navbar-expand-lg bg-light">
    //   <div className="container-fluid">
    //     <ul className="row navbar-nav">
    //       <li className="nav-item col-3">
    //         <Link className="nav-a active" aria-current="page" to="#">
    //           Home
    //         </Link>
    //       </li>

    //       <li className="nav-item col-3">
    //         <Link className="nav-a active" aria-current="page" to="#">
    //           Create
    //         </Link>
    //       </li>

    //       <li className="nav-item col-3">
    //         <Link className="nav-a active" aria-current="page" to="#">
    //           Dashboard
    //         </Link>
    //       </li>

    //       <li className="nav-item col-3">
    //         <Link className="nav-a active" aria-current="page" to="#">
    //           Me
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
}

export default Navbar;
