export function getUserRecordIndex(
  page: number,
  perPage: number,
  index: number
) {
  return (page * perPage) + index + 1;
}
