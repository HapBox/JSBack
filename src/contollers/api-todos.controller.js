const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const ToDo = require("../dataBase/models/ToDo.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = new Router();

function initRoutes() {
  router.get("/", asyncHandler(requireToken), asyncHandler(getAll));
  router.get("/:id", asyncHandler(requireToken), asyncHandler(getById));
  router.post("/", asyncHandler(requireToken), asyncHandler(createTodo));
  router.patch("/:id", asyncHandler(requireToken), asyncHandler(updateTodo));
  router.delete("/", asyncHandler(requireToken), asyncHandler(deleteAll));
  router.delete("/:id", asyncHandler(requireToken), asyncHandler(deleteById));
}

//Получение всех туду с БД по пользователю
async function getAll(req, res, next) {
  const todos = await ToDo.findAll({
    where: {
      userId: req.token.userId,
    },
  });
  res.status(200).json(todos);
}

//Получение туду с определенным id по пользователю
async function getById(req, res, next) {
  const todo = await ToDo.findOne({
    where: {
      id: req.params.id,
      userId: req.token.userId,
    },
  });
  if (!todo) throw new ErrorResponse("Not found todo", 404);
  res.status(200).json(todo);
}

//Создание тудушки пользователя
async function createTodo(req, res, next) {
  const userId = req.token.userId;
  console.log(req.token);
  const data = await ToDo.create({
    ...req.body,
    userId,
  });
  res.status(200).json(data);
}

//обновление тудушки по его id
async function updateTodo(req, res, next) {
  let data;
  try {
    data = await ToDo.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.token.userId,
      },
      returning: true,
    });
  } catch (error) {
    throw new ErrorResponse("Invalid data", 400);
  }
  res.status(200).json({ message: "Updated", updated: data });
}

//удаление всех туду пользователя
async function deleteAll(req, res, next) {
  await ToDo.destroy({
    where: {
      userId: req.body.userId,
    },
  });
  res.status(200).json({ message: "Deleted all todos" });
}

//удаление туду по id
async function deleteById(req, res, next) {
  let todo = await ToDo.findOne({
    where: {
      id: req.params.id,
      userId: req.token.userId,
    },
    returning: true,
  });
  if (!todo) throw new ErrorResponse("Not found todo", 404);
  await todo.destroy();
  res.status(200).json({ message: "Deleted" });
}

initRoutes();

module.exports = router;
