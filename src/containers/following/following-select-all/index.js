import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useGetFollowing } from "api/following";
import { getAllItemsFromPaginatedRes } from "api/helpers";

import { useListRouteState, useListRouteUpdater } from "routes/lists/context";

import { useFollowingState } from "../following-list/context";

import { filterFollowing } from "../helpers";

import "./styles.css";

function FollowingSelectAll({ accountId }) {
  const selectedItems = useListRouteState();
  const setSelectedItems = useListRouteUpdater();
  const { filter } = useFollowingState();
  const { data, isLoading } = useGetFollowing({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });

  const unfilteredItems = React.useMemo(
    () =>
      getAllItemsFromPaginatedRes(data).filter((item) =>
        filterFollowing(item, filter)
      ),
    [data, filter]
  );

  const items = React.useMemo(() => {
    return unfilteredItems.filter((item) => filterFollowing(item, filter));
  }, [unfilteredItems, filter]);

  const selectAll = React.useCallback(() => {
    setSelectedItems(new Set(items.map((item) => item.id)));
  }, [items, setSelectedItems]);

  const clearSelection = React.useCallback(() => {
    setSelectedItems(new Set());
  }, [setSelectedItems]);

  useEffect(() => {
    setSelectedItems(
      (prev) =>
        new Set(
          items.filter((item) => prev.has(item.id)).map((item) => item.id)
        )
    );
  }, [items, filter, setSelectedItems]);

  const areAllSelected = items.length === selectedItems.size;

  return (
    <button
      className="c-following-select-all"
      onClick={areAllSelected ? clearSelection : selectAll}
      disabled={isLoading}
      type="button"
    >
      <span>{areAllSelected ? "clear selection" : "select all"}</span>
    </button>
  );
}

FollowingSelectAll.propTypes = {
  accountId: PropTypes.string,
};

FollowingSelectAll.defaultProps = {
  accountId: null,
};

export default FollowingSelectAll;
