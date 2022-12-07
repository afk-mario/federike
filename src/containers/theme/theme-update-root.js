import { useEffect } from "react";
import { useThemeState } from "./context";

function ThemeUpdateRoot() {
  const { theme, density, borderRadius } = useThemeState();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-density", density);
  }, [density]);

  useEffect(() => {
    document.documentElement.setAttribute("data-border-radius", borderRadius);
  }, [borderRadius]);

  return null;
}

export default ThemeUpdateRoot;
