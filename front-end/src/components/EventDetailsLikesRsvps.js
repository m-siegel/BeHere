/* Ilana-Mahmea */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function EventDetailsLikesRsvps({ eventId }) {
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
            body: JSON.stringify({ eventId: eventId }),
          })
        ).json();

        if (res.err?.likeErr) {
          console.error("Like error: ", res.err.likeErr);
        }
        if (res.err?.yesErr) {
          console.error("Yes error: ", res.err.yesErr);
        }
        if (res.err?.maybeErr) {
          console.error("Maybe error: ", res.err.maybeErr);
        }
        if (res.err?.noErr) {
          console.error("No error: ", res.err.noErr);
        }
        setLikes(res?.likeUsers ? res.likeUsers : []);
        setRsvpYes(res?.yesUsers ? res.yesUsers : []);
        setRsvpMaybe(res?.maybeUsers ? res.maybeUsers : []);
        setRsvpNo(res?.noUsers ? res.noUsers : []);
      } catch (e) {
        console.error(e);
      }
    }
    loadRSVPs();
  }, [eventId]);

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
    </div>
  );
}

EventDetailsLikesRsvps.propTypes = {
  eventId: PropTypes.string,
};

export default EventDetailsLikesRsvps;
