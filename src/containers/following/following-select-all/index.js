import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useGetFollowing } from "api/following";
import { getAllItemsFromPaginatedRes } from "api/helpers";

import { useListRouteUpdater } from "routes/lists/context";

import { useFollowingState } from "../following-list/context";

import { filterFollowing } from "../helpers";

function FollowingSelectAll({ accountId }) {
  const setSelectedItems = useListRouteUpdater();
  const { filter } = useFollowingState();
  const { data, isLoading } = useGetFollowing({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });
  const items = React.useMemo(
    () =>
      getAllItemsFromPaginatedRes(data).filter((item) =>
        filterFollowing(item, filter)
      ),
    [data, filter]
  );

  const selectAll = React.useCallback(() => {
    setSelectedItems(new Set(items.map((item) => item.id)));
  }, [items, setSelectedItems]);

  useEffect(() => {
    setSelectedItems(
      (prev) =>
        new Set(
          items.filter((item) => prev.has(item.id)).map((item) => item.id)
        )
    );
  }, [items, filter, setSelectedItems]);

  return (
    <button onClick={selectAll} disabled={isLoading} type="button">
      <span className="icon" aria-label="select all">
        
      </span>
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
