const Inventory = require("../models/Inventory");

const USERID = "66c4d08f9b400680a4144e94"; //(shop) to be changed later on

//function to create inventory
const createInventory = async (req, res) => {
  const userId = req.user._id;
  const data = { ...req.body, userId };
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
  const userId = req.user._id;
  try {
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

//function to update existing inventory item
const inventoryUpdate = async (req, res) => {
  const { inventoryId } = req.params;
  const data = req.body;
  try {
    // Find the inventory item with inventoryId
    const prevInventoryItem = await Inventory.findById(inventoryId);

    if (!prevInventoryItem) {
      return res.status(404).json({ error: "Inventory item not found" });
    }
    Object.assign(prevInventoryItem, data);
    const updatedInventoryItem = await prevInventoryItem.save();
    res.json(updatedInventoryItem);
  } catch (error) {
    console.error("Error in inventoryUpdate", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createInventory,
  inventoryIndexByUserId,
  inventoryUpdate,
};
