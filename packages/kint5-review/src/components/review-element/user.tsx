import { MouseEventHandler } from 'react'
import styled from 'styled-components'
import {
  Container,
  FlexBox,
  Text,
  ThumbnailBorder,
} from '@titicaca/kint5-core-elements'

import { BaseUserFragment } from '../../data/graphql'

const UserPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`

export default function User({
  user: { photo, name },
  onClick,
}: {
  onClick?: MouseEventHandler
  user: BaseUserFragment
}) {
  return (
    <FlexBox
      flex
      css={{
        padding: '0 0 2px',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <Container
        css={{
          position: 'relative',
          borderRadius: '50%',
          width: 40,
          height: 40,
        }}
      >
        {photo ? <UserPhoto src={photo} onClick={onClick} /> : null}
        <ThumbnailBorder css={{ borderRadius: '50%' }} />
      </Container>
      <Text css={{ fontSize: 14, fontWeight: 700, wordBreak: 'break-word' }}>
        {name}
      </Text>
    </FlexBox>
  )
}
