const { Router } = require("express");
const User = require("../dataBase/models/User.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = new Router();

function initRoutes() {
  router.get("/me", asyncHandler(requireToken), asyncHandler(getUser));
  router.patch("/me", asyncHandler(requireToken), asyncHandler(updateUser));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logoutUser));
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

initRoutes();

module.exports = router;
