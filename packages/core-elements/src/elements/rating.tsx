import * as React from 'react'
import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import { GlobalSizes } from '../commons'

const SIZES: Partial<Record<GlobalSizes, string>> = {
  tiny: '14px',
  small: '16px',
  medium: '30px',
}

const MARGINS: Partial<Record<GlobalSizes, string>> = {
  small: '0',
  medium: '0.5px',
}

const IMAGE_PREFIXES: Partial<Record<GlobalSizes, string>> = {
  tiny: 'https://assets.triple.guide/images/img-review-star',
  small: 'https://assets.triple.guide/images/img-review-star',
  medium: 'https://assets.triple.guide/images/img-review-star-medium',
}

// eslint-disable-next-line no-unexpected-multiline
const RatingStar = styled.span<{
  verticalAlign?: CSS.VerticalAlignProperty<string>
  size?: GlobalSizes
  full?: boolean
  half?: boolean
}>`
  display: inline-block;
  vertical-align: ${({ verticalAlign }) => verticalAlign || 'text-bottom'};

  ${({ size = 'small', full, half }) => css`
    width: ${SIZES[size]};
    height: ${SIZES[size]};
    margin: 0 ${MARGINS[size]};
    background-size: ${SIZES[size]} ${SIZES[size]};

    background-image: url(${IMAGE_PREFIXES[size]}-${full
        ? 'full'
        : half
        ? 'half'
        : 'empty'}@4x.png);
  `};
`

export default function Rating({
  size,
  score = 0,
  verticalAlign,
  onClick,
}: {
  size?: GlobalSizes
  score?: number
  verticalAlign?: CSS.VerticalAlignProperty<string>
  onClick?: (event: React.SyntheticEvent, rating: number) => any
}) {
  const full = Math.floor(score)
  const half = Math.floor((score - full) * 2)
  const empty = 5 - full - half

  return (
    <>
      {[...Array(full)].map((_, i: number) => (
        <RatingStar
          key={`full-${i}`}
          size={size}
          verticalAlign={verticalAlign}
          full
          onClick={onClick ? (e) => onClick(e, i + 1) : undefined}
        />
      ))}
      {[...Array(half)].map((_, i) => (
        <RatingStar
          key={`half-${i}`}
          size={size}
          verticalAlign={verticalAlign}
          half
          onClick={onClick ? (e) => onClick(e, full + i + 1) : undefined}
        />
      ))}
      {[...Array(empty)].map((_, i) => (
        <RatingStar
          key={`empty-${i}`}
          size={size}
          verticalAlign={verticalAlign}
          onClick={onClick ? (e) => onClick(e, full + half + i + 1) : undefined}
        />
      ))}
    </>
  )
}
