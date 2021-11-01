const { sequelize, Sequelize, initDB } = require("./dataBase/index");
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const todoRouter = require("./contollers/api-todos.controller");
const authRouter = require("./contollers/api-auth.controller")
const { notFound, errorHandler, asyncHandler } = require("./middlewares/middlewares");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

initDB();
app.use("/todo", todoRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  console.log("URL = ", req.url);
  console.log("Original_URL = ", req.originalUrl);
  console.log("METHOD = ", req.method);
  console.log("HOST = ", req.headers.host);
  console.log("IsSecure = ", req.secure);
  console.log("BODY", req.body);
  console.log("QUERY", req.query);

  next();
});

app.use(notFound);
app.use(errorHandler);

http.createServer(app).listen(3001, () => {
  console.log("Server is working on port 3001");
});
