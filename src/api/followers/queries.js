export async function getFollowers({ client, accountId, maxId, limit = 80 }) {
  return client.get(`accounts/${accountId}/followers`, {
    params: { limit, max_id: maxId },
  });
}
