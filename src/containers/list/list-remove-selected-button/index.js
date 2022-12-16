import React from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";

import { useRemoveAccountToList, useInvalidateListModify } from "api/lists";

function ListRemoveSelectedButton({ listId, selectedItems, accounts }) {
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

  const onClick = React.useCallback(() => {
    const accountsSet = new Set(accounts.map(({ id }) => id));
    const accountIds = [...selectedItems].filter((item) =>
      accountsSet.has(item)
    );

    mutation.mutate({
      listId,
      accountIds,
    });
  }, [accounts, listId, mutation, selectedItems]);

  return (
    <button type="button" onClick={onClick}>
      remove selected
    </button>
  );
}

ListRemoveSelectedButton.propTypes = {
  listId: PropTypes.string.isRequired,
  selectedItems: PropTypes.instanceOf(Set).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({})),
};

ListRemoveSelectedButton.defaultProps = {
  accounts: [],
};

export default ListRemoveSelectedButton;
