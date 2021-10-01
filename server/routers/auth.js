const express = require("express");
const router = express.Router();
const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader(
    "Access-Control-Allow-Credentials",
    true,
  );

  // Pass to next layer of middleware
  next();
});
//@route GET api/auth
//@desc check if user is logged in
//@access public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(
      req.userId,
    ).select("-password");
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal sever error",
    });
  }
});

//@routes POST api/auth/register
//@desc Register user
//@access Public
//use async - await to communicate with database
router.post("/register", async (req, res) => {
  const { usernameTyping, passwordTyping } =
    req.body; //get value user send
  /*validation*/
  if (!usernameTyping || !passwordTyping)
    return res.status(400).json({
      success: false,
      message: "Missing username or password",
    });
  try {
    //check existing username
    const userDB = await User.findOne({
      username: usernameTyping,
    }); //username: value in database - username's user type
    if (userDB)
      return res.status(400).json({
        success: false,
        message: "User name already taken",
      });
    //all good
    const hashedPassword = await argon2.hash(
      passwordTyping,
    ); //use package argon2 to hash the password
    //create new user
    const newUser = new User({
      username: usernameTyping,
      password: hashedPassword,
    });
    await newUser.save();
    //when register successful - process login
    //token - permission to view user data - login website under user has been register
    //return token - use json web token package to check user
    // if verify then user can get data from database or move inside website
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
    ); // create token user-Id send it to client this id base on decoded user id in database
    res.json({
      success: true,
      message: "User create successful",
      accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal sever error",
    });
  }
});
//@routes POST api/auth/login
//@desc Login user
//@access Public
router.post("/login", async (req, res) => {
  const { usernameTyping, passwordTyping } =
    req.body;
  /*Validation*/
  if (!usernameTyping || !passwordTyping)
    return res.status(400).json({
      success: false,
      message: "Missing username or password",
    });
  try {
    //check existing user name
    const userDB = await User.findOne({
      username: usernameTyping,
    });
    if (!userDB)
      return res.status(400).json({
        success: false,
        message:
          "Incorrect user name or password",
      });
    //user name found
    const passwordValid = await argon2.verify(
      userDB.password,
      passwordTyping,
    );
    if (!passwordValid)
      return res.status(400).json({
        success: false,
        message:
          "Incorrect user name or password",
      });
    //All good
    const accessToken = jwt.sign(
      { userId: userDB._id },
      process.env.ACCESS_TOKEN_SECRET,
    );
    res.json({
      success: true,
      message: "Logged successful",
      accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal sever error",
    });
  }
});
module.exports = router;
