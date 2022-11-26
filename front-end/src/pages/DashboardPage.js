// By Tim

import BasePage from "../components/base-page-components/BasePage.js";
import { useState, useEffect, useCallback } from "react";
import { PropTypes } from "prop-types";
import EventPreview from "../components/EventPreview.js";
import useAlert from "../hooks/useAlert.js";
import "../stylesheets/DashboardPage.css";

function DashboardPage(props) {
  const [previews, setPreviews] = useState([]);
  const [myEventDisplayed, setMyEventDisplayed] = useState(true);
  const [checkedEvents, setCheckedEvents] = useState(false);
  const [user, setUser] = useState({});

  const [AlertComponent, setAlert] = useAlert();

  const loadData = useCallback(async () => {
    let data;
    try {
      const res = myEventDisplayed
        ? await fetch("/api/getEventPreviews/dash/created")
        : await fetch("/api/getEventPreviews/dash/followed");
      data = await res.json();
    } catch (e) {
      console.log("Error: ", e);
    }
    if (data) {
      setPreviews(data.events);
    }
    setCheckedEvents(true);
  }, [myEventDisplayed]);

  useEffect(() => {
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

    return () => {};
  }, [myEventDisplayed, loadData]);

  const displayMyEvents = () => {
    console.log("myEvents button clicked");
    setMyEventDisplayed(true);
  };

  const displayFollowingEvents = () => {
    console.log("myFollowed button clicked");
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

  return (
    <BasePage>
      <h1>My Dashboard</h1>
      <AlertComponent />
      <div className="filter-buttons">
        <button
          id="btnMyEvents"
          className={
            myEventDisplayed ? "btn btn-primary" : "btn btn-outline-primary"
          }
          onClick={displayMyEvents}
        >
          Events I've created
        </button>
        <button
          id="btnFollowing"
          className={
            myEventDisplayed ? "btn btn-outline-primary" : "btn btn-primary"
          }
          onClick={displayFollowingEvents}
        >
          Events I'm following
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4">
        {previews.length ? (
          previews.map((p) => (
            <div className="col" key={p._id}>
              <EventPreview
                previewObject={p}
                userId={user._id}
                onRSVP={handleRSVP}
                //key={p._id}
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
  );
}

DashboardPage.propTypes = {
  // Define prop-types for Dashboard Page
};

export default DashboardPage;
