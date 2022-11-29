/* Ilana-Mahmea */

import "../stylesheets/EventPreview.css";
import React from "react";
import PropTypes from "prop-types";
import EventPreviewText from "./EventPreviewText.js";
import EventPreviewNavbar from "./EventPreviewNavbar.js";

/**
 * Displays a preview of information for an event. Enables interaction with the event.
 */
function EventPreview({ previewObject, userId, onRSVP, onLike, className }) {
  const info = previewObject;
  let rsvped = "";
  rsvped = info.rsvpYes?.includes(userId) ? "Yes" : rsvped;
  rsvped = info.rsvpMaybe?.includes(userId) ? "Maybe" : rsvped;
  rsvped = info.rsvpNo?.includes(userId) ? "No" : rsvped;

  function handleClickRSVP(rsvpStatus) {
    onRSVP(info, rsvpStatus);
  }

  function handleClickLike() {
    onLike(info._id);
  }

  return (
    <div className={`EventPreview ${className}`}>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{info.name}</h4>
          <div className="card-text">
            <EventPreviewText
              start={info.start}
              location={info.location}
              tags={info.tags}
            />

            <EventPreviewNavbar
              eventId={info._id}
              userId={userId}
              creator={info.creator}
              likes={info.likes}
              rsvped={rsvped}
              handleClickLike={handleClickLike}
              handleClickRSVP={handleClickRSVP}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

EventPreview.propTypes = {
  previewObject: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  onRSVP: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default EventPreview;
