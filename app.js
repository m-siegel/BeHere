// Generated with express-generator. Updated to match ES6.
import express from "express";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import router from "./routes/routes.js";
import authRouter from "./routes/authentication-routes.js";
import passport from "passport";
import initializePassport from "./util/passport-config.js";
import session from "express-session";
import userConnect from "./db-connect/users-connect.js";
import dotenv from "dotenv";

// Set up path for express.static in a way that fits ES6
const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFrontendStaticFiles = resolve(__dirname, "./front-end/build");

dotenv.config(); // So can access environment variables from .env file
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport(
  passport,
  userConnect.getUserByContactEmail,
  userConnect.getUserById
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

// TODO: Import routers here

// Set up path for express.static in a way that fits ES6

// Generated with express-generator. Updated to match ES6.

app.use(express.static(pathToFrontendStaticFiles));

// NOTE: for testing front end routing to back with proxy
app.use(
  express.Router().get("/test", (req, res) => {
    console.log("got request");
    res.send;
  })
);

// TODO: set up routers
app.use("/", router);

export default app;
