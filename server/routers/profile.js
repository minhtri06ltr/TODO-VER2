const verifyToken = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.put("/", verifyToken, async (req, res) => {
  const { img } = req.body;

  if (!img) {
    res.status(400).json({
      success: false,
      message: "Please check file upload again",
    });
  }
  try {
    let updateImg = {
      img: img,
    };
    const updateImgCondition = {
      _id: req.userId,
    };
    console.log(req.userId);

    updateImg = await User.findOneAndUpdate(
      updateImgCondition,
      updateImg,
      { new: true }, //get new database to client
      (err, doc) => {
        console.log(err, doc);
      },
    );

    if (!updateImg) {
      return res.status(400).json({
        success: false,
        message: "Some thing may wrong ",
      });
    }
    res.json({
      success: true,
      message: "Update img success",
      img: updateImg.img,
    });
    console.log(updateImg);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal sever error",
    });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    //populate get to user collection get all data
    const data = await User.find({
      _id: req.userId,
    }); //user: user in post table = user id of token
    if (!data)
      res.status(400).json({
        success: false,
        message: "Can not get profile",
      });
    const imgData = data[0].img;

    res.json({
      success: true,
      message: "get img success",
      imgData,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal sever error",
    });
  }
});
module.exports = router;
