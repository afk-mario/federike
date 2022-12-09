import PropTypes from "prop-types";
import React from "react";

import { useGetFollowers } from "api/followers";

import { getAllItemsFromPaginatedRes } from "api/helpers";

import Table from "components/table";
import Spinner from "components/spinner";

import columns from "./columns";

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

  if (isLoading) return <Spinner />;

  if (data.length === 0) {
    return (
      <div>
        <h3>No follower yet :(</h3>
      </div>
    );
  }

  return <Table data={followers} columns={columns} />;
}

FollowerTable.propTypes = {
  accountId: PropTypes.string,
};

FollowerTable.defaultProps = {
  accountId: null,
};

export default FollowerTable;
