const { Router } = require("express");
const {
  asyncHandler,
  requireToken,
  checkUser,
} = require("../middlewares/middlewares");

const router = new Router();

function initRoutes() {
  router.patch(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(checkUser),
    asyncHandler(updateComment)
  );
  router.delete(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(checkUser),
    asyncHandler(deleteComment)
  );
}

async function updateComment(req, res, next) {
  let comment = req.comment;
  comment.update(req.body, {
    returning: true,
  });
  res.status(200).json(comment);
}

async function deleteComment(req, res, next) {
  await req.comment.destroy();
  res.status(200).json({ message: "comment deleted" });
}

initRoutes();

module.exports = router;
