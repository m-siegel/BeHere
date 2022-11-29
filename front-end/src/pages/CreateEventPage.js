// By Tim
import React, { useEffect } from "react";
import BasePage from "../components/base-page-components/BasePage.js";
import useAlert from "../hooks/useAlert.js";
import CreateEventForm from "../components/CreateEventForm.js";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function CreateEventPage({ isAuth }) {
  const [AlertComponent, setAlert] = useAlert();
  const navigate = useNavigate();

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
    <BasePage>
      <AlertComponent />
      <div className="card">
        <div className="card-body">
          <h1>Create an event</h1>
          <CreateEventForm setAlert={setAlert} />
        </div>
      </div>
    </BasePage>
  );
}

CreateEventPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default CreateEventPage;
