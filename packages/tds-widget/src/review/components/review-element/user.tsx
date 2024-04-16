import { PropsWithChildren, MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Container, Text } from '@titicaca/tds-ui'

import { BaseUserFragment } from '../../data/graphql'

const UserPhoto = styled.img`
  margin-right: 9px;
  width: 36px;
  height: 36px;
  float: left;
  background-color: #efefef;
  border-radius: 19px;
  object-fit: cover;
`

const Badge = styled.img`
  position: absolute;
  top: 22px;
  left: 25px;
  width: 18px;
  height: 18px;
`

const DEFAULT_USER_PROFILE_IMAGE =
  'https://assets.triple.guide/images/ico-default-profile.svg'

export function User({
  user: { photo, name, userBoard, mileage, unregister },
  onClick,
}: {
  onClick?: MouseEventHandler
  user: BaseUserFragment
}) {
  const { t } = useTranslation('triple-frontend')

  const { reviewsV2: reviewsCount } = userBoard || {}
  const { badges = [], level } = mileage || {}

  return (
    <Container display="flex" css={{ marginBottom: 16 }}>
      <UserPhoto src={photo || DEFAULT_USER_PROFILE_IMAGE} onClick={onClick} />
      {badges?.[0]?.icon?.image_url ? (
        <Badge src={badges[0]?.icon.image_url} />
      ) : null}
      <div>
        <Name onClick={onClick}>{name}</Name>
        {!unregister ? (
          <Text
            margin={{ top: 3 }}
            size="mini"
            color="gray"
            alpha={0.4}
            onClick={onClick}
          >
            {level && level > 0 ? `LEVEL${level} / ` : null}
            {reviewsCount
              ? t('{{reviewsCount}}개의 리뷰', {
                  reviewsCount,
                })
              : null}
          </Text>
        ) : null}
      </div>
    </Container>
  )
}

function Name({
  onClick,
  children,
}: PropsWithChildren<{ onClick?: MouseEventHandler<HTMLDivElement> }>) {
  return (
    <Text bold size="medium" onClick={onClick} wordBreak="break-word">
      {children}
    </Text>
  )
}
