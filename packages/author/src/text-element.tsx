import React from 'react'
import styled from 'styled-components'
import { GetGlobalColor, Text } from '@titicaca/core-elements'

const AuthorIntro = styled.div`
  line-height: 1.43;
  margin: 21px 0 0 0;
  color: rgba(${GetGlobalColor('gray')}, 0.5);
  font-size: 14px;
  font-weight: 500;
  a {
    color: rgba(${GetGlobalColor('gray')}, 0.5);
  }
`

export default function TextElement(props: any) {
  const {
    value: { rawHTML, text },
  } = props
  console.log(props)
  if (rawHTML) {
    return <AuthorIntro dangerouslySetInnerHTML={{ __html: rawHTML }} />
  }
  return <Text>{text}</Text>
}
