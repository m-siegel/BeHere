/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import StyledTagComponent from "./StyledTagComponent.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * Contains the desription details for an event on the detailedEvents page.
 */
function EventDetailsDescription({ description, tags }) {
  return (
    <div className="EventDetailsDescription" id="eventDetailsDescription">
      <div className="descriptionHolder" tabIndex="0">
        <p>{description ? description : <Skeleton count={6} />}</p>
      </div>

      {tags?.length ? (
        <div>
          <hr />
          <ul className="tags-list" tabIndex="0">
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
