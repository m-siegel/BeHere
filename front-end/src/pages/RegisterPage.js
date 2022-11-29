// By Mea
import "../stylesheets/RegisterPage.css";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import useAlert from "../hooks/useAlert";
import PropTypes from "prop-types";

function RegisterPage({ isAuth }) {
  const [AlertComponent, setAlert] = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    async function authOrRedirect() {
      if (await isAuth()) {
        console.log(isAuth);
        navigate("/home", { replace: true });
      }
    }
    authOrRedirect();
  }, []);

  return (
    <div className="RegisterPage">
      <div className="container-fluid">
        <div className="row">
          <div className="col d-none d-sm-flex img-col">
            <img
              src="/media/example-images/pexels-do-castle-2158963.jpeg"
              className="img-fluid"
              alt="Three people riding mountain bikes through bright green grass and trees."
            ></img>
          </div>
          <div className="col form-col">
            <div>
              <AlertComponent />
              <h1>Register</h1>
              <RegisterForm setAlert={setAlert} />
              <div className="bottom-link">
                Already have an account?{" "}
                <Link to="/login" className="link">
                  Go to login.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RegisterPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default RegisterPage;
