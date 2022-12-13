/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";

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
          <ul className="tags-list" tabIndex="0">
            {tags.map((t) => (
              <li className={t} key={t}>
                {t}
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
