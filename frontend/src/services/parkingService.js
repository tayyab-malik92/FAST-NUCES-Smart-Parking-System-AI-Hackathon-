import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get } from "firebase/database";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ===== ZONE CONFIGURATION =====
const ZONES = {
  basementA: { id: "basementA", name: "Basement A", totalSpots: 100, occupiedSpots: 40, icon: "🅰️" },
  basementB: { id: "basementB", name: "Basement B", totalSpots: 80, occupiedSpots: 20, icon: "🅱️" },
  groundParking: { id: "groundParking", name: "Ground Parking", totalSpots: 150, occupiedSpots: 90, icon: "🚗" },
  bikeParking: { id: "bikeParking", name: "Bike Parking", totalSpots: 200, occupiedSpots: 50, icon: "🏍️" },
};

// ===== SUBSCRIBE TO LIVE DATA =====
export function subscribeToZones(callback, onError) {
  const zonesRef = ref(db, "parkingZones");

  // First: check if data exists, if not seed it
  get(zonesRef)
    .then((snapshot) => {
      if (!snapshot.exists()) {
        console.log("No data found, seeding database...");
        return set(zonesRef, ZONES);
      }
      // Check if data is incomplete (missing totalSpots)
      const data = snapshot.val();
      const firstZone = Object.values(data)[0];
      if (!firstZone.totalSpots) {
        console.log("Incomplete data, re-seeding...");
        return set(zonesRef, ZONES);
      }
    })
    .catch((err) => {
      console.error("Seed error:", err);
      if (onError) onError(err.message);
    });

  // Listen for real-time changes
  const unsubscribe = onValue(
    zonesRef,
    (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        // No data yet, use defaults
        callback(buildZonesArray(ZONES));
        return;
      }
      callback(buildZonesArray(data));
    },
    (err) => {
      console.error("Listen error:", err);
      if (onError) onError(err.message);
      callback(buildZonesArray(ZONES));
    }
  );

  return unsubscribe;
}

// Build a clean zones array from raw data
function buildZonesArray(data) {
  return Object.entries(data).map(([key, zone]) => {
    const config = ZONES[key] || {};
    const total = Number(zone.totalSpots) || Number(config.totalSpots) || 0;
    const occupied = Number(zone.occupiedSpots) || 0;
    const available = total - occupied;
    const percentage = total > 0 ? Math.round((occupied / total) * 100) : 0;

    return {
      id: zone.id || key,
      name: zone.name || config.name || key,
      icon: zone.icon || config.icon || "🅿️",
      totalSpots: total,
      occupiedSpots: occupied,
      availableSpots: available,
      occupancyPercentage: percentage,
    };
  });
}

// ===== ADMIN ACTIONS =====

// Car enters (+1)
export async function addCar(zoneId, currentOccupied, totalSpots) {
  const occupied = Number(currentOccupied) || 0;
  const max = Number(totalSpots) || ZONES[zoneId]?.totalSpots || 999;
  const next = occupied + 1;

  if (next > max) {
    throw new Error("Zone is already full!");
  }

  await set(ref(db, `parkingZones/${zoneId}/occupiedSpots`), next);
}

// Car leaves (-1)
export async function removeCar(zoneId, currentOccupied) {
  const occupied = Number(currentOccupied) || 0;
  const next = occupied - 1;

  if (next < 0) {
    throw new Error("Zone is already empty!");
  }

  await set(ref(db, `parkingZones/${zoneId}/occupiedSpots`), next);
}

// Set to specific value
export async function setOccupied(zoneId, value) {
  const max = ZONES[zoneId]?.totalSpots || 999;
  const safe = Math.min(Math.max(Number(value) || 0, 0), max);
  await set(ref(db, `parkingZones/${zoneId}/occupiedSpots`), safe);
}
