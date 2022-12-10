// By Tim Crawley
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import "../stylesheets/CreateEventForm.css";

/**
 * Form component for creating a new event.
 */
function CreateEventForm({ setAlert, navigate }) {
  const tagValues = [
    "active",
    "art/craft",
    "drink",
    "food",
    "games",
    "hangout",
    "learning",
    "music/entertainment",
    "networking",
    "outdoor",
    "party",
    "tours/exploration",
  ];
  //const dateTime = new Date();
  //const tags = [];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  const [validForm, setValidForm] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(tagValues.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

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
    // let tags = checkedState.forEach((t, i) => {
    //   if (checkedState[i]) {
    //     tags.push(tagValues[i]);
    //   }
    // });
    let tags = [];
    // const checkboxes = document.getElementsByName("tags");
    for (let i = 0; i < tagValues.length; i++) {
      if (checkedState[i]) {
        tags.push(tagValues[i]);
      }
    }

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
          tags: tags,
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
        <fieldset>
          <legend>Tags</legend>
          {tagValues.map((tag, index) => {
            return (
              <div className="form-check" key={index}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={tag}
                  name="tags"
                  value={tag}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                ></input>
                <label htmlFor={tag}>{tag}</label>
              </div>
            );
          })}

          {/* <div class="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="art/crafts"
              name="tags"
              value="art/crafts"
            ></input>
            <label for="art/crafts"> Art/Crafts</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              id="drink"
              name="tags"
              className="form-check-input"
              value="drink"
            ></input>
            <label for="drink"> Drink</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              id="food"
              name="tags"
              className="form-check-input"
              value="food"
            ></input>
            <label for="food"> Food</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              id="games"
              name="tags"
              className="form-check-input"
              value="games"
            ></input>
            <label for="games"> Games</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              id="hangout"
              name="tags"
              className="form-check-input"
              value="hangout"
            ></input>
            <label for="drink"> Hangout</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              id="learning"
              name="tags"
              className="form-check-input"
              value="learning"
            ></input>
            <label for="learning"> Learning</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              id="music/entertainment"
              name="tags"
              className="form-check-input"
              value="music/entertainment"
            ></input>
            <label for="music/entertainment"> Music/Entertainment</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              id="networking"
              name="tags"
              className="form-check-input"
              value="networking"
            ></input>
            <label for="networking"> Networking</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              id="outdoor"
              name="tags"
              className="form-check-input"
              value="outdoor"
            ></input>
            <label for="outdoor"> Outdoor</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              id="party"
              name="tags"
              className="form-check-input"
              value="party"
            ></input>
            <label for="party"> Party</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              id="tours/exploration"
              name="tags"
              className="form-check-input"
              value="tours/exploration"
            ></input>
            <label for="tours/exploration"> Tours/Exploration</label>
          </div> */}
        </fieldset>
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
        <div className="row mt-3">
          <button
            id="cancel-button"
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
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
