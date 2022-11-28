import express from "express";
import passport from "passport";
import eventsConnect, { toggleLike } from "../db-connect/events-connect.js";
import userConnect, { getUserById } from "../db-connect/users-connect.js";
import { eventify } from "../util/event-util.js";
import { registerUser, updateUserDocument } from "../util/user-util.js";
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
  const user = req.session?.passport?.user;
  if (user) {
    return res.json(req.session?.passport?.user);
  }
  return res.json({});
});

/**
 * Sends the entire user document from the database in the response.
 */
router.post("/api/getCurrentUser", async (req, res) => {
  const userId = req.session?.passport?.user?._id;
  if (userId) {
    try {
      const dbRes = await getUserById(userId);
      if (dbRes.user) {
        return res.json(dbRes.user);
      } else {
        return res.json({});
      }
    } catch (e) {
      console.error(e);
      return res.json({});
    }
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

router.post("/api/getRsvpLikeUserPreviews", async (req, res) => {
  const eventId = req.body.eventId;
  if (eventId) {
    try {
      const dbResult = await userConnect.getRsvpLikeUserPreviews(eventId);
      return res.json(dbResult);
    } catch (e) {
      console.error(e);
      return res.json({
        success: false,
        message:
          "An error was encountered in the route for getting the user rsvp and like previews.",
        username: "",
        err: e,
      });
    }
  } else {
    return res.json({
      success: false,
      message: "No event id found.",
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

/**
 * Sets the user matching the session.passport.user._id to have the
 * value of the newUserDoc from the req body.
 */
router.post("/api/updateUserDocument", async (req, res) => {
  try {
    const { _id, ...newUserDoc } = req.body.updatedUserObj;
    if (_id !== req.session?.passport?.user?._id) {
      return res.json({
        success: false,
        message:
          "Our system thinks you're trying to update a user other than yourself. Please clear your browser and try again later.",
      });
    }
    return res.json(await updateUserDocument(_id, newUserDoc));
  } catch (e) {
    console.error(e);
    return res.json({
      success: false,
      message: "An error occurred in our server route. Please try again later.",
    });
  }
});

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
  const idString = req.passport.user._id;
  const newValues = req.body.newValues;
  const resObject = await userConnect.updateById(idString, { $set: newValues });
  return res.json(resObject);
});

router.post("/api/deleteUserAccount", async (req, res) => {
  const idString = req.passport.user._id;
  const resObject = await userConnect.deleteByIdString(idString);
  // TODO: return or re-route to logout?
  return res.json(resObject);
});

router.post("/api/addEventToFollowing", async (req, res) => {
  const idString = req.passport.user._id;
  const rsvp = req.body.eventRSVP;
  const resObject = await userConnect.addEventToFollowing(idString, rsvp);
  return res.json(resObject);
});

router.post("/api/removeEventFromFollowing", async (req, res) => {
  const userIdString = req.passport.user._id;
  const eventIdString = req.body.eventId;
  const resObject = await userConnect.removeEventFromFollowing(
    userIdString,
    eventIdString
  );
  return res.json(resObject);
});

export default router;
