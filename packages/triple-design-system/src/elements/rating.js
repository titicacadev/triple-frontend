import React from 'react'
import styled, { css } from 'styled-components'

const SIZES = {
  tiny: '14px',
  small: '16px',
  medium: '30px',
}

const MARGINS = {
  small: '0',
  medium: '3.5px',
}

const IMAGE_PREFIXES = {
  tiny: 'https://assets.triple.guide/images/img-review-star',
  small: 'https://assets.triple.guide/images/img-review-star',
  medium: 'https://assets.triple.guide/images/img-review-star-medium',
}

const RatingStar = styled.span`
  display: inline-block;
  vertical-align: ${({ verticalAlign }) =>
    verticalAlign ? verticalAlign : 'text-bottom'};

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

export default function Rating({ size, score = 0, verticalAlign, onClick }) {
  const full = Math.floor(score)
  const half = Math.floor((score - full) * 2)
  const empty = 5 - full - half

  return (
    <>
      {[...Array(full)].map((_, i) => (
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
          onClick={onClick ? (e) => onClick(e, i + 1) : undefined}
        />
      ))}
      {[...Array(empty)].map((_, i) => (
        <RatingStar
          key={`empty-${i}`}
          size={size}
          verticalAlign={verticalAlign}
          onClick={onClick ? (e) => onClick(e, i + 1) : undefined}
        />
      ))}
    </>
  )
}
