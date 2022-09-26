import styled, { CSSProp } from 'styled-components'

interface Props {
  _css?: CSSProp
}

export const Primitive = styled('div')<Props>(
  {
    boxSizing: 'border-box',
  },
  (props) => props._css,
)
