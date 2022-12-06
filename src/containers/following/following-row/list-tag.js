import { useGetList } from "api/lists";
import Tag from "components/tag";

function ListTag({ listId }) {
  const query = useGetList({ listId });
  if (query.isLoading) return null;

  const { title } = query.data || {};

  if (!title) return null;

  return <Tag>{title}</Tag>;
}

export default ListTag;
