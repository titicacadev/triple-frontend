import React from 'react'
import styled from 'styled-components'

import { Text } from '@titicaca/core-elements'

import { Content } from './index'

const Icon = styled.img`
  float: right;
  width: 6px;
  height: 17px;
  padding: 10px 0 10px 0;
`

export default function AuthorContent({
  content,
  onClick,
}: {
  content: Content
  onClick?: ({ content: Content }) => any
}) {
  return (
    <div onClick={() => onClick({ content })}>
      <Text
        inlineBlock
        color="gray"
        size="small"
        opacity={0.7}
        padding={{ top: 10, bottom: 10 }}
        lineHeight={1.22}
      >
        {content.title}
      </Text>
      <Icon src="https://assets.triple-dev.titicaca-corp.com/images/btn-contents-magazine-more@3x.png" />
    </div>
  )
}
