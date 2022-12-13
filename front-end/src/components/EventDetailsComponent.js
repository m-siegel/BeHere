/* Ilana-Mahmea */

import PropTypes from "prop-types";
import EventDetailsLikesRsvps from "./EventDetailsLikesRsvps.js";
import EventDetailsLocationTime from "./EventDetailsLocationTime.js";
import EventDetailsDescription from "./EventDetailsDescription.js";

function EventDetailsComponent({ eventInfo }) {
  return (
    <div className={"EventDetailsComponent"}>
      <div className="row">
        <div
          className="location-and-time d-lg-none col-12"
          id="location-and-time-before"
        >
          <div className="row">
            <EventDetailsLocationTime
              start={eventInfo.start}
              end={eventInfo.finish}
              location={eventInfo.location}
            />
          </div>
        </div>
        <div className="description-and-rsvps col col-lg-8">
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

        <div
          className="location-and-time d-none d-lg-block col col-lg-4"
          id="location-and-time-after"
        >
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
