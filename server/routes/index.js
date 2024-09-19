const routes = require("express").Router();
const todosController = require("../controllers/TodosController");
routes.get("/todos", todosController.getTodos);
routes.post("/todos", todosController.createTodo);
routes.patch("/todos/:id", todosController.updateStatusProgress);
routes.patch("/todos/done/:id", todosController.updateDoneTodos);
module.exports = routes;
