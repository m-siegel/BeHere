/* Ilana-Mahmea */

import "../stylesheets/EventPreview.css";
import React from "react";
import PropTypes from "prop-types";
import EventPreviewText from "./EventPreviewText.js";
import EventPreviewNavbar from "./EventPreviewNavbar.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * Displays a preview of information for an event. Enables interaction with the event.
 */
function EventPreview({
  previewObject,
  userId,
  onRSVP,
  onLike,
  className,
  onClickDetails,
  loading,
}) {
  const info = previewObject;
  let rsvped = previewObject.rsvps?.find(
    (elem) => elem.userId === userId
  )?.status;
  rsvped = rsvped ? rsvped : "";

  function handleClickRSVP(rsvpStatus) {
    onRSVP(info, rsvpStatus);
  }

  function handleClickLike() {
    onLike(info._id);
  }

  return (
    <div className={`EventPreview ${className} ep-max-with`}>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title" tabIndex="0">
            {loading ? <Skeleton height={24} /> : info.name}
          </h2>
          <div className="card-text">
            <EventPreviewText
              start={info.start}
              location={info.location}
              tags={info.tags}
              loading={loading}
            />

            <EventPreviewNavbar
              eventId={info._id}
              userId={userId}
              creator={info.creator}
              likes={info.likes}
              rsvped={rsvped}
              handleClickLike={handleClickLike}
              handleClickRSVP={handleClickRSVP}
              handleClickDetails={onClickDetails}
              loading={loading}
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
  onClickDetails: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default EventPreview;
