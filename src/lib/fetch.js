import React, { createContext } from "react";

import axios from "axios";
import { useMastodonApp } from "./mastodon/provider";

const FetchContext = createContext();
const { Provider } = FetchContext;

function FetchProvider(props) {
  const { auth, app } = useMastodonApp();

  const client = axios.create({
    baseURL: `https://${app?.instance}/api/v1`,
  });

  client.interceptors.request.use(
    (config) => {
      return {
        ...config,
        headers: { Authorization: `Bearer ${auth.access_token}` },
      };
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <Provider
      value={{
        client: client,
      }}
      {...props}
    />
  );
}

const useFetch = () => React.useContext(FetchContext);

export { FetchProvider, useFetch };
