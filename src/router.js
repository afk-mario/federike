import { createBrowserRouter } from "react-router-dom";

import RootRoot from "routes/root";
import Root from "routes/root/root";

import Followers from "routes/followers";
import Following from "routes/following";
import Lists from "routes/lists";

import SettingsRoot from "routes/settings";
import Settings from "routes/settings/settings";
import SettingsInstancesRoot from "routes/settings/instances";
import SettingsInstances from "routes/settings/instances/instances";
import SettingsInstancesAdd from "routes/settings/instances/add";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoot />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: "followers",
        element: <Followers />,
      },
      {
        path: "following",
        element: <Following />,
      },
      {
        path: "settings",
        element: <SettingsRoot />,
        children: [
          {
            index: true,
            element: <Settings />,
          },
          {
            path: "instances",
            element: <SettingsInstancesRoot />,
            children: [
              {
                index: true,
                element: <SettingsInstances />,
              },
              {
                path: "add",
                element: <SettingsInstancesAdd />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
