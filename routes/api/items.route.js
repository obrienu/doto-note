const express = require("express");
const route = express.Router();
const itemController = require("../../controller/items.controller");
const auth = require("../../middleware/auth");

route.get("/", auth, itemController.getTodos);
route.get("/:id", auth, itemController.getTodoById);
route.post("/", auth, itemController.postTodos);
route.delete("/:id", auth, itemController.deleteTodo);

module.exports = route;
