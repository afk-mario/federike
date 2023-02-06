export function filterFollowing(item, filter) {
  return item.acct.includes(filter);
}

export function getListsFromCacheData(listsData, followingId) {
  const a = listsData
    .map((item) => {
      const [, data] = item;
      const { listId, accounts } = data || {};

      return {
        listId,
        accounts: new Set(accounts?.map((account) => account.id)),
      };
    })
    .filter((item) => item.accounts.has(followingId))
    .map((item) => item.listId);
  return a;
}

export function getListsFromQueries(queries, followingId) {
  const res = queries
    .map((query) => {
      const { data } = query;
      const { listId, accounts } = data || {};
      return {
        listId,
        accounts: new Set(accounts?.map((account) => account.id)),
      };
    })
    .filter((item) => item.accounts.has(followingId))
    .map((item) => item.listId);
  return res;
}

export function getInstanceFromAcct(acct) {
  const arr = acct.split("@");
  const instance = arr.length > 1 ? arr[1] : "";
  return instance;
}

export function getSortedItems(items, sort) {
  switch (sort) {
    case "date-dsc":
      return items;
    case "date-asc":
      return [...items].reverse();

    case "instance-dsc":
      return items.sort(
        (a, b) => getInstanceFromAcct(a.acct) < getInstanceFromAcct(b.acct)
      );
    case "instance-asc":
      return items.sort(
        (a, b) => getInstanceFromAcct(a.acct) > getInstanceFromAcct(b.acct)
      );

    case "username-dsc":
      return items.sort((a, b) => a.username < b.username);
    case "username-asc":
      return items.sort((a, b) => a.username > b.username);

    case "displayname-dsc":
      return items.sort((a, b) => a.display_name < b.display_name);
    case "displayname-asc":
      return items.sort((a, b) => a.display_name > b.display_name);
    case "lists-dsc":
      return items.sort((a, b) => {
        const listsA = a.lists.map((item) => item.title).join();
        const listsB = b.lists.map((item) => item.title).join();
        return listsA < listsB;
      });

    case "lists-asc":
      return items.sort((a, b) => {
        const listsA = a.lists.map((item) => item.title).join();
        const listsB = b.lists.map((item) => item.title).join();
        return listsA > listsB;
      });

    case "statuses-count-dsc":
      return items.sort((a, b) => a.statuses_count < b.statuses_count);
    case "statuses-count-asc":
      return items.sort((a, b) => a.statuses_count > b.statuses_count);

    case "last-status-at-dsc":
      return items.sort(
        (a, b) => new Date(a.last_status_at) < new Date(b.last_status_at)
      );
    case "last-status-at-asc":
      return items.sort(
        (a, b) => new Date(a.last_status_at) > new Date(b.last_status_at)
      );
    default:
      console.warn("sorting not supported", sort);
      return items;
  }
}
