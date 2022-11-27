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
  const [likes, setLikes] = useState([]);

  // TODO: should this be a state?
  const params = useParams();

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

  async function getUsernamesFromIds(idArr) {
    if (!idArr) {
      return [];
    }
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
    return usernameArr;
  }

  async function loadRSVPs() {
    setRsvpYes(await getUsernamesFromIds(eventInfo.rsvpYes));
    setRsvpMaybe(await getUsernamesFromIds(eventInfo.rsvpMaybe));
    setRsvpNo(await getUsernamesFromIds(eventInfo.rsvpNo));
    setLikes(await getUsernamesFromIds(eventInfo.likes));
    console.log("likes in state: ", likes);
  }

  // async function loadPage() {
  //   await loadEvent();
  //   await loadRSVPs();
  // }

  useEffect(() => {
    loadEvent();
  }, []);

  useEffect(() => {
    loadRSVPs();
  }, [eventInfo]); // TODO: fix yellow underline

  // useEffect(() => {
  //   loadPage();
  // }, []);

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
                likes={likes}
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
                end={eventInfo.end}
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
