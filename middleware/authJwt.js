const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    console.log(decoded);
    req.id = decoded.id;
    req.uuid = decoded.uuid;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.id).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

isMember = (req, res, next) => {
  User.findByPk(req.id).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "member") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Member Role!",
      });
    });
  });
};

isTrainer = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "trainer") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Trainer Role!",
      });
    });
  });
};

userDetails = (req, res, next) => {
  User.findOne({ where: { uuid: req.uuid } })
    .then((user) => {
      res.status(200).send({
        message: user,
      });
      return;
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

allDetails = (req, res, next) => {
  User.findAll({
    attributes: {
      exclude: ["password", "id", "uuid", "createdAt", "updatedAt", "status"],
    },
    order: [["id", "DESC"]],
  })
    .then((users) => {
      res.status(200).send({
        ...users,
      });
    })
    .catch((err) => {
      res.status(403).send(err);
    });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isMember: isMember,
  isTrainer: isTrainer,
  userDetails: userDetails,
  allDetails: allDetails,
};
module.exports = authJwt;
