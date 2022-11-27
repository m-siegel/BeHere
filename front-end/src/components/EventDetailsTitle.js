import React from "react";
import PropTypes from "prop-types";

function EventDetailsTitle({ title }) {
  return (
    <div className="EventDetailsTitle card">
      <div className="card-body">
        <h1>{title ? title : "No event name to display"}</h1>
      </div>
    </div>
  );
}

EventDetailsTitle.propTypes = {
  title: PropTypes.string,
};

export default EventDetailsTitle;
