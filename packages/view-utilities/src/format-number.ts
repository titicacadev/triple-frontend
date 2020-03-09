export function formatNumber(
  number: number | string | null | undefined,
): string {
  if (typeof number === 'number' || typeof number === 'string') {
    const [integer, ...fractions] = number.toString().split('.')
    return [integer.replace(/\B(?=(\d{3})+(?!\d))/g, ','), ...fractions].join(
      '.',
    )
  }

  return ''
}
