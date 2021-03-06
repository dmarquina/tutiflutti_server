const express = require("express");
const bodyParser = require('body-parser');
const userRouter = require('./routes/user_router');

const { 
  logErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorsHandlers');

// app
const app = express();

// middlewares
app.use(bodyParser.json());

// routes
app.use("/user", userRouter);

// redirect
app.get('/', function (req, res) {
  res.redirect('/user');
});

// error handlers
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// server
const server = app.listen(8000, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
});