import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { densityOptions } from "../constants";

import { useThemeState, useThemeUpdater } from "../context";

import "./styles.css";

function ThemeDensityRadioGroup() {
  const { density } = useThemeState();
  const { setDensity } = useThemeUpdater();

  return (
    <RadioGroup.Root
      className="c-radio-group | stack"
      value={density}
      onValueChange={setDensity}
      aria-label="select density"
    >
      {densityOptions.map((item) => {
        return (
          <div
            key={item.value}
            className="c-radio-group-item-wrapper | cluster"
          >
            <RadioGroup.Item
              className="c-radio-group-item"
              value={item.value}
              id={`density-radio-${item.value}`}
            >
              <RadioGroup.Indicator className="c-radio-group-item-indicator" />
            </RadioGroup.Item>
            <label
              className="c-radio-group-item-label"
              htmlFor={`density-radio-${item.value}`}
            >
              {item.label}
            </label>
          </div>
        );
      })}
    </RadioGroup.Root>
  );
}

export default ThemeDensityRadioGroup;
