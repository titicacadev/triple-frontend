export function formatNumber(
  number: number | string | null | undefined,
): string {
  if (typeof number === 'number' || typeof number === 'string') {
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return '0'
}
