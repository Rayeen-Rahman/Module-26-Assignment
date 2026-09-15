const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Technology", "Sports", "Politics", "Entertainment", "Business", "Health", "Science", "World"],
      default: "World",
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("News", newsSchema);
