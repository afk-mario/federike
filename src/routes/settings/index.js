import { Outlet } from "react-router-dom";

import "./styles.css";

function SettingsRoot() {
  return (
    <div className="wrapper | stack">
      <Outlet />
    </div>
  );
}

export default SettingsRoot;
