/* Ilana-Mahmea */

import "../stylesheets/IndexPage.css";
import React from "react";
import { Link } from "react-router-dom";

function IndexPage() {
  return (
    <div className="IndexPage">
      <div className="container-fluid">
        <div className="login-link">
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
        <div className="row">
          <div className="col d-none d-md-flex img-col">
            <img
              src="/media/example-images/pexels-do-castle-2158963.jpeg"
              alt="Three people riding mountain bikes through bright green grass and trees."
            ></img>
          </div>
          <div className="col text-col">
            <div className="row">
              <div className="row title-row">
                <h1>B🐝 Here!</h1>
              </div>
              <div className="row description-div">
                <h2>Your organization's event hub</h2>
                <p>
                  Many of us have colleagues or classmates that we like, but
                  aren't friends with. Friendship needs something beyond the
                  regular break room chat or shared desk. That's where{" "}
                  <i>Be Here</i> comes in. The pickup soccer, book clubs, city
                  tours, and other activities you'll find here can be the magic
                  that turns "friendly" into "friendship".
                </p>
                <p>
                  Are you looking for activities in the area or searching for a
                  new hobby, but are hesitant to try out activites with complete
                  strangers. The events you see on <i>Be Here</i> are hosted by
                  members of your organization, so even when you don't know
                  them, you know that you have something in common.
                </p>
              </div>
              <div className="button-row">
                <Link to="/register">
                  <button className="btn btn-signup">Sign Up</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

IndexPage.propTypes = {};

export default IndexPage;
