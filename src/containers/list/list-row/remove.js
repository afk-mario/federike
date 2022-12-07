import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import { useQueryClient } from "@tanstack/react-query";

import { useRemoveAccountToList, useInvalidateListModify } from "api/lists";

function ListRemove({ listId, selectedItems, accounts }) {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateListModify();
  const mutation = useRemoveAccountToList({
    config: {
      onMutate: async ({ accountIds }) => {
        await queryClient.cancelQueries({
          queryKey: ["list-accounts", listId],
        });
        const prev = queryClient.getQueryData(["list-accounts", listId]);

        const set = new Set(accountIds);
        queryClient.setQueryData(["list-accounts", listId], (old) => {
          return {
            listId,
            accounts: old.accounts.filter(({ id }) => !set.has(id)),
          };
        });

        return prev;
      },
      onSettled: (data, error, variables) => {
        invalidate(variables);
      },
    },
  });

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "following",
      drop: () => {
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

ListRemove.propTypes = {
  listId: PropTypes.string.isRequired,
  selectedItems: PropTypes.instanceOf(Set).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({})),
};

ListRemove.defaultProps = {
  accounts: [],
};

export default ListRemove;
