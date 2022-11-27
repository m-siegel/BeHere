// By Tim
import React, { useState, useEffect, useCallback } from "react";
//import { useParams } from "react-router-dom";
import BasePage from "../components/base-page-components/BasePage.js";
import EventForm from "../components/EventForm.js";
import useAlert from "../hooks/useAlert.js";
//import PropTypes from "prop-types";

function EditEventPage() {
  //  const { eventId } = useParams();
  // const [event, setEvent] = useState({});
  const [AlertComponent, setAlert] = useAlert();

  // const defaultEvent = () => {
  //   return {
  //     _id: "12345",
  //     name: "testing name",
  //     description: "testing description",
  //     organization: "test org",
  //     location: "test location",
  //     start: "testing time",
  //     finish: "testing time",
  //     tags: ["sports"],
  //   };
  // };

  // function loadId() {
  //   setEventId(ObjectID("6378466d077b5a309cc4eaa7"))
  // }

  // async function getEvent() {
  //   const eId = params.eventId;
  //   try {
  //     const res = await fetch(`/api/getEvent/:${eId}`);
  //     if (await res.json().event) {
  //       const event = await res.json().event;
  //       return event;
  //     } else {
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // useEffect(() => {
  //   const event = getEvent(eventId);

  //   setEvent(event);
  // }, [getEvent, eventId]);

  return (
    <BasePage>
      <AlertComponent />
      <div className="card">
        <div className="card-body">
          <h1>Edit your event</h1>
          <EventForm setAlert={setAlert} />
        </div>
      </div>
    </BasePage>
  );
}

EditEventPage.propTypes = {
  //eventId: PropTypes.string,
};

export default EditEventPage;
