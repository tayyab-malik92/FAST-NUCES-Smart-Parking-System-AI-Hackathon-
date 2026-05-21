const { db } = require("../config/firebase");

const ZONES_REF = "parkingZones";

// Default zone data for initialization
const defaultZones = {
  basementA: {
    id: "basementA",
    name: "Basement A",
    totalSpots: 120,
    occupiedSpots: 0,
    icon: "🅰️",
  },
  basementB: {
    id: "basementB",
    name: "Basement B",
    totalSpots: 100,
    occupiedSpots: 0,
    icon: "🅱️",
  },
  groundParking: {
    id: "groundParking",
    name: "Ground Parking",
    totalSpots: 80,
    occupiedSpots: 0,
    icon: "🚗",
  },
  bikeParking: {
    id: "bikeParking",
    name: "Bike Parking",
    totalSpots: 200,
    occupiedSpots: 0,
    icon: "🏍️",
  },
};

// Get all parking zones
const getAllZones = async (req, res) => {
  try {
    const snapshot = await db.ref(ZONES_REF).once("value");
    let zones = snapshot.val();

    if (!zones) {
      await db.ref(ZONES_REF).set(defaultZones);
      zones = defaultZones;
    }

    const zonesArray = Object.values(zones).map((zone) => ({
      ...zone,
      availableSpots: zone.totalSpots - zone.occupiedSpots,
      occupancyPercentage: Math.round(
        (zone.occupiedSpots / zone.totalSpots) * 100
      ),
    }));

    res.json({ success: true, data: zonesArray });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update zone occupancy
const updateZone = async (req, res) => {
  try {
    const { zoneId } = req.params;
    const { occupiedSpots } = req.body;

    const zoneRef = db.ref(`${ZONES_REF}/${zoneId}`);
    const snapshot = await zoneRef.once("value");
    const zone = snapshot.val();

    if (!zone) {
      return res.status(404).json({ success: false, message: "Zone not found" });
    }

    if (occupiedSpots < 0 || occupiedSpots > zone.totalSpots) {
      return res.status(400).json({
        success: false,
        message: `Occupied spots must be between 0 and ${zone.totalSpots}`,
      });
    }

    await zoneRef.update({ occupiedSpots: Number(occupiedSpots) });

    res.json({
      success: true,
      message: "Zone updated successfully",
      data: {
        ...zone,
        occupiedSpots: Number(occupiedSpots),
        availableSpots: zone.totalSpots - Number(occupiedSpots),
        occupancyPercentage: Math.round(
          (Number(occupiedSpots) / zone.totalSpots) * 100
        ),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Initialize/reset zones
const initializeZones = async (req, res) => {
  try {
    await db.ref(ZONES_REF).set(defaultZones);
    res.json({ success: true, message: "Zones initialized", data: defaultZones });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllZones, updateZone, initializeZones };
