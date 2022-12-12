// By Tim

import BasePage from "../components/base-page-components/BasePage.js";
import { useState, useEffect, useCallback } from "react";
import EventPreview from "../components/EventPreview.js";
import useAlert from "../hooks/useAlert.js";
import "../stylesheets/MyEventsPage.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function MyEventsPage({ isAuth }) {
  const [previews, setPreviews] = useState([]);
  const [myEventDisplayed, setMyEventDisplayed] = useState(true);
  const [checkedEvents, setCheckedEvents] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [AlertComponent, setAlert] = useAlert();

  const loadData = useCallback(async () => {
    let data;
    try {
      const res = myEventDisplayed
        ? await fetch("/api/getEventPreviews/dash/created")
        : await fetch("/api/getEventPreviews/dash/followed");
      data = await res.json();
    } catch (e) {
      console.error("Error: ", e);
    }
    if (data) {
      setPreviews(data.events);
    }
    setCheckedEvents(true);
  }, [myEventDisplayed]);

  useEffect(() => {
    async function authOrRedirect() {
      if (!(await isAuth())) {
        navigate("/login", { replace: true });
      }
      const getUserPassportInfo = async () => {
        try {
          const res = await fetch("/getPassportUser", {
            method: "POST",
          });
          setUser(await res.json());
        } catch (e) {
          console.error(e);
        }
      };
      loadData();
      getUserPassportInfo();
      // Can return to clean up previous effect, eg stop fetch
    }
    authOrRedirect();

    return () => {};
  }, [myEventDisplayed, loadData, isAuth, navigate]);

  const displayMyEvents = () => {
    setMyEventDisplayed(true);
  };

  const displayFollowingEvents = () => {
    setMyEventDisplayed(false);
  };

  async function handleRSVP(event, rsvp) {
    try {
      const res = await fetch("/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: event, rsvpStatus: rsvp }),
      });
      if (res.err) {
        setAlert({
          type: "warning",
          message: "Error RSVPing. Please try again later.",
        });
      } else {
        // Load with new rsvps
        await loadData();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleLike(eventId) {
    setAlert({
      type: "success",
      message: "👍 Updating like...",
    });
    setTimeout(() => {
      setAlert({
        message: "",
      });
    }, 2000);
    try {
      const res = await fetch("/toggleLike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: eventId }),
      });
      if (res.err) {
        setAlert({
          type: "warning",
          message: "Error toggling 'like'. Please try again later.",
        });
        return;
      } else {
        await loadData();
        return;
      }
    } catch (e) {
      console.error(e);
      setAlert({
        type: "warning",
        message: "Error toggling 'like'. Please try again later.",
      });
    }
  }

  return (
    <div className="MyEventsPage">
      <BasePage>
        <h1>My Events</h1>
        <AlertComponent />
        <div className="filter-buttons">
          <button
            id="btnMyEvents"
            className={
              myEventDisplayed ? "btn btn-focused" : "btn btn-not-focused"
            }
            onClick={displayMyEvents}
          >
            Events I've created
          </button>
          <button
            id="btnFollowing"
            className={
              myEventDisplayed ? "btn btn-not-focused" : "btn btn-focused"
            }
            onClick={displayFollowingEvents}
          >
            Events I'm (Maybe) Going To
          </button>
        </div>
        <div className="row">
          {previews.length ? (
            previews.map((p, i) => (
              <div className="col" key={p._id}>
                <EventPreview
                  previewObject={p}
                  userId={user._id}
                  onRSVP={handleRSVP}
                  onLike={handleLike}
                  className={`color-${i % 3}`}
                ></EventPreview>
              </div>
            ))
          ) : checkedEvents ? (
            <div>
              <div>No events are listed.</div>
              <div>Check back later or create a new event yourself!</div>
            </div>
          ) : (
            <div>Checking events...</div>
          )}
        </div>
      </BasePage>
    </div>
  );
}

MyEventsPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default MyEventsPage;
