import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Homepage from "./pages/homepage";
import SignupPage from "./pages/signupPage";
import FeedPage from "./pages/feedPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventDetailsPage from "./pages/eventDetailsPage";

function App() {
	return (
		<div className="App">
			<main>
				<Container>
					<Router>
						<Routes>
							<Route path="/" element={<Homepage />} />
							<Route path="/signupPage" element={<SignupPage />} />
							<Route path="/feedPage" element={<FeedPage />} />
							<Route path="/event-details" element={<EventDetailsPage />} />
						</Routes>
					</Router>
				</Container>
			</main>
		</div>
	);
}

export default App;
