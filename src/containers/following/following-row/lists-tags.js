import PropTypes from "prop-types";
import React from "react";

import { getListsFromQueries } from "containers/following/helpers";
import { useGetAllListsAccounts } from "api/lists";
import ListTag from "./list-tag";

function ListTags({ id }) {
  const queries = useGetAllListsAccounts();
  const lists = getListsFromQueries(queries, id);

  return (
    <ul className="c-following-row-tag-list | cluster">
      {lists.map((item) => (
        <li key={item}>
          <ListTag listId={parseInt(item, 10)} />
        </li>
      ))}
    </ul>
  );
}

ListTags.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ListTags;
