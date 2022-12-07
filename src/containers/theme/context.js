import PropTypes from "prop-types";
import React, { useCallback } from "react";

import { themeOptions } from "./constants";

const LOCAL_STORAGE_KEY = "FEDERIKE_THEME";
const ThemeStateContext = React.createContext();
const ThemeUpdaterContext = React.createContext();

function getInitialTheme() {
  const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedTheme || themeOptions[0].value;
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(getInitialTheme);
  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeUpdaterContext.Provider value={setTheme}>
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
      dispatch(value);
      localStorage.setItem(LOCAL_STORAGE_KEY, value);
    },
    [dispatch]
  );
  return setTheme;
}

export { ThemeProvider, useThemeState, useThemeUpdater };
