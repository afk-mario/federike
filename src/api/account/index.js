import { useQuery, useMutation } from "@tanstack/react-query";

import { useFetch } from "lib/fetch";
import { unfollowAccount } from "./mutations";

import { getVerifyCredentails } from "./queries";

export function useGetVerifyCredentials(props = {}) {
  const { client } = useFetch();
  const { queryKey = "account", config = {} } = props;

  return useQuery({
    queryKey: [queryKey],
    queryFn: () => getVerifyCredentails({ client }),
    ...config,
  });
}

export function useUnfollowAccount(props = {}) {
  const { config } = props;
  const { client } = useFetch();

  return useMutation({
    mutationFn: ({ accountId }) => unfollowAccount({ client, accountId }),
    ...config,
  });
}
