const express = require("express");
const router = express.Router();
const purchasesController = require("../controllers/purchasesController");

router.post("/", purchasesController.purchaseCreate);
router.get("/:buyerId", purchasesController.purchaseIndexByBuyerId);
router.delete("/:purchaseId", purchasesController.purchaseDelete);
router.put("/update/:buyerId", purchasesController.purchaseUpdatePaid);

module.exports = router;
