import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { MastodonAppProvider } from "lib/mastodon/provider";
import { FetchProvider } from "lib/fetch";

import { ThemeProvider } from "containers/theme/context";

import router from "./router";
import reportWebVitals from "./reportWebVitals";

import "styles/styles.css";
import ThemeUpdateRoot from "containers/theme/theme-update-root";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemeUpdateRoot />
      <QueryClientProvider client={queryClient}>
        <MastodonAppProvider>
          <FetchProvider>
            <DndProvider backend={HTML5Backend}>
              <RouterProvider router={router} />
            </DndProvider>
          </FetchProvider>
        </MastodonAppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
