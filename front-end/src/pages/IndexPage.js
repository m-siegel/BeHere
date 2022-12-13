/* Ilana-Mahmea */

import "../stylesheets/IndexPage.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import NotAuthBasePage from "../components/base-page-components/NotAuthBasePage.js";

function IndexPage() {
  const navigate = useNavigate();

  return (
    <div className="IndexPage">
      <NotAuthBasePage>
        <div className="row title-row">
          <h1>B🐝 Here!</h1>
        </div>
        <div className="row description-div" tabIndex={0}>
          <h2>Your organization's event hub</h2>
          <h3>
            What's <i>Be Here</i> for?
          </h3>
          <h4>Forging Friendships</h4>
          <p>
            Many of us have colleagues or classmates that we like but aren't
            friends with. Friendship needs something beyond the regular break
            room chat or shared desk. That's where <i>Be Here</i> comes in. On{" "}
            <i>Be Here</i>, you'll find events by and for members of your
            organization's community. The pickup soccer, book clubs, city tours,
            and other activities you'll find here can be the magic that turns
            "friendly" into "friendship".
          </p>
          <h4>Finding Activities</h4>
          <p>
            Are you looking for activities in the area or searching for a new
            hobby but are hesitant to try out activites with complete strangers?
            The events you see on <i>Be Here</i> are hosted by members of your
            organization, so even when you don't know them, you know that you
            have something in common.
          </p>
          <h3>
            How does <i>Be Here</i> work?
          </h3>
          <p>
            When you sign up for <i>Be Here</i>, we ask for your organization
            (company, school, etc.) email. You'll be connected to other users
            who have emails at the same domain. You can post events for everyone
            with emails at that domain to find, and you'll be able to interact
            with posts by other uses with emails at the same domain as yours.
          </p>
          <p>
            For example, if a user, Eowyn, signs up with the email{" "}
            <i>eowyn@rohan.gov</i>, she'll be able to interact with events
            posted by any other user with an email{" "}
            <i>{"<something>"}@rohan.gov</i> and all of her posts will be
            available to them.
          </p>
          <p>
            Your organization does not need to sign up for you to be able to
            connect to other users with emails at the same domains as yours.
          </p>
        </div>
        <div className="row button-row">
          <span>
            <button
              className="btn btn-signup"
              onClick={() => {
                navigate("/register", { replace: true });
              }}
            >
              Sign Up
            </button>
          </span>
          <span>
            <button
              className="btn btn-login"
              onClick={() => {
                navigate("/login", { replace: true });
              }}
            >
              Log In
            </button>
          </span>
        </div>
      </NotAuthBasePage>
    </div>
  );
}

IndexPage.propTypes = {};

export default IndexPage;
