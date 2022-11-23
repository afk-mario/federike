import { Outlet } from "react-router-dom";

function InstancesRoot() {
  return (
    <div className="stack">
      <Outlet />
    </div>
  );
}

export default InstancesRoot;
