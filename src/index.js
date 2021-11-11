const { initDB } = require("./dataBase/index");
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const todoRouter = require("./contollers/api-todos.controller");
const authRouter = require("./contollers/api-auth.controller");
const userRouter = require("./contollers/api-users.controller");
const { notFound, errorHandler } = require("./middlewares/middlewares");

initDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.use("/todo", todoRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use(notFound);
app.use(errorHandler);

http.createServer(app).listen(3001, () => {
  console.log("Server is working on port 3001");
});
