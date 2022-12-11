/* Both */

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MyEventsPage from "./pages/MyEventsPage.js";
import EditEventPage from "./pages/EditEventPage.js";
import ErrorPage from "./pages/ErrorPage.js";
import EventDetailsPage from "./pages/EventDetailsPage.js";
import EventFeedPage from "./pages/EventFeedPage.js";
import IndexPage from "./pages/IndexPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import UserSettingsPage from "./pages/UserSettingsPage.js";
import CreateEventPage from "./pages/CreateEventPage";

function App() {
  async function isAuth() {
    try {
      const res = await (await fetch("/api/auth")).json();
      return res.auth;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  const router = createBrowserRouter([
    {
      path: "/",
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
      path: "/event-feed",
      element: <EventFeedPage isAuth={isAuth}></EventFeedPage>,
    },
    {
      path: "/my-events",
      element: <MyEventsPage isAuth={isAuth}></MyEventsPage>,
    },
    {
      path: "/event/:id",
      element: <EventDetailsPage isAuth={isAuth}></EventDetailsPage>,
    },
    {
      path: "/create-event",
      element: <CreateEventPage isAuth={isAuth}></CreateEventPage>,
    },
    {
      path: "/edit/:eventId",
      element: <EditEventPage isAuth={isAuth}></EditEventPage>,
    },
    {
      path: "/account-settings",
      element: <UserSettingsPage isAuth={isAuth}></UserSettingsPage>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
