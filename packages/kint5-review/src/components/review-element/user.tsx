import { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { FlexBox, Text } from '@titicaca/kint5-core-elements'

import { BaseUserFragment } from '../../data/graphql'

const UserPhoto = styled.img`
  margin-right: 8px;
  width: 40px;
  height: 40px;
  background-color: #efefef;
  border-radius: 19px;
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
      }}
    >
      {photo ? <UserPhoto src={photo} onClick={onClick} /> : null}
      <Text css={{ fontSize: 14, fontWeight: 700, wordBreak: 'break-word' }}>
        {name}
      </Text>
    </FlexBox>
  )
}
