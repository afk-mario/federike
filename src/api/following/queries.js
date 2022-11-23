export async function getFollowing({ client, accountId, maxId, limit = 80 }) {
  return client.get(`accounts/${accountId}/following`, {
    params: { limit: 80, max_id: maxId },
  });
}
