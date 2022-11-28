// By Tim
import React from "react";
import BasePage from "../components/base-page-components/BasePage.js";
import useAlert from "../hooks/useAlert.js";
import CreateEventForm from "../components/CreateEventForm.js";

function CreateEventPage() {
  const [AlertComponent, setAlert] = useAlert();

  return (
    <BasePage>
      <AlertComponent />
      <div className="card">
        <div className="card-body">
          <h1>Create an event</h1>
          <CreateEventForm setAlert={setAlert} />
        </div>
      </div>
    </BasePage>
  );
}

export default CreateEventPage;
