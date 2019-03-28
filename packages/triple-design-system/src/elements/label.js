import React from 'react'
import styled, { css } from 'styled-components'

const COLORS = {
  blue: '55, 168, 255',
  purple: '151, 95, 255',
  red: '235, 46, 105',
}

function rgba({ color, alpha }) {
  return `rgba(${COLORS[color || 'purple']}, ${alpha || 1})`
}

const RadioLabel = styled.div`
  display: inline-block;
  padding-left: 9px;
  font-size: 14px;
  line-height: 17px;
  color: ${({ selected }) => (selected ? '#3a3a3a' : 'rgba(58, 58, 58, 0.3)')};
  background-image: url(${({ selected }) =>
    `https://assets.triple.guide/images/img-search-select-${
      selected ? 'on' : 'off'
    }@4x.png`});
  background-size: 5px 5px;
  background-position: left center;
  background-repeat: no-repeat;
  cursor: pointer;
`

const PROMO_SIZES = {
  small: {
    fontSize: 11,
    borderRadius: 1,
    height: 20,
    padding: '0 6px',
  },
  medium: {
    fontSize: 12,
    borderRadius: 2,
    height: 26,
    padding: '0 10px',
  },
}

export const PromoLabel = styled.div`
  display: inline-block;

  padding: ${({ size }) => PROMO_SIZES[size || 'small'].padding};
  border-radius: ${({ size }) => PROMO_SIZES[size || 'small'].borderRadius}px;
  line-height: ${({ size }) => PROMO_SIZES[size || 'small'].height}px;
  height: ${({ size }) => PROMO_SIZES[size || 'small'].height}px;
  font-size: ${({ size }) => PROMO_SIZES[size || 'small'].fontSize}px;
  font-family: sans-serif;

  ${({ emphasized }) =>
    emphasized
      ? css`
          font-weight: bold;
          background-color: ${({ color = 'purple' }) =>
            rgba({ color, alpha: 1 })};
          color: white;
        `
      : css`
          font-weight: normal;
          background-color: ${({ color = 'purple' }) =>
            rgba({ color, alpha: 0.1 })};
          color: ${({ color = 'purple' }) => rgba({ color, alpha: 1 })};
        `};
`

export default function Label({ radio, promo, children, ...props }) {
  if (radio) {
    return <RadioLabel {...props}>{children}</RadioLabel>
  } else if (promo) {
    return <PromoLabel {...props}>{children}</PromoLabel>
  }

  return children
}
