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
const purchasesRouter = require("./routes/purchasesRouter");
const inventoryRouter = require("./routes/inventoryRouter");

app.use(
  cors({
    origin: "https://fruits-frontend.vercel.app", //handle request from correct frontend url
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.use(require("./config/checkToken"));
app.use("/api/users", usersRouter);
app.use("/api/purchases", purchasesRouter);
app.use("/api/inventory", inventoryRouter);

//catch all function
app.get("/*", (req, res) => {
  res.redirect("https://fruits-frontend.vercel.app");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
