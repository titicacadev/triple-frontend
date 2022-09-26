export function debounce<Params extends unknown[]>(
  func: (...args: Params) => unknown,
  timeout: number,
): (...args: Params) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}
