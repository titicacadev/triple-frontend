export function formatNumber(number: number): string {
  return number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
