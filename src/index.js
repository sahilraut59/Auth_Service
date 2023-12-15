const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");

const apiRoutes = require("./routes/index");

const UserService = require("./services/user-service");
const db = require("./models/index");

const app = express();

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);
  app.listen(PORT, async () => {
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
    console.log(`Server Started on port ${PORT}`);
  });
};
prepareAndStartServer();
