import { PropsWithChildren, SyntheticEvent } from 'react'
import styled, { css } from 'styled-components'
import { Text } from '@titicaca/core-elements'

type StyleType = 'SCHEDULE' | 'PEOPLE' | 'ORIGIN' | 'DESTINATION' | 'SEARCH'

const STYLE_BY_TYPES: { [type in StyleType]: ReturnType<typeof css> } = {
  /* eslint-disable @typescript-eslint/naming-convention */
  SCHEDULE: css`
    background: url('https://assets.triple.guide/images/img-hub-date@3x.png')
      center center no-repeat;
  `,
  PEOPLE: css`
    background: url('https://assets.triple.guide/images/img-hub-people@3x.png')
      center center no-repeat;
  `,
  ORIGIN: css`
    background: url('https://assets.triple.guide/images/img-hub-departure@3x.png')
      center center no-repeat;
  `,
  DESTINATION: css`
    background: url('https://assets.triple.guide/images/img-hub-arrival@3x.png')
      center center no-repeat;
  `,
  SEARCH: css`
    background: url('https://assets.triple.guide/images/img-hub-search@3x.png')
      center center no-repeat;
  `,
  /* eslint-enable @typescript-eslint/naming-convention */
}

const CellContainer = styled.div<{ type: StyleType }>`
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

function Cell({
  type,
  placeholder,
  value,
  onClick,
}: {
  type: StyleType
  placeholder?: string
  value?: string
  onClick?: (e: SyntheticEvent) => void
}) {
  return (
    <CellContainer type={type} onClick={onClick}>
      {value ? (
        <Value>{value}</Value>
      ) : (
        <Placeholder>{placeholder || ''}</Placeholder>
      )}
    </CellContainer>
  )
}

function Value({ children }: PropsWithChildren<unknown>) {
  return (
    <Text size="medium" bold lineHeight="17px">
      {children}
    </Text>
  )
}

function Placeholder({ children }: PropsWithChildren<unknown>) {
  return (
    <Text color="gray" size="medium" bold alpha={0.3} lineHeight="17px">
      {children}
    </Text>
  )
}

export default Cell
