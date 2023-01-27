import { SyntheticEvent } from 'react'

import { Link, LinkEventHandler } from '../types'

export function generateLinkClickHandler(
  onLinkClick?: LinkEventHandler,
): (e: SyntheticEvent, link?: Link) => void {
  return (e, link) => {
    if (link && onLinkClick) {
      return onLinkClick(e, link)
    }
  }
}
