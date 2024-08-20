const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 5001;
const path = require("path");

// routers
const usersRouter = require("./routes/usersRouter");

app.use(
  cors({
    origin: "http://localhost:5173", //handle request from correct frontend url
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/users", usersRouter);

//catch all function
app.get("/*", function (req, res) {
  res.send("Server is running correctly!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
