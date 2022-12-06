import {
  useQuery,
  useQueries,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useFetch } from "lib/fetch";

import {
  getList,
  getLists,
  getFollowingLists,
  getListAccounts,
} from "./queries";

import {
  addAccountToList,
  createList,
  removeAccountToList,
  updateList,
  deleteList,
} from "./mutations";

export function useGetList(props = {}) {
  const { client } = useFetch();
  const { queryKey = "list", listId, config = {} } = props;

  return useQuery({
    queryKey: [queryKey, listId.toString()],
    queryFn: () => getList({ client, listId }),
    ...config,
  });
}

export function useGetLists(props = {}) {
  const { client } = useFetch();
  const { queryKey = "lists", config = {} } = props;

  return useQuery({
    queryKey: [queryKey],
    queryFn: () => getLists({ client }),
    ...config,
  });
}

export function useGetAllListsAccounts(props = {}) {
  const { client } = useFetch();
  const { queryKey = "list", config = {} } = props;
  const listsQuery = useGetLists(props);
  const lists = listsQuery.data?.data || [];

  return useQueries({
    queries: lists.map((item) => ({
      queryKey: [queryKey, item.id],
      queryFn: () => getListAccounts({ client, listId: item.id }),
      meta: item.id,
      ...config,
    })),
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

export function useGetListAccounts(props = {}) {
  const { client } = useFetch();
  const { queryKey = "list-accounts", listId, config = {} } = props;

  return useQuery({
    queryKey: [queryKey, listId],
    queryFn: () => getListAccounts({ client, listId }),
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

export function useCreateList(props = {}) {
  const { config } = props;
  const { client } = useFetch();

  return useMutation({
    mutationFn: ({ title, replies_policy }) =>
      createList({ client, title, replies_policy }),
    ...config,
  });
}

export function useUpdateList(props = {}) {
  const { config } = props;
  const { client } = useFetch();

  return useMutation({
    mutationFn: ({ listId, title, replies_policy }) =>
      updateList({ client, listId, title, replies_policy }),
    ...config,
  });
}

export function useDeleteList(props = {}) {
  const { config } = props;
  const { client } = useFetch();

  return useMutation({
    mutationFn: ({ listId }) => deleteList({ client, listId }),
    ...config,
  });
}

export function useInvalidateLists(props = {}) {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries(["lists"]);
  };
}

export function useInvalidateListUpdate(props = {}) {
  const queryClient = useQueryClient();
  return ({ listId }) => {
    queryClient.invalidateQueries(["list", listId]);
    queryClient.invalidateQueries(["lists"]);
  };
}

export function useInvalidateListModify(props = {}) {
  const queryClient = useQueryClient();

  return ({ listId, accountIds = [] }) => {
    queryClient.invalidateQueries(["list-accounts", listId]);
    accountIds.forEach((element) => {
      queryClient.invalidateQueries(["following-lists", element]);
    });
  };
}
