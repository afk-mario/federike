import { useInfiniteQuery } from "@tanstack/react-query";

import { getNextPageParam } from "api/helpers";
import { useFetch } from "lib/fetch";

import { getFollowers } from "./queries";

export function useGetFollowers(props = {}) {
  const { client } = useFetch();
  const { queryKey = "followers", limit, accountId, config = {} } = props;

  return useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) =>
      getFollowers({ client, limit, accountId, ...pageParam }),
    getNextPageParam,
    ...config,
  });
}
