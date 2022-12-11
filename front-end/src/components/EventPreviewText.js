/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";

/**
 * Displays the main event information for an event preview.
 */
function EventPreviewText({ start, location, tags }) {
  return (
    <dl>
      <div>
        <dt>When</dt>
        <dd>{start}</dd>
      </div>
      <div>
        <dt>Where</dt>
        <dd>{location}</dd>
      </div>
      {tags?.length ? (
        <div>
          <dt>What</dt>
          <dd>
            {
              <ul className="preview-tags">
                {tags?.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            }
          </dd>
        </div>
      ) : (
        <div></div>
      )}
    </dl>
  );
}

EventPreviewText.propTypes = {
  start: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default EventPreviewText;
