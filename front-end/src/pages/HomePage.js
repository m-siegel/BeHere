// Mea
import { useState, useEffect } from "react";
import { propTypes } from "prop-types";
import BasePage from "../components/base-page-components/BasePage.js";
import EventPreview from "../components/EventPreview.js";

// TODO: takes time to load events before rendering -- make prettier

function HomePage(props) {
  // TODO: props should have a user attribute
  const [previews, setPreviews] = useState([]);

  async function loadPreviews() {
    // const res = await fetch("/api/getEventsByOrg",
    // {
    //   method: "POST",
    //   headers: {"Content-Type": "application/json"},
    //   body: JSON.stringify({/* List of user's organizations */})
    // });

    const res = await (await fetch("/api/getEventsByOrg")).json(); // Route can get org list to search in req.session.passport.user.organizations
    if (res && res.eventsList) {
      // TODO: check res.success?
      console.log("from res", res.eventsList);
      setPreviews(res.eventsList);
      console.log("as state", previews);
    }
  }

  useEffect(() => {
    loadPreviews();
    // Can return to clean up previous effect, eg stop fetch
  }, []); // TODO: is there a better way so we don't get the warning?

  // TODO: more style so it the cards don't overlap, there's less space between rows, etc.
  // TODO: message if no upcoming events
  return (
    <BasePage>
      <h1>Home Page</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4">
        {previews.map((p) => (
          <div className="col">
            <EventPreview
              previewObject={p}
              user={null}
              key={p._id}
            ></EventPreview>
          </div>
        ))}
      </div>
    </BasePage>
  );
}

// TODO: for every component
// HomePage.propTypes = ????

export default HomePage;