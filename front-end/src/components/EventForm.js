// BY Tim Crawley
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import "../stylesheets/EventForm.css";

/**
 * Form component for editing an event.
 */
function EventForm({ setAlert, setDel }) {
  const [event, setEvent] = useState({});
  const { eventId } = useParams();

  useEffect(() => {
    async function loadEvent() {
      try {
        const result = await (await fetch(`/api/getEvent/${eventId}`)).json();
        if (result) {
          setEvent(result);
        }
      } catch (e) {
        console.error(e);
        setEvent({});
      }
    }
    loadEvent();
  }, [eventId]);

  async function onSubmit(evt) {
    evt.preventDefault();
    setAlert({
      type: "info",
      heading: "",
      message: <div>Attempting update...</div>,
    });
    try {
      const res = await fetch("/api/edit-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: event.name,
          _id: eventId,
          description: event.description,
          location: event.location,
          start: event.start,
          finish: event.finish,
        }),
      });
      const responseJson = await res.json();
      alertUser(responseJson);
    } catch (e) {
      console.error("Error while trying to submit", e);
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

  return (
    <div className="event-form">
      <form id="event-form" onSubmit={onSubmit}>
        <div className="row">
          <label htmlFor="name" className="form-label">
            Name:{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={event.name ? event.name : ""}
            onChange={(evt) => setEvent({ ...event, name: evt.target.value })}
            required
          ></input>
        </div>
        <div className="row">
          <label htmlFor="description" className="form-label">
            Description:{" "}
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={event.description ? event.description : ""}
            onChange={(evt) =>
              setEvent({ ...event, description: evt.target.value })
            }
            required
          ></textarea>
        </div>
        <div className="row">
          <label htmlFor="location" className="form-label">
            Location:{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={event.location ? event.location : ""}
            onChange={(evt) => {
              setEvent({ ...event, location: evt.target.value });
            }}
            required
          ></input>
        </div>
        <div className="row">
          <label htmlFor="start" className="form-label">
            Start:{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="start"
            name="start"
            value={event.start ? event.start : ""}
            onChange={(evt) => {
              setEvent({ ...event, start: evt.target.value });
            }}
            required
          ></input>
        </div>
        <div className="row">
          <label htmlFor="finish" className="form-label">
            Finish:{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="finish"
            name="finish"
            value={event.finish ? event.finish : ""}
            onChange={(evt) => {
              setEvent({ ...event, finish: evt.target.value });
            }}
            required
          ></input>
        </div>
        <div className="centering-container">
          <button
            type="submit"
            id="submit-button"
            className="btn btn-primary mb-3"
          >
            Confirm edits
          </button>
        </div>
      </form>
      <div className="centering-container">
        <button
          type="click"
          id="delete-button"
          className="btn btn-danger"
          onClick={() => setDel(true)}
        >
          Delete event
        </button>
      </div>
    </div>
  );
}

EventForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  setDel: PropTypes.func.isRequired,
};

export default EventForm;
