// By Mea
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import BasePage from "../components/base-page-components/BasePage.js";
import EventDetailsLikesRsvps from "../components/EventDetailsLikesRsvps.js";
import EventDetailsLocationTime from "../components/EventDetailsLocationTime.js";
import EventDetailsDescription from "../components/EventDetailsDescription.js";
import EventDetailsTitle from "../components/EventDetailsTitle.js";

import "../stylesheets/EventDetailsPage.css";

// event prop in case someone wants to use this component,
// giving it the event to be faster
function EventDetailsPage({ event, className, isAuth }) {
  const [eventInfo, setEventInfo] = useState(event ? event : {});
  const navigate = useNavigate();

  // TODO: should this be a state?
  const params = useParams();

  useEffect(() => {
    // Fetch the event from the back end and set it
    async function authOrRedirect() {
      if (!(await isAuth())) {
        console.log(isAuth);
        navigate("/login", { replace: true });
      }
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
    }
    authOrRedirect();
  }, [params]);

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
              <EventDetailsLikesRsvps eventId={eventInfo._id} />
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
  isAuth: PropTypes.func.isRequired,
};

export default EventDetailsPage;
