process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var s3Routes = require("./routes/s3.router");
var defaultRoutes = require("./routes/default.router");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(s3Routes);
app.use(defaultRoutes);

module.exports = app;
