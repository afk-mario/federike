import React from "react";

import { useGetLists } from "api/lists";

import Spinner from "components/spinner";

import ListRow from "../list-row";

import "./styles.css";

function ListList({ selectedItems }) {
  const { data, isLoading } = useGetLists();

  if (isLoading)
    return (
      <div className="c-list-lists-loading">
        <Spinner />
      </div>
    );
  const lists = data.data;

  if (lists.length === 0) {
    return (
      <div>
        <h3>No follower yet :(</h3>
      </div>
    );
  }

  return (
    <ul className="c-list-list | stack">
      {lists
        .sort((a, b) => a.title > b.title)
        .map((item) => {
          return (
            <ListRow key={item.id} {...item} selectedItems={selectedItems} />
          );
        })}
    </ul>
  );
}

export default ListList;
