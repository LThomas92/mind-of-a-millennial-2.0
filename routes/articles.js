require("dotenv/config");
const express = require("express");
const router = express.Router({ mergeParmas: true });
const passport = require("passport");
require("../config/passport")(passport);
const middleware = require("../middleware");
const Article = require("../models/articleModel");
var multer = require("multer");
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });

var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "lthomas92",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const validatePostInput = require("../validation/articles");

router.get("/", (req, res) => {
  Article.find({})
    .sort({ date: "-1" })
    .exec(function(err, articles) {
      if (err) {
        res.json(err.message);
      } else {
        res.json(articles);
      }
    });
});

router.get("/sports", (req, res) => {
  Article.find({ category: "Sports" })
    .sort({ date: "-1" })
    .exec(function(err, articles) {
      if (err) {
        res.json(err.message);
      } else {
        res.json(articles);
      }
    });
});

router.get("/tv-movies", (req, res) => {
  Article.find({ category: "TV/Movies" })
    .sort({ date: "-1" })
    .exec(function(err, articles) {
      if (err) {
        res.json(err.message);
      } else {
        res.json(articles);
      }
    });
});

router.get("/music", (req, res) => {
  Article.find({ category: "Music" })
    .sort({ date: "-1" })
    .exec(function(err, articles) {
      if (err) {
        res.json(err.message);
      } else {
        res.json(articles);
      }
    });
});

router.get("/lifestyle", (req, res) => {
  Article.find({ category: "Lifestyle" })
    .sort({ date: "-1" })
    .exec(function(err, articles) {
      if (err) {
        res.json(err.message);
      } else {
        res.json(articles);
      }
    });
});

router.get("/misc", (req, res) => {
  Article.find({ category: "Misc" })
    .sort({ date: "-1" })
    .exec(function(err, articles) {
      if (err) {
        res.json(err.message);
      } else {
        res.json(articles);
      }
    });
});

router.get("/show/:slug", function(req, res, next) {
  Article.findOne({ slug: { $eq: req.params.slug } }, function(err, article) {
    if (err) return next(err);
    res.json(article);
  });
});

router.post(
  "api/articles/add",
  middleware.isWriter,
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // CHECK VALIDATION FOR FORM FIELDS
    if (!isValid) {
      return res.status(400).json(errors);
    }

    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
      if (err) {
        req.json(err.message);
      }
      req.body.image = result.secure_url;
      const imgSource = req.body.imgSource;
      // add image's public_id to article object
      req.body.imageId = result.public_id;
      // add author to article
      req.body.author = {
        id: req.user._id,
        username: req.user.username
      };
      Article.create(req.body, function(err, article) {
        if (err) {
          res.json(err.message);
          return res.redirect("back");
        }
        res.redirect("/");
      });
    });
  }
);

/* DELETE ARTICLE */
router.delete(
  "/api/articles/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Article.findById(req.params.id)
      .then(article => {
        // Check for article owner
        if (article.author.id !== req.user.id) {
          article.remove().then(() => res.json({ success: true }));
        }
        // Delete
        return res.status(401).json({ notauthorized: "User not authorized" });
      })
      .catch(err =>
        res.status(404).json({ articlenotfound: "No article found" })
      );
  }
);

getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
