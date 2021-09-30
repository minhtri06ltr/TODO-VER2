const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routers/auth");
const postRouter = require("./routers/post");
const cors = require("cors");
require("dotenv").config();
const connectDB = async () => {
  try {
    // use package dotenv to use .env hide password,username database and other information
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learn.xs1fh.mongodb.net/mern-learn?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    );
    console.log("Connect db successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1); //exit  process
  }
};
connectDB();
app.use(express.json()); //make express can read data in json type
app.use(cors());
app.use("/api/posts", postRouter); //direct to routes/post
app.use("/api/auth", authRouter); //direct to routes/auth
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
