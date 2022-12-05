import React from "react";

import { useGetFollowing } from "api/following";
import { getAllItemsFromPaginatedRes } from "api/helpers";

import Tag from "components/tag";
import FollowingSort from "../following-sort";

function FollowingActions({
  accountId,
  setSelectedItems,
  selectedItems,
  setSort,
}) {
  const { data, isLoading } = useGetFollowing({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });
  const followers = React.useMemo(
    () => getAllItemsFromPaginatedRes(data),
    [data]
  );
  const selectAll = React.useCallback(() => {
    setSelectedItems(new Set(followers.map((item) => item.id)));
  }, [followers, setSelectedItems]);
  // const clearSelection = React.useCallback(() => {
  //   setSelectedItems(new Set());
  // }, [setSelectedItems]);

  return (
    <div className="c-following-actions | cluster">
      {selectedItems.size > 0 ? <Tag>{selectedItems.size}</Tag> : null}
      <input
        disabled={isLoading}
        className="c-following-filter"
        type="text"
        placeholder="username:afk"
      />
      <FollowingSort onChange={setSort} disabled={isLoading} />
      <button onClick={selectAll} disabled={isLoading}>
        <span className="icon"></span>
      </button>
    </div>
  );
}

export default FollowingActions;
