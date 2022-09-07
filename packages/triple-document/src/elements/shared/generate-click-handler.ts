import { LinkEventHandler, ImageEventHandler } from '../../types'

export default function generateClickHandler(
  onLinkClick?: LinkEventHandler,
  onImageClick?: ImageEventHandler,
): ImageEventHandler {
  return (e, image) => {
    const { href: prevHref, hash } = location
    if (image.link && image.link.hash && onLinkClick) {
      const href = prevHref.replace(hash, '') + `#${image.link.hash}`
      return onLinkClick(e, {
        href,
      })
    }
    if (image.link && image.link.href && onLinkClick) {
      return onLinkClick(e, image.link)
    } else if (onImageClick) {
      return onImageClick(e, image)
    }
  }
}
