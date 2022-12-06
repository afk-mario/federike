import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import ListTag from "./list-tag";

function getLists(listsData, followingId) {
  const a = listsData
    .map((item) => {
      const [key, data] = item;
      const [, listId] = key;

      return {
        listId,
        accounts: new Set(data?.map((account) => account.id)),
      };
    })
    .filter((item) => item.accounts.has(followingId))
    .map((item) => item.listId);
  return a;
}

function ListTags({ id }) {
  const queryClient = useQueryClient();
  const listsData = queryClient.getQueriesData(["list-accounts"]);
  const lists = getLists(listsData, id);

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

export default ListTags;
