import React from "react";
import PropTypes from "prop-types";

function EventDetailsLikesRsvps({ likes, rsvpYes, rsvpMaybe, rsvpNo }) {
  console.log("in EventDetailsLikesRsvps likes: ", likes);
  return (
    <div className="EventDetailsLikesRsvps card">
      <div className="card-body">
        <nav className="nav nav-pills nav-fill" id="nav-tab" role="tablist">
          {
            // Tried splitting into a different component, but it didn't work.
          }
          <button
            className="nav-link"
            id="nav-rsvpyes-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-rsvpYes"
            type="button"
            role="tab"
            aria-controls="nav-rsvpYes"
          >
            rsvpYes{rsvpYes?.length ? ` (${rsvpYes.length})` : ""}
          </button>
          <button
            className="nav-link"
            id="nav-rsvpMaybe-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-rsvpMaybe"
            type="button"
            role="tab"
            aria-controls="nav-rsvpMaybe"
          >
            rsvpMaybe{rsvpMaybe?.length ? ` (${rsvpMaybe.length})` : ""}
          </button>
          <button
            className="nav-link"
            id="nav-rsvpNo-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-rsvpNo"
            type="button"
            role="tab"
            aria-controls="nav-rsvpNo"
          >
            rsvpNo{rsvpNo?.length ? ` (${rsvpNo.length})` : ""}
          </button>
          <button
            className="nav-link"
            id="nav-likes-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-likes"
            type="button"
            role="tab"
            aria-controls="nav-likes"
          >
            likes{likes?.length ? ` (${likes.length})` : ""}
          </button>
        </nav>

        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade p-3"
            id="nav-rsvpYes"
            role="tabpanel"
            aria-labelledby="nav-rsvpyes-tab"
          >
            {rsvpYes?.length ? (
              <ul className="tags-list">
                {rsvpYes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : (
              "No users to show here"
            )}
          </div>

          <div
            className="tab-pane fade p-3"
            id="nav-rsvpMaybe"
            role="tabpanel"
            aria-labelledby="nav-rsvpMaybe-tab"
          >
            {rsvpMaybe?.length ? (
              <ul className="tags-list">
                {rsvpMaybe.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : (
              "No users to show here"
            )}
          </div>

          <div
            className="tab-pane fade p-3"
            id="nav-rsvpNo"
            role="tabpanel"
            aria-labelledby="nav-rsvpNo-tab"
          >
            {rsvpNo?.length ? (
              <ul className="tags-list">
                {rsvpNo.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : (
              "No users to show here"
            )}
          </div>

          <div
            className="tab-pane fade p-3"
            id="nav-likes"
            role="tabpanel"
            aria-labelledby="nav-likes-tab"
          >
            {likes?.length ? (
              <ul className="tags-list">
                {likes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : (
              "No users to show here"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

EventDetailsLikesRsvps.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.string),
  rsvpYes: PropTypes.arrayOf(PropTypes.string),
  rsvpMaybe: PropTypes.arrayOf(PropTypes.string),
  rsvpNo: PropTypes.arrayOf(PropTypes.string),
};

export default EventDetailsLikesRsvps;
