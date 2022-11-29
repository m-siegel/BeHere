/* Ilana-Mahmea */

import "../stylesheets/RegisterPage.css";
import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import useAlert from "../hooks/useAlert";

function RegisterPage() {
  const [AlertComponent, setAlert] = useAlert();

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

RegisterPage.propTypes = {};

export default RegisterPage;
