/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";

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
    </dl>
  );
}

EventPreviewText.propTypes = {
  start: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default EventPreviewText;
