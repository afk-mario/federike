export function parseLinkHeader(link) {
  return link
    .split(", ")
    .map((item) => item.split("; "))
    .map(([headerLink, rel]) => {
      return {
        link: new URL(headerLink.replace("<", "").replace(">", "")),
        rel,
      };
    });
}

export function getNextPageParam(lastPage) {
  const { link } = lastPage.headers;
  const links = parseLinkHeader(link);
  const next = links.find((item) => item.rel === `rel="next"`);

  if (!next) return null;

  const params = {
    maxId: next.link.searchParams.get("max_id"),
  };
  return params;
}

export function getAllItemsFromPaginatedRes(data) {
  if (!data) return [];

  const { pages } = data;
  const list = pages.map((page) => page.data).flat();

  return list;
}
