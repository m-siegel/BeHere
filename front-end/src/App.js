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
