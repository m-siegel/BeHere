/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";

function EventDetailsLocationTime({ location, start, end }) {
  return (
    <div className="EventDetailsLocationTime card">
      <div className="card-body">
        <h4>When 🕰️</h4>
        <p>
          <strong>Start: </strong>
          {start ? start : <i>{"No start time information to display"}</i>}
        </p>
        <p>
          <strong>End: </strong>
          {end ? end : <i>{"No end time information to display"}</i>}
        </p>
        <hr />
        <h4>Where 📍</h4>
        <p>
          {location ? location : <i>{"No location information to display"}</i>}
        </p>
      </div>
    </div>
  );
}

EventDetailsLocationTime.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  location: PropTypes.string,
};

export default EventDetailsLocationTime;
