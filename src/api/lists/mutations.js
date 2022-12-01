export async function addAccountToList({ client, listId, accountIds }) {
  return client.post(`lists/${listId}/accounts`, {
    account_ids: accountIds,
  });
}

export async function removeAccountToList({ client, listId, accountIds }) {
  console.log("delete", listId, accountIds);
  return client.delete(`lists/${listId}/accounts`, {
    data: {
      account_ids: accountIds,
    },
  });
}
