const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const db = require("./models");
const Role = db.role;

function initial() {
  Role.create({
    id: 1,
    name: "member",
  });

  Role.create({
    id: 2,
    name: "trainer",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
