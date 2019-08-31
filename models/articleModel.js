const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  title: String,
  slug: { type: String, unique: true },
  image: String,
  imageId: String,
  imgSource: String,
  category: String,
  text: String,
  submittedAt: { type: Date, default: Date.now },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      text: {
        type: String,
        required: true
      },
      username: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

// make sure that the slug is created from the title
ArticleSchema.pre("save", function(next) {
  this.slug = slugify(this.title);
  next();
});

// function to slugify a title
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
