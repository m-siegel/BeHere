// By Tim

import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import LoginForm from "../components/LoginForm.js";
import BasePage from "../components/base-page-components/BasePage.js";

function LoginPage() {
  return (
    <BasePage>
      <div className="loginPage">
        <div className="container">
          <h1 className="title">Welcome to BeHere</h1>
          <Row className="row">
            <Col className="col-xxl-6">
              <Link className="btn btn-primary" to="./signupPage">
                Go to sign up page
              </Link>
              <Link className="btn btn-primary" to="./feedPage">
                Go to the feed page
              </Link>
              <button onClick={() => fetch("/test")}>
                Testing some backend route. Should print "got request" to
                console.
              </button>
            </Col>
            <Col className="col-xxl-6">
              <LoginForm />
            </Col>
          </Row>
        </div>
      </div>
    </BasePage>
  );
}

export default LoginPage;
