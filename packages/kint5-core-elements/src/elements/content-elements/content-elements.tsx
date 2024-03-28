import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import { AnchorHTMLAttributes, PropsWithChildren } from 'react'

export const ImageCarouselElementContainer = styled.div<{ maxWidth?: number }>`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth}px;
    `}

  &:not(:first-child) {
    margin-left: 12px;
  }

  &:last-child {
    margin-right: 16px;
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

export function SimpleLink({
  children,
  ...props
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <a
      css={{
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--color-kint5-brand1)',
        paddingRight: 12,
      }}
      {...props}
    >
      {children}
    </a>
  )
}
