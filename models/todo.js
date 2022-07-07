const Joi = require("joi");
const mongoose = require("mongoose");

// Schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

// Model
const Todo = mongoose.model("Todo", todoSchema);

// Joi validation
function validateTodo(todo) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(todo, {
    abortEarly: false,
  });
}

exports.Todo = Todo;
exports.validate = validateTodo;
