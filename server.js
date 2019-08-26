//config dot env
require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const passport = require("passport");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
const path = require("path");
require("./config/passport")(passport);
const cookieParser = require("cookie-parser");

// ROUTES
const users = require("./routes/user");
const articles = require("./routes/articles");

//connect to the database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

mongoose.set("useCreateIndex", true, "useFindandModify", false);

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(express.static("./public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Mind of A Millennial",
    resave: false,
    saveUninitialized: false
  })
);

// Initialize CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Passport Middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//USE ROUTES
app.use("/", users);
app.use("/api/articles", articles);

//SERVE STATIC ASSETS IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, function() {
  console.log("Server is running on Port:", PORT);
});

module.exports = app;