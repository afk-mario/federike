import { useQueryClient } from "@tanstack/react-query";

import { useUnfollowAccount } from "api/account";
import { useInvalidateFollowing } from "api/following";

import "./styles.css";

function AccountUnfollowConfirm({ account, onCancel, onSuccess }) {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateFollowing();
  const mutation = useUnfollowAccount({
    config: {
      onMutate: async ({ accountId }) => {
        await queryClient.cancelQueries({
          queryKey: ["following"],
        });
        const prev = queryClient.getQueryData(["following"]);
        const newPagesArray =
          prev?.pages.map((page) => {
            const { data, headers } = page;
            return {
              data: data.filter((val) => val.id !== accountId),
              headers,
            };
          }) ?? [];

        queryClient.setQueryData(["following"], (data) => {
          return {
            pages: newPagesArray,
            pageParams: data.pageParams,
          };
        });

        return prev;
      },
      onSettled: (data, error, variables, context) => {
        invalidate();
        onSuccess();
      },
    },
  });
  return (
    <div className="c-account-unfollow-confirm | stack">
      <div>
        <p>
          Are you sure you want to unfollow <strong>{account.acct}</strong>?
        </p>
        <p>
          This <strong>can not</strong> be undone
        </p>
      </div>
      <footer className="cluster">
        <button onClick={onCancel}> Cancel</button>
        <button
          onClick={() => mutation.mutate({ accountId: account.id })}
          disabled={mutation.isLoading}
        >
          Confirm
        </button>
      </footer>
    </div>
  );
}

export default AccountUnfollowConfirm;
