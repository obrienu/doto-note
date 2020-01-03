const Todo = require("../model/item");

//Get all Tasks
exports.getTodos = (req, res) => {
  Todo.find()
    .sort({ createdAt: -1 })
    .then(items => res.json(items))
    .catch(err => res.status(400).json("could not fetch tasks"));
};

//Get one task by id
exports.getTodoById = (req, res) => {
  const id = req.params.id;
  Todo.findOne({
    _id: id
  })
    .then(items => res.json(items))
    .catch(err => res.status(400).json(err, "could not fetch task"));
};

//Post new tasks
exports.postTodos = (req, res) => {
  const task = req.body.task;
  const description = req.body.task;
  const todo = new Todo({
    task,
    description
  });
  todo
    .save()
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json(err, "Task could not be added"));
};

//Delete Tasks
exports.deleteTodo = (req, res) => {
  const id = req.params.id;
  Todo.findOne({
    _id: id
  })
    .then(todo => {
      todo.remove();
      res.json("Task successfully deleted");
    })
    .catch(err => res.json("error deleting task"));
};
