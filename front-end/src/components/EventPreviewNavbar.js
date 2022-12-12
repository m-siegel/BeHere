/* Ilana-Mahmea */

import React, { useEffect, useState } from "react";
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

import timeaColors from "./timeaColors.js";

/**
 * Enables rsvp and like actions and can link to edit and details pages for an event.
 * Changes teh available options based on whether the userId given matches the event creator.
 */
function EventPreviewNavbar({
  eventId,
  userId,
  creator,
  likes,
  rsvped,
  handleClickLike,
  handleClickRSVP,
  handleClickDetails,
}) {
  const [disableLike, setDisableLike] = useState(false);
  const [disableRSVP, setDisableRSVP] = useState(false);

  useEffect(() => {
    setDisableLike(false);
    // Enable clicking again once like has been registered.
    // TODO: this is a quick fix. would enable liking again if for another reason preview reloaded and likes had changed (if someone else liked)
  }, [likes]);

  useEffect(() => {
    setDisableRSVP(false);
    // Enable clicking again once like has been registered.
    // TODO: this is a quick fix. would enable liking again if for another reason preview reloaded and likes had changed (if someone else liked)
  }, [rsvped]);

  function handleRSVP(clicked) {
    setDisableRSVP(true);
    if (clicked === rsvped) {
      handleClickRSVP("");
    } else {
      handleClickRSVP(clicked);
    }
  }

  function getRSVPText(rsvpStatus) {
    switch (rsvpStatus) {
      case "Yes":
        return "Going";
      case "No":
        return "Not Going";
      case "Maybe":
        return "Maybe";
      default:
        return "RSVP";
    }
  }

  return (
    <nav className="row">
      {
        // Details button
      }
      <div className="col">
        <IconOnClickButton
          icon={<IconThreeDots />}
          descriptionText="Details"
          data-bs-toggle="modal"
          data-bs-target="#eventDetailsModal"
          onClick={handleClickDetails}
        ></IconOnClickButton>
      </div>

      {
        // Like button
        // Div so aligns like others
      }
      <div className="col">
        <IconOnClickButton
          icon={
            likes?.includes(userId) ? (
              <IconStarFilled color={timeaColors.action} />
            ) : (
              <IconStarOutline />
            )
          }
          // TODO: this and rsvp have current value like
          // TODO: aria that is always "like", same for rsvp
          descriptionText={
            likes?.length
              ? likes.length === 1
                ? "1 like"
                : `${likes.length} likes`
              : "Like"
          }
          onClick={() => {
            setDisableLike(true);
            handleClickLike();
          }}
          disabled={disableLike}
        ></IconOnClickButton>
      </div>

      {
        // RSVP Menu if not created by user
        creator !== userId ? (
          <IconButtonDropdown
            className="rsvp-dropdown col"
            icon={
              rsvped ? (
                <IconCalendarHeartFilled color={timeaColors.action} />
              ) : (
                <IconCalendarHeartOutline />
              )
            }
            disabled={disableRSVP}
            descriptionText={getRSVPText(rsvped)}
            dropdownMenu={[
              <button
                className={rsvped === "Yes" ? "btn active" : "btn"}
                onClick={() => {
                  handleRSVP("Yes");
                }}
              >
                Going
              </button>,
              <button
                className={rsvped === "Maybe" ? "btn active" : "btn"}
                onClick={() => {
                  handleRSVP("Maybe");
                }}
              >
                Maybe
              </button>,
              <button
                className={rsvped === "No" ? "btn active" : "btn"}
                onClick={() => {
                  handleRSVP("No");
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
  handleClickDetails: PropTypes.func.isRequired,
};

export default EventPreviewNavbar;
