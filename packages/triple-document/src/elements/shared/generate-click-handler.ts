import { LinkEventHandler, ImageEventHandler } from '../../types'

export default function generateClickHandler(
  onLinkClick?: LinkEventHandler,
  onImageClick?: ImageEventHandler,
): ImageEventHandler {
  return (e, image) => {
    if (image.link && onLinkClick) {
      const { hash, href: prevHref } = image.link
      const href = hash ? `#${hash}` : prevHref
      return onLinkClick(e, { href })
    } else if (onImageClick) {
      return onImageClick(e, image)
    }
  }
}
