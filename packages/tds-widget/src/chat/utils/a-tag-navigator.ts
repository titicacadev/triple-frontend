import { MouseEvent } from 'react'

import { TextBubbleProp } from '../bubble/type'

export default function useATagNavigator(
  onLinkClick?: TextBubbleProp['onLinkClick'],
) {
  const aTagNavigator = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const eventTarget = event.target as HTMLElement

    const href =
      eventTarget.tagName === 'A'
        ? (eventTarget.getAttribute('href') ?? '')
        : eventTarget.tagName === 'BUTTON'
          ? (eventTarget.getAttribute('data-link') ?? '')
          : ''

    if (href) {
      if (onLinkClick) {
        onLinkClick(href)
      } else {
        window.open(href, '_blank', 'noopener')
      }
    }
  }

  return aTagNavigator
}
