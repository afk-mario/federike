import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";

import { useRemoveAccountToList, useInvalidateListModify } from "api/lists";

import "./styles.css";

function ListAccountsListRow({ listId, id: accountId, acct, url }) {
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

  return (
    <li className="c-list-accounts-list-row | cluster">
      <a
        className="c-list-accounts-list-row-label"
        href={url}
        rel="noreferrer noopener"
        target="_blank"
      >
        {acct}
      </a>
      <button
        type="button"
        onClick={() => {
          mutation.mutate({
            listId,
            accountIds: [accountId],
          });
        }}
      >
        remove
      </button>
    </li>
  );
}

ListAccountsListRow.propTypes = {
  listId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  acct: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ListAccountsListRow;
