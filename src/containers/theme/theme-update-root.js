import { useEffect } from "react";
import { useThemeState } from "./context";

function ThemeUpdateRoot() {
  const theme = useThemeState();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return null;
}

export default ThemeUpdateRoot;
