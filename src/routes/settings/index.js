import { Outlet } from "react-router-dom";

function SettingsRoot() {
  return (
    <div className="wrapper | stack">
      <span>Breadcrum</span>
      <Outlet />
    </div>
  );
}

export default SettingsRoot;
