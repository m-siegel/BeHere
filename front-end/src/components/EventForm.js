import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import CheckboxInput from "./CheckboxInput.js";
import PropTypes from "prop-types";

function EventForm({ setAlert }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  const [tags, setTags] = useState([]);
  const [event, setEvent] = useState({});
  const { eventId } = useParams();

  const defaultEvent = () => {
    return {
      _id: "12345",
      name: "testing name",
      description: "testing description",
      location: "test location",
      start: "testing time",
      finish: "testing time",
      tags: ["sports"],
    };
  };

  const getEvent = useCallback(async (eventId) => {
    // const eId = props.eventId;
    // console.log("eventId: ", eId);
    try {
      const res = await fetch(`/api/getEvent/${eventId}`);
      const event = await res.json();
      console.log("event: ", event);
      if (event) {
        return event;
      } else {
        console.log("creating a default event");
        return defaultEvent();
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const event = getEvent(eventId);
    setEvent(event);
  }, [event]);

  // const fillFields = (event) => {
  //   if (!event) {
  //     return;
  //   }

  // };

  async function onSubmit(evt) {
    evt.preventDefault();
    setAlert({
      type: "info",
      heading: "",
      message: <div>Submitting...</div>,
    });
    try {
      const res = await fetch("/api/edit-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          location: location,
          start: start,
          finish: finish,
          tags: tags,
        }),
      });
      const responseJson = await res.json();
      alertUser(responseJson);
    } catch (e) {
      console.log(e);
    }
  }

  function alertUser(info) {
    if (info.success) {
      setAlert({
        type: "success",
        heading: "Submission successful.",
        message: (
          <div>
            <p>
              Head over to your <Link to="/dashboard">dashboard</Link> to verify
              the event.
            </p>
          </div>
        ),
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
    <form
      id="event-form"
      action="/api/edit-event"
      onSubmit={onSubmit}
      method="POST"
    >
      <div className="row">
        <label htmlFor="name" className="form-label">
          Name:{" "}
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(evt) => {
            setName(evt.target.value);
          }}
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
          value={description}
          onChange={(evt) => {
            setDescription(evt.target.value);
          }}
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
          value={location}
          onChange={(evt) => {
            setLocation(evt.target.value);
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
          value={start}
          onChange={(evt) => {
            setStart(evt.target.value);
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
          value={finish}
          onChange={(evt) => {
            setFinish(evt.target.value);
          }}
          required
        ></input>
      </div>
      <div className="row">
        <label className="form-label">
          Tags:
          <div>
            <div className="form-check form-check-inline">
              <CheckboxInput
                type="checkbox"
                idNameValue="music"
                labelContent="Music"
                defaultChecked={
                  tags ? (tags.includes("music") ? true : false) : false
                }
              />
              <CheckboxInput
                type="checkbox"
                idNameValue="sports"
                labelContent="Sports"
                isChecked={
                  tags ? (tags.includes("sports") ? true : false) : false
                }
              />
              {/* <input
                className="form-check-input"
                type="checkbox"
                id="music"
                checked={...(event.tags && event.tags.includes("music")
                  ? "checked"
                  : null)}
                value="music"
              /> 
              <label className="form-check-label" htmlFor="music">
                Music
              </label>
              */}
            </div>

            {/* <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="sports"
                {...(!!event?.tags && event.tags.indexOf("sports") !== -1
                  ? "checked"
                  : "unchecked")}
                value="sports"
              />
              <label className="form-check-label" htmlFor="sports">
                Sports
              </label>
            </div> */}
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="movies"
                value="movies"
              />
              <label className="form-check-label" htmlFor="movies">
                Movies
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="networking"
                value="networking"
              />
              <label className="form-check-label" htmlFor="networking">
                Networking
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="party"
                value="party"
              />
              <label className="form-check-label" htmlFor="party">
                Party
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="food"
                value="food"
              />
              <label className="form-check-label" htmlFor="food">
                Food
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="dance"
                value="dance"
              />
              <label className="form-check-label" htmlFor="dance">
                Dance
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="education"
                value="education"
              />
              <label className="form-check-label" htmlFor="education">
                Education
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="fitness"
                value="fitness"
              />
              <label className="form-check-label" htmlFor="fitness">
                Fitness
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="hangout"
                value="hangout"
              />
              <label className="form-check-label" htmlFor="hangout">
                Hangout
              </label>
            </div>
          </div>
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Create Event
      </button>
    </form>
  );
}

EventForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default EventForm;
