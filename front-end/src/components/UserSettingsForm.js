/* Ilana-Mahmea */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormInput from "./FormInput";

/**
 * Form for updating user settings.
 */
function UserSettingsForm({ setAlert }) {
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await (
          await fetch("/api/getCurrentUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
        ).json();
        if (res) {
          setUserObj(res);
        }
      } catch (e) {
        console.error(e);
        setUserObj({});
      }
    }
    loadUser();
  }, []);

  async function onSubmit(evt) {
    evt.preventDefault();
    setAlert({
      type: "info",
      heading: "",
      message: <div>Attempting update...</div>,
    });
    try {
      const res = await (
        await fetch("/api/updateUserDocument", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updatedUserObj: userObj,
          }),
        })
      ).json();
      alertUser(res);
    } catch (e) {
      console.error("Error in onSubmit: ", e);
    }
  }

  function alertUser(info) {
    if (info?.success) {
      setAlert({
        type: "success",
        heading: "Update successful!",
      });
    } else {
      if (info?.message?.indexOf("try again later") === -1) {
        setAlert({
          type: "warning",
          heading: "Update unsuccessful",
          message: <div>{info.message}</div>,
        });
      } else {
        setAlert({
          type: "danger",
          heading: "Update unsuccessful",
          message: (
            <div>
              {info.message
                ? info.message
                : "We're having trouble processing your update request. Please try again later!"}
            </div>
          ),
        });
      }
    }
  }

  return (
    <div className="UserSettingsForm">
      <form className="form" id="userSettingsForm" onSubmit={onSubmit}>
        <FormInput
          type="text"
          idAndName="firstName"
          labelContent="First Name"
          value={userObj.firstName ? userObj.firstName : ""}
          onChange={(evt) =>
            // https://blog.logrocket.com/how-when-to-force-react-component-re-render/
            setUserObj({ ...userObj, firstName: evt.target.value })
          }
        />
        <FormInput
          type="text"
          idAndName="lastName"
          labelContent="Last Name"
          value={userObj.lastName ? userObj.lastName : ""}
          onChange={(evt) =>
            setUserObj({ ...userObj, lastName: evt.target.value })
          }
        />
        <FormInput
          type="text"
          idAndName="username"
          labelContent="Username"
          value={userObj.username ? userObj.username : ""}
          onChange={(evt) =>
            setUserObj({ ...userObj, username: evt.target.value })
          }
        />
        <FormInput
          type="email"
          idAndName="orgEmail"
          labelContent="Organization Email"
          // v3 -- multiple org emails
          value={
            userObj.organizationEmails ? userObj.organizationEmails[0] : ""
          }
          onChange={(evt) => {
            const newEmails = userObj.organizationEmails;
            newEmails[0] = evt.target.value;
            setUserObj({ ...userObj, organizationEmails: newEmails });
          }}
        />
        <FormInput
          type="email"
          idAndName="contactEmail"
          labelContent="Contact Email"
          value={userObj.contactEmail ? userObj.contactEmail : ""}
          // v3 -- enable syncing of org and contact emails
          onChange={(evt) =>
            setUserObj({ ...userObj, contactEmail: evt.target.value })
          }
        />
        <div className="centering-container">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

UserSettingsForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default UserSettingsForm;
