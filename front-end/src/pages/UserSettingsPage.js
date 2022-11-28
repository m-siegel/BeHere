// By Mea
import React from "react";
import PropTypes from "prop-types";
import BasePage from "../components/base-page-components/BasePage.js";
import useAlert from "../hooks/useAlert.js";
import UserSettingsForm from "../components/UserSettingsForm.js";
import "../stylesheets/UserSettingsPage.css";

function UserSettingsPage() {
  const [AlertComponent, setAlert] = useAlert();

  return (
    <div className="UserSettingsPage">
      <BasePage>
        <AlertComponent />
        <h1>Settings</h1>
        <div className="form-container">
          <UserSettingsForm setAlert={setAlert} />
        </div>
      </BasePage>
    </div>
  );
}

UserSettingsPage.propTypes = {};

export default UserSettingsPage;
