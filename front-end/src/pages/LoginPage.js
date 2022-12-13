// By Tim

import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm.js";
import PropTypes from "prop-types";
import useAlert from "../hooks/useAlert.js";
import { useNavigate } from "react-router-dom";
import Footer from "../components/base-page-components/Footer.js";

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
      <div className="container">
        <main>
          <h1 className="title">Welcome to BeHere</h1>
          <AlertComponent />
          <div className="row">
            <div className="col">
              <LoginForm setAlert={setAlert} />
            </div>
          </div>
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

LoginPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default LoginPage;
