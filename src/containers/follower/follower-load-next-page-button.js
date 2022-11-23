import { useGetFollowers } from "api/followers";

function FollowerLoadNextPageButton({ accountId }) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetFollowers({
      accountId,
      config: {
        enabled: accountId != null,
      },
    });

  const list = data?.pages?.map((page) => page.data).flat();

  return (
    <div className="cluster">
      {list ? `loaded: ${list.length}` : null}
      <button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={fetchNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
}

export default FollowerLoadNextPageButton;
