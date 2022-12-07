import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { borderRadiusOptions as options } from "../constants";

import { useThemeState, useThemeUpdater } from "../context";

import "./styles.css";

function ThemeDensityRadioGroup() {
  const { borderRadius: value } = useThemeState();
  const { setBorderRadius: onValueChange } = useThemeUpdater();

  return (
    <RadioGroup.Root
      className="c-radio-group | stack"
      value={value}
      onValueChange={onValueChange}
      aria-label="select density"
    >
      {options.map((item) => {
        return (
          <div
            key={item.value}
            className="c-radio-group-item-wrapper | cluster"
          >
            <RadioGroup.Item
              className="c-radio-group-item"
              value={item.value}
              id={`border-radio-${item.value}`}
            >
              <RadioGroup.Indicator className="c-radio-group-item-indicator" />
            </RadioGroup.Item>
            <label
              className="c-radio-group-item-label"
              htmlFor={`border-radio-${item.value}`}
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
