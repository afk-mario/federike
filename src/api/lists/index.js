import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useFetch } from "lib/fetch";

import { getLists, getFollowingLists } from "./queries";
import { addAccountToList, removeAccountToList } from "./mutations";

export function useGetLists(props = {}) {
  const { client } = useFetch();
  const { queryKey = "lists", config = {} } = props;

  return useQuery({
    queryKey: [queryKey],
    queryFn: () => getLists({ client }),
    ...config,
  });
}

export function useGetFollowingLists(props = {}) {
  const { client } = useFetch();
  const { queryKey = "following-lists", accountId, config = {} } = props;

  return useQuery({
    queryKey: [queryKey, accountId],
    queryFn: () => getFollowingLists({ client, accountId }),
    ...config,
  });
}

export function useAddAccountToList(props = {}) {
  const { config } = props;
  const { client } = useFetch();

  return useMutation({
    mutationFn: ({ listId, accountIds }) =>
      addAccountToList({ client, listId, accountIds }),
    ...config,
  });
}

export function useRemoveAccountToList(props = {}) {
  const { config } = props;
  const { client } = useFetch();

  return useMutation({
    mutationFn: ({ listId, accountIds }) =>
      removeAccountToList({ client, listId, accountIds }),
    ...config,
  });
}

export function useInvalidateAccountsLists(props = {}) {
  const queryClient = useQueryClient();
  return (accountIds) => {
    accountIds.forEach((element) => {
      queryClient.invalidateQueries(["following-lists", element]);
    });
  };
}
