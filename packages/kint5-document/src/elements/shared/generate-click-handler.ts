import { LinkEventHandler, ImageEventHandler } from '../../types'

export default function generateClickHandler(
  onLinkClick?: LinkEventHandler,
  onImageClick?: ImageEventHandler,
): ImageEventHandler {
  return (e, image) => {
    if (image.link && image.link.href && onLinkClick) {
      return onLinkClick(e, image.link)
    } else if (onImageClick) {
      return onImageClick(e, image)
    }
  }
}
