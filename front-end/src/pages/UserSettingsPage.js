/* Ilana-Mahmea */

import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BasePage from "../components/base-page-components/BasePage.js";
import useAlert from "../hooks/useAlert.js";
import UserSettingsForm from "../components/UserSettingsForm.js";
import "../stylesheets/UserSettingsPage.css";

function UserSettingsPage() {
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
              type="button"
              class="btn btn-danger del-acct-btn"
              data-bs-toggle="modal"
              data-bs-target="#deleteConfirmation"
            >
              Delete Account
            </button>
          </div>

          <div
            class="modal fade"
            id="deleteConfirmation"
            tabindex="-1"
            aria-labelledby="deleteConfirmationLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  Are you sure you want to delete your account?
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    data-bs-dismiss="modal"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BasePage>
    </div>
  );
}

UserSettingsPage.propTypes = {};

export default UserSettingsPage;
