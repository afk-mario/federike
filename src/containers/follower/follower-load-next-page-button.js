import PropTypes from "prop-types";
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
        type="button"
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={fetchNextPage}
      >
        {!isFetchingNextPage && hasNextPage ? "Load more" : null}
        {!isFetchingNextPage && !hasNextPage ? "Nothing more to load" : null}
        {isFetchingNextPage ? "Loading more" : null}
      </button>
    </div>
  );
}

FollowerLoadNextPageButton.propTypes = {
  accountId: PropTypes.string,
};

FollowerLoadNextPageButton.defaultProps = {
  accountId: null,
};

export default FollowerLoadNextPageButton;
