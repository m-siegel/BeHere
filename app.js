// Generated with express-generator. Updated to match ES6.
import express from "express";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import router from "./routes/routes.js";
import passport from "passport";
import initializePassport from "./util/passport-config.js";
import session from "express-session";
import methodOverride from "method-override";

import dotenv from "dotenv";
// TODO: import session and passport

// import initializePassport from "./passport-config.js"
// initializePassport(passport, getUserByUsername, getUserById); maybe also getUserByEmail
// TODO import our initializePassport, getUserBySomething and getUserById for setting up passport

// TODO: Import routers here

// Set up path for express.static in a way that fits ES6
const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFrontendStaticFiles = resolve(__dirname, "./front-end/build");

dotenv.config(); // So can access environment variables from .env file

const app = express();

// Generated with express-generator. Updated to match ES6.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(pathToFrontendStaticFiles));

// NOTE: for testing front end routing to back with proxy
app.use(
  express.Router().get("/test", (req, res) => {
    console.log("got request");
    res.send;
  })
);

// TODO: set up session and passport
// app.use(passport.initialize());
// app.use(passport.session());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// initializePassport(passport, getUserByUsername, getUserById);
// app.use(passport.initialize());
// app.use(passport.session());
/**
 *  Within action attribute of form, inter "/logout?_method=DELETE" method="POST".
 *  This will delete the session for the user when logging out
 */
// app.use(methodOverride("_method"));

// TODO: set up routers
// app.use("/", router);

// TODO: DELETE -- this is just for testing
import experimentRouter from "./routes/fake-dev-router-to-delete.js";
app.use("/", experimentRouter);

// app.use((req, res) => {
//   res.sendFile(pathToFrontendStaticFiles, "/index.html");
// });

app.use(express.static(pathToFrontendStaticFiles));

export default app;
