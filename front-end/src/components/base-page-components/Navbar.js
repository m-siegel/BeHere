import React from "react";
import { Link } from "react-router-dom";
import IconLinkButton from "./IconLinkButton.js";
import IconButtonDropdown from "./IconButtonDropdown.js";
import "../../stylesheets/Navbar.css";
// TODO: should change <Link> to link, but then it won't render

// Change "a" to "Link"
function Navbar(props) {
  // TODO: change active based on props
  return (
    <nav className="row text-center">
      <div className="col">
        <IconLinkButton
          className="nav-a active" /* TODO: active based on window, do css for it*/
          aria-current="page" // TODO: keep this?
          iconPath="./icons/home-empty-mea.svg"
          descriptionText="Home"
          linkPath={"/home"}
        ></IconLinkButton>
      </div>
      <div className="col">
        <IconLinkButton
          className="nav-a"
          iconPath="./icons/create-empty-mea.svg"
          descriptionText="Create"
          linkPath={"/edit"} // TODO: edit without id creates one
        ></IconLinkButton>
      </div>
      <div className="col">
        <IconLinkButton
          className="nav-a"
          iconPath="./icons/calendar-empty-mea.svg"
          descriptionText="Dashboard"
          linkPath={"/dashboard"}
        ></IconLinkButton>
      </div>
      <div className="col">
        <IconButtonDropdown
          iconPath="./icons/user-empty-mea.svg"
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
