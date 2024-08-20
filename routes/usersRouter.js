const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/", usersController.userSignup);
router.post("/login", usersController.userLogin);

module.exports = router;
