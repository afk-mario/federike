import PropTypes from "prop-types";
import React, { useCallback } from "react";

import { sortingOptions } from "containers/following/constants";

const FollowingStateContext = React.createContext();
const FollowingUpdaterContext = React.createContext();

const initialState = {
  sort: sortingOptions[0].value,
  filter: "",
};

function FollowingProvider({ children }) {
  const [state, setState] = React.useState(initialState);
  return (
    <FollowingStateContext.Provider value={state}>
      <FollowingUpdaterContext.Provider value={setState}>
        {children}
      </FollowingUpdaterContext.Provider>
    </FollowingStateContext.Provider>
  );
}

FollowingProvider.propTypes = {
  children: PropTypes.node,
};

FollowingProvider.defaultProps = {
  children: null,
};

function useFollowingState() {
  const state = React.useContext(FollowingStateContext);
  if (typeof state === "undefined") {
    throw new Error(
      "useFollowingState must be used within a FollowingProvider"
    );
  }
  return state;
}

function useFollowingUpdater() {
  const dispatch = React.useContext(FollowingUpdaterContext);
  if (typeof dispatch === "undefined") {
    throw new Error(
      "useFollowingUpdater must be used within a FollowingProvider"
    );
  }

  const setFilter = useCallback(
    (value) => {
      dispatch((prev) => ({ ...prev, filter: value }));
    },
    [dispatch]
  );

  const setSort = useCallback(
    (value) => {
      dispatch((prev) => ({ ...prev, sort: value }));
    },
    [dispatch]
  );

  return { setFilter, setSort };
}

export { FollowingProvider, useFollowingState, useFollowingUpdater };
