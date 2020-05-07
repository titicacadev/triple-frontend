import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import { marginMixin, MarginPadding } from '@titicaca/core-elements'

export default styled.button<
  {
    margin?: MarginPadding
    floated?: CSS.FloatProperty
    center?: boolean
  } & Omit<React.HTMLAttributes<HTMLButtonElement>, 'margin'>
>`
  display: block;
  cursor: pointer;
  background: none;
  padding: 0;
  border: none;
  float: ${({ floated }) => floated || 'none'};
  color: rgba(54, 143, 255, 1);
  text-decoration: underline;
  font-size: 15px;
  font-weight: 500;
  ${({ center }) =>
    center &&
    css`
      width: 100%;
      text-align: center;
    `};

  ${marginMixin}
`
