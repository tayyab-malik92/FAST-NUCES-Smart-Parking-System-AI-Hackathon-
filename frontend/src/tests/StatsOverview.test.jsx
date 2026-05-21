import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatsOverview from "../components/StatsOverview";

const mockZones = [
  {
    id: "basementA",
    name: "Basement A",
    totalSpots: 120,
    occupiedSpots: 78,
    availableSpots: 42,
    occupancyPercentage: 65,
  },
  {
    id: "basementB",
    name: "Basement B",
    totalSpots: 100,
    occupiedSpots: 90,
    availableSpots: 10,
    occupancyPercentage: 90,
  },
  {
    id: "groundParking",
    name: "Ground Parking",
    totalSpots: 80,
    occupiedSpots: 40,
    availableSpots: 40,
    occupancyPercentage: 50,
  },
  {
    id: "bikeParking",
    name: "Bike Parking",
    totalSpots: 200,
    occupiedSpots: 100,
    availableSpots: 100,
    occupancyPercentage: 50,
  },
];

describe("StatsOverview", () => {
  it("should display total spots across all zones", () => {
    render(<StatsOverview zones={mockZones} />);
    // 120 + 100 + 80 + 200 = 500
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("should display total occupied spots", () => {
    render(<StatsOverview zones={mockZones} />);
    // 78 + 90 + 40 + 100 = 308
    expect(screen.getByText("308")).toBeInTheDocument();
  });

  it("should display total available spots", () => {
    render(<StatsOverview zones={mockZones} />);
    // 500 - 308 = 192
    expect(screen.getByText("192")).toBeInTheDocument();
  });

  it("should display overall occupancy percentage", () => {
    render(<StatsOverview zones={mockZones} />);
    // Math.round(308/500 * 100) = 62%
    expect(screen.getByText("62%")).toBeInTheDocument();
  });

  it("should display stat labels", () => {
    render(<StatsOverview zones={mockZones} />);
    expect(screen.getByText("Total Spots")).toBeInTheDocument();
    expect(screen.getByText("Occupied")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("Occupancy")).toBeInTheDocument();
  });

  it("should handle empty zones array", () => {
    render(<StatsOverview zones={[]} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });
});
