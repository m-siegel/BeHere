// By Tim

import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm.js";
import BasePage from "../components/base-page-components/BasePage.js";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function LoginPage({ isAuth }) {
  const navigate = useNavigate();

  useEffect(() => {
    async function authOrRedirect() {
      if (await isAuth()) {
        navigate("/event-feed", { replace: true });
      }
    }
    authOrRedirect();
  }, [isAuth, navigate]);

  return (
    <BasePage>
      <div className="loginPage">
        <div className="container">
          <h1 className="title">Welcome to BeHere</h1>
          <div className="row">
            <div className="col-xxl-6">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
}

LoginPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default LoginPage;
