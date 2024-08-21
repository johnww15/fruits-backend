const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.post("/", inventoryController.createInventory);
router.get("/", inventoryController.fullInventoryIndex);
router.get("/:userId", inventoryController.inventoryIndexByUserId);
router.put("/:inventoryId", inventoryController.inventoryUpdate);
router.delete("/:inventoryId", inventoryController.inventoryDelete);

module.exports = router;
