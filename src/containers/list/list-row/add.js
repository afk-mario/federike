import { useDrop } from "react-dnd";

import { useAddAccountToList, useInvalidateListModify } from "api/lists";

function ListAdd({ listId, selectedItems, accounts }) {
  const invalidate = useInvalidateListModify();
  const mutation = useAddAccountToList({
    config: {
      onSuccess: (data, variables) => {
        invalidate(variables);
      },
    },
  });

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "following",
      drop: () => {
        const accountsSet = new Set(accounts.map(({ id }) => id));
        const accountIds = [...selectedItems].filter(
          (item) => !accountsSet.has(item)
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
      data-action="add"
    >
      Add
    </span>
  );
}

export default ListAdd;
