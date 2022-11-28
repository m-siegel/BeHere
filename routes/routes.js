import express from "express";
import passport from "passport";
import eventsConnect, { toggleLike } from "../db-connect/events-connect.js";
import userConnect from "../db-connect/users-connect.js";
import { eventify } from "../util/event-util.js";
import { registerUser } from "../util/user-util.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/api/getEvent/:id", async (req, res) => {
  const eventId = req.params.id;
  console.log(`The event id is: ${eventId}`);
  const dbRes = await eventsConnect.getOneEvent(eventId);
  console.log(dbRes);
  if (dbRes.success) {
    res.json(dbRes.event);
  } else {
    // TODO: change this
    res.json({
      name: "Test event",
      description: "a test event",
      organization: "a test org",
      location: "San Jose",
      start: "8:00",
      finish: "12:00",
      tags: ["sports"],
    });
  }
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
router.post("/api/create-event", checkAuthenticated, async (req, res) => {
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
router.post("/api/edit-event", checkAuthenticated, async (req, res) => {
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
  const user = req.session.passport.user;
  const event = req.body.event;
  const rsvpType = req.body.rsvpStatus;

  console.log("in /rsvp route");
  console.log("userId: ", user._id);
  console.log("eventId: ", event._id);
  console.log("rsvpType: ", rsvpType);

  if (user && event && rsvpType) {
    try {
      const eventDbResponse = await eventsConnect.eventRsvp(
        user,
        event,
        rsvpType
      );
      const userDbResponse = await userConnect.updateRSVP(
        user._id,
        event._id,
        rsvpType
      );

      if (eventDbResponse.success && userDbResponse.success) {
        return res.json({
          success: true,
          msg: "Successfully updated rsvp",
          err: null,
        });
      } else if (userDbResponse.success) {
        return res.json({
          success: false,
          msg: `Could not update event. Message: ${eventDbResponse.msg}`,
          err: null,
        });
      } else if (eventDbResponse.success) {
        return res.json({
          success: false,
          msg: `Could not update user. Message: ${userDbResponse.message}`,
          err: null,
        });
      }
      return res.json({
        success: false,
        msg: `Could not update event or user. 
          User failure message: ${userDbResponse.message}.
          Event failure message: ${eventDbResponse.message}`,
        err: null,
      });
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
      msg: `Could not update rsvp for user ${userId} and event ${eventId}.`,
      err: null,
    });
  }
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
  //const orgName = req?.session?.passport?.user?.organizations;

  try {
    if (req.params.type === "created") {
      // retrieve all events that the user created
      console.log("within created events");
      const response = await eventsConnect.getUserCreatedEventPreviews(
        req.session.passport.user._id
      );
      return res.json(response);
    } else {
      console.log("within followed events");
      // retreive all events that the user follows
      const response = await eventsConnect.getUserFollowedEventPreviews(
        req.session.passport.user._id
      );
      return res.json(response);
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

// Moved
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

router.post("/api/getUsernameById", async (req, res) => {
  const userId = req.body.userId;
  if (userId) {
    try {
      const dbResult = await userConnect.getUserById(userId);
      // console.log("dbResult: ", dbResult);
      // return res.send();
      if (dbResult.user?.username) {
        return res.json({
          success: true,
          message: "Username found.",
          username: dbResult.user.username,
          err: null,
        });
      } else {
        return res.json({
          success: false,
          message: `No ${dbResult.user ? "user" : "username"} found.`,
          username: "",
          err: null,
        });
      }
    } catch (e) {
      console.error(e);
      return res.json({
        success: false,
        message: "An error was encountered when finding the username.",
        username: "",
        err: e,
      });
    }
  } else {
    return res.json({
      success: false,
      message: "No user id found.",
      username: null,
      err: null,
    });
  }
});

router.post("/toggleLike", async (req, res) => {
  const userId = req.session?.passport?.user?._id;
  const eventId = req.body.eventId;
  if (userId && eventId) {
    try {
      const eventDbResponse = await toggleLike(eventId, userId);
      const userDbResponse = await userConnect.toggleLike(userId, eventId);
      if (eventDbResponse.success && userDbResponse.success) {
        return res.json({
          success: true,
          msg: "Successfully toggled like",
          err: null,
        });
      } else if (userDbResponse.success) {
        return res.json({
          success: false,
          msg: `Could not update event. Message: ${eventDbResponse.msg}`,
          err: null,
        });
      } else if (eventDbResponse.success) {
        return res.json({
          success: false,
          msg: `Could not update user. Message: ${userDbResponse.message}`,
          err: null,
        });
      }
      return res.json({
        success: false,
        msg: `Could not update event or user. 
          User failure message: ${userDbResponse.message}.
          Event failure message: ${eventDbResponse.message}`,
        err: null,
      });
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
      msg: `Could not toggle like for user ${userId} and event ${eventId}.`,
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

/**
 * Gets the specified events Sends a json response with an object
 * { success: Boolean,
 *  msg: a string explaining the operation outcome,
 *  events: An array of event objects, or null
 *  err: null, or the error that was caught
 *  }
 */
router.post("/api/getOneEvent", async (req, res) => {
  if (req.body.eventId) {
    try {
      const eventsResponse = await eventsConnect.getOneEvent(req.body.eventId);
      return res.json(eventsResponse);
    } catch (e) {
      console.error(e);
      return res.json({
        success: false,
        message: "Encountered error in /api/getOneEvent",
        event: null,
        err: e,
      });
    }
  } else {
    return res.json({
      success: false,
      message: "No event id found",
      event: null,
      err: null,
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
