const Inventory = require("../models/Inventory");

const USERID = "66c4d08f9b400680a4144e94"; //(shop) to be changed later on

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

//function to get inventory of a specific userId
const inventoryIndexByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    // Find all inventory items that have the specified userId
    const inventoryItems = await Inventory.find({ userId: userId }).exec();

    if (inventoryItems.length > 0) {
      res.json(inventoryItems);
    } else {
      res.status(404).send("No inventory items found for this user");
    }
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createInventory,
  inventoryIndexByUserId,
};
