const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  task: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Todo", todoSchema);
