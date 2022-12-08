import React, { useCallback } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const MastodonAppContext = React.createContext();

const LOCAL_STORAGE_KEY = "FEDERIKE_MASTODON_APP";
const WEBSITE = process.env.REACT_APP_WEBSITE_URL;
const SCOPES = [
  "read:accounts",
  "read:follows",
  "write:follows",
  "read:lists",
  "write:lists",
];
const CLIENT_NAME = "Federike";
const REDIRECT_URI = `${WEBSITE}/settings/instances/add`;

function getInitialState() {
  const appData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const { app, auth } = appData ? JSON.parse(appData) : {};

  return {
    app,
    auth,
    isLoading: false,
  };
}

async function getAccessTokenFromAuthCode(props = {}) {
  const {
    instance,
    clientId,
    clientSecret,
    code,
    redirectUri = REDIRECT_URI,
  } = props;
  const url = new URL(`https://${instance}/oauth/token`);

  return axios.post(url, {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
    code,
  });
}

function reducer(state, action) {
  switch (action.type) {
    case "CLEAR_ALL":
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return getInitialState();
    case "FETCH_APP_CREDENTIALS":
      return { ...state, app: null, isLoading: true };
    case "REGISTER_APP":
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ app: action.payload.app })
      );
      return { ...state, app: action.payload.app, isLoading: false };
    case "REMOVE_APP":
      return { ...state, app: null, isLoading: false };
    case "FETCH_AUTH_TOKEN":
      return { ...state, auth: null, isLoading: true };
    case "SET_AUTH_TOKEN":
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          app: state.app,
          auth: action.payload.auth,
        })
      );
      return {
        ...state,
        auth: action.payload.auth,
        isLoading: false,
      };
    default:
      throw new Error("Action not supported");
  }
}

function MastodonAppProvider(props) {
  const queryClient = useQueryClient();
  const [state, dispatch] = React.useReducer(reducer, getInitialState());

  const registerApp = useCallback(async ({ instance }) => {
    dispatch({ type: "FETCH_APP_CREDENTIALS" });

    const res = await axios.post(`https://${instance}/api/v1/apps`, {
      client_name: CLIENT_NAME,
      redirect_uris: REDIRECT_URI,
      scopes: SCOPES.join(" "),
      website: WEBSITE,
    });
    const {
      client_id: clientId,
      client_secret: clientSecret,
      vapid_key: vapidKey,
    } = res.data;

    dispatch({
      type: "REGISTER_APP",
      payload: {
        app: {
          instance,
          clientId,
          clientSecret,
          vapidKey,
        },
      },
    });

    return res;
  }, []);

  const redirectToOauth = useCallback(
    async (params = {}) => {
      const { instance } = params;

      const { data } = await registerApp(params);
      const {
        client_id: clientId,
        client_secret: clientSecret,
        vapid_key: vapidKey,
      } = data;

      const app = {
        clientId,
        clientSecret,
        vapidKey,
      };

      const loginURL = new URL(`https://${instance}/oauth/authorize`);
      loginURL.searchParams.append("client_id", app.clientId);
      loginURL.searchParams.append("redirect_uri", REDIRECT_URI);
      loginURL.searchParams.append("response_type", "code");
      loginURL.searchParams.append("scope", SCOPES.join(" "));

      setTimeout(() => {
        document.location.href = loginURL;
      }, 200);
    },
    [registerApp]
  );

  const handleAuthCode = useCallback(async (params = {}) => {
    dispatch({ type: "FETCH_AUTH_TOKEN" });
    const res = await getAccessTokenFromAuthCode(params);
    dispatch({ type: "SET_AUTH_TOKEN", payload: { auth: res.data } });
  }, []);

  const logout = useCallback(() => {
    queryClient.clear();
    dispatch({ type: "CLEAR_ALL" });
  }, [queryClient]);

  const { app, auth, isLoading } = state;
  const value = React.useMemo(
    () => ({
      app,
      auth,
      isLoading,
      registerApp,
      redirectToOauth,
      handleAuthCode,
      logout,
    }),
    [app, auth, isLoading, registerApp, redirectToOauth, handleAuthCode, logout]
  );

  return <MastodonAppContext.Provider value={value} {...props} />;
}

const useMastodonApp = () => React.useContext(MastodonAppContext);

export { MastodonAppProvider, useMastodonApp };
