import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

// TODO: routing

// TODO: look at tutorial -- should this be in index not app?
function App() {
  const router = createBrowserRouter([
    {
      path: "/", // TODO: home if logged in?
      element: <IndexPage></IndexPage>,
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/login",
      element: <LoginPage></LoginPage>,
    },
    {
      path: "/register",
      element: <RegisterPage></RegisterPage>,
    },
    {
      path: "/home",
      element: <HomePage></HomePage>,
    },
    {
      path: "/dashboard",
      element: <DashboardPage></DashboardPage>,
    },
    {
      path: "/event/:id", // TODO: url param
      element: <EventDetailsPage></EventDetailsPage>,
    },
    {
      path: "/edit", // TODO: url param, like /event
      element: <EditEventPage></EditEventPage>,
    },
    {
      path: "/settings",
      element: <UserSettingsPage></UserSettingsPage>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
