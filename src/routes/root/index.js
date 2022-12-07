import { Outlet } from "react-router-dom";

import Header from "components/header";

function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
