const jwt = require("jsonwebtoken");
require("dotenv").config();

const authetication = (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      res.send("Error in Authetication");
    } else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};

module.exports = { authetication };
