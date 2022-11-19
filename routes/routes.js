import express from "express";
import passport from "passport";
import eventsConnect from "../db-connect/events-connect.js";
import { eventify } from "../util/event-util.js";
import { registerUser } from "../util/user-util.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/HomePage",
    failureRedirect: "/LoginPage",
  })
);

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
  res.redirect("/");
});

// TODO -- "/DeleteEvent"

// Mea

// I don't think we can get the user's session passport info
// from the front end, so we can use this.
// post request so it doesn't show in the url
router.post("/getPassportUser", (req, res) => {
  res.json(req.session?.passport?.user);
});

// router.get("/test", (req, res) => {
//   res.send("testing... testing... tested!");
// });

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
    // TODO -- commented out for dev; uncomment and delete orgName = "rohan.gov"
    // if (req.session.passport.user.oranizations.length) {
    try {
      // V2: get events for any of the user's orgs
      // const orgName = req.session.passport.user.oranizations[0];
      const orgName = "rohan.gov";
      const eventsResponse = await eventsConnect.getEventPreviews(orgName);
      return res.json(eventsResponse);
    } catch (e) {
      return res.json({
        success: false,
        message: "Encountered error in /getEventPreviews",
        events: null,
        err: e,
      });
    }
    // } else {
    //   return res.json({
    //     success: false,
    //     message: "User has no organizations.",
    //     events: null,
    //     err: null,
    //   });
    // }
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
