//By Tim Crawley
import React from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";

/**
 * Prompts the user to confirm whether they want to delete the event and responds accordingly.
 */
function ConfirmDeleteComponent({ del, setDel, setAlert }) {
  const { eventId } = useParams();
  const navigate = useNavigate();

  async function finalizeDelete(eventId) {
    setAlert({
      type: "info",
      heading: "",
      message: <div>Attempting to delete...</div>,
    });
    try {
      const res = await fetch("/api/delete-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: eventId,
        }),
      });
      const responseJson = await res.json();
      alertUser(responseJson);
      navigate("/dashboard", { replace: true });
    } catch (e) {
      console.error(e);
    }
  }

  function alertUser(info) {
    if (info?.success) {
      setAlert({
        type: "success",
        heading: "Update successful!",
      });
    } else {
      setAlert({
        type: "failure",
        heading: "Whoops",
        message: (
          <div>
            <p>Some issues have occured. Please try again later.</p>
          </div>
        ),
      });
    }
  }

  if (del) {
    return (
      <div className="card">
        <div className="card-body">
          <p>
            Are you sure you want to delete this event? Once this is done, it
            cannot be reversed.
          </p>
          <div className="centering-container">
            <button
              type="click"
              id="cancel"
              className="btn btn-secondary mb-3"
              onClick={() => setDel(false)}
            >
              Cancel
            </button>
          </div>
          <div className="centering-container">
            <button
              type="click"
              id="deleteFinal"
              className="btn btn-danger"
              onClick={() => finalizeDelete(eventId)}
            >
              Yes, Delete event
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}

ConfirmDeleteComponent.propTypes = {
  del: PropTypes.bool.isRequired,
  setDel: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default ConfirmDeleteComponent;
