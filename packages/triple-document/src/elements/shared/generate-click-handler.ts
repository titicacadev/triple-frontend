import { scrollToElement } from '@titicaca/scroll-to-element'

import { LinkEventHandler, ImageEventHandler } from '../../types'

export default function generateClickHandler(
  onLinkClick?: LinkEventHandler,
  onImageClick?: ImageEventHandler,
): ImageEventHandler {
  return (e, image) => {
    if (image.link && onLinkClick) {
      const { hash, href } = image.link

      if (hash) {
        const targetElement = document.querySelector(`#${hash}`)
        if (targetElement) {
          scrollToElement(targetElement, {
            offset: 0,
            duration: 600,
          })
        }
        return
      }

      return onLinkClick(e, { href })
    } else if (onImageClick) {
      return onImageClick(e, image)
    }
  }
}
