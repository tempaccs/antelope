const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./users/api");
const app = express();

const { PORT, MONGO_DB_URL, MONGO_USER, MONGO_PW } = process.env;
const port = PORT || 3000;

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PW}@${MONGO_DB_URL}/`, {
  useNewUrlParser: true
});
mongoose.connection.on("error", () => console.error("connection error:"));
mongoose.connection.once("open", function() {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err);
  });

  app.use(express.json());

  app.use("/users", userRouter);

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
