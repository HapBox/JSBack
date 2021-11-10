const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");

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

const requireToken = async (req, _res, next) => {
  const token = await Token.findOne({
    where: {
      value: req.header('x-access-token'),
    },
  });
  if (!token) throw new ErrorResponse("Invalid token", 403);
  req.token = token;
  next();
};

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
};
