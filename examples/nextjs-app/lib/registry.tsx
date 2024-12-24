'use client'

import { useState, ReactNode } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import {
  ServerStyleSheet,
  StyleSheetManager,
  WebTarget,
} from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'

export default function StyledComponentsRegistry({
  children,
}: {
  children: ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') {
    return <>{children}</>
  }

  return (
    <StyleSheetManager
      sheet={styledComponentsStyleSheet.instance}
      shouldForwardProp={shouldForwardProp}
    >
      {children}
    </StyleSheetManager>
  )
}

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName: string, target: WebTarget) {
  if (typeof target === 'string') {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName)
  }
  // For other elements, forward all props
  return true
}
