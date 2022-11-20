// Up for grabs
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BasePage from "../components/base-page-components/BasePage.js";

function ErrorPage() {
  const pathname = window.location.pathname;

  return (
    <div className="ErrorPage">
      <BasePage>
        <h3>
          Uh oh, looks like this page wanted to <i>be here</i> somewhere else 😜
        </h3>
        <p>
          <strong>404 Error:</strong> No page can be found at the extension{" "}
          <i>{pathname}</i>
        </p>
        <p>
          Check out our other pages by clicking the navbar or{" "}
          <Link to="/">this link</Link>.
        </p>
      </BasePage>
    </div>
  );
}

ErrorPage.propTypes = {};

export default ErrorPage;
