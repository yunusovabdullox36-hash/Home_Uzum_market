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

app.use((req, res) => {
  res.status(404).json({ message: "Route topilmadi" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Serverda ichki xatolik yuz berdi",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

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
