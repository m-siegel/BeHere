import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EventDetailsLikesRsvps from "./EventDetailsLikesRsvps.js";
import EventDetailsLocationTime from "./EventDetailsLocationTime.js";
import EventDetailsDescription from "./EventDetailsDescription.js";

function EventDetailsComponent({ eventInfo }) {
  return (
    <div className={"EventDetailsComponent"}>
      <h1 id="eventDetailsTitle">
        {eventInfo.name ? eventInfo.name : "No event name to display"}
      </h1>
      <div className="row">
        <div className="description-and-rsvps col col-8">
          <div className="row">
            <EventDetailsDescription
              description={eventInfo.description}
              tags={eventInfo.tags}
            />
          </div>
          <div className="row">
            <EventDetailsLikesRsvps eventInfo={eventInfo} />
          </div>
        </div>

        <div className="location-and-time col col-4">
          <div className="row">
            <EventDetailsLocationTime
              start={eventInfo.start}
              end={eventInfo.finish}
              location={eventInfo.location}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

EventDetailsComponent.propTypes = {
  eventInfo: PropTypes.object,
};

export default EventDetailsComponent;
