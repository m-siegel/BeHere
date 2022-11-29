/**
 * This file takes the mockaroo data and adds to it to fit the expected data.
 */

import * as mongodb from "mongodb";
// https://bobbyhadz.com/blog/javascript-import-json-file
import events from "./MOCK_DATA_events.json" assert { type: "json" };
import users from "./MOCK_DATA_users.json" assert { type: "json" };
import fs from "fs";

const fakeOrgs = [
  "rohan.gov",
  "hogwarts.edu",
  "example.com",
  "exampleschool.edu",
  "examplecorp2.co.uk",
  "examplegov.gov",
  "fellowship.me",
];

// Events
events.forEach((evt, i) => {
  evt._id = {
    $oid: evt._id,
  };
  evt.organization = fakeOrgs[i % 7];
  evt.tags = [];
  evt.followedBy = [];
  evt.rsvpYes = [];
  evt.rsvpMaybe = [];
  evt.rsvpNo = [];
  evt.likes = [];

  for (let j = 0; i - j > -1; j += 21) {
    evt.rsvpYes.push(events[i - j]._id.$oid);
    if (i % 2) {
      evt.likes.push(events[i - j]._id.$oid);
    }
  }
  for (let j = 7; i - j > -1; j += 21) {
    evt.rsvpMaybe.push(events[i - j]._id.$oid);
    if (i % 2) {
      evt.likes.push(events[i - j]._id.$oid);
    }
  }
  for (let j = 14; i - j > -1; j += 21) {
    evt.rsvpNo.push(events[i - j]._id.$oid);
  }
});
// https://attacomsian.com/blog/nodejs-write-json-object-to-file
fs.writeFile("MOCK_DATA_UPDATED_events.json", JSON.stringify(events), (err) => {
  if (err) {
    throw err;
  }
  console.log("Events file saved.");
});

// Users
users.forEach((usr, i) => {
  usr._id = {
    $oid: usr._id,
  };
  (usr.password =
    "$2b$10$PmLTLnqGwdrvcYGqx5oLLOKDMmh8EgRJtJJECrQuhkcHmVOhqliz6"),
    (usr.organizationEmails = [usr.username + "@" + fakeOrgs[i % 7]]);
  usr.organizations = [fakeOrgs[i % 7]];
  usr.rsvpYesEvents = [];
  usr.rsvpMaybeEvents = [];
  usr.rsvpNoEvents = [];
  usr.likedEvents = [];
  usr.followingEvents = [];

  for (let j = 0; i + j < 1000; j += 21) {
    usr.rsvpYesEvents.push(events[i + j]._id.$oid);
    if ((j + i) % 2) {
      usr.likedEvents.push(events[i + j]._id.$oid);
    }
  }
  for (let j = 7; i + j < 1000; j += 21) {
    usr.rsvpMaybeEvents.push(events[i + j]._id.$oid);
    if ((j + i) % 2) {
      usr.likedEvents.push(events[i + j]._id.$oid);
    }
  }
  for (let j = 14; i + j < 1000; j += 21) {
    usr.rsvpNoEvents.push(events[i + j]._id.$oid);
  }
});
fs.writeFile("MOCK_DATA_UPDATED_users.json", JSON.stringify(users), (err) => {
  if (err) {
    throw err;
  }
  console.log("Users file saved.");
});
