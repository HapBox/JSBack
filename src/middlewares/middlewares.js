const ErrorResponse = require("../classes/error-response");
const ToDo = require("../dataBase/models/ToDo.model");
const Token = require("../dataBase/models/Token.model");
const Comment = require("../dataBase/models/Comment.model");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

const notFound = (req, _res, next) => {
  next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

//проверка токена
const requireToken = async (req, _res, next) => {
  if (!req.header("x-access-token"))
    throw new ErrorResponse("Token not found", 400);
  const token = await Token.findOne({
    where: {
      value: req.header("x-access-token"),
    },
  });
  if (!token) throw new ErrorResponse("Invalid token", 403);
  // передача объекта токена в request
  req.token = token;
  next();
};

const checkUser = async (req, res, next) => {
  let comment = await Comment.findByPk(req.params.id);
  if (!comment) throw new ErrorResponse("Comment not found", 404);
  let todo = await ToDo.findByPk(comment.todoId);
  if (!todo) throw new ErrorResponse("ToDo not found", 404);
  if (todo.userId !== req.token.userId) throw new ErrorResponse("Wrong ToDo", 400);
  req.todoId = todo.userId;
  req.comment = comment;
  next();
}

const errorHandler = (err, _req, res, _next) => {
  console.log("Ошибка", {
    message: err.message,
    stack: err.stack,
  });
  res.status(err.code || 500).json({
    message: err.message,
  });
};

module.exports = {
  asyncHandler,
  syncHandler,
  notFound,
  errorHandler,
  requireToken,
  checkUser,
};
