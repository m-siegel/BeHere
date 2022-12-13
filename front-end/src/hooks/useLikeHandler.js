/* Ilana-Mahmea */

import PropTypes from "prop-types";

/**
 * Hook allows for easy like action.
 */
function useLikeHandler({ setAlert, doIfSuccessful }) {
  async function handleLike(eventId) {
    setAlert({
      type: "success",
      message: "Updating like...",
    });
    setTimeout(() => {
      setAlert({
        message: "",
      });
    }, 2000);
    try {
      const res = await fetch("/toggleLike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: eventId }),
      });
      if (res.err) {
        setAlert({
          type: "warning",
          message: "Error toggling 'like'. Please try again later.",
        });
        return;
      } else {
        doIfSuccessful();
        return;
      }
    } catch (e) {
      console.error(e);
      setAlert({
        type: "warning",
        message: "Error toggling 'like'. Please try again later.",
      });
    }
  }

  return handleLike;
}

useLikeHandler.propTypes = {
  setAlert: PropTypes.func.isRequired,
  doIfSuccessful: PropTypes.func.isRequired,
};

export default useLikeHandler;
