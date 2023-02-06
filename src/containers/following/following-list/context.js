import PropTypes from "prop-types";
import React, { useCallback } from "react";

import { useGetFollowing } from "api/following";
import { useGetLists, useGetAllListsAccounts } from "api/lists";
import { getAllItemsFromPaginatedRes } from "api/helpers";

import { sortingOptions } from "containers/following/constants";

import { getSortedItems, filterFollowing } from "../helpers";

const FollowingStateContext = React.createContext();
const FollowingUpdaterContext = React.createContext();

const initialState = {
  sort: sortingOptions[0].value,
  filter: "",
};

function getAccountLists(queries, listsData) {
  const listsDict = listsData.reduce((acc, curr) => {
    acc[curr.id] = { id: curr.id, title: curr.title };
    return acc;
  }, {});

  const dict = queries.reduce((acc, curr) => {
    const { data } = curr;
    if (!data) return acc;

    data.accounts.forEach((element) => {
      const { id } = element;
      if (acc[id] == null) {
        acc[id] = [];
      }

      acc[id] = [...acc[id], listsDict[data.listId]];
    });

    return acc;
  }, {});

  return dict;
}

function FollowingProvider({ accountId, children }) {
  const [state, setState] = React.useState(initialState);
  const listQueries = useGetAllListsAccounts();
  const { data: listsData = [] } = useGetLists();
  const { data: followingData } = useGetFollowing({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });

  const { sort, filter } = state;
  const accountLists = getAccountLists(listQueries, listsData);

  const rawItems = React.useMemo(() => {
    return getAllItemsFromPaginatedRes(followingData);
  }, [followingData]);

  const itemsWithLists = React.useMemo(() => {
    return rawItems.map((item) => {
      const lists = accountLists[item.id] ?? [];
      return { ...item, lists };
    });
  }, [accountLists, rawItems]);

  const items = React.useMemo(() => {
    return getSortedItems(
      itemsWithLists.filter((item) => filterFollowing(item, filter)),
      sort
    );
  }, [sort, filter, itemsWithLists]);

  const value = React.useMemo(
    () => ({
      rawItems,
      items,
      sort,
      filter,
    }),
    [sort, filter, items, rawItems]
  );

  return (
    <FollowingStateContext.Provider value={value}>
      <FollowingUpdaterContext.Provider value={setState}>
        {children}
      </FollowingUpdaterContext.Provider>
    </FollowingStateContext.Provider>
  );
}

FollowingProvider.propTypes = {
  accountId: PropTypes.string,
  children: PropTypes.node,
};

FollowingProvider.defaultProps = {
  accountId: null,
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
