export async function getFollowing({ client, accountId, maxId, limit = 80 }) {
  const res = await client.get(`accounts/${accountId}/following`, {
    params: { limit: 80, max_id: maxId },
  });

  const { data, headers } = res;

  return {
    data,
    headers,
  };
}
