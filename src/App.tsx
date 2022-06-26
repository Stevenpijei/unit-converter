import React, { useReducer } from "react";

import {
  MAP_UNIT_HEIGHT_LABEL,
  MAP_UNIT_WEIGHT_LABEL,
  SELECT_OPTIONS,
} from "./lib/constants";
import { AppActionKind, appReducer, INITIAL_STATE } from "./store";
import { Unit } from "./lib/types";
import { convertFtToInch, convertUnits } from "./lib/helper";
import "./App.css";

const App: React.FC = () => {
  const [{ weight, height, unit }, dispatch] = useReducer<typeof appReducer>(
    appReducer,
    INITIAL_STATE
  );

  const handleSaveClick = () => {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify({ weight, height, unit })], {
      type: "text/plain",
    });
    a.href = URL.createObjectURL(file);
    a.download = `unit.json`;
    a.click();
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    dispatch({
      type: AppActionKind.UPDATE_WEIGHT,
      payload: parseFloat(value),
    });
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    dispatch({
      type: AppActionKind.UPDATE_HEIGHT,
      payload: parseFloat(value),
    });
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;

    // call action if unit is changed
    if (value !== unit) {
      dispatch({
        type: AppActionKind.UPDATE_UNIT,
        payload: value as Unit,
      });

      const newValues = convertUnits[unit](weight, height);
      dispatch({
        type: AppActionKind.UPDATE_WEIGHT,
        payload: newValues.weight,
      });
      dispatch({
        type: AppActionKind.UPDATE_HEIGHT,
        payload: newValues.height,
      });
    }
  };

  return (
    <div className="App">
      <div className="App__select-unit">
        <label htmlFor="select-units">Units</label>
        <select id="select-units" value={unit} onChange={handleUnitChange}>
          {SELECT_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="App__input-weight">
        <label htmlFor="input-weight">Weight</label>
        <input
          id="input-weight"
          type="number"
          value={weight}
          onChange={handleWeightChange}
        />
        <span>{MAP_UNIT_WEIGHT_LABEL[unit]}</span>
      </div>
      <div className="App__input-height">
        <label htmlFor="input-height">Height</label>
        <input
          id="input-height"
          type="number"
          value={height}
          onChange={handleHeightChange}
        />
        <span>{MAP_UNIT_HEIGHT_LABEL[unit]}</span>
        {unit === "imperial" && (
          <span>&nbsp;, {convertFtToInch(height).toFixed(2)} inches</span>
        )}
      </div>
      <div>
        <button type="button" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default App;
