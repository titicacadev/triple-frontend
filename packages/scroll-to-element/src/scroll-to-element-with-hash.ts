import { scroll, calculateScrollOffset } from './scroll'
import { ScrollOptions } from './types'

export function scrollToElementWithHash({
  hash,
  allowedHash,
  options,
}: {
  hash: string
  allowedHash: string[]
  options: ScrollOptions
}) {
  if (hash && allowedHash.includes(hash)) {
    setTimeout(() => {
      const element = document.getElementById(hash.replace('#', ''))

      if (element) {
        return
      }

      scroll({
        x: 0,
        y: calculateScrollOffset({
          element,
          offset: options.offset,
          alignment: options.align,
        }),
        options,
      })
    }, 1500)
  }
}
