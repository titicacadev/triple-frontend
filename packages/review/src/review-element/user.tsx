import React, { PropsWithChildren, MouseEventHandler } from 'react'
import styled from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'

import { UserData } from '../types'

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
  user: { photo, name, mileage },
  onClick,
  children,
}: PropsWithChildren<{
  onClick?: MouseEventHandler
  user: UserData
}>) {
  const {
    badges: [badge],
    level,
    point,
  } = mileage || { badges: [undefined], level: 0, point: 0 }

  return (
    <Container padding={{ bottom: 2 }}>
      <UserPhoto src={photo} onClick={onClick} />
      {badge && <Badge src={badge.icon.imageUrl} />}
      <Name onClick={onClick}>{name}</Name>
      {level || point ? (
        <UserExtra>
          <span onClick={onClick}>
            {[level && `LEVEL ${level}`, point && `${point}포인트`]
              .filter(Boolean)
              .join(' · ') || null}
          </span>
        </UserExtra>
      ) : null}
      {children}
    </Container>
  )
}

function Name({
  onClick,
  children,
}: PropsWithChildren<{ onClick?: MouseEventHandler<HTMLDivElement> }>) {
  return (
    <Text bold size="medium" onClick={onClick}>
      {children}
    </Text>
  )
}

function UserExtra({
  onClick,
  children,
}: PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLDivElement>
}>) {
  return (
    <Text
      margin={{ top: 3 }}
      size="mini"
      color="gray"
      alpha={0.4}
      onClick={onClick}
    >
      {children}
    </Text>
  )
}
