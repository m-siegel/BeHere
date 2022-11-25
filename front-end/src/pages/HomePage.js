// Mea
import { useState, useEffect } from "react";
import { propTypes } from "prop-types";
import BasePage from "../components/base-page-components/BasePage.js";
import EventPreview from "../components/EventPreview.js";
import useAlert from "../hooks/useAlert.js";
import "../stylesheets/HomePage.css";

// TODO: takes time to load events before rendering -- make prettier

function HomePage(props) {
  // TODO: props should have a user attribute
  const [checkedEvents, setCheckedEvents] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [user, setUser] = useState({});

  const [AlertComponent, setAlert] = useAlert();

  async function loadPreviews() {
    const res = await (await fetch("/api/getEventPreviews")).json();
    if (res && res.events) {
      // TODO: check res.success?
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
    loadPreviews();
    getUserPassportInfo();
    // Can return to clean up previous effect, eg stop fetch
  }, []);

  // TODO: can we just do eventId not whole event?
  // TODO: should they be able to un-rsvp
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
        await loadPreviews();
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="HomePage">
      <BasePage>
        <h1>Home Page</h1>
        <AlertComponent />
        <div className="row">
          {previews.length ? (
            previews.map((p) => (
              <div className="col" key={p._id}>
                <EventPreview
                  previewObject={p}
                  userId={user.id} // TODO: make naming consistent
                  onRSVP={handleRSVP}
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

HomePage.propTypes = {};

export default HomePage;
