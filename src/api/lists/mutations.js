export async function addAccountToList({ client, listId, accountIds }) {
  return client.post(`lists/${listId}/accounts`, {
    account_ids: accountIds,
  });
}

export async function removeAccountToList({ client, listId, accountIds }) {
  return client.delete(`lists/${listId}/accounts`, {
    data: {
      account_ids: accountIds,
    },
  });
}

export async function createList({ client, title, replies_policy }) {
  return client.post(`lists`, {
    title,
    replies_policy,
  });
}

export async function updateList({ client, listId, title, replies_policy }) {
  return client.put(`lists/${listId}`, {
    title,
    replies_policy,
  });
}

export async function deleteList({ client, listId }) {
  return client.delete(`lists/${listId}`);
}
