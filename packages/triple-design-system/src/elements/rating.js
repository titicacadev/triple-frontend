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
  medium:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/img-review-star-medium',
}

const RatingStar = styled.span`
  display: inline-block;
  vertical-align: text-bottom;

  ${({ size = 'small', full, half }) => css`
    width: ${SIZES[size]};
    height: ${SIZES[size]};
    margin: 0 ${MARGINS[size]};
    background-size: ${SIZES[size]} ${SIZES[size]};

    background-image: url(${IMAGE_PREFIXES[size]}-${full
        ? 'full'
        : half
          ? 'half'
          : 'empty'}@2x.png);
  `};
`

export default function Rating({ size, score = 0 }) {
  const full = Math.floor(score)
  const half = Math.floor((score - full) * 2)
  const empty = 5 - full - half

  return (
    <>
      {[...Array(full)].map((_, i) => (
        <RatingStar key={`full-${i}`} size={size} full />
      ))}
      {[...Array(half)].map((_, i) => (
        <RatingStar key={`half-${i}`} size={size} half />
      ))}
      {[...Array(empty)].map((_, i) => (
        <RatingStar key={`empty-${i}`} size={size} />
      ))}
    </>
  )
}
