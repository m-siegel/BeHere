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
import IconGear from "../icon-components/IconGear.js";
import IconLogoutArrow from "../icon-components/IconLogoutArrow.js";
import IconOnClickButton from "./IconOnClickButton.js";

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
    <nav className="row text-center Navbar">
      <IconLinkButton
        className={pathname === "/home" ? "nav-a col active" : "nav-a col"}
        aria-current="page" // TODO: keep this?
        icon={
          pathname === "/home" ? (
            <IconHouseFilled color="blue" />
          ) : (
            <IconHouseOutline />
          )
        }
        descriptionText="Home"
        linkPath={"/home"}
      ></IconLinkButton>

      <IconLinkButton
        className={pathname === "/edit" ? "nav-a col active" : "nav-a col"}
        icon={
          pathname === "/edit" ? (
            <IconPlusSquareFilled color="blue" />
          ) : (
            <IconPlusSquareOutline />
          )
        }
        descriptionText="Create"
        linkPath={"/edit"}
      ></IconLinkButton>

      <IconLinkButton
        className={pathname === "/dashboard" ? "nav-a col active" : "nav-a col"}
        icon={
          pathname === "/dashboard" ? (
            <IconCalendarWeekFilled color="blue" />
          ) : (
            <IconCalendarWeekOutline />
          )
        }
        descriptionText="Dashboard"
        linkPath={"/dashboard"}
      ></IconLinkButton>

      <IconButtonDropdown
        className={pathname === "/settings" ? "col active" : "col"}
        icon={
          pathname === "/settings" ? (
            <IconPersonFilled color="blue" />
          ) : (
            <IconPersonOutline />
          )
        }
        descriptionText="Me"
        dropdownMenu={[
          <IconOnClickButton
            className="dropdown-item"
            // https://atomizedobjects.com/blog/react/how-to-redirect-in-reactjs/
            onClick={() => navigate("/settings", { replace: true })}
            icon={
              pathname === "/settings" ? (
                <IconGear color="blue" />
              ) : (
                <IconGear />
              )
            }
            descriptionText={" Settings"}
            inline={true}
          ></IconOnClickButton>,
          <IconOnClickButton
            className="dropdown-item"
            onClick={handleLogout}
            icon={<IconLogoutArrow />}
            descriptionText={" Log Out"}
            inline={true}
          ></IconOnClickButton>,
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
  );
}

Navbar.propTypes = {};

export default Navbar;
