// By Mea

import BasePage from "../components/base-page-components/BasePage.js";
import DetailedEvent from "../components/DetailedEvent.js";

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
