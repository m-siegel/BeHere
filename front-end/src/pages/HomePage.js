// Mea
import { useState, useEffect } from "react";
import { propTypes } from "prop-types";
import BasePage from "../components/base-page-components/BasePage.js";
import EventPreview from "../components/EventPreview.js";
import "../stylesheets/HomePage.css";

// TODO: takes time to load events before rendering -- make prettier

function HomePage(props) {
  // TODO: props should have a user attribute
  const [previews, setPreviews] = useState([]);
  const [user, setUser] = useState({});

  async function loadPreviews() {
    const res = await (await fetch("/api/getEventPreviews")).json();
    if (res && res.events) {
      // TODO: check res.success?
      console.log("from res", res.events);
      setPreviews(res.events);
      console.log("as state", previews);
    }
  }

  function getUserPassportInfo() {
    try {
      const res = fetch("/getPassportUser", {
        method: "POST",
      });
      setUser(res);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadPreviews();
    getUserPassportInfo();
    // Can return to clean up previous effect, eg stop fetch
  }, []); // TODO: is there a better way so we don't get the warning?

  // TODO: more style so it the cards don't overlap, there's less space between rows, etc.
  // TODO: message if no upcoming events
  return (
    <div className="HomePage">
      <BasePage>
        <h1>Home Page</h1>
        <div className="row">
          {previews.map((p) => (
            <div className="col" key={p._id}>
              <EventPreview previewObject={p} user={user}></EventPreview>
            </div>
          ))}
          {previews.map((p) => (
            <div className="col" key={p._id}>
              <EventPreview previewObject={p} user={user}></EventPreview>
            </div>
          ))}
        </div>
      </BasePage>
    </div>
  );
}

HomePage.propTypes = {};

export default HomePage;
