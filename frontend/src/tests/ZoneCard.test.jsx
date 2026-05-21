import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ZoneCard from "../components/ZoneCard";

const mockZone = {
  id: "basementA",
  name: "Basement A",
  totalSpots: 120,
  occupiedSpots: 78,
  availableSpots: 42,
  occupancyPercentage: 65,
  icon: "🅰️",
};

describe("ZoneCard", () => {
  it("should render zone name", () => {
    render(<ZoneCard zone={mockZone} index={0} />);
    expect(screen.getByText("Basement A")).toBeInTheDocument();
  });

  it("should render zone icon", () => {
    render(<ZoneCard zone={mockZone} index={0} />);
    expect(screen.getByText("🅰️")).toBeInTheDocument();
  });

  it("should display total spots", () => {
    render(<ZoneCard zone={mockZone} index={0} />);
    expect(screen.getByText("120")).toBeInTheDocument();
  });

  it("should display occupied spots", () => {
    render(<ZoneCard zone={mockZone} index={0} />);
    expect(screen.getByText("78")).toBeInTheDocument();
  });

  it("should display available spots", () => {
    render(<ZoneCard zone={mockZone} index={0} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("should display occupancy percentage", () => {
    render(<ZoneCard zone={mockZone} index={0} />);
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  it("should show Available status for low occupancy", () => {
    render(<ZoneCard zone={mockZone} index={0} />);
    const statusElements = screen.getAllByText("Available");
    // One is the status badge, one is the stats label
    expect(statusElements.length).toBeGreaterThanOrEqual(1);
    // Check the status badge specifically (has the green color class)
    const statusBadge = statusElements.find(
      (el) => el.className.includes("text-green-400") && el.tagName === "SPAN"
    );
    expect(statusBadge).toBeInTheDocument();
  });

  it("should show Nearly Full for high occupancy", () => {
    const highZone = { ...mockZone, occupiedSpots: 96, totalSpots: 120 };
    render(<ZoneCard zone={highZone} index={0} />);
    expect(screen.getByText("Nearly Full")).toBeInTheDocument();
  });

  it("should show Full for very high occupancy", () => {
    const fullZone = { ...mockZone, occupiedSpots: 114, totalSpots: 120 };
    render(<ZoneCard zone={fullZone} index={0} />);
    expect(screen.getByText("Full")).toBeInTheDocument();
  });
});
