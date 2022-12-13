// BY Tim Crawley
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../stylesheets/EventForm.css";

/**
 * Form component for editing an event.
 */
function EventForm({ setAlert, /*setDel,*/ navigate }) {
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
  const [event, setEvent] = useState({});
  const [enableTags, setEnableTags] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(tagValues.length).fill(false)
  );
  // const [newTags, setNewTags] = useState([]);
  const { eventId } = useParams();

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  const handleEnableTags = () => {
    setEnableTags(!enableTags);
  };

  // const handleNewTags = (position) => {
  //   let tags = [];
  //   const updatedCheckedState = checkedState.map((item, index) =>
  //     index === position ? !item : item
  //   )
  // }

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
    // function loadTags() {
    //   if (event.tags) {
    //     let temp = [];
    //     for (let i = 0; i < tagValues.length; i++) {
    //       event.tags.includes(tagValues[i])
    //         ? temp.push(true)
    //         : temp.push(false);
    //     }
    //     setCheckedState(temp);
    //   }
    // }
    loadEvent();
    //console.warn("event tags:", event.tags);
    // loadTags();
  }, [eventId]);

  async function onSubmit(evt) {
    evt.preventDefault();
    let tags = [];
    for (let i = 0; i < tagValues.length; i++) {
      if (checkedState[i]) {
        tags.push(tagValues[i]);
      }
    }
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
          tags: tags,
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
        message: (
          <div>
            <p>
              Redirecting you to the <Link to="/my-events">My Events</Link>{" "}
              tab...
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

  function handleCancel() {
    navigate("/my-events");
  }

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
      setTimeout(() => {
        navigate("/my-events", { replace: true });
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="event-form">
      <form id="event-form" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name of event:{" "}
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
        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="mb-3">
          <label htmlFor="start" className="form-label">
            Start time:{" "}
          </label>
          <input
            type="datetime-local"
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
        <div className="mb-3">
          <label htmlFor="finish" className="form-label">
            End time:{" "}
          </label>
          <input
            type="datetime-local"
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
        <fieldset>
          <legend>Tags</legend>
          <div>
            Tags previously chosen:{" "}
            <div className="current-tags">
              {event.tags
                ? event.tags.map((tag, index) => {
                    return (
                      <span className="form-tag" key={index}>
                        {" "}
                        {tag}{" "}
                      </span>
                    );
                  })
                : "no tags entered."}{" "}
            </div>
          </div>

          <div className="centering-container mt-4">
            <button
              id="enable-tags"
              type="button"
              className={
                enableTags ? "btn btn-secondary" : "btn btn-not-focused"
              }
              onClick={handleEnableTags}
              //disabled={enableTags ? true : false}
            >
              {enableTags ? "Cancel" : "Change tags"}
            </button>
          </div>
          <p className="mt-3">
            {enableTags ? "Apply the following tag(s):" : ""}
          </p>
          {enableTags
            ? tagValues.map((tag, index) => {
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
              })
            : ""}
        </fieldset>
        <div className="centering-container mt-4">
          <button
            id="cancel-button"
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel edits
          </button>
          <button
            type="submit"
            id="submit-button"
            className="btn btn-action"
            onSubmit={onSubmit}
          >
            Confirm edits
          </button>
        </div>
        <div className="centering-container mt-4">
          <button
            type="button"
            className="btn btn-delete"
            data-bs-toggle="modal"
            data-bs-target="#deleteConfirmation"
          >
            Delete event
          </button>
          {/* <button
            type="button"
            id="delete-button"
            className="btn btn-danger"
            onClick={() => setDel(true)}
          >
            Delete event
          </button> */}
        </div>
      </form>
      <div
        className="modal fade"
        id="deleteConfirmation"
        tabIndex="-1"
        aria-labelledby="deleteConfirmationLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this event? <b>Note:</b> This
              action cannot be undone.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-grey"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                data-bs-dismiss="modal"
                className="btn btn-delete"
                onClick={() => finalizeDelete(eventId)}
              >
                Delete event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

EventForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  //setDel: PropTypes.func.isRequired,
};

export default EventForm;
