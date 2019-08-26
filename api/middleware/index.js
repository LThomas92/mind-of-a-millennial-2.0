const Article = require("../models/articleModel");
const User = require("../models/User");

const middlewareObj = {};

middlewareObj.isWriter = function(req, res, next) {
  if (req.isAuthenticated() && req.isWriter()) {
    return next();
  }
  res.json("error", "You do not have permission to do that");
  res.redirect("back");
};

middlewareObj.checkArticleOwnership = () => {
  if (req.isAuthenticated()) {
    Article.findById(req.params.id, function(err, foundArticle) {
      if (err) {
        console.log("Article not found");
        res.redirect("/");
      } else {
        //Does user own this article?
        if (foundArticle.author.id.equals(req.user._id)) {
          res.redirect("/");
        }
      }
    });
  } else {
    res.redirect("/");
  }
};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("You need to be logged in to do that");
  res.redirect("/login");
};

module.exports = middlewareObj;
