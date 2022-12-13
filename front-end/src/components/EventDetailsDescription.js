/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import StyledTagComponent from "./StyledTagComponent.js";

/**
 * Contains the desription details for an event on the detailedEvents page.
 */
function EventDetailsDescription({ description, tags }) {
  return (
    <div className="EventDetailsDescription" id="eventDetailsDescription">
      <div className="descriptionHolder">
        <p>
          {description ? description : <i>{"No description to display"}</i>}
        </p>
      </div>

      {tags?.length ? (
        <div>
          <hr />
          <ul className="tags-list">
            {tags.map((t) => (
              <li key={t}>
                <StyledTagComponent tagName={t} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

EventDetailsDescription.propTypes = {
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default EventDetailsDescription;
