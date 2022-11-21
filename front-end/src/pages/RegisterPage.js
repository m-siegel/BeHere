// By Mea
import "../stylesheets/RegisterPage.css";
import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import Alert from "../components/base-page-components/Alert";

function RegisterPage() {
  const [alert, setAlert] = useState({
    type: "",
    heading: "",
    message: <div></div>,
  });

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
              <Alert
                type={alert.type}
                heading={alert.heading}
                message={alert.message}
              />
              <h1>Register</h1>
              <RegisterForm setAlert={setAlert} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RegisterPage.propTypes = {};

export default RegisterPage;
