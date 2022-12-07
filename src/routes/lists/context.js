import PropTypes from "prop-types";
import React from "react";

const ListRouteStateContext = React.createContext();
const ListRouteUpdaterContext = React.createContext();

function ListRouteProvider({ children }) {
  const [selectedItems, setSelectedItems] = React.useState(new Set());
  return (
    <ListRouteStateContext.Provider value={selectedItems}>
      <ListRouteUpdaterContext.Provider value={setSelectedItems}>
        {children}
      </ListRouteUpdaterContext.Provider>
    </ListRouteStateContext.Provider>
  );
}

ListRouteProvider.propTypes = {
  children: PropTypes.node,
};

ListRouteProvider.defaultProps = {
  children: null,
};

function useListRouteState() {
  const state = React.useContext(ListRouteStateContext);
  if (typeof state === "undefined") {
    throw new Error(
      "useListRouteState must be used within a ListRouteProvider"
    );
  }
  return state;
}

function useListRouteUpdater() {
  const dispatch = React.useContext(ListRouteUpdaterContext);
  if (typeof dispatch === "undefined") {
    throw new Error(
      "useListRouteUpdater must be used within a ListRouteProvider"
    );
  }
  return dispatch;
}

export { ListRouteProvider, useListRouteState, useListRouteUpdater };
