import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Container, FlexBox, Text } from '@titicaca/core-elements'
import { useTranslation } from '@titicaca/next-i18next'

import { PinnedMessageData } from '../types'

interface PinnedMessageProps {
  pinnedMessage: PinnedMessageData
  onShowMoreClick: MouseEventHandler<HTMLButtonElement>
}

const ShowMoreButton = styled.button`
  color: var(--color-blue);
`

export function PinnedMessage({
  pinnedMessage,
  onShowMoreClick,
}: PinnedMessageProps) {
  const { t } = useTranslation('common-web')
  const textRef = useRef<HTMLDivElement>(null)
  const [isTextClamped, setIsTextClamped] = useState(false)

  const { content, writer, updatedAt } = pinnedMessage

  useEffect(() => {
    if (!textRef.current) {
      return
    }

    const textElement = textRef.current
    setIsTextClamped(textElement.scrollHeight > textElement.clientHeight)
  }, [])

  if (!content.markdownText) {
    return null
  }

  return (
    <Container
      css={{
        background: 'rgba(58, 58, 58, 0.03)',
        margin: '10px 0 20px',
        padding: 18,
        borderRadius: 10,
      }}
    >
      <FlexBox
        flex
        css={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 2,
        }}
      >
        <FlexBox flex css={{ alignItems: 'center' }}>
          <Text css={{ fontSize: 15, fontWeight: 700 }}>{writer.name}</Text>
          <img
            src="https://assets.triple.guide/images/img-badge-verified@4x.png"
            alt="verified badge"
            width={18}
            height={18}
          />
        </FlexBox>
        <Text
          css={{
            color: 'var(--color-gray300)',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {moment(updatedAt).format('MM.DD')}
        </Text>
      </FlexBox>
      <Text
        ref={textRef}
        maxLines={2}
        css={{ fontSize: 15, lineHeight: '20px' }}
      >
        {content.markdownText}
      </Text>
      {isTextClamped ? (
        <ShowMoreButton onClick={onShowMoreClick}>
          {t(['deobogi', '더보기'])}
        </ShowMoreButton>
      ) : null}
    </Container>
  )
}
