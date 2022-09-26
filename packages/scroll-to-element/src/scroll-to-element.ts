import { scroll } from './scroll'
import { calculateScrollOffset } from './scroll-position-calculators'
import { ScrollOptions } from './types'

export default function scrollToElement(
  element: Element,
  options: ScrollOptions,
) {
  if (!element) {
    return
  }

  return scroll({
    x: 0,
    y: calculateScrollOffset({
      element,
      offset: options.offset,
      alignment: options.align,
    }),
    options,
  })
}
