// By Tim
import React from "react";
import BasePage from "../components/base-page-components/BasePage.js";
import EventForm from "../components/EventForm.js";
import PropTypes from "prop-types";

function EditEventPage({ event }) {
  return (
    <BasePage>
      <div class="card">
        <div class="card-body">
          <h1>Edit your event</h1>
          <EventForm />
        </div>
      </div>
    </BasePage>
  );
}

EditEventPage.propTypes = {
  event: PropTypes.object,
};

export default EditEventPage;
