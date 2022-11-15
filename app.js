// Generated with express-generator. Updated to match ES6.
import express from "express";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";

import dotenv from "dotenv";
// TODO: import session and passport
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

// TODO: set up routers

export default app;
