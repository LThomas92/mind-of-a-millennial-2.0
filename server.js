//config dot env
require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const port = process.env.PORT || 5000;
const path = require("path");
const http = require("http");

const users = require("./routes/user");
const articles = require("./routes/articles");

const DB = require("./config/keys").mongoURI;

//connect to the database
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err));

mongoose.set("useCreateIndex", true, "useFindandModify", false);

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(flash());

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

// Use Routes
app.use("/", users);
app.use("/api/articles", articles);

//SERVE STATIC ASSETS IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(port, () => {
  console.log("App is running on port " + port);
});

module.exports = app;
