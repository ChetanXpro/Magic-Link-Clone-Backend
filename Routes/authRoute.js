const express = require("express");
const router = express.Router();
const {
  sendEmailtoUser,
  confirmUser,
  refreshToken,
} = require("../Controller/auth");


router.post("/", sendEmailtoUser);


router.get("/refresh", refreshToken);

router.get("/confirm", confirmUser);

module.exports = router;
