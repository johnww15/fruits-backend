const Inventory = require("../models/Inventory");

const USERID = "66c4af595e4ab2ec01a4a2a6"; //(shop) to be changed later on

//function to create inventory
const createInventory = async (req, res) => {
  const data = req.body;
  console.log("createInventory running (data)", data);
  try {
    const newInventory = await Inventory.create(data);
    res.json(newInventory);
  } catch (error) {
    console.error("error in createInventory", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createInventory,
};
