import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import "./App.css";

import DashboardPage from "./pages/DashboardPage.js";
import EditEventPage from "./pages/EditEventPage.js";
import ErrorPage from "./pages/ErrorPage.js";
import EventDetailsPage from "./pages/EventDetailsPage.js";
import HomePage from "./pages/HomePage.js";
import IndexPage from "./pages/IndexPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import UserSettingsPage from "./pages/UserSettingsPage.js";
import CreateEventPage from "./pages/CreateEventPage";

// TODO: routing

// TODO: look at tutorial -- should this be in index not app?
function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function isAuth() {
    try {
      console.log("in isAuth");
      const res = await (await fetch("/api/auth")).json();
      return res.auth;
    } catch (e) {
      console.error(e);
    }
  }

  // function checkIfLoggedOut(isLoggedIn) {
  //   if (!isLoggedIn) {
  //     navigate("/login", { replace: true });
  //   }
  // }
  // function checkIfLoggedIn(isLoggedIn) {
  //   if (isLoggedIn) {
  //     navigate("/home", { replace: true });
  //   }
  // }

  const router = createBrowserRouter([
    {
      path: "/", // TODO: home if logged in?
      element: <IndexPage isAuth={isAuth}></IndexPage>,
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/login",
      element: <LoginPage isAuth={isAuth}></LoginPage>,
    },
    {
      path: "/register",
      element: <RegisterPage isAuth={isAuth}></RegisterPage>,
    },
    {
      path: "/home",
      element: <HomePage isAuth={isAuth}></HomePage>,
    },
    {
      path: "/dashboard",
      element: <DashboardPage isAuth={isAuth}></DashboardPage>,
    },
    {
      path: "/event/:id", // TODO: url param
      element: <EventDetailsPage isAuth={isAuth}></EventDetailsPage>,
    },
    {
      path: "/create-event", // TODO: url param, like /event
      element: <CreateEventPage isAuth={isAuth}></CreateEventPage>,
    },
    {
      path: "/edit/:eventId",
      element: <EditEventPage isAuth={isAuth}></EditEventPage>,
    },
    {
      path: "/settings",
      element: <UserSettingsPage isAuth={isAuth}></UserSettingsPage>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
