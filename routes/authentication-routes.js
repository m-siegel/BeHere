/* Ilana-Mahmea */

import express from "express";
const router = express.Router();

// TODO: sync up with session
/**
 * Responds indicating whether or not the user is logged in..
 */
router.post("/getAuthentication", (req, res) => {
  res.json({ authenticated: req.isAuthenticated() });
});

// TODO: log in user
// TODO: log out user
// TODO: register user -- from form
