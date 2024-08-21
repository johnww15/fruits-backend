const express = require("express");
const router = express.Router();
const purchasesController = require("../controllers/purchasesController");

router.post("/", purchasesController.createPurchase);
router.get("/:userId", purchasesController.purchaseIndexByUserId);

module.exports = router;
