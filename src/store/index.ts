import { Unit } from "../lib/types";

export enum AppActionKind {
  UPDATE_WEIGHT = "UPDATE_WEIGHT",
  UPDATE_HEIGHT = "UPDATE_HEIGHT",
  UPDATE_UNIT = "UPDATE_UNIT",
}

export interface AppAction<T, R> {
  type: T;
  payload: R;
}

export type ActionUpdateWeight = AppAction<AppActionKind.UPDATE_WEIGHT, number>;
export type ActionUpdateHeight = AppAction<AppActionKind.UPDATE_HEIGHT, number>;
export type ActionUpdateUnit = AppAction<AppActionKind.UPDATE_UNIT, Unit>;

export type AppActions =
  | ActionUpdateWeight
  | ActionUpdateHeight
  | ActionUpdateUnit;

export interface AppState {
  weight: number;
  height: number;
  unit: Unit;
}

export const INITIAL_STATE: AppState = {
  weight: 0,
  height: 0,
  unit: "imperial",
};

export const appReducer = (state: AppState, action: AppActions): AppState => {
  const { type, payload } = action;
  switch (type) {
    case AppActionKind.UPDATE_HEIGHT:
      return {
        ...state,
        height: payload,
      };
    case AppActionKind.UPDATE_WEIGHT:
      return {
        ...state,
        weight: payload,
      };
    case AppActionKind.UPDATE_UNIT:
      return {
        ...state,
        unit: payload,
      };
    default:
      return state;
  }
};
