const express = require("express");
const route = express.Router();
const itemController = require("../../controller/items.controller");

route.get("/", itemController.getTodos);
route.get("/:id", itemController.getTodoById);
route.post("/", itemController.postTodos);
route.delete("/:id", itemController.deleteTodo);

module.exports = route;
