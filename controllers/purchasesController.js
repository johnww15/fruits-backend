const Purchase = require("../models/Purchase");

//function to create purchase
const purchaseCreate = async (req, res) => {
  const userId = req.user._id;
  const data = { ...req.body, userId };
  try {
    const newPurchase = await Purchase.create(data);
    res.json(newPurchase);
  } catch (error) {
    console.error("error in createPurchase", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//function to fetch all purchase data entries by specific userId
//need to filter out paid entries later on
const purchaseIndexByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    // Find all purchase items that have the specified userId
    const purchaseItems = await Purchase.find({ userId: userId }).exec();

    if (purchaseItems.length > 0) {
      res.json(purchaseItems);
    } else {
      res.status(404).send("No Purchase items found for this user");
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

module.exports = {
  purchaseCreate,
  purchaseIndexByUserId,
  purchaseDelete,
};
