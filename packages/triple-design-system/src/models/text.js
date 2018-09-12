import React from 'react'
import styled, { css } from 'styled-components'
import Text from '../elements/text'

const Margin = styled.div`
  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};
`

export function H1({ headline, emphasize, margin, children, ...props }) {
  return (
    <Margin margin={margin}>
      {headline && (
        <Text bold size="tiny" color="blue" alpha={1} margin={{ bottom: 3 }}>
          {headline}
        </Text>
      )}
      <Text
        bold
        size="huge"
        color={emphasize ? 'blue' : 'gray'}
        alpha={1}
        {...props}
      >
        {children}
      </Text>
    </Margin>
  )
}

export function H2({ children, ...props }) {
  return (
    <Text size="big" color="gray" alpha={1} {...props}>
      {children}
    </Text>
  )
}

export function H3({ children, ...props }) {
  return (
    <Text bold size="large" color="gray" alpha={1} {...props}>
      {children}
    </Text>
  )
}

export function H4({ children, ...props }) {
  return (
    <Text bold size="large" color="blue" alpha={1} {...props}>
      {children}
    </Text>
  )
}

export function Paragraph({ children, ...props }) {
  return (
    <Text lineHeight={1.5} {...props}>
      {children}
    </Text>
  )
}
