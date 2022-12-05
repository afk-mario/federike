export async function getList({ client, listId }) {
  return client.get(`lists/${listId}`);
}

export async function getLists({ client, accountId }) {
  return client.get(`lists`);
}

export async function getFollowingLists({ client, accountId }) {
  return client.get(`accounts/${accountId}/lists`);
}

export async function getListAccounts({ client, listId, limit = 0, maxId }) {
  return client.get(`lists/${listId}/accounts`, {
    params: { limit, max_id: maxId },
  });
}
