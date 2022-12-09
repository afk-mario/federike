import PropTypes from "prop-types";
import React from "react";

import { useGetFollowing } from "api/following";

import FollowingSort from "../following-sort";
import FollowingFilter from "../following-filter";
import FollowingSelectAll from "../following-select-all";

import "./styles.css";

function FollowingActions({ accountId }) {
  const { isLoading } = useGetFollowing({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });
  return (
    <div className="c-following-actions-wrapper | stack">
      <header className="c-following-actions-header | cluster">
        <h2 className="c-following-actions-title | hide-medium">Following</h2>
        <FollowingSort disabled={isLoading} />
        <FollowingSelectAll />
      </header>
      <div className="c-following-actions | cluster">
        <FollowingFilter disabled={isLoading} />
      </div>
    </div>
  );
}

FollowingActions.propTypes = {
  accountId: PropTypes.string,
};

FollowingActions.defaultProps = {
  accountId: null,
};

export default FollowingActions;
