import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import ListTag from "./list-tag";

function getLists(cacheData, followingId) {
  const a = cacheData
    .map((item) => {
      const [key, data] = item;
      const [, listId] = key;

      return {
        listId: parseInt(listId, 10),
        accounts: new Set(data?.map((account) => account.id)),
      };
    })
    .filter((item) => item.accounts.has(followingId))
    .map((item) => item.listId);
  return a;
}

function ListTags({ id }) {
  const queryClient = useQueryClient();
  const queryCacacheData = queryClient.getQueriesData(["list-accounts"]);
  const lists = getLists(queryCacacheData, id);

  return (
    <ul className="c-following-row-tag-list | cluster">
      {lists.map((item) => (
        <li key={item}>
          <ListTag listId={item} />
        </li>
      ))}
    </ul>
  );
}

export default ListTags;
