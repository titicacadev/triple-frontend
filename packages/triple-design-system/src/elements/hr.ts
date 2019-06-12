import styled, { css } from 'styled-components'
import { MarginPadding } from '../commons/common-interfaces'

interface HRProp {
  compact?: boolean
  margin?: MarginPadding
}

export const HR1 = styled.div<HRProp>`
  margin: 50px 30px;
  height: 1px;
  background-color: #efefef;

  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};
`

export const HR2 = styled.div<HRProp>`
  margin: 50px 0;
  height: 10px;
  background-color: #efefef;

  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};
`

export const HR3 = styled.div<{ height?: number }>`
  margin: 0;
  height: ${({ height }) => height || 10}px;
  background-color: transparent;
`

export const HR4 = styled.div`
  margin: 40px auto;
  width: 130px;
  height: 37px;
  background-repeat: no-repeat;
  background-size: 130px 37px;
  background-image: url(https://assets.triple.guide/images/img-line1@2x.png);
`

export const HR5 = styled.div`
  margin: 40px auto;
  width: 130px;
  height: 37px;
  background-repeat: no-repeat;
  background-size: 130px 37px;
  background-image: url(https://assets.triple.guide/images/img-line2@2x.png);
`

export const HR6 = styled.div`
  margin: 40px auto;
  width: 130px;
  height: 37px;
  background-repeat: no-repeat;
  background-size: 130px 37px;
  background-image: url(https://assets.triple.guide/images/img-line3@2x.png);
`
