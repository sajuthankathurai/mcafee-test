var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set("views", path.join(__dirname, "template", "views"));
app.set("view engine", "ejs");

//To serve static files such as images, CSS files, and JavaScript files,
//use the express.static built-in middleware function in Express.
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
