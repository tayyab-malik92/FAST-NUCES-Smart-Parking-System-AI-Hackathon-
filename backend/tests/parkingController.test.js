const { resetStore } = require("./__mocks__/firebase");

// Mock the firebase config module
jest.mock("../src/config/firebase", () => require("./__mocks__/firebase"));

const request = require("supertest");
const app = require("../src/index");

describe("Parking Controller", () => {
  beforeEach(() => {
    resetStore();
  });

  describe("GET /api/parking/zones", () => {
    it("should return all parking zones", async () => {
      const res = await request(app).get("/api/parking/zones");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(4);
    });

    it("should include calculated fields for each zone", async () => {
      const res = await request(app).get("/api/parking/zones");

      const zone = res.body.data.find((z) => z.id === "basementA");
      expect(zone.availableSpots).toBe(120 - 78);
      expect(zone.occupancyPercentage).toBe(Math.round((78 / 120) * 100));
    });

    it("should return zones with correct structure", async () => {
      const res = await request(app).get("/api/parking/zones");

      const zone = res.body.data[0];
      expect(zone).toHaveProperty("id");
      expect(zone).toHaveProperty("name");
      expect(zone).toHaveProperty("totalSpots");
      expect(zone).toHaveProperty("occupiedSpots");
      expect(zone).toHaveProperty("availableSpots");
      expect(zone).toHaveProperty("occupancyPercentage");
      expect(zone).toHaveProperty("icon");
    });
  });

  describe("PUT /api/parking/zones/:zoneId", () => {
    it("should update zone occupancy", async () => {
      const res = await request(app)
        .put("/api/parking/zones/basementA")
        .send({ occupiedSpots: 50 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.occupiedSpots).toBe(50);
      expect(res.body.data.availableSpots).toBe(70);
    });

    it("should return 404 for non-existent zone", async () => {
      const res = await request(app)
        .put("/api/parking/zones/nonExistent")
        .send({ occupiedSpots: 10 });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Zone not found");
    });

    it("should reject negative occupied spots", async () => {
      const res = await request(app)
        .put("/api/parking/zones/basementA")
        .send({ occupiedSpots: -5 });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should reject occupied spots exceeding total", async () => {
      const res = await request(app)
        .put("/api/parking/zones/basementA")
        .send({ occupiedSpots: 999 });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("between 0 and 120");
    });

    it("should accept zero occupied spots", async () => {
      const res = await request(app)
        .put("/api/parking/zones/groundParking")
        .send({ occupiedSpots: 0 });

      expect(res.status).toBe(200);
      expect(res.body.data.occupiedSpots).toBe(0);
      expect(res.body.data.availableSpots).toBe(80);
      expect(res.body.data.occupancyPercentage).toBe(0);
    });

    it("should accept max occupied spots", async () => {
      const res = await request(app)
        .put("/api/parking/zones/basementB")
        .send({ occupiedSpots: 100 });

      expect(res.status).toBe(200);
      expect(res.body.data.occupiedSpots).toBe(100);
      expect(res.body.data.occupancyPercentage).toBe(100);
    });
  });

  describe("POST /api/parking/zones/initialize", () => {
    it("should reset all zones to defaults", async () => {
      const res = await request(app).post("/api/parking/zones/initialize");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Zones initialized");
      expect(res.body.data).toHaveProperty("basementA");
      expect(res.body.data).toHaveProperty("basementB");
      expect(res.body.data).toHaveProperty("groundParking");
      expect(res.body.data).toHaveProperty("bikeParking");
    });
  });

  describe("GET /api/health", () => {
    it("should return health status", async () => {
      const res = await request(app).get("/api/health");

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
      expect(res.body.message).toBe("Smart Parking API is running");
    });
  });
});
