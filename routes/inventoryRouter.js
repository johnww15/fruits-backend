const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.post("/", inventoryController.createInventory);
router.get("/", inventoryController.inventoryIndexByUserId);
router.put("/:inventoryId", inventoryController.inventoryUpdate);

module.exports = router;
