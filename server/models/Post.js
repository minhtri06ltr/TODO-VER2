const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create database table
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  status: {
    type: String,
    enum: ["To learn", "Learning", "Learned"], //learning process
  },
  // match with User table
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model(
  "posts",
  PostSchema,
); //'posts' name of collection
