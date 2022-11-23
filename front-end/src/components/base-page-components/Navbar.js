import React from "react";
import { useNavigate } from "react-router-dom";
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

function Navbar() {
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  async function handleLogout() {
    const res = await (
      await fetch("/logout", {
        method: "POST",
      })
    ).json();
    if (res.success) {
      navigate("/login", { replace: true });
    }
  }

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
            <button
              className="dropdown-item"
              type="button"
              // Link wouldn't work here.
              // https://atomizedobjects.com/blog/react/how-to-redirect-in-reactjs/
              onClick={() => navigate("/settings", { replace: true })}
            >
              Settings
            </button>,
            <button
              className="dropdown-item"
              type="button"
              onClick={handleLogout}
            >
              Log Out
            </button>,
          ]}
        ></IconButtonDropdown>
        <button
          onClick={async () => {
            const res = await fetch("/getPassportUser", { method: "POST" });
            if (res) {
              console.log(await res.json());
            } else {
              console.log("res is null");
            }
          }}
        ></button>
      </nav>
    </div>
  );
}

Navbar.propTypes = {};

export default Navbar;
