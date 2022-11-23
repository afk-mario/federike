import { useInfiniteQuery } from "@tanstack/react-query";
import { getNextPageParam } from "api/helpers";

import { useFetch } from "lib/fetch";

import { getFollowing } from "./queries";

export function useGetFollowing(props = {}) {
  const { client } = useFetch();
  const { queryKey = "following", limit, accountId, config = {} } = props;

  return useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) =>
      getFollowing({ client, limit, accountId, ...pageParam }),
    getNextPageParam,
    ...config,
  });
}
