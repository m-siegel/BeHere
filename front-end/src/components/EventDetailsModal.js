/* Ilana-Mahmea */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EventDetailsComponent from "./EventDetailsComponent.js";

function EventDetailsModal({ eventPreview, eventId /* , onEventLoaded */ }) {
  // Could move this up a level to clear before every reload
  const [eventInfo, setEventInfo] = useState(eventPreview ? eventPreview : {});

  // So it'll reload new info right away and not display the last event's info
  // if that event was closed by clicking outside the modal (which won't reset eventInfo)
  useEffect(() => {
    setEventInfo(eventPreview);
  }, [eventPreview]);

  useEffect(() => {
    async function loadEvent() {
      try {
        const res = await (
          await fetch("/api/getOneEvent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // Can initially fill description from preview info
            // then fill in the rest after fetch
            body: JSON.stringify({ eventId: eventId }),
          })
        ).json();
        if (res?.event) {
          setEventInfo(res.event);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadEvent();
  }, [eventId, eventPreview]);

  return (
    <div className="EventDetailsModal">
      <div
        className="modal fade"
        id="eventDetailsModal"
        tabIndex="-1"
        aria-labelledby="eventDetailsTitle"
        aria-describedby="eventDetailsDescription"
        aria-hidden="true"
      >
        <div className="modal-fullscreen modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h1 className="modal-title fs-5" id="eventDetailsModalLabel">
                {eventInfo.name ? eventInfo.name : "No event name to display"}
              </h1> */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setEventInfo({});
                }}
              ></button>
            </div>
            <div className="modal-body" id="modalDescription">
              <div className="container-fluid">
                <EventDetailsComponent
                  eventInfo={eventInfo}
                ></EventDetailsComponent>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-grey"
                data-bs-dismiss="modal"
                onClick={() => {
                  setEventInfo({});
                }}
              >
                Close
              </button>
              {/* <button type="button" className="btn btn-primary">
                Save changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

EventDetailsModal.propTypes = {
  eventPreview: PropTypes.object,
  eventId: PropTypes.string.isRequired,
};

export default EventDetailsModal;
