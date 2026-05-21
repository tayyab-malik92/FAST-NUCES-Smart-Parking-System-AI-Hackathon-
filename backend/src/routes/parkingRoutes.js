const express = require("express");
const router = express.Router();
const {
  getAllZones,
  updateZone,
  initializeZones,
} = require("../controllers/parkingController");

router.get("/zones", getAllZones);
router.put("/zones/:zoneId", updateZone);
router.post("/zones/initialize", initializeZones);

module.exports = router;
