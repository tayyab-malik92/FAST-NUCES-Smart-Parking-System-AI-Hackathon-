import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";

describe("Header", () => {
  it("should render the app title", () => {
    render(<Header activeTab="dashboard" setActiveTab={() => {}} />);
    expect(screen.getByText("Smart Parking System")).toBeInTheDocument();
  });

  it("should render university name", () => {
    render(<Header activeTab="dashboard" setActiveTab={() => {}} />);
    expect(
      screen.getByText("FAST University Lahore Campus")
    ).toBeInTheDocument();
  });

  it("should render Dashboard and Admin tabs", () => {
    render(<Header activeTab="dashboard" setActiveTab={() => {}} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("should call setActiveTab when Admin is clicked", () => {
    const setActiveTab = vi.fn();
    render(<Header activeTab="dashboard" setActiveTab={setActiveTab} />);

    fireEvent.click(screen.getByText("Admin"));
    expect(setActiveTab).toHaveBeenCalledWith("admin");
  });

  it("should call setActiveTab when Dashboard is clicked", () => {
    const setActiveTab = vi.fn();
    render(<Header activeTab="admin" setActiveTab={setActiveTab} />);

    fireEvent.click(screen.getByText("Dashboard"));
    expect(setActiveTab).toHaveBeenCalledWith("dashboard");
  });

  it("should display current time", () => {
    render(<Header activeTab="dashboard" setActiveTab={() => {}} />);
    // Time element should exist (format: HH:MM:SS AM/PM)
    const timeRegex = /\d{2}:\d{2}:\d{2}\s?(AM|PM)/;
    const allText = document.body.textContent;
    expect(allText).toMatch(timeRegex);
  });
});
