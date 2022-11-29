// By Tim
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BasePage from "../components/base-page-components/BasePage.js";
import EventForm from "../components/EventForm.js";
import useAlert from "../hooks/useAlert.js";
import ConfirmDeleteComponent from "../components/ConfirmDeleteComponent.js";
import PropTypes from "prop-types";

function EditEventPage({ isAuth }) {
  const [del, setDel] = useState(false);
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
    <BasePage>
      <AlertComponent />
      <div className="card">
        <div className="card-body">
          <h1>Edit your event</h1>
          <EventForm setAlert={setAlert} setDel={setDel} />
        </div>
      </div>
      <ConfirmDeleteComponent del={del} setDel={setDel} setAlert={setAlert} />
    </BasePage>
  );
}

EditEventPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default EditEventPage;
