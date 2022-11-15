import React from "react";
import Navbar from "../components/Navbar.jsx";
import DetailedEvent from "../components/DetailedEvent.jsx";

function EventDetailsPage() {
	return (
		<div>
			<Navbar />
			<h1>EventDetails</h1>
			<DetailedEvent />

		</div>
	);
}

export default EventDetailsPage;