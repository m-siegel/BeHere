/* Ilana-Mahmea */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BasePage from "../components/base-page-components/BasePage.js";
import EventPreview from "../components/EventPreview.js";
import useAlert from "../hooks/useAlert.js";
import "../stylesheets/HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage({ isAuth }) {
  const [checkedEvents, setCheckedEvents] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
//I really admire your idea about this project, and I believe this would really help organizations to share their events.
//One recommendatin from me is to create a list, and put event name, detals, time etc to this list, showed this on your main page.
  const [AlertComponent, setAlert] = useAlert();

  async function loadPreviews() {
    const res = await (await fetch("/api/getEventPreviews")).json();
    if (res && res.events) {
      setPreviews(res.events);
    }
    setCheckedEvents(true);
  }

  async function getUserPassportInfo() {
    try {
      const res = await fetch("/getPassportUser", {
        method: "POST",
      });
      setUser(await res.json());
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    async function authOrRedirect() {
      if (!(await isAuth())) {
        navigate("/", { replace: true });
      }
      loadPreviews();
      getUserPassportInfo();
      // Can return to clean up previous effect, eg stop fetch
    }
    authOrRedirect();
  }, [isAuth, navigate]);

  async function handleRSVP(event, rsvp) {
    setAlert({
      type: "success",
      message: "💌 RSVPing...",
    });
    setTimeout(() => {
      setAlert({
        message: "",
      });
    }, 2000);
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
        await loadPreviews();
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
        await loadPreviews();
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
    <div className="HomePage">
      <BasePage>
        <h1>Home Page</h1>
        <AlertComponent />
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
              <div>No events are listed for your organization.</div>
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

HomePage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default HomePage;
