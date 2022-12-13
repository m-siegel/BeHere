// By Tim
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BasePage from "../components/base-page-components/BasePage.js";
import EventForm from "../components/EventForm.js";
import useAlert from "../hooks/useAlert.js";
import PropTypes from "prop-types";
import "../stylesheets/EditEventPage.css";

function EditEventPage({ isAuth }) {
  const [AlertComponent, setAlert] = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    async function authOrRedirect() {
      if (!(await isAuth())) {
        navigate("/login", { replace: true });
      }
    }
    authOrRedirect();
  }, [isAuth, navigate]);

  return (
    <div className="EditEventPage">
      <BasePage>
        <div className="centering-container">
          <AlertComponent />
        </div>
        <div className="card">
          <div className="card-body">
            <h1>Edit your event</h1>
            <EventForm setAlert={setAlert} navigate={navigate} />
          </div>
        </div>
      </BasePage>
    </div>
  );
}

EditEventPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default EditEventPage;
