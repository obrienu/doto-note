const express = require("express");
const router = express.Router();
const UserController = require("../../controller/user.controller");
const auth = require("../../middleware/auth");

router.get("/", auth, UserController.getUser);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.login);

module.exports = router;
