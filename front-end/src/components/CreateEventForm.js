import React, { useEffect, useRef, useState } from "react";
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

  // const handleClick = (event, setFunction) => {
  //   if (event.target.checked) {
  //     setFunction(true);
  //   } else {
  //     setFunction(false);
  //   }
  //   console.log(event.target.value);
  // };

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
        {/* <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="music"
            value="music"
            onChange={handleClick}
          />
          <label className="form-check-label" htmlFor="music">
            Music
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="hangout"
            value={tagsHangout}
            onChange={(evt) => setTagsHangout(evt.target.value)}
          />
          <label className="form-check-label" htmlFor="hangout">
            Hangout
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="sports"
            value={tagsSports}
            onChange={(evt) => setTagsSports(evt.target.value)}
          />
          <label className="form-check-label" htmlFor="sports">
            Sports
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="movies"
            value={tagsMovies}
            onChange={(evt) => setTagsMovies(evt.target.value)}
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
            value={tagsNetworking}
            onChange={(evt) => setTagsNetworking(evt.target.value)}
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
            value={tagsParty}
            onChange={(evt) => setTagsParty(evt.target.value)}
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
            value={tagsFood}
            onChange={(evt) => setTagsFood(evt.target.value)}
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
            value={tagsDance}
            onChange={(evt) => setTagsDance(evt.target.value)}
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
            value={tagsEducation}
            onChange={(evt) => setTagsEducation(evt.target.value)}
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
            value={tagsFitness}
            onChange={(evt) => setTagsFitness(evt.target.value)}
          />
          <label className="form-check-label" htmlFor="fitness">
            Fitness
          </label>
        </div> */}

        {/* <input
            key={i}
            type="checkbox"
            idAndName={t}
            value={false}
            onChange={() => setTags([...tags,])
              value
                ? setTags([...tags, t])
                : setTags([...tags].filter((word) => !t));
            }}
          /> */}
        {/* ))} */}

        {/* <div className="row">
          <label htmlFor="name" className="form-label">
            Name:{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            ref={nameRef}
            // onChange={(evt) => {
            //   setEvent((event.name = evt.target.value));
            // }}
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
            // onChange={(evt) => {
            //   setEvent((event.description = evt.target.value));
            // }}
            ref={descriptionRef}
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
            // onChange={(evt) => {
            //   setEvent((event.location = evt.target.value));
            // }}
            ref={locationRef}
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
            // onChange={(evt) => {
            //   setEvent((event.start = evt.target.value));
            // }}
            ref={startRef}
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
            // onChange={(evt) => {
            //   setEvent((event.finish = evt.target.value));
            // }}
            ref={finishRef}
            required
          ></input>
        </div> */}
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
