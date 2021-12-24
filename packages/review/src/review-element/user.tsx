import React, { PropsWithChildren, MouseEventHandler } from 'react'
import styled from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'
import { ExternalLink } from '@titicaca/router'

import { UserData } from '../types'
import { generateUrl } from '@titicaca/view-utilities'
import { useEnv } from '@titicaca/react-contexts'

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

export default function User({
  user: {
    uid,
    photo,
    name,
    userBoard: { reviewsV2 },
    mileage,
    unregister,
  },
  onClick,
}: {
  onClick?: () => void
  user: UserData
}) {
  const { appUrlScheme } = useEnv()
  const {
    badges: [badge],
    level,
  } = mileage || { badges: [undefined] }

  return (
    <Container padding={{ bottom: 2 }} display="flex">
      <ExternalLink
        href={generateUrl({
          scheme: appUrlScheme,
          path: `/users/${uid}`,
        })}
        target="new"
        allowSource="app-with-session"
        noNavbar
        onClick={onClick}
      >
        <a>
          <UserPhoto src={photo} />
        </a>
      </ExternalLink>
      {badge && <Badge src={badge.icon.imageUrl} />}
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
            {level && level > 0 ? `LEVEL${level} / ` : ''}
            {reviewsV2}개의 리뷰
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
