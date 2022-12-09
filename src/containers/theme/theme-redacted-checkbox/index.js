import React from "react";

import { useThemeState, useThemeUpdater } from "../context";

import "./styles.css";

function ThemeRedactedCheckbox() {
  const { redacted: value } = useThemeState();
  const { setRedacted: onValueChange } = useThemeUpdater();

  return (
    <label className="c-theme-redacted-checkbox | cluster">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => {
          onValueChange(e.target.checked);
        }}
      />
      <span>Redacted</span>
    </label>
  );
}

export default ThemeRedactedCheckbox;
