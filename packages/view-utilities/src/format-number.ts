export function formatNumber(
  number: number | string | null | undefined,
): string {
  if (typeof number === 'number' || typeof number === 'string') {
    return number
      .toString()
      .split('.')
      .reduce(
        (result, current, index) =>
          index === 0
            ? current.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : `${result}.${current}`,
        '',
      )
  }

  return ''
}
