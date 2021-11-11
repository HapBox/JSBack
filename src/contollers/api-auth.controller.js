const { Router } = require("express");
const { nanoid } = require("nanoid");
const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");
const { Op } = require("sequelize");
const { asyncHandler } = require("../middlewares/middlewares");

const router = new Router();

function initRoutes() {
  router.post("/registration", asyncHandler(registration));
  router.post("/login", asyncHandler(login));
}

//функция регистрации пользователя
async function registration(req, res, next) {
  const user = await User.findOne({
    where: {
      [Op.or]: {
        login: req.body.login,
        email: req.body.email,
      },
    },
  });
  if (user) throw new ErrorResponse("Login or email already in system", 400);
  const data = await User.create(req.body);
  res.status(200).json(data);
}

//функция авторизации пользователя
async function login(req, res, next) {
  const user = await User.findOne({
    where: {
      login: req.body.login,
      password: req.body.password,
    },
  });
  if (!user) throw new ErrorResponse("Wrong login or password", 400);
  //создание токена
  const token = await Token.create({
    userId: user.id,
    value: nanoid(128),
  });
  res.status(200).json({
    accessToken: token,
  });
}

initRoutes();

module.exports = router;
