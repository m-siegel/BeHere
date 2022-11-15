import express from "express";
import passport from "passport";
import eventsConnect from "../db-connect/events-connect.js";
import { eventify } from "../util/event-util.js";
const router = express.Router();

/**
 * Responds indicating whether or not the session is valid (express-session and passport)
 */
router.post("/getAuthentication", (req, res) => {
    res.json({ authenticated: req.isAuthenticated() });
});

/**
 * Responds indicating whether or not an event is created or not
 */
router.post("/create-event", async (req, res) => {
    const event = eventify(req.body);
    const dbRes = await eventsConnect.addEvent(event);
    if (dbRes.success) {
        return res.json({
            success: dbRes.success,
            msg: dbRes.msg,
            insertedId: dbRes.insertedId,
            err: dbRes.err
        });
    }
    return res.json ({
        success: false,
        msg: dbRes.msg,
        insertedId: dbRes.insertedId,
        err: dbRes.err
    })
})

/**
 * Responds indicating whether an event has been updated.
 */
router.post("/edit-event", async (req, res) => {
    const dbRes = await eventsConnect.updateEvent(req.body);
    if (dbRes.success) {
        return res.json({
            success: dbRes.success,
            msg: dbRes.msg,
            err: dbRes.err
        })
    }
    return res.json({
        success: false,
        msg: dbRes.msg,
        err: dbRes.err
    })
})

/**
 * Responds indicating whether a user has sucessfully rsvp'd to an event
 */
router.post("/rsvp", async (req, res) => {
    const dbRes = await eventsConnect.eventRsvp(req.session.passport.user, req.body.event, req.body.rsvpStatus);
    if (dbRes.success) {
        return res.json({
            success: dbRes.success,
            msg: dbRes.msg,
            err: dbRes.err
        })
    }
    return res.json({
        success: false,
        msg: dbRes.msg,
        err: dbRes.err
    })
})
// TODO -- "/DeleteEvent"
// 

export default router;