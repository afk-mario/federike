import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { themeOptions } from "../constants";

import { useThemeState, useThemeUpdater } from "../context";

import "./styles.css";

function ThemeRadioGroup() {
  const theme = useThemeState();
  const setTheme = useThemeUpdater();

  return (
    <RadioGroup.Root
      className="c-radio-group | stack"
      value={theme}
      onValueChange={setTheme}
      aria-label="select theme"
    >
      {themeOptions.map((item) => {
        return (
          <div
            key={item.value}
            className="c-radio-group-item-wrapper | cluster"
          >
            <RadioGroup.Item
              className="c-radio-group-item"
              value={item.value}
              id={`radio-${item.value}`}
            >
              <RadioGroup.Indicator className="c-radio-group-item-indicator" />
            </RadioGroup.Item>
            <label
              className="c-radio-group-item-label"
              htmlFor={`radio-${item.value}`}
            >
              {item.label}
            </label>
          </div>
        );
      })}
    </RadioGroup.Root>
  );
}

export default ThemeRadioGroup;
