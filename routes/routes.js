import express from "express";
import passport from "passport";
import eventsConnect from "../db-connect/events-connect.js";
import { eventify } from "../util/event-util.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.get("/login", (req, res) => {
  res.send("this is ok");
});

router.post("/login", (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/HomePage",
    failureRedirect: "/LoginPage",
  });
});

/**
 * will check for authenticated user
 */
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/LoginPage");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/HomePage");
  }
  next();
}

/**
 * Responds indicating whether or not the session is valid (express-session and passport)
 */
router.post("/getAuthentication", (req, res) => {
  res.json({ authenticated: req.isAuthenticated() });
});

/**
 * Responds indicating whether or not an event is created or not
 */
router.post("/create-event", checkAuthenticated, async (req, res) => {
  const event = eventify(req.body);
  const dbRes = await eventsConnect.addEvent(event);
  if (dbRes.success) {
    return res.json({
      success: dbRes.success,
      msg: dbRes.msg,
      insertedId: dbRes.insertedId,
      err: dbRes.err,
    });
  }
  return res.json({
    success: false,
    msg: dbRes.msg,
    insertedId: dbRes.insertedId,
    err: dbRes.err,
  });
});

/**
 * Responds indicating whether an event has been updated.
 */
router.post("/edit-event", checkAuthenticated, async (req, res) => {
  const dbRes = await eventsConnect.updateEvent(req.body);
  if (dbRes.success) {
    return res.json({
      success: dbRes.success,
      msg: dbRes.msg,
      err: dbRes.err,
    });
  }
  return res.json({
    success: false,
    msg: dbRes.msg,
    err: dbRes.err,
  });
});

/**
 * Responds indicating whether a user has sucessfully rsvp'd to an event
 */
router.post("/rsvp", checkAuthenticated, async (req, res) => {
  const dbRes = await eventsConnect.eventRsvp(
    req.session.passport.user,
    req.body.event,
    req.body.rsvpStatus
  );
  if (dbRes.success) {
    return res.json({
      success: dbRes.success,
      msg: dbRes.msg,
      err: dbRes.err,
    });
  }
  return res.json({
    success: false,
    msg: dbRes.msg,
    err: dbRes.err,
  });
});

router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/homepage");
});

// TODO -- "/DeleteEvent"
//

export default router;
