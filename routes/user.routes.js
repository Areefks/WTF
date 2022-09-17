const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/user", [authJwt.verifyToken], controller.trainerBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isMember],
    controller.memberBoard
  );

  //5- Create an API to fetch user's details using JWT token i.e.
  app.get("/api/userDetails", [authJwt.verifyToken], authJwt.userDetails);

  //6- Create an API that returns all users with the following filter
  app.get("/api/test/all", authJwt.allDetails);
};
