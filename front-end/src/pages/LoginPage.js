// By Tim

import React from "react";
import LoginForm from "../components/LoginForm.js";
import BasePage from "../components/base-page-components/BasePage.js";

function LoginPage() {
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

export default LoginPage;
