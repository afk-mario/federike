export async function getList({ client, listId }) {
  const res = await client.get(`lists/${listId}`);
  const { data } = res;
  return data;
}

export async function getLists({ client }) {
  const res = await client.get(`lists`);
  const { data } = res;
  return data;
}

export async function getFollowingLists({ client, accountId }) {
  return client.get(`accounts/${accountId}/lists`);
}

export async function getListAccounts({ client, listId, limit = 0, maxId }) {
  const res = await client.get(`lists/${listId}/accounts`, {
    params: { limit, max_id: maxId },
  });

  const { data } = res;
  return {
    listId,
    accounts: data,
  };
}
