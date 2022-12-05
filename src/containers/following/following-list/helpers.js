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

    default:
      console.warn("sorting not supported", sort);
      return items;
  }
}
