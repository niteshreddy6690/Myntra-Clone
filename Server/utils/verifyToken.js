const jwt = require("jsonwebtoken");
const router = require("express").Router();

const verifyToken = (req, res, next) => {
  console.log("calling verify token");
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log("token", token);
    jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, (err, user) => {
      // console.log("user", user);
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

const verifyTokenAndAuthorization = (req, res, next) => {
  console.log("req.params", req.params);
  verifyToken(req, res, () => {
    console.log("req.user.id", req.user?.id);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed do that");
    }
  });
};

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
      console.log("req.user.id", req.user?.id);
      console.log("roles.length", roles.length);
      console.log(
        "roles.includes(req.user.role)",
        roles.length && !roles.includes(req.user.role)
      );

      console.log("Roles", roles);
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      console.log("calling next");
      next();
    });
  };

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  authorize,
};
