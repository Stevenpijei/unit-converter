import { Unit, UnitOption } from "./types";

export const SELECT_OPTIONS: UnitOption[] = [
  {
    label: "Imperial",
    value: "imperial",
  },
  {
    label: "Metric",
    value: "metric",
  },
];

export const MAP_UNIT_WEIGHT_LABEL: { [key in Unit]: string } = {
  imperial: "lbs",
  metric: "kg",
};

export const MAP_UNIT_HEIGHT_LABEL: { [key in Unit]: string } = {
  imperial: "ft",
  metric: "m",
};
