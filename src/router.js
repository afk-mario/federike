import React from "react";
import { createBrowserRouter } from "react-router-dom";

import RootRoot from "routes/root";
import Root from "routes/root/root";

import About from "routes/about";
import Help from "routes/help";

import SettingsRoot from "routes/settings";
import Settings from "routes/settings/settings";
import SettingsInstancesRoot from "routes/settings/instances";
import SettingsInstances from "routes/settings/instances/instances";
import SettingsInstancesAdd from "routes/settings/instances/add";

import ErrorRoute from "components/errors/error-route";
import ErrorRouteQueryBoundry from "components/errors/error-route-query-boundry";

const Followers = React.lazy(() => import("routes/followers"));
const Following = React.lazy(() => import("routes/following"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoot />,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        element: (
          <ErrorRouteQueryBoundry>
            <Root />
          </ErrorRouteQueryBoundry>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "followers",
        element: (
          <ErrorRouteQueryBoundry>
            <Followers />
          </ErrorRouteQueryBoundry>
        ),
      },
      {
        path: "following",
        element: (
          <ErrorRouteQueryBoundry>
            <Following />
          </ErrorRouteQueryBoundry>
        ),
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
