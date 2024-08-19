const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//catch all function
app.get("/*", function (req, res) {
  res.send("Server is running correctly!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
