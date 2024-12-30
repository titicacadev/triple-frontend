import { styled } from 'styled-components'
import { marginMixin, MarginPadding } from '@titicaca/tds-ui'

const StyledTable = styled.table<{ $margin?: MarginPadding }>`
  width: 100%;
  border-collapse: collapse;

  ${({ $margin }) => marginMixin({ margin: $margin })}
`

export default function FluidTable({
  id,
  children,
  margin,
}: {
  id?: string
  children?: React.ReactNode
  margin?: MarginPadding
}) {
  return (
    <StyledTable id={id} $margin={margin}>
      {children}
    </StyledTable>
  )
}
