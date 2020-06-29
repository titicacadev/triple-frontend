import React from 'react'
import styled, { css } from 'styled-components'
import { Text } from '@titicaca/core-elements'

const STYLE_BY_TYPES: { [type: string]: ReturnType<typeof css> } = {
  SCHEDULE: css`
    background: url('https://assets.triple-dev.titicaca-corp.com/images/img-hub-date@3x.png')
      center center no-repeat;
  `,
  PEOPLE: css`
    background: url('https://assets.triple-dev.titicaca-corp.com/images/img-hub-people@3x.png')
      center center no-repeat;
  `,
  ORIGIN: css`
    background: url('https://assets.triple-dev.titicaca-corp.com/images/img-hub-departure@3x.png')
      center center no-repeat;
  `,
  DESTINATION: css`
    background: url('https://assets.triple-dev.titicaca-corp.com/images/img-hub-arrival@3x.png')
      center center no-repeat;
  `,
}

const CellContainer = styled.div<{ type: string }>`
  position: relative;
  line-height: 17px;
  padding: 20px 0 20px 35px;
  font-size: 15px;
  font-weight: bold;
  &:before {
    content: '';
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -10px;
    box-sizing: border-box;
    ${({ type }) => STYLE_BY_TYPES[type]};
    background-size: 20px 20px;
  }
`

export default function Cell({
  type,
  placeholder,
  value,
}: {
  type: string
  placeholder?: string
  value?: string
}) {
  return (
    <CellContainer type={type}>
      {value ? (
        <Value>{value}</Value>
      ) : (
        <Placeholder>{placeholder || ''}</Placeholder>
      )}
    </CellContainer>
  )
}

function Value({ children }: React.PropsWithChildren<{}>) {
  return (
    <Text size="medium" bold lineHeight="17px">
      {children}
    </Text>
  )
}

function Placeholder({ children }: React.PropsWithChildren<{}>) {
  return (
    <Text color="gray" size="medium" bold alpha={0.3} lineHeight="17px">
      {children}
    </Text>
  )
}
