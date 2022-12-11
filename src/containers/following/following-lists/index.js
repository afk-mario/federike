import PropTypes from "prop-types";

import { useGetFollowingLists } from "api/lists";

import Tag from "components/tag";
import Spinner from "components/spinner";

function FollowingLists({ accountId }) {
  const query = useGetFollowingLists({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });

  if (query.isLoading) return <Spinner />;

  const lists = query.data?.data || [];

  return (
    <div className="cluster">
      {lists.map((item) => {
        return <Tag key={item.id}>{item.title}</Tag>;
      })}
    </div>
  );
}

FollowingLists.propTypes = {
  accountId: PropTypes.string,
};

FollowingLists.defaultProps = {
  accountId: null,
};

export default FollowingLists;
