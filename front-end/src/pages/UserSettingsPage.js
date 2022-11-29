// By Mea
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BasePage from "../components/base-page-components/BasePage.js";
import useAlert from "../hooks/useAlert.js";
import UserSettingsForm from "../components/UserSettingsForm.js";
import "../stylesheets/UserSettingsPage.css";

function UserSettingsPage({ isAuth }) {
  const [AlertComponent, setAlert] = useAlert();
  const navigate = useNavigate();

  async function handleDelete(evt) {
    evt.preventDefault();
    try {
      const deleteRes = await // TODO: change to delete
      (
        await fetch("/api/deleteUserAccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      if (deleteRes.success) {
        const logoutRes = await (
          await fetch("/logout", {
            method: "POST",
          })
        ).json();
        if (logoutRes.success) {
          navigate("/register", { replace: true });
        } else {
          setAlert({
            type: "danger",
            heading: "Unable to logout. Please delete your cookies.",
            message: <div>Please try again later.</div>,
          });
        }
      } else {
        setAlert({
          type: "warning",
          heading: "Unable to delete account.",
          message: <div>Please try again later.</div>,
        });
      }
    } catch (e) {
      console.log("Error in handleDelete: ", e);
    }
  }

  useEffect(() => {
    async function authOrRedirect() {
      if (!(await isAuth())) {
        console.log(isAuth);
        navigate("/login", { replace: true });
      }
    }
    authOrRedirect();
  }, []);

  return (
    <div className="UserSettingsPage">
      <BasePage>
        <AlertComponent />
        <h1>Settings</h1>
        <div className="container">
          <div className="row">
            <div className="centering-container">
              <UserSettingsForm setAlert={setAlert} />
            </div>
          </div>
          <div className="centering-container">
            <button
              className="btn btn-danger del-acct-btn"
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </div>
        </div>
      </BasePage>
    </div>
  );
}

UserSettingsPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default UserSettingsPage;
