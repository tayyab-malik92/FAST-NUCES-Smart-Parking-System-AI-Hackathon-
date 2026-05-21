import { describe, it, expect } from "vitest";
import { getStatusInfo, formatTime } from "../utils/helpers";

describe("getStatusInfo", () => {
  it("should return green/Available for percentage below 70", () => {
    const result = getStatusInfo(50);
    expect(result.label).toBe("Available");
    expect(result.color).toBe("text-green-400");
    expect(result.dot).toBe("bg-green-500");
  });

  it("should return green for 0%", () => {
    const result = getStatusInfo(0);
    expect(result.label).toBe("Available");
  });

  it("should return green for 69%", () => {
    const result = getStatusInfo(69);
    expect(result.label).toBe("Available");
  });

  it("should return yellow/Nearly Full for 70-89%", () => {
    const result = getStatusInfo(70);
    expect(result.label).toBe("Nearly Full");
    expect(result.color).toBe("text-yellow-400");
    expect(result.dot).toBe("bg-yellow-500");
  });

  it("should return yellow for 89%", () => {
    const result = getStatusInfo(89);
    expect(result.label).toBe("Nearly Full");
  });

  it("should return red/Full for 90% and above", () => {
    const result = getStatusInfo(90);
    expect(result.label).toBe("Full");
    expect(result.color).toBe("text-red-400");
    expect(result.dot).toBe("bg-red-500");
  });

  it("should return red for 100%", () => {
    const result = getStatusInfo(100);
    expect(result.label).toBe("Full");
  });

  it("should include gradient property", () => {
    const green = getStatusInfo(30);
    const yellow = getStatusInfo(75);
    const red = getStatusInfo(95);

    expect(green.gradient).toContain("green");
    expect(yellow.gradient).toContain("yellow");
    expect(red.gradient).toContain("red");
  });

  it("should include border and ring properties", () => {
    const result = getStatusInfo(50);
    expect(result).toHaveProperty("border");
    expect(result).toHaveProperty("ring");
    expect(result).toHaveProperty("bg");
  });
});

describe("formatTime", () => {
  it("should return a formatted time string", () => {
    const time = formatTime();
    // Should match pattern like "02:30:45 PM"
    expect(time).toMatch(/\d{2}:\d{2}:\d{2}\s?(AM|PM)/);
  });
});
