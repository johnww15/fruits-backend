const Purchase = require("../models/Purchase");

const USERID = "66c461aeb37f6ebeeddd3bbf"; //to be changed later on

//function to create purchase
const createPurchase = async (req, res) => {
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

module.exports = {
  createPurchase,
};
