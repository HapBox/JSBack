const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const ToDo = require("../dataBase/models/ToDo.model");
const {
  asyncHandler,
  requireToken,
  notFound,
} = require("../middlewares/middlewares");

const router = new Router();

function initRoutes() {
  router.get("/", asyncHandler(requireToken), asyncHandler(getAll));
  router.get("/:id", asyncHandler(requireToken), asyncHandler(getById));
  router.post("/", asyncHandler(requireToken), asyncHandler(createTodo));
  router.patch("/:id", asyncHandler(requireToken), asyncHandler(updateTodo));
  router.delete("/", asyncHandler(requireToken), asyncHandler(deleteAll));
  router.delete("/:id", asyncHandler(requireToken), asyncHandler(deleteById));
}

async function getAll(req, res, next) {
  const todos = await ToDo.findAll();
  res.status(200).json(todos);
}

async function getById(req, res, next) {
  const todo = await ToDo.findByPk(req.params.id);
  if (!todo) throw new ErrorResponse("Not found todo", 404);
  res.status(200).json(todo);
}

async function createTodo(req, res, next) {
  const data = await ToDo.create(req.body);
  res.status(200).json(data);
}

async function updateTodo(req, res, next) {
  const todo = await ToDo.findByPk(req.params.id);
  if (!todo) throw new ErrorResponse("Not found todo", 404);

  await ToDo.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  let updated = await ToDo.findByPk(req.params.id);
  res.status(200).json({ message: "Updated", updated: updated });
}

async function deleteAll(req, res, next) {
  await ToDo.destroy({
    truncate: true,
    restartIdentity: true,
  });
  res.status(200).json({ message: "Deleted all todos" });
}

async function deleteById(req, res, next) {
  let todo = await ToDo.findByPk(req.params.id);
  if (!todo) throw new ErrorResponse("Not found todo", 404);

  await ToDo.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Deleted" });
}

initRoutes();

module.exports = router;
