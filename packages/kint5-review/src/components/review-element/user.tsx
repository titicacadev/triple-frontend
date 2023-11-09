import { PropsWithChildren, MouseEventHandler } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import { Container, Text } from '@titicaca/kint5-core-elements'

import { BaseUserFragment } from '../../data/graphql'

const UserPhoto = styled.img`
  margin-right: 9px;
  width: 40px;
  height: 40px;
  background-color: #efefef;
  border-radius: 19px;
  object-fit: cover;
`

export default function User({
  user: { photo, name, userBoard, unregister },
  onClick,
}: {
  onClick?: MouseEventHandler
  user: BaseUserFragment
}) {
  const { t } = useTranslation('common-web')

  const { reviewsV2: reviewsCount } = userBoard || {}

  return (
    <Container
      display="flex"
      css={{
        padding: '0 0 2px',
      }}
    >
      {photo ? <UserPhoto src={photo} onClick={onClick} /> : null}
      <Container css={{ paddingTop: 2 }}>
        <Name onClick={onClick}>{name}</Name>
        {!unregister ? (
          <Text
            onClick={onClick}
            css={{
              fontSize: 13,
              fontWeight: 400,
              color: 'var(--color-kint5-gray60)',
              marginTop: 4,
            }}
          >
            {reviewsCount
              ? t(['reviewscount-gaeyi-ribyu', '{{reviewsCount}}개의 리뷰'], {
                  reviewsCount,
                })
              : null}
          </Text>
        ) : null}
      </Container>
    </Container>
  )
}

function Name({
  onClick,
  children,
}: PropsWithChildren<{ onClick?: MouseEventHandler<HTMLDivElement> }>) {
  return (
    <Text
      onClick={onClick}
      css={{ fontSize: 14, fontWeight: 700, wordBreak: 'break-word' }}
    >
      {children}
    </Text>
  )
}
