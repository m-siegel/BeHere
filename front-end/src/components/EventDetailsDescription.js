/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";

/**
 * Contains the desription details for an event on the detailedEvents page.
 */
function EventDetailsDescription({ description, tags }) {
  return (
    <div className="EventDetailsDescription">
      {/* <div className="card-body"> */}
      <p>{description ? description : <i>{"No description to display"}</i>}</p>
      <hr />
      {
        <ul className="tags-list">
          {tags?.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      }
    </div>
    // </div>
  );
}

EventDetailsDescription.propTypes = {
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default EventDetailsDescription;
