import { useDrop } from "react-dnd";
import { useQueryClient } from "@tanstack/react-query";

import { useAddAccountToList, useInvalidateListModify } from "api/lists";

function ListAdd({ listId, selectedItems, accounts }) {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateListModify();
  const mutation = useAddAccountToList({
    config: {
      onMutate: async ({ accountIds }) => {
        await queryClient.cancelQueries({
          queryKey: ["list-accounts", listId],
        });
        const prev = queryClient.getQueryData(["list-accounts", listId]);

        queryClient.setQueryData(["list-accounts", listId], (old) => {
          return [...old, ...accountIds.map((id) => ({ id }))];
        });

        return prev;
      },
      onSettled: (data, error, variables, context) => {
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
