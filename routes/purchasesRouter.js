const express = require("express");
const router = express.Router();
const purchasesController = require("../controllers/purchasesController");

router.post("/", purchasesController.purchaseCreate);
router.get("/:userId", purchasesController.purchaseIndexByUserId);
router.delete("/:purchaseId", purchasesController.purchaseDelete);
router.put("/update/:userId", purchasesController.purchaseUpdatePaid);

module.exports = router;
