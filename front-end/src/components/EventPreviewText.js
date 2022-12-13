/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import StyledTagComponent from "./StyledTagComponent.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * Displays the main event information for an event preview.
 */
function EventPreviewText({ start, location, tags, loading }) {
  return (
    <div className="EventPreviewText">
      {loading ? (
        <div className="loading">
          <div className="text-line">
            <Skeleton height={20} />
          </div>
          <div className="text-line">
            <Skeleton height={20} />
          </div>
        </div>
      ) : (
        <div>
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
        </div>
      )}
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
  loading: PropTypes.bool,
};

export default EventPreviewText;
