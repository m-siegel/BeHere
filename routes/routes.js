import express from "express";
import passport from "passport";
import eventsConnect, { toggleLike } from "../db-connect/events-connect.js";
import { eventify } from "../util/event-util.js";
import { registerUser } from "../util/user-util.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/api/getEvent/:id", (req, res) => {
  const eventId = req.params.id;
  console.log(`The event id is: ${eventId}`);
  res.json({
    name: "Test event",
    description: "a test event",
    organization: "a test org",
    location: "San Jose",
    start: "8:00",
    finish: "12:00",
    tags: ["sports"],
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

router.get("/getPassportUser", checkAuthenticated, (req, res) => {
  console.log(req.passport.session);
  res.json(req.passport.session.user);
});

/**
 * will check for authenticated user
 */
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/home");
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

// NOTE: Mea changed
router.post("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      return res.json({ success: false, err: err });
    }
    return res.json({ success: true, err: null });
  });
});

// TODO -- "/DeleteEvent"

/**
 * Responds with events for the dashboard page
 */
router.get("/api/getEventPreviews/dash/:type", async (req, res) => {
  const orgName = req?.session?.passport?.user?.organizations;

  try {
    if (req.params.type === "created") {
      // retrieve all events that the user created
      const response = await eventsConnect.getEventPreviewsForUser(
        req.session.passport.user.id
      );
      //const eventsResponse = await response.json();
      return res.json({
        success: true,
        message: "",
        events: response,
        err: null,
      });
    } else {
      // retreive all events that the user follows
      const response = await eventsConnect.getUserFollowedEventPreviews(
        req.session.passport.user.id
      );
      const eventsResponse = await response.json();
      return res.json({
        success: true,
        message: "",
        events: eventsResponse,
        err: null,
      });
    }
  } catch (e) {
    console.log("Error: ", e);
    return res.json({
      success: false,
      message: "Encountered error in /api/getEventPreviews/dash",
      events: null,
      err: e,
    });
  }
});

// Movec
// Mea

// I don't think we can get the user's session passport info
// from the front end, so we can use this.
// post request so it doesn't show in the url
router.post("/getPassportUser", (req, res) => {
  // TODO: fix wherever this was used
  const user = req.session?.passport?.user;
  if (user) {
    return res.json(req.session?.passport?.user);
  }
  return res.json({});
});

router.post("/toggleLike", async (req, res) => {
  const userId = req.session?.passport?.user?._id;
  const eventId = req.body.eventId;
  if (userId && eventId) {
    try {
      const dbResponse = await toggleLike(eventId, userId);
      console.log("dbResponse: ", dbResponse);
      return res.json(dbResponse);
    } catch (e) {
      return res.json({
        success: false,
        msg: "An error occurred when connecting to the database.",
        err: e,
      });
    }
  } else {
    return res.json({
      success: false,
      msg: `Could not toggle like for user ${userId} and event ${eventId}`,
      err: null,
    });
  }
});

/**
 * Gets the events for the users first organization. Sends a json
 * response with an object { success: Boolean,
 *                            msg: a string explaining the operation outcome,
 *                            events: An array of event objects, or null
 *                            err: null, or the error that was caught
 *                            }
 */
router.get("/api/getEventPreviews", async (req, res) => {
  try {
    if (req.session.passport?.user?.organizations?.length) {
      try {
        // V2: get events for any of the user's orgs
        const orgName = req.session.passport?.user?.organizations[0];
        const eventsResponse = await eventsConnect.getEventPreviews(orgName);
        return res.json(eventsResponse);
      } catch (e) {
        console.error(e);
        return res.json({
          success: false,
          message: "Encountered error in /getEventPreviews",
          events: null,
          err: e,
        });
      }
    } else {
      return res.json({
        success: false,
        message: "User has no organizations.",
        events: null,
        err: null,
      });
    }
  } catch (e) {
    return res.json({
      success: false,
      message:
        "Error encountered with getting user organizations from session.",
      events: null,
      err: e,
    });
  }
});

router.post("/api/register", async (req, res) => {
  try {
    const registerRes = await registerUser(req.body);
    res.json(registerRes);
  } catch (e) {
    res.json({
      success: false,
      reason: "route",
      userIdString: "",
    });
  }
});

export default router;
