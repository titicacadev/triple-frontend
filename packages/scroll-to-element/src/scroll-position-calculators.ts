export function initialScrollPosition(): {
  top: number
  left: number
} {
  const y =
    window.pageYOffset || (document.documentElement || document.body).scrollTop
  const x =
    window.pageXOffset || (document.documentElement || document.body).scrollLeft

  return { top: y, left: x }
}

export function calculateScrollOffset({
  element,
  offset = 0,
  alignment,
}: {
  element: Element
  offset?: number
  alignment?: string
}): number {
  const html = document.documentElement
  const clientHeight = html.clientHeight

  const documentHeight = getDocumentHeight()
  const scrollPosition = deriveScrollPosition(element, alignment)

  const maxScrollPosition = documentHeight - clientHeight

  return Math.min(
    scrollPosition + offset + window.pageYOffset,
    maxScrollPosition,
  )
}

function getDocumentHeight(): number {
  const body = document.body
  const html = document.documentElement

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  )
}

function deriveScrollPosition(element: Element, alignment?: string): number {
  const elementRect = element.getBoundingClientRect()
  const html = document.documentElement
  const clientHeight = html.clientHeight

  if (alignment === 'bottom') {
    return elementRect.bottom - clientHeight
  } else if (alignment === 'middle') {
    return elementRect.bottom - clientHeight / 2 - elementRect.height / 2
  } else {
    return elementRect.top
  }
}
