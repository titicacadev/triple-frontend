import styled, { css, CSSProp } from 'styled-components'

import { shouldForwardProp } from '../../utils/should-forward-prop'

export interface HrProps {
  compact?: boolean
  color?: string
  css?: CSSProp
}

export const HR1 = styled.div.withConfig({ shouldForwardProp })<HrProps>`
  margin: 50px 30px;
  height: 1px;
  background-color: ${({ color }) => color || '#efefef'};

  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};
`

export const HR2 = styled.div.withConfig({ shouldForwardProp })<HrProps>`
  margin: 50px 0;
  height: 10px;
  background-color: #efefef;

  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};
`

export const HR3 = styled.div.withConfig({ shouldForwardProp })<{
  height?: number
}>`
  height: ${({ height }) => height || 10}px;
  background-color: transparent;
`

export const HR4 = styled.div.withConfig({ shouldForwardProp })`
  margin: 40px auto;
  width: 130px;
  height: 37px;
  background-repeat: no-repeat;
  background-size: 130px 37px;
  background-image: url('https://assets.triple.guide/images/img-line1@2x.png');
`

export const HR5 = styled.div.withConfig({ shouldForwardProp })`
  margin: 40px auto;
  width: 130px;
  height: 37px;
  background-repeat: no-repeat;
  background-size: 130px 37px;
  background-image: url('https://assets.triple.guide/images/img-line2@2x.png');
`

export const HR6 = styled.div.withConfig({ shouldForwardProp })`
  margin: 40px auto;
  width: 130px;
  height: 37px;
  background-repeat: no-repeat;
  background-size: 130px 37px;
  background-image: url('https://assets.triple.guide/images/img-line3@2x.png');
`

export const HR7 = styled.div.withConfig({ shouldForwardProp })<HrProps>`
  margin: 30px auto;
  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};
  width: 100%;
  border-bottom: dashed 1px #efefef;
`
