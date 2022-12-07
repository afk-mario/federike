import React from "react";
import Message from "components/message";

import { useGetLists } from "api/lists";

import { useListRouteState } from "routes/lists/context";

import Spinner from "components/spinner";

import ListRow from "../list-row";

import "./styles.css";

function ListList() {
  const selectedItems = useListRouteState();
  const { data, isLoading } = useGetLists();

  if (isLoading)
    return (
      <div className="c-list-lists-loading">
        <Spinner />
      </div>
    );

  if (data.length === 0) {
    return (
      <Message>
        <p>
          You don&apos;t have any lists <i>yet</i>.
        </p>
        <p>
          Try creating one using the <strong>input</strong> above.
        </p>
      </Message>
    );
  }

  return (
    <ul className="c-list-list | stack">
      {data
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
