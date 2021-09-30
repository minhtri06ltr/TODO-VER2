/* Protect router post
check if user access token 
== true => direct to api/post can add new post => view website under user has been register
== false => deny
*/
const jwt = require("jsonwebtoken");

//Authorization: Bearer token code
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization"); //get Authorization
  //&&: if authHeader dont exist token = authHeader
  //if authHeader exist token = behind &&
  const token =
    authHeader && authHeader.split(" ")[1]; //get token code

  if (!token)
    return res
      .status(401)
      .json({
        success: false,
        message: "Access token not found",
      });
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    ); //check token
    req.userId = decoded.userId; // set token id for user if pass

    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(403)
      .json({
        success: false,
        message: "Invalid token",
      });
  }
};
module.exports = verifyToken;
