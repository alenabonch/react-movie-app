export function getPageCount(totalAmount: number, limit: number): number {
  return Math.ceil(totalAmount / limit);
}
