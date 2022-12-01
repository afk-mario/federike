import { useEffect } from "react";

import { useGetFollowing } from "api/following";

function getText({ isLoading, isFetchingNextPage, hasNextPage }) {
  if (isLoading) return "Loading";
  if (isFetchingNextPage || isLoading) return "Loading more...";
  if (!hasNextPage) return "Finished loading!";
  return "idle";
}

function FollowingLoadAll({ accountId, showText = true }) {
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

export default FollowingLoadAll;
