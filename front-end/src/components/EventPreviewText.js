/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import StyledTagComponent from "./StyledTagComponent.js";

/**
 * Displays the main event information for an event preview.
 */
function EventPreviewText({ start, location, tags }) {
  return (
    <div className="EventPreviewText">
      <div className="text-line">
        <span>
          <h3>When</h3>
        </span>

        <span>{start}</span>
      </div>
      <div className="text-line">
        <span>
          <h3>Where</h3>
        </span>

        <span>{location}</span>
      </div>
      {tags?.length ? (
        <div className="text-line-2-lines">
          <div>
            <h3>What</h3>
          </div>

          <ul className="preview-tags" tabIndex="0">
            {tags.map((t) => (
              <li key={t}>
                <StyledTagComponent tagName={t} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-line-2-lines"></div>
      )}
    </div>
  );
}

EventPreviewText.propTypes = {
  start: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default EventPreviewText;
