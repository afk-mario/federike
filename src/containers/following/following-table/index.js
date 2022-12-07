import PropTypes from "prop-types";
import React from "react";

import { useGetFollowing } from "api/following";
import { getAllItemsFromPaginatedRes } from "api/helpers";

import Table from "components/table";

import columns from "./columns";

function FollowingTable({ accountId }) {
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

  if (isLoading) return "Loading ...";

  if (followers.length === 0) {
    return (
      <div>
        <span>You don&apos;t follow anyone yet.</span>
      </div>
    );
  }

  return <Table data={followers} columns={columns} />;
}

FollowingTable.propTypes = {
  accountId: PropTypes.string,
};

FollowingTable.defaultProps = {
  accountId: null,
};

export default FollowingTable;
