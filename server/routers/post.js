const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
const verifyToken = require("../middleware/auth");

router.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
  );
  next();
});
//routers Put api/posts
//@desc Delete post
//@access private
router.delete(
  "/:id",
  verifyToken,
  async (req, res) => {
    const postDeleteCondition = {
      _id: req.params.id,
      user: req.userId,
    }; //object contains two condition
    try {
      const deletePost =
        await Post.findOneAndDelete(
          postDeleteCondition,
        );
      // User not authorized to update post or post not found
      if (!deletePost)
        return res.json.status(400)({
          success: false,
          message:
            "Post not found or user not authorized",
        });
      res.json({
        success: true,
        message: "Delete success",
        post: deletePost,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: "Internal sever error",
      });
    }
  },
);

//routers Put api/posts
//@desc Update post
//@access private
//use /:id is id of post to know what post you want to update - api/posts/id
router.put(
  "/:id",
  verifyToken,
  async (req, res) => {
    //because when user click edit we must to get data from server
    //to show old value, but server will response title,description,url,status
    // so to fit with value we must change style to same response
    const { title, description, url, status } =
      req.body;
    /*Validation */
    if (!title)
      return res.status(400).json({
        success: false,
        message: "Title is require",
      });
    try {
      let updatePost = {
        title: title,
        description: description || "",
        url:
          (url.startsWith("https://")
            ? url
            : `https://${url}`) || "",
        status: status || "To learn",
      };
      //req.params.id is id of post want to update
      // req.userId are id user of that post decoded by token
      const postUpdateCondition = {
        _id: req.params.id,
        user: req.userId,
      }; //object contains two condition when you want to update post

      // parament 1: condition 2:data want to change 3: to updatePost will change with new data if condition false return old post
      updatePost = await Post.findOneAndUpdate(
        postUpdateCondition,
        updatePost,
        { new: true },
      );
      // User not authorized to update post or post not found
      if (!updatePost)
        return res.status(400).json({
          success: false,
          message:
            "Post not found or user not authorized",
        });

      res.json({
        success: true,
        message: "Excellent progress!",
        post: updatePost,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: "Internal sever error",
      });
    }
  },
);

//routers POST api/posts
//@desc Get post
//@access private
router.get("/", verifyToken, async (req, res) => {
  try {
    //populate get to user collection get all data
    const posts = await Post.find({
      user: req.userId,
    }).populate("user", ["username"]); //user: user in post table = user id of token
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal sever error",
    });
  }
});

//routers POST api/posts
//@desc Create post
//@access private
router.post(
  "/",
  verifyToken,
  async (req, res) => {
    const {
      titleTyping,
      descriptionTyping,
      statusTyping,
      urlTyping,
    } = req.body;
    /*Validation */

    if (!titleTyping)
      return res.status(400).json({
        success: false,
        message: "Title is require",
      });
    try {
      const newPost = new Post({
        title: titleTyping,
        description: descriptionTyping,
        //if url start with https:// choose else we will add
        url: urlTyping.startsWith("https://")
          ? urlTyping
          : `https://${urlTyping}`,
        status: statusTyping || "To learn",
        user: req.userId,
      });
      await newPost.save();
      res.json({
        success: true,
        message: "Happy with your learning!",
        post: newPost,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: "Internal sever error",
      });
    }
  },
);
module.exports = router;
