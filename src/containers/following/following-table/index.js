import React from "react";

import { useGetFollowing } from "api/following";

import Table from "components/table";

import columns from "./columns";
import { getData } from "./helpers";

function FollowingTable({ accountId }) {
  const { data, isLoading } = useGetFollowing({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });

  const followers = React.useMemo(() => getData(data), [data]);

  if (isLoading) return "Loading ...";

  if (followers.length === 0) {
    return (
      <div>
        <h3>No follower yet :(</h3>
      </div>
    );
  }

  return <Table data={followers} columns={columns} />;
}

export default FollowingTable;
