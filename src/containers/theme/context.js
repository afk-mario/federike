import PropTypes from "prop-types";
import React, { useCallback } from "react";

import { themeOptions, densityOptions, borderRadiusOptions } from "./constants";

const LOCAL_STORAGE_KEY = "FEDERIKE_THEME";
const ThemeStateContext = React.createContext();
const ThemeUpdaterContext = React.createContext();

function getSavedState() {
  const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!savedTheme) return {};

  try {
    const parsed = JSON.parse(savedTheme);
    return parsed;
  } catch (e) {
    return {};
  }
}

function getInitialState() {
  const savedState = getSavedState();
  return {
    theme: themeOptions[0].value,
    density: densityOptions[0].value,
    borderRadius: borderRadiusOptions[0].value,
    ...savedState,
  };
}

function ThemeProvider({ children }) {
  const [state, dispatch] = React.useState(getInitialState);
  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeUpdaterContext.Provider value={dispatch}>
        {children}
      </ThemeUpdaterContext.Provider>
    </ThemeStateContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

ThemeProvider.defaultProps = {
  children: null,
};

function useThemeState() {
  const themeState = React.useContext(ThemeStateContext);
  if (typeof themeState === "undefined") {
    throw new Error("useThemeState must be used within a ThemeProvider");
  }
  return themeState;
}

function useThemeUpdater() {
  const dispatch = React.useContext(ThemeUpdaterContext);
  if (typeof dispatch === "undefined") {
    throw new Error("useThemeUpdater must be used within a ThemeProvider");
  }
  const setTheme = useCallback(
    (value) => {
      dispatch((prev) => {
        const newState = { ...prev, theme: value };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
        return newState;
      });
    },
    [dispatch]
  );

  const setDensity = useCallback(
    (value) => {
      dispatch((prev) => {
        const newState = { ...prev, density: value };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
        return newState;
      });
    },
    [dispatch]
  );

  const setBorderRadius = useCallback(
    (value) => {
      dispatch((prev) => {
        const newState = { ...prev, borderRadius: value };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
        return newState;
      });
    },
    [dispatch]
  );

  return { setTheme, setDensity, setBorderRadius };
}

export { ThemeProvider, useThemeState, useThemeUpdater };
