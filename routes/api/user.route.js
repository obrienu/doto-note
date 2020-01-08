const express = require("express");
const router = express.Router();
const UserController = require("../../controller/user.controller");
const auth = require("../../middleware/auth");

router.get("/", auth, UserController.getUser);
router.post("/posts", auth, UserController.addNote);
router.get("/posts", auth, UserController.getNotes);
router.delete("/posts/:noteId", auth, UserController.deleteNote);
router.patch("/posts/:noteId", auth, UserController.editNote);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.login);

module.exports = router;
