const express = require("express");
const cors = require("cors");
const ConfigDB = require("./config/db");
const routes = require("./routes/index.route");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




app.use("/api", routes);




const start = async () => {
  try {
    await ConfigDB();
    app.listen(PORT, () => {
      console.log(`Server run on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server start error:", error);
    process.exit(1);
  }
};

start();
