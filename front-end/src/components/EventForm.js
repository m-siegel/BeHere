import React from "react";
import PropTypes from "prop-types";

function EventForm({ event }) {
  return (
    <form action="/api/edit-event" method="POST">
      <div className="row">
        <label htmlFor="name" className="form-label">
          Name:{" "}
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={event?.name}
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
          value={event?.description}
          required
        ></textarea>
      </div>
      <div className="row">
        <label htmlFor="organization" className="form-label">
          Organization:{" "}
        </label>
        <input
          type="text"
          className="form-control"
          id="organization"
          value={event?.organization}
          required
        ></input>
      </div>
      <div className="row">
        <label htmlFor="location" className="form-label">
          Location:{" "}
        </label>
        <input
          type="text"
          className="form-control"
          id="location"
          value={event?.location}
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
          value={event?.start}
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
          value={event?.finish}
          required
        ></input>
      </div>
      <div className="row">
        <label className="form-label">
          Tags:
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="music"
                {...(!!event?.tags && event.tags.indexOf("music") !== -1
                  ? "checked"
                  : "unchecked")}
                value="music"
              />
              <label className="form-check-label" htmlFor="music">
                Music
              </label>
            </div>
            <div className="form-check form-check-inline">
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
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="movies"
                {...(!!event?.tags && event.tags.indexOf("movies") !== -1
                  ? "checked"
                  : "unchecked")}
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
                {...(!!event?.tags && event.tags.indexOf("networking") !== -1
                  ? "checked"
                  : "unchecked")}
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
                {...(!!event?.tags && event.tags.indexOf("party") !== -1
                  ? "checked"
                  : "unchecked")}
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
                {...(!!event?.tags && event.tags.indexOf("food") !== -1
                  ? "checked"
                  : "unchecked")}
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
                {...(!!event?.tags && event.tags.indexOf("dance") !== -1
                  ? "checked"
                  : "unchecked")}
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
                {...(!!event?.tags && event.tags.indexOf("education") !== -1
                  ? "checked"
                  : "unchecked")}
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
                {...(!!event?.tags && event.tags.indexOf("fitness") !== -1
                  ? "checked"
                  : "unchecked")}
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
                {...(!!event?.tags && event.tags.indexOf("hangout") !== -1
                  ? "checked"
                  : "unchecked")}
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
  event: PropTypes.object,
};

export default EventForm;
