import styled, { css } from 'styled-components'
import * as CSS from 'csstype'

import { List } from '../list'

export const ImageCarouselElementContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 100%;

  &:not(:first-child) {
    margin-left: 12px;
  }
`

export const ImageBlockElementContainer = styled.div`
  margin: 0 30px;

  &:not(:first-child) {
    margin-top: 10px;
  }
`

export const ImageCaption = styled.div`
  margin-top: 8px;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  color: rgba(58, 58, 58, 0.7);
  white-space: pre-wrap;
`

export const ResourceListItem = styled(List.Item)`
  height: 40px;
  margin: 20px 0;
  cursor: pointer;
`

export const SquareImage = styled.img<{
  size?: 'small' | 'medium'
  borderRadius?: number
  floated?: CSS.Property.Float
}>`
  width: ${({ size = 'medium' }) => ({ small: 60, medium: 140 })[size]}px;
  height: ${({ size = 'medium' }) => ({ small: 60, medium: 140 })[size]}px;
  border-radius: ${({ size = 'medium' }) => ({ small: 2, medium: 6 })[size]}px;
  background-color: #efefef;
  object-fit: cover;

  ${({ borderRadius }) =>
    borderRadius &&
    css`
      border-radius: ${borderRadius}px;
    `};

  ${({ floated }) =>
    floated &&
    css`
      float: ${floated};
    `};
`

export const FluidSquareImage = styled.div<{ src?: string }>`
  position: relative;
  width: 100%;
  background-color: #efefef;
  padding-bottom: 100%;
  height: 0;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center center;
`

export const SimpleLink = styled.a`
  font-size: 14px;
  font-weight: bold;
  color: var(--color-kint5-brand1);
  padding-right: 12px;
  background: url('https://assets.triple-dev.titicaca-corp.com/images/ic-arrow-1-line-24.svg')
    no-repeat 100% 50%;
`
