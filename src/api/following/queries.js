export async function getFollowing({ client, accountId, maxId, limit }) {
  const res = await client.get(`accounts/${accountId}/following`, {
    params: { limit, max_id: maxId },
  });

  const { data, headers } = res;

  return {
    data,
    headers,
  };
}
