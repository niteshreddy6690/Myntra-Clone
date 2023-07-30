const jwt = require("jsonwebtoken");
const router = require("express").Router();

const verifyToken = (req, res, next) => {
  console.log("calling verify token");
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is invalid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated as a user");
  }
};

// ignore this code
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed do that");
    }
  });
};
// ignore this piece of code

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json("You are not an Admin so you are not allowed do that");
    }
  });
};

const authorize =
  (roles = []) =>
  (req, res, next) => {
    console.log("calling Authorize");
    // roles param can be a single role string (e.g. Role.User or 'User')
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === "string") {
      roles = [roles];
    }
    verifyToken(req, res, () => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      next();
    });
  };

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  authorize,
};
