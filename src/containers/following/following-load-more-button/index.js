import PropTypes from "prop-types";
import { useGetFollowing } from "api/following";

import "./styles.css";

function FollowingLoadMoreButton({ accountId }) {
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = useGetFollowing({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });

  return (
    <button
      className="c-following-load-more-button"
      type="button"
      disabled={!hasNextPage || isFetchingNextPage}
      onClick={fetchNextPage}
    >
      {!isFetchingNextPage && hasNextPage ? "Load more" : null}
      {!isFetchingNextPage && !hasNextPage ? "Nothing more to load" : null}
      {isFetchingNextPage ? "Loading more" : null}
    </button>
  );
}

FollowingLoadMoreButton.propTypes = {
  accountId: PropTypes.string,
};

FollowingLoadMoreButton.defaultProps = {
  accountId: null,
};

export default FollowingLoadMoreButton;
