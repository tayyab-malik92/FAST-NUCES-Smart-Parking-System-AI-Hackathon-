// Mock Firebase database
const mockData = {
  parkingZones: {
    basementA: {
      id: "basementA",
      name: "Basement A",
      totalSpots: 120,
      occupiedSpots: 78,
      icon: "🅰️",
    },
    basementB: {
      id: "basementB",
      name: "Basement B",
      totalSpots: 100,
      occupiedSpots: 95,
      icon: "🅱️",
    },
    groundParking: {
      id: "groundParking",
      name: "Ground Parking",
      totalSpots: 80,
      occupiedSpots: 45,
      icon: "🚗",
    },
    bikeParking: {
      id: "bikeParking",
      name: "Bike Parking",
      totalSpots: 200,
      occupiedSpots: 120,
      icon: "🏍️",
    },
  },
};

let store = JSON.parse(JSON.stringify(mockData));

const mockRef = (path) => {
  const keys = path.split("/");
  return { path, keys };
};

const mockOnce = (refObj) => {
  let value = store;
  for (const key of refObj.keys) {
    value = value ? value[key] : null;
  }
  return Promise.resolve({ val: () => value });
};

const mockUpdate = (refObj, data) => {
  let target = store;
  const keys = refObj.keys;
  for (let i = 0; i < keys.length - 1; i++) {
    target = target[keys[i]];
  }
  Object.assign(target[keys[keys.length - 1]], data);
  return Promise.resolve();
};

const mockSet = (refObj, data) => {
  let target = store;
  const keys = refObj.keys;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!target[keys[i]]) target[keys[i]] = {};
    target = target[keys[i]];
  }
  target[keys[keys.length - 1]] = data;
  return Promise.resolve();
};

const db = {
  ref: (path) => {
    const refObj = mockRef(path);
    return {
      once: () => mockOnce(refObj),
      update: (data) => mockUpdate(refObj, data),
      set: (data) => mockSet(refObj, data),
    };
  },
};

const resetStore = () => {
  store = JSON.parse(JSON.stringify(mockData));
};

module.exports = { db, resetStore, mockData };
