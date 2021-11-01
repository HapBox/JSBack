const ErrorResponse = require("../classes/error-response");

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
  let token = await Token.findOne({
    where: {
      value: req.body.token,
    },
  });
  if (!token) throw new ErrorResponse("Invalid token", 403);
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
