// By Tim

import BasePage from "../components/base-page-components/BasePage.js";
import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import EventPreview from "../components/EventPreview.js";

function DashboardPage(props) {
  const [previews, setPreviews] = useState([]);
  const [myEventDisplayed, setMyEventDisplayed] = useState(true);
  // need a getFollowingEvents function
  // need a getMyEvents function

  async function getMyEventPreviews() {}
  async function getFollowingEventPreviews() {}

  return (
    <BasePage>
      <h1>My Dashboard</h1>
      <div className="filter-buttons">
        <button id="btnMyEvents">My events</button>
        <button id="btnFollowing">Following</button>
      </div>
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

DashboardPage.propTypes = {
  // Define prop-types for Dashboard Page
  user: PropTypes.object.isRequired,
};

export default DashboardPage;
