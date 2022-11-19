// By Mea

import "../stylesheets/EventPreview.css";
import React from "react";
import IconLinkButton from "./base-page-components/IconLinkButton";
import IconButtonDropdown from "./base-page-components/IconButtonDropdown";

// Make component based on previews object

// TODO: split into compontents
// TODO: fix weird spacing that's new
function EventPreview(props) {
  const info = props.previewObject;
  return (
    <div className="EventPreview card">
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
                    {info.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                }
              </dd>
            </div>
          </dl>

          <nav>
            {/* <Link className="timea-nav-btn" to={`/event/${info._id}`}>
              <p>Details</p>
            </Link> */}
            <IconButtonDropdown
              iconPath="./icons/bootstrap-calendar-heart.svg"
              descriptionText="RSVP"
              dropdownMenu={[
                // TODO: these should be RSVPs that update the event following info for the user and maybe event
                <button
                  className="btn"
                  onClick={() => {
                    console.log("clicked 'Going'");
                  }}
                >
                  Going
                </button>,
                <button
                  className="btn"
                  onClick={() => {
                    console.log("clicked 'Maybe'");
                  }}
                >
                  Maybe
                </button>,
                <button
                  className="btn"
                  onClick={() => {
                    console.log("clicked 'Not Going'");
                  }}
                >
                  Not Going
                </button>,
                <button
                  className="btn"
                  onClick={() => {
                    console.log("clicked 'Following'");
                  }}
                >
                  Following
                </button>,
              ]}
            ></IconButtonDropdown>
            <IconLinkButton
              iconPath="./icons/bootstrap-star-fill.svg"
              descriptionText="Like"
              linkPath={null} // TODO: handle in button
            ></IconLinkButton>
            <IconLinkButton
              iconPath="./icons/bootstrap-question-circle.svg"
              descriptionText="Details"
              linkPath={`/event/${info._id}`}
            ></IconLinkButton>
            {info.creator === props.user?._id ? (
              // TODO: make props.user a thing for info.creator === props.user.id
              <IconLinkButton
                iconPath="./icons/bootstrap-pencil.svg"
                descriptionText="Edit"
                linkPath={`/edit/${info._id}`}
              ></IconLinkButton>
            ) : (
              <div></div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default EventPreview;
