// By Mea

import BasePage from "../building-blocks/BasePage.js";
import DetailedEvent from "../components/DetailedEvent.jsx";

function EventDetailsPage() {
  return (
    <BasePage>
      <h1>Event Details</h1>
      <p>Some paragrap text</p>
      <DetailedEvent />
    </BasePage>
  );
}

export default EventDetailsPage;
