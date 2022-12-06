import React from "react";

import { useGetFollowing } from "api/following";

import FollowingSort from "../following-sort";
import FollowingFilter from "../following-filter";
import FollowingSelectAll from "../following-select-all";
import FollowingSelectCounter from "../following-select-counter";

import "./styles.css";

function FollowingActions({ accountId, setSelectedItems, selectedItems }) {
  const { isLoading } = useGetFollowing({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });
  return (
    <div className="c-following-actions | cluster">
      <FollowingSelectCounter />
      <FollowingFilter disabled={isLoading} />
      <FollowingSort disabled={isLoading} />
      <FollowingSelectAll />
    </div>
  );
}

export default FollowingActions;
