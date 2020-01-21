import React, { PropsWithChildren, MouseEventHandler } from 'react'
import styled from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'

interface UserData {
  photo: string
  name: string
  userBoard: {
    reviews: number
  }
  mileage: {
    badges: {
      icon: {
        imageUrl: string
      }
    }[]
    level: number
    point: number
  }
}

const UserPhoto = styled.img`
  margin-right: 9px;
  width: 38px;
  height: 38px;
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
      <UserExtra>
        <span onClick={onClick}>
          {level ? `LEVEL ${level} / ${point}포인트` : `${point}포인트`}
        </span>
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
    <Text bold size="large" color="gray" onClick={onClick}>
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
      margin={{ top: 4 }}
      bold
      size="mini"
      color="gray"
      alpha={0.3}
      onClick={onClick}
    >
      {children}
    </Text>
  )
}
