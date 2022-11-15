// import React from "react";
// import "./App.css";
// import { Container } from "react-bootstrap";
// import Homepage from "./pages/homepage";
// import SignupPage from "./pages/signupPage";
// import FeedPage from "./pages/feedPage";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import EventDetailsPage from "./pages/eventDetailsPage";

// function App() {
// 	return (
// 		<div className="App">
// 			<main>
// 				<Container>
// 					<Router>
// 						<Routes>
// 							<Route path="/" element={<Homepage />} />
// 							<Route path="/signupPage" element={<SignupPage />} />
// 							<Route path="/feedPage" element={<FeedPage />} />
// 							<Route path="/event-details" element={<EventDetailsPage />} />
// 						</Routes>
// 					</Router>
// 				</Container>
// 			</main>
// 		</div>
// 	);
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import HomePage from "./pages/HomePage.js";
import EditEventPage from "./pages/EditEventPage.js";
import DashboardPage from "./pages/DashboardPage.js";
import UserSettingsPage from "./pages/UserSettingsPage.js";
import EventDetailsPage from "./pages/EventDetailsPage.js";

// TODO: routing

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        {/* TODO: there's a lot of extra routing for this. route params */}
        <Route path="/create" element={<EditEventPage></EditEventPage>}></Route>
        <Route
          path="/dashboard"
          element={<DashboardPage></DashboardPage>}
        ></Route>
        <Route
          path="/userSettings"
          element={<UserSettingsPage></UserSettingsPage>}
        ></Route>
        {/* TODO: routes for all others */}
      </Routes>
    </Router>
  );
}

export default App;
