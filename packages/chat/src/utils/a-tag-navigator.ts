import { MouseEvent } from 'react'

import { TextBubbleProp } from '../bubble/type'

export default function useATagNavigator(
  onLinkClick?: TextBubbleProp['onLinkClick'],
) {
  const aTagNavigator = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const eventTarget = event.target as HTMLElement

    if (eventTarget.tagName === 'A') {
      const href = eventTarget.getAttribute('href') ?? ''

      if (href) {
        if (onLinkClick) {
          onLinkClick(href)
        } else {
          window.open(href, '_blank', 'noopener')
        }
      }
    }
  }

  return aTagNavigator
}
