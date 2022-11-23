import { useGetFollowers } from "api/followers";
import { useEffect } from "react";

function getText({ isLoading, isFetchingNextPage, hasNextPage }) {
  if (isLoading) return "Loading";
  if (isFetchingNextPage || isLoading) return "Loading more...";
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

export default FollowerLoadAll;
