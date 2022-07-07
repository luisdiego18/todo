const { Todo, validate } = require("../models/todo");
const express = require("express");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

// GET/:id
router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo)
    return res.status(404).send("The todo with the given ID was not found");

  res.send(todo);
});

// POST
router.post("/", async (req, res) => {
  // Joi validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let todo = new Todo({ title: req.body.title });
  todo = await todo.save();

  res.send(todo);
});

// PUT
router.put("/:id", async (req, res) => {
  // Joi validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found");

  res.send(todo);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndRemove(req.params.id);

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found");

  res.send(todo);
});

module.exports = router;
