import PropTypes from "prop-types";
import { useEffect } from "react";

import { useGetFollowers } from "api/followers";

import Spinner from "components/spinner";

function getText({ isLoading, isFetchingNextPage, hasNextPage }) {
  if (isLoading) return <Spinner />;
  if (isFetchingNextPage || isLoading) return <Spinner />;
  if (!hasNextPage) return "Finished loading!";
  return "idle";
}

function FollowerLoadAll({ accountId }) {
  const { data, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage } =
    useGetFollowers({
      accountId,
      config: {
        enabled: accountId != null,
      },
    });

  const list = data?.pages?.map((page) => page.data).flat();

  useEffect(() => {
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;
    fetchNextPage();
  });

  return (
    <div className="cluster">
      {list ? <span>Loaded: {list.length} </span> : null}
      <span>{getText({ isFetchingNextPage, isLoading, hasNextPage })}</span>
    </div>
  );
}

FollowerLoadAll.propTypes = {
  accountId: PropTypes.string,
};

FollowerLoadAll.defaultProps = {
  accountId: null,
};

export default FollowerLoadAll;
