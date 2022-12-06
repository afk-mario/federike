export async function unfollowAccount({ client, accountId }) {
  return client.post(`accounts/${accountId}/unfollow`);
}
