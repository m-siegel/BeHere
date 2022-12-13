/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";

/**
 * Displays the time and place information for an event on the detailedEvents page.
 */
function EventDetailsLocationTime({ location, start, end }) {
  return (
    <div className="EventDetailsLocationTime">
      <h2>When 🕰️</h2>
      <p>
        <strong>Start: </strong>
        {start && start !== "Invalid Date" ? (
          start
        ) : (
          <i>{"No start time information to display"}</i>
        )}
      </p>
      <p>
        <strong>End: </strong>
        {end && end !== "Invalid Date" ? (
          end
        ) : (
          <i>{"No end time information to display"}</i>
        )}
      </p>
      <hr />
      <h2>Where 📍</h2>
      <p>
        {location ? location : <i>{"No location information to display"}</i>}
      </p>
    </div>
  );
}

EventDetailsLocationTime.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  location: PropTypes.string,
};

export default EventDetailsLocationTime;
