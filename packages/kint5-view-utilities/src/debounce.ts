interface Option {
  leading?: boolean
  trailing?: boolean
}

export function debounce<Params extends unknown[]>(
  func: (...args: Params) => unknown,
  timeout: number,
  option?: Option,
): (...args: Params) => void {
  let timer: ReturnType<typeof setTimeout>
  let leadingCall = option?.leading ?? false
  const trailing = option?.trailing ?? true

  return (...args: Params) => {
    if (!timer && leadingCall) {
      func(...args)
    }

    clearTimeout(timer)
    timer = setTimeout(() => {
      if (trailing || !leadingCall) {
        func(...args)
      }
      if (leadingCall) {
        leadingCall = false
      }
    }, timeout)
  }
}
