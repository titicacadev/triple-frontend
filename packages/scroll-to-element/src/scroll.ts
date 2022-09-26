import TWEEN from '@tweenjs/tween.js'

import { ScrollOptions } from './types'
import { initialScrollPosition } from './scroll-position-calculators'

export function scroll({
  x,
  y,
  options,
}: {
  x: number
  y: number
  options: ScrollOptions
}) {
  const startPosition = initialScrollPosition()

  const tween = new TWEEN.Tween(startPosition)

  tween
    .to({ top: y, left: x })
    .easing(TWEEN.Easing.Circular.Out)
    .duration(options.duration || 1000)
    .onUpdate((option) => window.scrollTo(option.left || 0, option.top || 0))
    .start()

  animate()

  return tween
}

function animate() {
  requestAnimationFrame(animate)

  TWEEN.update()
}
