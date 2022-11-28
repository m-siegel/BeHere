// By Tim
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BasePage from "../components/base-page-components/BasePage.js";
import EventForm from "../components/EventForm.js";
import useAlert from "../hooks/useAlert.js";
import ConfirmDeleteComponent from "../components/ConfirmDeleteComponent.js";

function EditEventPage() {
  const { eventId } = useParams();
  const [del, setDel] = useState(false);
  const [AlertComponent, setAlert] = useAlert();

  return (
    <BasePage>
      <AlertComponent />
      <div className="card">
        <div className="card-body">
          <h1>Edit your event</h1>
          <EventForm setAlert={setAlert} setDel={setDel} />
        </div>
      </div>
      <ConfirmDeleteComponent del={del} setDel={setDel} setAlert={setAlert} />
    </BasePage>
  );
}

EditEventPage.propTypes = {};

export default EditEventPage;
