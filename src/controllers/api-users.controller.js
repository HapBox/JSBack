const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const MailToken = require("../dataBase/models/MailToken.model");
const User = require("../dataBase/models/User.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = new Router();

function initRoutes() {
  router.get("/me", asyncHandler(requireToken), asyncHandler(getUser));
  router.patch("/me", asyncHandler(requireToken), asyncHandler(updateUser));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logoutUser));
  router.post("/:token", asyncHandler(resetPass));
}

//вывод информации о пользователе
async function getUser(req, res, next) {
  const user = await User.findByPk(req.token.userId);
  res.status(200).json(user);
}

//обновление данных пользователя
async function updateUser(req, res, next) {
  const data = await User.update(req.body, {
    where: {
      id: req.token.userId,
    },
    returning: true,
  });
  res.status(200).json(data);
}

//выход из аккаунта пользователя и уничтожение токена
async function logoutUser(req, res, next) {
  await req.token.destroy();
  res.status(200).json({ message: "See you soon!" });
}

async function resetPass(req, res, next) {
  const token = await MailToken.findOne({
    where: {
      value: req.params.token,
    },
  });
  if (!token) throw new ErrorResponse("Token not found", 404);
  const user = await User.findByPk(token.userId);
  user.update(req.body, {
    returning: true,
  });
  token.destroy();
  res.status(200).json("Password changed");
}

initRoutes();

module.exports = router;
