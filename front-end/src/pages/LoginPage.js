// By Tim

import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm.js";
import BasePage from "../components/base-page-components/BasePage.js";
import PropTypes from "prop-types";
import useAlert from "../hooks/useAlert.js";
import { useNavigate } from "react-router-dom";

function LoginPage({ isAuth }) {
  const navigate = useNavigate();
  const [AlertComponent, setAlert] = useAlert();

  useEffect(() => {
    async function authOrRedirect() {
      if (await isAuth()) {
        navigate("/event-feed", { replace: true });
      }
    }
    authOrRedirect();
  }, [isAuth, navigate]);

  return (
    <div className="LoginPage">
      <BasePage>
        <div className="container">
          <h1 className="title">Welcome to BeHere</h1>
          <AlertComponent />
          <div className="row">
            <div className="col">
              <LoginForm setAlert={setAlert} />
            </div>
          </div>
        </div>
      </BasePage>
    </div>
  );
}

LoginPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default LoginPage;
