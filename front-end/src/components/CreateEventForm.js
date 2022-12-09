// By Tim Crawley
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import "../stylesheets/CreateEventForm.css";

/**
 * Form component for creating a new event.
 */
function CreateEventForm({ setAlert }) {
  //const dateTime = new Date();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  const [validForm, setValidForm] = useState(false);

  // function checkDateValidity(start, finish) {
  //   if (!start || !finish) {
  //     return true;
  //   }
  //   if (start < finish) {

  //   }
  // }

  useEffect(() => {
    const checkFormValidity = () => {
      if (name && description && location && start && finish) {
        return true;
      }
      return false;
    };
    if (checkFormValidity()) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [description, finish, location, name, start]);

  async function onSubmit(evt) {
    evt.preventDefault();
    setAlert({
      type: "info",
      heading: "",
      message: <div>Creating event...</div>,
    });
    try {
      const res = await fetch("/api/create-event", {
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
          // tags: tags,
        }),
      });
      const responseJson = await res.json();
      alertUser(responseJson);
    } catch (e) {
      console.error(e);
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
    <div className="create-event-form">
      <form id="create-event-form" onSubmit={onSubmit}>
        <FormInput
          type="text"
          idAndName="name"
          labelContent="Name of event"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
        <label className="form-label">
          Description
          <textarea
            id="description"
            className="form-control"
            name={description}
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
            required
          />
        </label>
        <FormInput
          type="text"
          idAndName="location"
          labelContent="Location"
          value={location}
          onChange={(evt) => setLocation(evt.target.value)}
        />
        <FormInput
          type="datetime-local"
          idAndName="start"
          labelContent="Start time"
          value={start}
          min={new Date()}
          onChange={(evt) => setStart(evt.target.value)}
        />
        <FormInput
          type="datetime-local"
          idAndName="finish"
          labelContent="End time"
          value={finish}
          onChange={(evt) => setFinish(evt.target.value)}
        />
        <div className="row mt-3">
          <button
            disabled={validForm ? false : true}
            type="submit"
            id="submit-button"
            className="btn btn-primary"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}

CreateEventForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default CreateEventForm;
