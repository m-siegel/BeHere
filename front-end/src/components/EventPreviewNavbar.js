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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import timeaColors from "../util/timeaColors.js";

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
  loading,
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
    <div className="EventPreviewNavbar row">
      {
        // Must be div not nav because there's already a nav
        // landmark with the navbar and all landmarks must be unique.
      }
      {
        // Details button
      }
      <div className="col">
        {loading ? (
          <Skeleton circle={true} height={50} width={50} inline={true} />
        ) : (
          <IconOnClickButton
            icon={<IconThreeDots />}
            descriptionText="Details"
            data-bs-toggle="modal"
            data-bs-target="#eventDetailsModal"
            onClick={handleClickDetails}
          ></IconOnClickButton>
        )}
      </div>

      {
        // Like button
        // Div so aligns like others
      }
      <div className="col">
        {loading ? (
          <Skeleton circle={true} height={50} width={50} inline={true} />
        ) : (
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
        )}
      </div>

      {loading ? (
        <div className="col">
          <Skeleton circle={true} height={50} width={50} inline={true} />
        </div>
      ) : (
        <div className="col">
          {
            // RSVP Menu if not created by user
            creator !== userId ? (
              <IconButtonDropdown
                className="rsvp-dropdown"
                icon={
                  rsvped ? (
                    <IconCalendarHeartFilled color={timeaColors.action} />
                  ) : (
                    <IconCalendarHeartOutline />
                  )
                }
                disabled={disableRSVP}
                descriptionText={getRSVPText(rsvped)}
                uniqueId={`event-preview-navbar-dropdown-${eventId}`}
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
                icon={<IconPencilOutline />}
                descriptionText="Edit"
                linkPath={`/edit/${eventId}`}
              ></IconLinkButton>
            )
          }
        </div>
      )}
    </div>
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
  loading: PropTypes.bool,
};

export default EventPreviewNavbar;
