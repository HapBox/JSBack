const { Router } = require("express");
const { nanoid } = require("nanoid");
const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");
const MailToken = require("../dataBase/models/MailToken.model");
const { Op } = require("sequelize");
const { asyncHandler } = require("../middlewares/middlewares");
const mailTransporter = require("../classes/nodemailer");

const router = new Router();

function initRoutes() {
  router.post("/registration", asyncHandler(registration));
  router.post("/login", asyncHandler(login));
  router.post("/resetpass", asyncHandler(resetPass));
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
    accessToken: token.value,
  });
}

async function resetPass(req, res, next) {
  let data = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!data) throw new ErrorResponse("User not found", 404);
  const token = await MailToken.create({
    userId: data.id,
    value: nanoid(128),
  });
  // let to = req.body.mail + ", " + req.body.mail;
  let text = "Your link to reset password: localhost:3001/user/" + token.value;
  await mailTransporter.sendMail({
    from: '"System ToDo" <matyashtodojs@gmail.com>',
    to: req.body.email,
    subject: "Reset your password",
    text: text,
    html: text,
  });
  res.status(200).json({ message: "Check your mail" });
}

initRoutes();

module.exports = router;
