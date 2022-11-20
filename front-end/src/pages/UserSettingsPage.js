// By Mea
import React from "react";
import PropTypes from "prop-types";
import BasePage from "../components/base-page-components/BasePage.js";

function UserSettingsPage() {
  return (
    <div className="UserSettingsPage">
      <BasePage>
        <h1>User Settings</h1>
        <p>Some paragrap text</p>
      </BasePage>
    </div>
  );
}

UserSettingsPage.propTypes = {};

export default UserSettingsPage;
