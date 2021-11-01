const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = new Router();

function initRoutes() {
  router.get("/:id", asyncHandler(requireToken), asyncHandler(getUser));
  router.patch("/:id", asyncHandler(requireToken), asyncHandler(updateUser));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(exitUser));
}

async function getUser(req, res, next) {
  let token = await Token.findByPK({
    where: {
      value: req.body.token
    }
  });
  let user = await User.findOne(token.userID);
  res.status(200).json(user);
}

async function updateUser(req, res, next) {
  let token = await Token.findOne({
    where: {
      value: req.body.token
    }
  });
  await User.update(req.body, {
    where: {
      id: token.userID,
    },
  });
  let updated = await User.findByPk(token.value);
  res.status(200).json(updated);
}

async function exitUser(req, res, next) {
  await Token.destroy({
    where: {
      value: req.body.token
    }
  });
  res.status(200).json({message: "See you soon!"})
}

initRoutes();

module.exports = router;
