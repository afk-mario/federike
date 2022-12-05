import React from "react";

import { useGetFollowers } from "api/followers";

import Table from "components/table";

import columns from "./columns";
import { getAllItemsFromPaginatedRes } from "api/helpers";

function FollowerTable({ accountId }) {
  const { data, isLoading } = useGetFollowers({
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

  if (data.length === 0) {
    return (
      <div>
        <h3>No follower yet :(</h3>
      </div>
    );
  }

  return <Table data={followers} columns={columns} />;
}

export default FollowerTable;
