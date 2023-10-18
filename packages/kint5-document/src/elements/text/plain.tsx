import { useCallback, SyntheticEvent } from 'react'
import { Text, Paragraph } from '@titicaca/kint5-core-elements'
import styled from 'styled-components'

import { useLinkClickHandler } from '../../prop-context/link-click-handler'

const TextHtml = styled(Text)`
  color: var(--color-kint5-gray100);
  font-weight: 400;
  white-space: ${({ whiteSpace }) => whiteSpace || 'normal'};

  p {
    margin: 1.5rem 0 0;
  }

  p:first-of-type {
    margin-top: 0;
  }

  /* HACK: global-style의 underline 설정보다 우선하도록 수정 */
  && {
    a {
      font-size: 14px;
      font-weight: bold;
      color: var(--color-kint5-brand1);
    }
  }
`

export default function TextElement({
  value: { text, rawHTML },
  compact,
  ...props
}: {
  value: { text: string; rawHTML: string }
  compact: boolean
}) {
  const onLinkClick = useLinkClickHandler()

  const handleClick = useCallback(
    (e: SyntheticEvent) => {
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
      <TextHtml
        margin={compact ? { top: 4 } : { top: 10 }}
        dangerouslySetInnerHTML={{ __html: rawHTML }}
        onClick={handleClick}
        {...props}
      />
    )
  }

  return (
    <Paragraph
      css={{
        color: 'var(--color-kint5-gray100)',
        fontWeight: 400,
        margin: compact ? '4px 16px 0' : '10px 16px 0',
      }}
      {...props}
    >
      {text}
    </Paragraph>
  )
}
