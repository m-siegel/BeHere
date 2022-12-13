/* Ilana-Mahmea */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Fetches and displays the rsvp and like information for an event on the detailedEvents page.
 */
function EventDetailsLikesRsvps({ eventInfo }) {
  const [likes, setLikes] = useState([]);
  const [rsvpYes, setRsvpYes] = useState([]);
  const [rsvpMaybe, setRsvpMaybe] = useState([]);
  const [rsvpNo, setRsvpNo] = useState([]);

  useEffect(() => {
    async function loadRSVPs() {
      try {
        const res = await (
          await fetch("/api/getRsvpLikeUserPreviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userIds: eventInfo.likes?.concat(
                eventInfo.rsvps?.map((rsvp) => rsvp.userId)
              ),
            }),
          })
        ).json();

        // Need to handle if error

        setLikes(
          res?.users?.filter((user) =>
            eventInfo.likes?.find((like) => like === user._id)
          )
        );
        setRsvpYes(
          res?.users?.filter(
            (user) =>
              eventInfo.rsvps?.find((rsvp) => rsvp.userId === user._id)
                ?.status === "Yes"
          )
        );
        setRsvpMaybe(
          res?.users?.filter(
            (user) =>
              eventInfo.rsvps?.find((rsvp) => rsvp.userId === user._id)
                ?.status === "Maybe"
          )
        );
        setRsvpNo(
          res?.users?.filter(
            (user) =>
              eventInfo.rsvps?.find((rsvp) => rsvp.userId === user._id)
                ?.status === "No"
          )
        );
      } catch (e) {
        console.error(e);
      }
    }
    loadRSVPs();
  }, [eventInfo]);

  return (
    <div className="EventDetailsLikesRsvps">
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
          Going{rsvpYes?.length ? ` (${rsvpYes.length})` : ""}
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
          Maybe{rsvpMaybe?.length ? ` (${rsvpMaybe.length})` : ""}
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
          Not Going{rsvpNo?.length ? ` (${rsvpNo.length})` : ""}
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
          Likes{likes?.length ? ` (${likes.length})` : ""}
        </button>
      </nav>

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade p-3"
          id="nav-rsvpYes"
          role="tabpanel"
          aria-labelledby="nav-rsvpyes-tab"
          tabIndex="0"
        >
          {rsvpYes?.length
            ? rsvpYes.map((user) => (
                <p key={user._id}>
                  <strong>{user.username}</strong>
                  {` (${user.firstName} ${user.lastName})`}
                </p>
              ))
            : "No users to show here"}
        </div>

        <div
          className="tab-pane fade p-3"
          id="nav-rsvpMaybe"
          role="tabpanel"
          aria-labelledby="nav-rsvpMaybe-tab"
          tabIndex="0"
        >
          {rsvpMaybe?.length
            ? rsvpMaybe.map((user) => (
                <p key={user._id}>
                  <strong>{user.username}</strong>
                  {` (${user.firstName} ${user.lastName})`}
                </p>
              ))
            : "No users to show here"}
        </div>

        <div
          className="tab-pane fade p-3"
          id="nav-rsvpNo"
          role="tabpanel"
          aria-labelledby="nav-rsvpNo-tab"
          tabIndex="0"
        >
          {rsvpNo?.length
            ? rsvpNo.map((user) => (
                <p key={user._id}>
                  <strong>{user.username}</strong>
                  {` (${user.firstName} ${user.lastName})`}
                </p>
              ))
            : "No users to show here"}
        </div>

        <div
          className="tab-pane fade p-3"
          id="nav-likes"
          role="tabpanel"
          aria-labelledby="nav-likes-tab"
          tabIndex="0"
        >
          {likes?.length
            ? likes.map((user) => (
                <p key={user._id}>
                  <strong>{user.username}</strong>
                  {` (${user.firstName} ${user.lastName})`}
                </p>
              ))
            : "No users to show here"}
        </div>
      </div>
    </div>
  );
}

EventDetailsLikesRsvps.propTypes = {
  eventInfo: PropTypes.object.isRequired,
};

export default EventDetailsLikesRsvps;
