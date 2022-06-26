// Action types

export type Unit = "imperial" | "metric";

interface Option<T> {
  label: string;
  value: T;
}

export type UnitOption = Option<Unit>;
