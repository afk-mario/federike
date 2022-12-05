import { useDrop } from "react-dnd";

import { useRemoveAccountToList, useInvalidateListModify } from "api/lists";

function ListRemove({ listId, selectedItems, accounts }) {
  const invalidate = useInvalidateListModify();
  const mutation = useRemoveAccountToList({
    config: {
      onSuccess: (data, variables) => {
        invalidate(variables);
      },
    },
  });

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "following",
      drop: (item) => {
        const accountsSet = new Set(accounts.map(({ id }) => id));
        const accountIds = [...selectedItems].filter((item) =>
          accountsSet.has(item)
        );

        mutation.mutate({
          listId,
          accountIds,
        });
      },
      collect: (monitor) => {
        return {
          isOver: !!monitor.isOver(),
        };
      },
    }),
    [accounts, selectedItems]
  );

  return (
    <span
      ref={drop}
      className="c-list-row-action"
      data-is-over={isOver}
      data-action="remove"
    >
      Remove
    </span>
  );
}

export default ListRemove;
