// By Mea
import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import BasePage from "../components/base-page-components/BasePage.js";
import DetailedEvent from "../components/DetailedEvent.js";

function EventDetailsPage() {
  const params = useParams();
  return (
    <div className="EventDetailsPage">
      <BasePage>
        <h1>Event Details</h1>
        <p>Some paragrap text</p>
        <p>id param is {params.id}</p>

        <DetailedEvent />
      </BasePage>
    </div>
  );
}

EventDetailsPage.propTypes = {};

export default EventDetailsPage;
