// By Mea
import "../stylesheets/EventPreview.css";
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

// Make component based on previews object

// TODO: split into compontents
// TODO: fix weird spacing that's new
function EventPreview({ previewObject, userId, onRSVP, onLike }) {
  const info = previewObject;
  let rsvped = "";
  rsvped = info.followedBy?.includes(userId) ? "Follow" : rsvped;
  rsvped = info.rsvpYes?.includes(userId) ? "Yes" : rsvped;
  rsvped = info.rsvpMaybe?.includes(userId) ? "Maybe" : rsvped;
  rsvped = info.rsvpNo?.includes(userId) ? "No" : rsvped;

  function handleClickRSVP(rsvpStatus) {
    // TODO: un-rsvp if they click their current state?
    onRSVP(info, rsvpStatus);
  }

  function handleClickLike() {
    onLike(info._id);
  }

  // TODO: handle likes like rsvps, toggle, check with Tim
  /*
    <IconOnClickButton
      onClick={toggleLike}
      icon={
        info.likes.inclued(userId) ? (
          <IconStarFilled color="blue" />
        ) : (
          <IconStarOutline />
        )
      }
      descriptionText={"Like"}
      inline={true}
    ></IconOnClickButton>
   */

  return (
    <div className="EventPreview">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{info.name}</h4>
          <div className="card-text">
            <dl>
              <div>
                <dt>When</dt>
                <dd>{info.start}</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>{info.location}</dd>
              </div>
              <div>
                <dt>What</dt>
                <dd>
                  {
                    <ul className="preview-tags">
                      {info.tags?.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  }
                </dd>
              </div>
            </dl>

            {
              // Details button
            }
            <nav className="row">
              <IconLinkButton
                className="col"
                icon={<IconThreeDots />}
                descriptionText="Details"
                linkPath={`/event/${info._id}`}
              ></IconLinkButton>

              {
                // Like button
                // Div so aligns like others
              }
              <div className="col">
                <IconOnClickButton
                  icon={
                    info.likes?.includes(userId) ? (
                      <IconStarFilled color="blue" />
                    ) : (
                      <IconStarOutline />
                    )
                  }
                  descriptionText={
                    info.likes?.length
                      ? info.likes.length === 1
                        ? "1 like"
                        : `${info.likes.length} likes`
                      : "Like"
                  }
                  onClick={handleClickLike}
                ></IconOnClickButton>
              </div>

              {
                // RSVP Menu if not created by user
                info.creator !== userId ? (
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
                      <button
                        className={rsvped === "Follow" ? "btn active" : "btn"}
                        onClick={() => {
                          handleClickRSVP("Follow");
                        }}
                      >
                        Following
                      </button>,
                    ]}
                  ></IconButtonDropdown>
                ) : (
                  // Edit button if created by user
                  <IconLinkButton
                    className="col"
                    icon={<IconPencilOutline />}
                    descriptionText="Edit"
                    linkPath={`/edit/${info._id}`}
                  ></IconLinkButton>
                )
              }
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

EventPreview.propTypes = {
  previewObject: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  onRSVP: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default EventPreview;
