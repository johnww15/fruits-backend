const express = require("express");
const router = express.Router();
const purchasesController = require("../controllers/purchasesController");

router.post("/", purchasesController.purchaseCreate);
router.get("/:buyerId", purchasesController.purchaseIndexByBuyerId);
router.delete("/:purchaseId", purchasesController.purchaseDelete);
router.put("/update/:buyerId", purchasesController.purchaseUpdatePaid);
router.get("/shop/:sellerId", purchasesController.purchaseIndexBySellerId);
router.put(
  "/update/shop/:purchaseId",
  purchasesController.purchaseUpdateFulfilled
);
router.get(
  "/history/:buyerId",
  purchasesController.purchaseIndexByBuyerIdForHistoryList
);
router.get(
  "/inventory/:inventoryId",
  purchasesController.purchaseIndexByInventoryId
);

module.exports = router;
