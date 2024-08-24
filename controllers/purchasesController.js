const Purchase = require("../models/Purchase");
const Inventory = require("../models/Inventory");

//function to create purchase
const purchaseCreate = async (req, res) => {
  const buyerId = req.user._id;
  const data = { ...req.body, buyerId };
  try {
    const newPurchase = await Purchase.create(data);
    res.json(newPurchase);
  } catch (error) {
    console.error("error in createPurchase", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//function to fetch all purchase data entries by specific buyerId
const purchaseIndexByBuyerId = async (req, res) => {
  const { buyerId } = req.params;
  try {
    // Find all purchase items that have the specified buyerId
    const purchaseItems = await Purchase.find({
      buyerId: buyerId,
      isPaid: false,
    }).exec();

    if (purchaseItems.length > 0) {
      res.json(purchaseItems);
    } else {
      res.json({ message: "No items found" });
    }
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).send("Server error");
  }
};

//function to delete existing purchase item
const purchaseDelete = async (req, res) => {
  const { purchaseId } = req.params;

  try {
    const deletedItem = await Purchase.findByIdAndDelete(purchaseId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Purchase item not found" });
    }

    return res
      .status(200)
      .json({ message: "Purchase item deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting purchase item", error });
  }
};

//function to update entries to isPaid = true
const purchaseUpdatePaid = async (req, res) => {
  const { buyerId } = req.params;
  try {
    const purchases = await Purchase.find({ buyerId: buyerId, isPaid: false });

    // Iterate through each purchase
    for (let purchase of purchases) {
      //check quantity against existing inventory quantity
      const inventory = await Inventory.findById(purchase.inventoryId);
      if (inventory) {
        if (inventory.sold + purchase.quantity > inventory.quantity) {
          return res
            .status(400)
            .json({ message: "purchase quantity exceeds current inventory" });
        }
      }
      purchase.isPaid = true;
      await purchase.save();
    }

    res.status(200).json({
      message: `Updated unpaid purchases to isPaid: true`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating purchases", error });
  }
};

//function to fetch all purchase data entries by specific sellerId
const purchaseIndexBySellerId = async (req, res) => {
  const { sellerId } = req.params;
  try {
    // Find all purchase items that have the specified sellerId
    const purchaseItems = await Purchase.find({
      sellerId: sellerId,
      isPaid: true,
      isFulfilled: false,
    }).exec();

    if (purchaseItems.length > 0) {
      res.json(purchaseItems);
    } else {
      res.json({ message: "No items found" });
    }
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).send("Server error");
  }
};

const purchaseUpdateFulfilled = async (req, res) => {
  const { purchaseId } = req.params;
  try {
    const purchase = await Purchase.findOne({ _id: purchaseId });
    purchase.isFulfilled = true;
    await purchase.save();
    res.status(200).json({
      message: `Updated unfulfilled purchase to isFulfilled: true`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating purchases", error });
  }
};

const purchaseIndexByBuyerIdForHistoryList = async (req, res) => {
  const { buyerId } = req.params;
  try {
    // Find all purchase items that have the specified buyerId and isPaid:true
    const purchaseItems = await Purchase.find({
      buyerId: buyerId,
      isPaid: true,
    }).exec();

    if (purchaseItems.length > 0) {
      res.json(purchaseItems);
    } else {
      res.json({ message: "No items found" });
    }
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  purchaseCreate,
  purchaseIndexByBuyerId,
  purchaseDelete,
  purchaseUpdatePaid,
  purchaseIndexBySellerId,
  purchaseUpdateFulfilled,
  purchaseIndexByBuyerIdForHistoryList,
};
