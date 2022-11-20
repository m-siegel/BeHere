// By Mea
import React from "react";
import PropTypes from "prop-types";
import BasePage from "../components/base-page-components/BasePage.js";
import DetailedEvent from "../components/DetailedEvent.js";

function EventDetailsPage() {
  return (
    <div className="EventDetailsPage">
      <BasePage>
        <h1>Event Details</h1>
        <p>Some paragrap text</p>
        <DetailedEvent />
      </BasePage>
    </div>
  );
}

EventDetailsPage.propTypes = {};

export default EventDetailsPage;
