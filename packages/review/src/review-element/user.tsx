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
  user: {
    photo,
    name,
    userBoard: { reviewsV2 },
    mileage,
  },
  onClick,
  children,
}: PropsWithChildren<{
  onClick?: MouseEventHandler
  user: UserData
}>) {
  const {
    badges: [badge],
  } = mileage || { badges: [undefined] }

  return (
    <Container padding={{ bottom: 2 }}>
      <UserPhoto src={photo} onClick={onClick} />
      {badge && <Badge src={badge.icon.imageUrl} />}
      <Name onClick={onClick}>{name}</Name>
      <UserExtra>
        <span onClick={onClick}>{reviewsV2}개의 리뷰</span>
        {children}
      </UserExtra>
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
