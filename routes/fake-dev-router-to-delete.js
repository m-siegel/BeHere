// NOTE: Just for testing front end stuff -- DELETE after dev

import express from "express";
// import userConnect from "../db-connect/users-connect.js";
const router = express.Router();

const fakePreviewsList = [
  {
    _id: "1",
    organization: "example.com",
    name: "Super Awesome Event 1",
    creator: "a",
    tags: ["sport", "drinks"],
    location: "Palo Alto, CA",
    time: "Nov 15",
  },
  {
    _id: "2",
    organization: "example.com",
    name: "Super Awesome Event 2",
    creator: "b",
    tags: ["sport", "outdoor"],
    location: "Palo Alto, CA",
    time: "Nov 15",
  },
  {
    _id: "3",
    organization: "example.com",
    name: "Super Awesome Event 3",
    creator: "a",
    tags: ["sport", "drinks"],
    location: "Palo Alto, CA",
    time: "Nov 19",
  },
  {
    _id: "4",
    organization: "example.com",
    name: "Super Awesome Event 4",
    creator: "c",
    tags: ["art", "drinks"],
    location: "Palo Alto, CA",
    time: "Nov 18",
  },
  {
    _id: "5",
    organization: "example.com",
    name: "Super Awesome Event 5",
    creator: "d",
    tags: ["crafts", "drinks", "art"],
    location: "Palo Alto, CA",
    time: "Nov 15",
  },
  {
    _id: "6",
    organization: "example.com",
    name: "Super Awesome Event 6",
    creator: "e",
    tags: ["social", "drinks"],
    location: "Palo Alto, CA",
    time: "Nov 25",
  },
  {
    _id: "7",
    organization: "example.com",
    name: "Super Awesome Event 7",
    creator: "f",
    tags: ["movies", "drinks"],
    location: "Palo Alto, CA",
    time: "Nov 12",
  },
  {
    _id: "8",
    organization: "example.com",
    name: "Super Awesome Event 8",
    creator: "g",
    tags: ["sport", "drinks"],
    location: "Palo Alto, CA",
    time: "Nov 29",
  },
  {
    _id: "9",
    organization: "example.com",
    name: "Super Awesome Event 9",
    creator: "a",
    tags: ["sport", "drinks"],
    location: "Palo Alto, CA",
    time: "Nov 22",
  },
];

// Event previews -- need eventId, name, eventOrgName, creator, tags, location/time
router.get("/api/getEventsByOrg", (req, res) => {
  console.log("got request");
  // NOTE: for the real thing, would get org list from req.session.passport.user.organizations and query db
  return res.json({
    success: true,
    eventsList: fakePreviewsList,
    msg: "message",
    err: null,
  });
});

export default router;
