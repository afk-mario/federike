import { useQuery } from "@tanstack/react-query";

import { useFetch } from "lib/fetch";

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
