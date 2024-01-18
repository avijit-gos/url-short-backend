/** @format */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
require("./src/database/mongoDB");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 7000;

app.use("/api/user", require("./src/routes/user/userRoutes"));
app.use("/api/link", require("./src/routes/link/linkRoutes"));
app.use(async (req, res, next) => {
  next(createError.NotFound("Page not found"));
});
// Error message
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

module.exports = { app };
