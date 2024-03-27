import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { Button, FlexBox, Text } from '@titicaca/tds-ui'
import { useTranslation } from 'react-i18next'

import { BasePinnedMessageFragment } from '../../data/graphql'

interface PinnedMessageProps {
  pinnedMessage: BasePinnedMessageFragment
  onPinnedMessageClick: MouseEventHandler<HTMLButtonElement>
}

export function PinnedMessage({
  pinnedMessage,
  onPinnedMessageClick,
}: PinnedMessageProps) {
  const { t } = useTranslation('triple-frontend')
  const textRef = useRef<HTMLDivElement>(null)
  const [isTextClamped, setIsTextClamped] = useState(false)

  const {
    content: { text, markdownText },
    writer,
    updatedAt,
  } = pinnedMessage

  useEffect(() => {
    if (!textRef.current) {
      return
    }

    const textElement = textRef.current
    setIsTextClamped(textElement.scrollHeight > textElement.clientHeight)
  }, [])

  if (!text && !markdownText) {
    return null
  }

  return (
    <Button
      css={{
        display: 'block',
        width: '100%',
        background: 'rgba(58, 58, 58, 0.03)',
        textAlign: 'left',
        margin: '10px 0 20px',
        padding: 18,
        borderRadius: 10,
      }}
      onClick={onPinnedMessageClick}
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
          <Text css={{ fontSize: 15, fontWeight: 700 }}>{writer?.name}</Text>
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
        {text ?? markdownText}
      </Text>
      {isTextClamped ? (
        <Text css={{ color: 'var(--color-blue)' }}>{t('더보기')}</Text>
      ) : null}
    </Button>
  )
}
