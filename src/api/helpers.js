export function parseLinkHeader(link) {
  return link
    .split(", ")
    .map((item) => item.split("; "))
    .map(([link, rel]) => {
      return {
        link: new URL(link.replace("<", "").replace(">", "")),
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
