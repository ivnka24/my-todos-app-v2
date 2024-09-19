const { Todo } = require("../models");

class TodosController {
  static async getTodos(req, res) {
    try {
      const todos = await Todo.findAll();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: "Error fetching todos", error });
    }
  }

  static async createTodo(req, res) {
    const { title, description, status } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "title, description are required" });
    }
    try {
      const todo = await Todo.create({ title, description, status : "pending" });
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ message: "Error creating todo", error });
    }
  }

  static async updateStatusProgress(req, res) {
    const { id } = req.params;
    try {
      const findTodo = await Todo.findOne({ where: { id } });
      if (!findTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      await Todo.update({ status: "process" }, { where: { id } });
      res.status(200).json({ message: "Todo updated to process" });
    } catch (error) {
      res.status(500).json({ message: "Error updating todo", error });
    }
  }

  static async updateDoneTodos(req, res) {
    const { id } = req.params;
    try {
      const findTodo = await Todo.findOne({ where: { id } });
      if (!findTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      await Todo.update({ status: "done" }, { where: { id } });
      res.status(200).json({ message: "Todo marked as done" });
    } catch (error) {
      res.status(500).json({ message: "Error updating todo", error });
    }
  }
}

module.exports = TodosController;
