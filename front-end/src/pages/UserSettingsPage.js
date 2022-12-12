/* Ilana-Mahmea */

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
      const deleteRes = await (
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
      console.error("Error in handleDelete: ", e);
    }
  }

  useEffect(() => {
    async function authOrRedirect() {
      if (!(await isAuth())) {
        navigate("/login", { replace: true });
      }
    }
    authOrRedirect();
  }, [isAuth, navigate]);

  return (
    <div className="UserSettingsPage">
      <BasePage>
        <div className="centering-container">
          <AlertComponent />
        </div>
        <div className="card card-body">
          <h1>Account Settings</h1>
          {/* <div className="container"> */}
          <div className="row">
            <div className="centering-container">
              <UserSettingsForm setAlert={setAlert} />
            </div>
          </div>
          <div className="centering-container">
            <button
              type="button"
              className="btn btn-delete"
              data-bs-toggle="modal"
              data-bs-target="#deleteConfirmation"
            >
              Delete Account
            </button>
          </div>
        </div>

        <div
          className="modal fade"
          id="deleteConfirmation"
          tabIndex="-1"
          aria-labelledby="deleteConfirmationLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete your account?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-grey"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  data-bs-dismiss="modal"
                  className="btn btn-delete"
                  onClick={handleDelete}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </BasePage>
    </div>
  );
}

UserSettingsPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default UserSettingsPage;
