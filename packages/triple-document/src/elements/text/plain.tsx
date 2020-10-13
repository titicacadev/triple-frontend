import React, { useCallback } from 'react'
import { Text, Paragraph } from '@titicaca/core-elements'

export default function TextElement({
  value: { text, rawHTML },
  compact,
  onLinkClick,
  ...props
}: any) {
  const handleClick = useCallback(
    (e: React.SyntheticEvent) => {
      const target = e.target as HTMLElement

      if (target.tagName === 'A') {
        e.preventDefault()
        e.stopPropagation()

        onLinkClick(e, {
          href: target?.getAttribute('href'),
          label: (target as HTMLAnchorElement)?.text,
        })
      }
    },
    [onLinkClick],
  )

  if (rawHTML) {
    return (
      <Text.Html
        margin={compact ? { top: 4 } : { top: 10, left: 30, right: 30 }}
        alpha={0.9}
        dangerouslySetInnerHTML={{ __html: rawHTML }}
        onClick={handleClick}
        {...props}
      />
    )
  }

  return (
    <Paragraph
      margin={compact ? { top: 4 } : { top: 10, left: 30, right: 30 }}
      {...props}
    >
      {text}
    </Paragraph>
  )
}
