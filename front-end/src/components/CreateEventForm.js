// By Tim Crawley
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import "../stylesheets/CreateEventForm.css";

function CreateEventForm({ setAlert }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  // TRY TO USE FOR V2
  // const [tagsMusic, setTagsMusic] = useState([]);
  // const [tags, setTags] = useState({
  //   music: false,
  //   sports: false,
  //   movies: false,
  //   networking: false,
  //   party: false,
  //   food: false,
  //   dance: false,
  //   education: false,
  //   fitness: false,
  //   hangout: false,
  // });
  // const [tagsSports, setTagsSports] = useState(false);
  // const [tagsMovies, setTagsMovies] = useState(false);
  // const [tagsNetworking, setTagsNetworking] = useState(false);
  // const [tagsParty, setTagsParty] = useState(false);
  // const [tagsFood, setTagsFood] = useState(false);
  // const [tagsDance, setTagsDance] = useState(false);
  // const [tagsEducation, setTagsEducation] = useState(false);
  // const [tagsFitness, setTagsFitness] = useState(false);
  // const [tagsHangout, setTagsHangout] = useState(false);

  // const tagList = [
  //   "music",
  //   "sports",
  //   "movies",
  //   "networking",
  //   "party",
  //   "food",
  //   "dance",
  //   "education",
  //   "fitness",
  //   "hangout",
  // ];

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
    <div className="create-event-form">
      <form id="create-event-form" onSubmit={onSubmit}>
        <FormInput
          type="text"
          idAndName="name"
          labelContent="Name"
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
          type="text"
          idAndName="start"
          labelContent="Start"
          value={start}
          onChange={(evt) => setStart(evt.target.value)}
        />
        <FormInput
          type="text"
          idAndName="finish"
          labelContent="Finish"
          value={finish}
          onChange={(evt) => setFinish(evt.target.value)}
        />
        <div className="row mt-3">
          <button type="submit" id="submit-button" className="btn btn-primary">
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
