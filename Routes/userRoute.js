const express = require("express");
const router = express.Router();

const countUser = require("../Controller/User");
const verifyJWT = require("../Middleware/VerifyJWT");

router.get("/", verifyJWT, countUser);


module.exports = router;
