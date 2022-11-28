// By Mea
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import BasePage from "../components/base-page-components/BasePage.js";
import EventDetailsLikesRsvps from "../components/EventDetailsLikesRsvps.js";
import EventDetailsLocationTime from "../components/EventDetailsLocationTime.js";
import EventDetailsDescription from "../components/EventDetailsDescription.js";
import EventDetailsTitle from "../components/EventDetailsTitle.js";

import "../stylesheets/EventDetailsPage.css";

// event prop in case someone wants to use this component,
// giving it the event to be faster
function EventDetailsPage({ event, className }) {
  const [eventInfo, setEventInfo] = useState(event ? event : {});
  const [rsvpYes, setRsvpYes] = useState([]);
  const [rsvpMaybe, setRsvpMaybe] = useState([]);
  const [rsvpNo, setRsvpNo] = useState([]);
  const [likeState, setLikeState] = useState([]);

  // TODO: should this be a state?
  const params = useParams();

  async function getUsernamesFromIds(idArr) {
    if (!idArr) {
      return [];
    }

    // TODO: problem is here
    const usernameArr = [];
    await idArr.forEach(async (id) => {
      try {
        let res = await (
          await fetch("/api/getUsernameById", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: id }),
          })
        ).json();
        if (res?.username) {
          usernameArr.push(res.username);
        }
      } catch (e) {
        console.error(e);
      }
    });
    return usernameArr.slice();
  }

  useEffect(() => {
    // Fetch the event from the back end and set it
    async function loadEvent() {
      try {
        const res = await (
          await fetch("/api/getOneEvent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventId: params.id }),
          })
        ).json();
        if (res && res.event) {
          setEventInfo(res.event);
        }
      } catch (e) {
        console.error(e);
        setEventInfo({});
      }
    }
    loadEvent();
  }, [params]); // TODO: this might be wrong

  useEffect(() => {
    async function loadRSVPs() {
      setRsvpYes(await getUsernamesFromIds(eventInfo.rsvpYes));
      setRsvpNo(await getUsernamesFromIds(eventInfo.rsvpNo));
      setRsvpMaybe(await getUsernamesFromIds(eventInfo.rsvpMaybe));
      const newLikes = await getUsernamesFromIds(eventInfo.likes);
      setLikeState(newLikes);

      // State is updating, but dom is not
      console.log("state yes: ", rsvpYes);
      console.log("state no: ", rsvpNo);
      console.log("state maybe: ", rsvpMaybe);
      console.log("state likes: ", likeState);
    }
    loadRSVPs();
  }, [eventInfo]); // TODO: fix yellow underline

  return (
    <div className={`EventDetailsPage ${className}`}>
      <BasePage>
        <div className="row title-row">
          <EventDetailsTitle title={eventInfo.name} />
        </div>
        <div className="row">
          <div className="description-and-rsvps col col-8">
            <div className="row">
              <EventDetailsDescription
                description={eventInfo.description}
                tags={eventInfo.tags}
              />
            </div>
            <div className="row">
              <EventDetailsLikesRsvps
                likes={likeState}
                rsvpYes={rsvpYes}
                rsvpMaybe={rsvpMaybe}
                rsvpNo={rsvpNo}
              />
            </div>
          </div>

          <div className="location-and-time col col-4">
            <div className="row">
              <EventDetailsLocationTime
                start={eventInfo.start}
                end={eventInfo.finish}
                location={eventInfo.location}
              />
            </div>
          </div>
        </div>
      </BasePage>
    </div>
  );
}

EventDetailsPage.propTypes = {
  event: PropTypes.object,
  className: PropTypes.string,
};

export default EventDetailsPage;
