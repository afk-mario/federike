import React from "react";
import { useDrop } from "react-dnd";

import {
  useAddAccountToList,
  useRemoveAccountToList,
  useInvalidateAccountsLists,
} from "api/lists";

import "./styles.css";

function getIsInList({ item, listId }) {
  return item.lists.find((item) => item.id === listId) != null;
}

function getState({ isOver, item, listId }) {
  if (!isOver) return "idle";
  const isInList = getIsInList({ item, listId });

  if (isInList) return "remove";
  return "add";
}

function ListRow({ title, id: listId, is_exclusive }) {
  const invalidate = useInvalidateAccountsLists();
  const config = {
    onSuccess: (data, variables) => {
      console.log("onSuccess", variables);
      invalidate(variables.accountIds);
    },
  };
  const addMutation = useAddAccountToList({
    config,
  });
  const removeMutation = useRemoveAccountToList({
    config,
  });

  const [{ isOver, item }, drop] = useDrop(
    () => ({
      accept: "following",
      drop: (item) => {
        const isInList = getIsInList({ item, listId });
        const params = {
          listId,
          accountIds: [item.id],
        };
        if (isInList) {
          removeMutation.mutate(params);
        } else {
          addMutation.mutate(params);
        }
      },
      collect: (monitor) => {
        return {
          item: monitor.getItem(),
          isOver: !!monitor.isOver(),
        };
      },
    }),
    []
  );

  const state = getState({ item, isOver, listId });

  return (
    <li
      className="c-list-row"
      ref={drop}
      data-is-over={isOver}
      data-state={state}
    >
      <span className="c-list-row-label">{title}</span>
      {state === "add" ? <span>Add</span> : null}
      {state === "remove" ? <span>Remove</span> : null}
    </li>
  );
}

export default ListRow;
