/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";

/**
 * Hook allows for easy rsvp/like action.
 */
function useRSVPHandler({ setAlert, doIfSuccessful }) {
  async function handleRSVP(event, rsvp) {
    setAlert({
      type: "success",
      message: "💌 RSVPing...",
    });
    setTimeout(() => {
      setAlert({
        message: "",
      });
    }, 2000);
    try {
      const res = await fetch("/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: event, rsvpStatus: rsvp }),
      });
      if (res.err) {
        setAlert({
          type: "warning",
          message: "Error RSVPing. Please try again later.",
        });
      } else {
        doIfSuccessful();
      }
    } catch (e) {
      console.error(e);
    }
  }

  return handleRSVP;
}

useRSVPHandler.propTypes = {
  setAlert: PropTypes.func.isRequired,
  doIfSuccessful: PropTypes.func.isRequired,
};

export default useRSVPHandler;
