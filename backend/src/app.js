const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

console.log("Initializing app.js"); // Debugging log to ensure app.js runs

const { handle404Error, handleGlobalError } = require("./middlewares");
console.log("e be here");

const { v1Routes } = require("./routes/v1.js");
const { cors } = require("./config");
const path = require("path");

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());

console.log("Middleware initialized"); // Debugging log after middleware setup

app.use("/api/v1", v1Routes);

console.log("Routes initialized"); // Debugging log for route setup

app.use(handle404Error);
app.use(handleGlobalError);

console.log("Error handlers initialized"); // Debugging log for error handlers

module.exports = { app };
