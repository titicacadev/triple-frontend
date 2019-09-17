import * as React from 'react'
import styled from 'styled-components'
import { Container, Rating, Text } from '@titicaca/triple-design-system'

const PlaceholderContainer = styled(Container)`
  width: 100%;
  text-align: center;
`
export default function ReviewsPlaceholder({ children, onClick }) {
  return (
    <PlaceholderContainer margin={{ top: 20 }} onClick={onClick}>
      <Rating size="medium" onClick={onClick} />
      <Text
        margin={{ top: 12 }}
        size="large"
        color="gray"
        alpha={1}
        lineHeight={1.5}
      >
        {children}
      </Text>
    </PlaceholderContainer>
  )
}
