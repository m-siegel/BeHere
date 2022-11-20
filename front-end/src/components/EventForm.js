import React from "react";
import PropTypes from "prop-types";
import { AutoEncryptionLoggerLevel } from "mongodb";

function EventForm({ event }) {
  return (
    <form action="/api/edit-event" method="POST">
      <div className="row">
        <label htmlFor="name" className="form-label">
          Name:{" "}
        </label>
        <input type="text" className="form-control" id="name" required></input>
      </div>
      <div className="row">
        <label htmlFor="description" className="form-label">
          Description:{" "}
        </label>
        <textarea
          type="text"
          className="form-control"
          id="description"
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
          required
        ></input>
      </div>
      <div className="row">
        <label htmlFor="start" className="form-label">
          Start:{" "}
        </label>
        <input type="text" className="form-control" id="start" required></input>
      </div>
      <div className="row">
        <label htmlFor="finish" className="form-label">
          Finish:{" "}
        </label>
        <input
          type="text"
          className="form-control"
          id="finish"
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
  event: PropTypes.object.isRequired,
};

export default EventForm;
