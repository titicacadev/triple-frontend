import styled, { css } from 'styled-components'
import List from './list'
import * as CSS from 'csstype'

export const ImageCarouselElementContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 60px);

  margin-left: 15px;

  &:first-child {
    margin-left: 30px;
  }
  &:last-child {
    margin-right: 30px;
  }
`

export const ImageBlockElementContainer = styled.div`
  margin: 0 30px 0 30px;
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

// eslint-disable-next-line no-unexpected-multiline
export const SquareImage = styled.img<{
  size?: string
  borderRadius?: number
  floated?: CSS.FloatProperty
}>`
  width: ${({ size = 'medium' }) => ({ small: 40, medium: 140 }[size])}px;
  height: ${({ size = 'medium' }) => ({ small: 40, medium: 140 }[size])}px;
  border-radius: ${({ size = 'medium' }) => ({ small: 2, medium: 6 }[size])}px;

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
  font-size: 15px;
  font-weight: bold;
  color: #2987f0;
  text-decoration: underline;
  cursor: pointer;
`
