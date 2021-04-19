import React, { useCallback } from 'react'
import { Text, Paragraph } from '@titicaca/core-elements'

import { useLinkClickHandler } from '../../prop-context/link-click-handler'

export default function TextElement({
  value: { text, rawHTML },
  compact,
  ...props
}: any) {
  const onLinkClick = useLinkClickHandler()

  const handleClick = useCallback(
    (e: React.SyntheticEvent) => {
      const target = e.target as HTMLElement

      if (target.tagName === 'A') {
        e.preventDefault()
        e.stopPropagation()

        if (!onLinkClick) {
          // TODO: triple-document 에러 리포팅 로직 설계하기
          return null
        }

        onLinkClick(e, {
          href: target?.getAttribute('href') || undefined,
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
