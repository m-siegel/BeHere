/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";

import IconLinkButton from "./base-page-components/IconLinkButton.js";
import IconButtonDropdown from "./base-page-components/IconButtonDropdown.js";
import IconOnClickButton from "./base-page-components/IconOnClickButton";
import IconCalendarHeartFilled from "./icon-components/IconCalendarHeartFilled.js";
import IconCalendarHeartOutline from "./icon-components/IconCalendarHeartOutline.js";
import IconStarFilled from "./icon-components/IconStarFilled.js";
import IconStarOutline from "./icon-components/IconStarOutline.js";
import IconThreeDots from "./icon-components/IconThreeDots.js";
import IconPencilOutline from "./icon-components/IconPencilOutline.js";

function EventPreviewNavbar({
  eventId,
  userId,
  creator,
  likes,
  rsvped,
  handleClickLike,
  handleClickRSVP,
}) {
  return (
    <nav className="row">
      {
        // Details button
      }
      <IconLinkButton
        className="col"
        icon={<IconThreeDots />}
        descriptionText="Details"
        linkPath={`/event/${eventId}`}
      ></IconLinkButton>

      {
        // Like button
        // Div so aligns like others
      }
      <div className="col">
        <IconOnClickButton
          icon={
            likes?.includes(userId) ? (
              <IconStarFilled color="blue" />
            ) : (
              <IconStarOutline />
            )
          }
          descriptionText={
            likes?.length
              ? likes.length === 1
                ? "1 like"
                : `${likes.length} likes`
              : "Like"
          }
          onClick={handleClickLike}
        ></IconOnClickButton>
      </div>

      {
        // RSVP Menu if not created by user
        creator !== userId ? (
          <IconButtonDropdown
            className="rsvp-dropdown col"
            icon={
              rsvped ? (
                <IconCalendarHeartFilled color="blue" />
              ) : (
                <IconCalendarHeartOutline />
              )
            }
            descriptionText="RSVP"
            dropdownMenu={[
              // TODO: these should be RSVPs that update the event following info for the userId and maybe event
              <button
                className={rsvped === "Yes" ? "btn active" : "btn"}
                onClick={() => {
                  handleClickRSVP("Yes");
                }}
              >
                Going
              </button>,
              <button
                className={rsvped === "Maybe" ? "btn active" : "btn"}
                onClick={() => {
                  handleClickRSVP("Maybe");
                }}
              >
                Maybe
              </button>,
              <button
                className={rsvped === "No" ? "btn active" : "btn"}
                onClick={() => {
                  handleClickRSVP("No");
                }}
              >
                Not Going
              </button>,
            ]}
          ></IconButtonDropdown>
        ) : (
          // Edit button if created by user
          <IconLinkButton
            className="col"
            icon={<IconPencilOutline />}
            descriptionText="Edit"
            linkPath={`/edit/${eventId}`}
          ></IconLinkButton>
        )
      }
    </nav>
  );
}

EventPreviewNavbar.propTypes = {
  eventId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  handleClickLike: PropTypes.func.isRequired,
  handleClickRSVP: PropTypes.func.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string),
  rsvped: PropTypes.string,
};

export default EventPreviewNavbar;
