/* Ilana-Mahmea */

import "../stylesheets/RegisterPage.css";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import useAlert from "../hooks/useAlert";
import PropTypes from "prop-types";
import NotAuthBasePage from "../components/base-page-components/NotAuthBasePage.js";

function RegisterPage({ isAuth }) {
  const [AlertComponent, setAlert] = useAlert();
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
    <div className="RegisterPage">
      <NotAuthBasePage>
        <AlertComponent />
        <div className="card card-body">
          <h1>Register</h1>
          <div className="row form-row">
            <RegisterForm setAlert={setAlert} />
            <div className="bottom-link">
              Already have an account?{" "}
              {/* <Link to="/login" className="link"> */}
              <Link to="/login" className="link">
                Go to login.
              </Link>
              {/* </Link> */}
            </div>
            <div className="row">
              <p>
                Or go{" "}
                <Link to="/" className="link">
                  {/* <button
                  className="btn btn-link btn-landing"
                  onClick={() => {
                    navigate("/", { replace: true });
                  }}
                > */}
                  back to the Landing Page
                  {/* </button> */}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </NotAuthBasePage>
    </div>
  );
}

RegisterPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default RegisterPage;
