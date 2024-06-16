const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/config/database");
const routes = require("./src/routes");
require("./src/utils/firebase");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
}

module.exports = app;
