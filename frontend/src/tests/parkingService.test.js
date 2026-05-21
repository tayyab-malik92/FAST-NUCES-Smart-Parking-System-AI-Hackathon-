import { describe, it, expect, vi } from "vitest";
import { getStatusColor } from "../services/parkingService";

// Mock firebase module
vi.mock("../services/firebase", () => ({
  database: {},
  ref: vi.fn(),
  onValue: vi.fn(),
  set: vi.fn(),
  get: vi.fn(),
}));

describe("parkingService - getStatusColor", () => {
  it("should return red for 90% and above", () => {
    const result = getStatusColor(90);
    expect(result.color).toBe("red");
    expect(result.label).toBe("Full");
  });

  it("should return red for 100%", () => {
    const result = getStatusColor(100);
    expect(result.color).toBe("red");
  });

  it("should return yellow for 70-89%", () => {
    const result = getStatusColor(70);
    expect(result.color).toBe("yellow");
    expect(result.label).toBe("Nearly Full");
  });

  it("should return yellow for 89%", () => {
    const result = getStatusColor(89);
    expect(result.color).toBe("yellow");
  });

  it("should return green for below 70%", () => {
    const result = getStatusColor(50);
    expect(result.color).toBe("green");
    expect(result.label).toBe("Available");
  });

  it("should return green for 0%", () => {
    const result = getStatusColor(0);
    expect(result.color).toBe("green");
  });

  it("should return green for 69%", () => {
    const result = getStatusColor(69);
    expect(result.color).toBe("green");
  });

  it("should handle NaN input gracefully", () => {
    const result = getStatusColor(undefined);
    expect(result.color).toBe("green");
    expect(result.label).toBe("Available");
  });

  it("should handle string input", () => {
    const result = getStatusColor("85");
    expect(result.color).toBe("yellow");
  });
});
