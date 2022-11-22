// By Tim
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BasePage from "../components/base-page-components/BasePage.js";
import EventForm from "../components/EventForm.js";
import PropTypes from "prop-types";

function EditEventPage(props) {
  const params = useParams();

  const defaultEvent = () => {
    return {
      _id: "12345",
      name: "testing name",
      description: "testing description",
      organization: "test org",
      location: "test location",
      start: "testing time",
      finish: "testing time",
      tags: ["sports"],
    };
  };
  const [event, setEvent] = useState(defaultEvent());
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

  useEffect(() => {
    const getEvent = async () => {
      const eId = params.eventId;
      try {
        const res = await fetch(`/api/getEvent/:${eId}`);
        if (await res.json().event) {
          const event = await res.json().event;
          return event;
        } else {
          console.log("creating a default event");
          return defaultEvent();
        }
      } catch (e) {
        console.log(e);
      }
    };
    setEvent(() => {
      getEvent();
    });
  }, [params.eventId]);

  return (
    <BasePage>
      <div class="card">
        <div class="card-body">
          <h1>Edit your event</h1>
          <EventForm event={event} />
        </div>
      </div>
    </BasePage>
  );
}

EditEventPage.propTypes = {
  event: PropTypes.object,
};

export default EditEventPage;
