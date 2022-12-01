export async function getLists({ client, accountId }) {
  return client.get(`lists`);
}

export async function getFollowingLists({ client, accountId }) {
  return client.get(`accounts/${accountId}/lists`);
}
