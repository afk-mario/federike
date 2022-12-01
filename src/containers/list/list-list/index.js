import React from "react";

import { useGetLists } from "api/lists";

import ListRow from "../list-row";

import "./styles.css";

function ListList() {
  const { data, isLoading } = useGetLists();

  if (isLoading) return "Loading ...";
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
      {lists.map((item) => {
        return <ListRow key={item.id} {...item} />;
      })}
    </ul>
  );
}

export default ListList;
