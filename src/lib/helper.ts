// imperial: weight(lbs), height: (ft, inch)
// metric: weight(kg), height: (m)

import { Unit } from "./types";

export const convertLbsToKg = (value: number) => value * 0.453592;
export const convertKgToLbs = (value: number) => value * 2.20462;
export const convertFtToInch = (value: number) => value * 12;
export const convertFtToM = (value: number) => value * 0.3048;
export const convertMtoFt = (value: number) => value * 3.28084;

type ConvertFunctionType = (
  weight: number,
  height: number
) => {
  weight: number;
  height: number;
};

export const convertImperialToMetric = (
  weight: number,
  height: number
): {
  weight: number;
  height: number;
} => ({
  weight: parseFloat(convertLbsToKg(weight).toFixed(2)),
  height: parseFloat(convertFtToM(height).toFixed(2)),
});

export const convertMetricToImperial = (
  weight: number,
  height: number
): {
  weight: number;
  height: number;
} => ({
  weight: parseFloat(convertKgToLbs(weight).toFixed(2)),
  height: parseFloat(convertMtoFt(height).toFixed(2)),
});

export const convertUnits: { [key in Unit]: ConvertFunctionType } = {
  imperial: convertImperialToMetric, // imperial -> metric
  metric: convertMetricToImperial, // metric -> imperial
};
