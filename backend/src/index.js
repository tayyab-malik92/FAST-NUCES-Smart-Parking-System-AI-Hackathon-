const express = require("express");
const cors = require("cors");
require("dotenv").config();

const parkingRoutes = require("./routes/parkingRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Production CORS allocation policy rules
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Main App API Routes
app.use("/api/parking", parkingRoutes);

// Deployment environment server status diagnostic endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "FAST Smart Parking Server active and healthy." });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🅿️  Production Smart Parking Core running on allocation port ${PORT}`);
  });
}

module.exports = app;
