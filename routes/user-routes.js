/* Ilana-Mahea */

import express from "express";
import userConnect from "../db-connect/users-connect.js";
const router = express.Router();

// NOTE: Assumes that user is serialized with id at least
// TODO: How do we want to serialize the user? id, username and orgs?

// TODO: Comment and test

router.post("/api/getUserById", async (req, res) => {
  const resObject = await userConnect.getUserById(req.session.passport.user.id);
  return res.json(resObject);
});

router.post("/api/getUserByUsername", async (req, res) => {
  // TODO: validate not undefined? -- for all?
  const resObject = await userConnect.getUserByUsername(req.body.username);
  return res.json(resObject);
});

router.post("/api/getUserByEmail", async (req, res) => {
  let resObject = await userConnect.getUserByContactEmail(req.body.email);
  if (resObject.user) {
    return res.json(resObject);
  }
  resObject = await userConnect.getUserByOrgEmail(req.body.email);
  return res.json(resObject);
});

router.post("/api/getUsersByOrganizations", async (req, res) => {
  const resObject = await userConnect.getUsersByOrganizations(req.body.orgList);
  return res.json(resObject);
});

router.post("/api/updateUserInfo", async (req, res) => {
  const idString = req.passport.user.id;
  const newValues = req.body.newValues;
  const resObject = await userConnect.updateById(idString, { $set: newValues });
  return res.json(resObject);
});

router.post("/api/deleteUserAccount", async (req, res) => {
  const idString = req.passport.user.id;
  const resObject = await userConnect.deleteByIdString(idString);
  // TODO: return or re-route to logout?
  return res.json(resObject);
});

router.post("/api/addEventToFollowing", async (req, res) => {
  const idString = req.passport.user.id;
  const rsvp = req.body.eventRSVP;
  const resObject = await userConnect.addEventToFollowing(idString, rsvp);
  return res.json(resObject);
});

router.post("/api/removeEventFromFollowing", async (req, res) => {
  const userIdString = req.passport.user.id;
  const eventIdString = req.body.eventId;
  const resObject = await userConnect.removeEventFromFollowing(
    userIdString,
    eventIdString
  );
  return res.json(resObject);
});

// BUG: the db code for this is buggy. see that note
router.post("/api/updateEventInFollowing", async (req, res) => {
  const idString = req.passport.user.id;
  const rsvp = req.body.eventRSVP;
  const resObject = await userConnect.updateEventInFollowing(idString, rsvp);
  return res.json(resObject);
});
