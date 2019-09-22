export function formatNumber(number) {
  return number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
