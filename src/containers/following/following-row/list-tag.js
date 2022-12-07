import PropTypes from "prop-types";
import { useGetList } from "api/lists";
import Tag from "components/tag";

function ListTag({ listId }) {
  const query = useGetList({
    listId,
    config: {
      refetchOnMount: false,
    },
  });
  if (query.isLoading) return null;

  const { title } = query.data || {};

  return <Tag>{title || listId}</Tag>;
}

ListTag.propTypes = {
  listId: PropTypes.number.isRequired,
};

export default ListTag;
