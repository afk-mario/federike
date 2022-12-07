import { Outlet } from "react-router-dom";

import "./styles.css";

function SettingsRoot() {
  return (
    <main className="">
      <div className="wrapper | stack">
        <Outlet />
      </div>
    </main>
  );
}

export default SettingsRoot;
