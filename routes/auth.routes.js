const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // 2- Create a login API that should accept the following fields -

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
      verifySignUp.checkPassword,
      verifySignUp.validateEmail,
      verifySignUp.validateMobile,
    ],
    controller.signup
  );

  // 3- After successful login return the following response
  app.post("/api/auth/signin", controller.signin);
};
