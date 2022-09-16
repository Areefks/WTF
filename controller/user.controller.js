exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.trainerBoard = (req, res) => {
  res.status(200).send("Trainer Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.memberBoard = (req, res) => {
  res.status(200).send("Member Content.");
};
