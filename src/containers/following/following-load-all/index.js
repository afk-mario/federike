import PropTypes from "prop-types";
import { useEffect } from "react";

import { useGetFollowing } from "api/following";

import Spinner from "components/spinner";

function getText({ isLoading, isFetchingNextPage, hasNextPage }) {
  if (isLoading) return <Spinner />;
  if (isFetchingNextPage || isLoading) return <Spinner />;
  if (!hasNextPage) return "Finished loading!";
  return "idle";
}

function FollowingLoadAll({ accountId, showText }) {
  const { data, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage } =
    useGetFollowing({
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

  if (!showText) return null;

  return (
    <div className="cluster">
      {list ? <span>Loaded: {list.length} </span> : null}
      <span>{getText({ isFetchingNextPage, isLoading, hasNextPage })}</span>
    </div>
  );
}

FollowingLoadAll.propTypes = {
  accountId: PropTypes.string.isRequired,
  showText: PropTypes.bool,
};

FollowingLoadAll.defaultProps = {
  showText: true,
};

export default FollowingLoadAll;
