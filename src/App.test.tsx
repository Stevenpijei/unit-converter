import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render app with initial states", () => {
    render(<App />);

    expect(screen.getByText(/imperial/i)).toBeInTheDocument();
    expect(screen.getByText(/lbs/i)).toBeInTheDocument();
    expect(screen.getByText(/ft/i)).toBeInTheDocument();
  });

  it("should recalculate if unit changes", async () => {
    render(<App />);

    const selectUnit = screen.getByRole("combobox", {
      name: "Units",
    }) as HTMLSelectElement;
    const weightInput = screen.getByRole("spinbutton", {
      name: "Weight",
    }) as HTMLInputElement;
    const heightInput = screen.getByRole("spinbutton", {
      name: "Height",
    }) as HTMLInputElement;

    // initial value weight = 5lbs, height = 4ft
    fireEvent.change(weightInput, { target: { value: "5" } });
    expect(weightInput.value).toBe("5");
    fireEvent.change(heightInput, { target: { value: "4" } });
    expect(heightInput.value).toBe("4");

    // render 48.00 inches correctly
    expect(screen.getByText(/48.00 inches/i)).toBeInTheDocument();

    // imperial to metric
    fireEvent.change(selectUnit, { target: { value: "metric" } });
    expect(selectUnit.value).toBe("metric");

    // correctly change the unit. (kg, m)
    expect(screen.getByText("kg")).toBeInTheDocument();
    expect(screen.getByText("m")).toBeInTheDocument();

    expect(weightInput.value).toBe("2.27");
    expect(heightInput.value).toBe("1.22");

    // metric to imperial
    fireEvent.change(selectUnit, { target: { value: "imperial" } });
    expect(selectUnit.value).toBe("imperial");

    // correctly change the unit. (lbs, ft)
    expect(screen.getByText("lbs")).toBeInTheDocument();
    expect(screen.getByText("ft")).toBeInTheDocument();

    expect(weightInput.value).toBe("5");
    expect(heightInput.value).toBe("4");
  });
});
