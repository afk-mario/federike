export function getData(data) {
  if (!data) return [];

  const { pages } = data;
  const list = pages.map((page) => page.data).flat();

  return list;
}
