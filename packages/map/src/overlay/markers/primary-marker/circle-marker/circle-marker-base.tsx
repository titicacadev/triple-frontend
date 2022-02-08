import styled, { css, keyframes } from 'styled-components'
import { Required } from 'utility-types'

// tna 추가예정
export type CircleType = 'attraction' | 'restaurant' | 'hotel'

/** 마커 종류의 따른 css 값 */
export const CIRCLE_MARKER: {
  [key in CircleType]: {
    color: string
    imageUrl: string
  }
} = {
  attraction: {
    color: 'var(--color-purple)',
    imageUrl:
      'https://assets.triple.guide/images/img-map-pin-attraction-on@3x.png',
  },
  restaurant: {
    color: 'var(--color-vermilion)',
    imageUrl:
      'https://assets.triple.guide/images/img-map-pin-restaurant-on@3x.png',
  },
  hotel: {
    color: 'var(--color-purple)',
    imageUrl: 'https://assets.triple.guide/images/img-map-pin-hotel-on@3x.png',
  },
}

export interface MarkerBaseProps {
  /** 마커 사이즈, 단위 px */
  width?: number
  height?: number
  /** 마커 선택 상태값 */
  active?: boolean
  /** active 시 image 클릭 가능 여부값 */
  alwaysClickable?: boolean
  /** 마커 기본 색상 */
  color?: string
  /** 활성화 마커 백그라운드 이미지 */
  src?: string
  /** 마커 zIndex */
  zIndex?: number
}

/** 맵 상에 표시해야할 마커의 총 개수 */
const MAX_ZINDEX_WEIGHT = 100

const bounce = keyframes`
  from {
    transform: scale(0.01);
  }
  to {
    transform: scale(1);
  }
`

const bounceAnimationMixin = css<{
  active: boolean
  animationDuration?: number
}>`
  will-change: transform;
  ${({ active, animationDuration = 400 }) => {
    return active
      ? css`
          animation: ${bounce} ${animationDuration}ms
            cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `
      : ''
  }};
`

function withActive({
  color,
  width,
  height,
  active,
}: Required<Omit<MarkerBaseProps, 'color' | 'src'>> & {
  color?: string
  src?: string
}) {
  return active
    ? css`
        left: 6px;
        top: 5px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        background-color: transparent;
      `
    : css`
        left: 0;
        top: 0;
        width: ${width}px;
        height: ${height}px;
        line-height: ${height}px;
        background-color: ${color};
        box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.15);
      `
}

export const Circle = styled.div`
  position: absolute;
  z-index: 1;
  color: var(--color-white);
  font-size: 12px;
  text-align: center;
  border-radius: 50%;
`

export const CirclePin = styled.div<
  Required<Omit<MarkerBaseProps, 'color' | 'src'>> & {
    color?: string
    src?: string
    animationDuration?: number
  }
>`
  position: absolute;
  transform-origin: 21px 50px;

  ${({ active, alwaysClickable }) =>
    active ? (alwaysClickable ? '' : 'pointer-events: none;') : ''}

  ${({ src, width, height, active, zIndex }) => {
    return active
      ? css`
          left: -21px;
          top: -50px;
          background: url(${src}) no-repeat 0 0;
          background-size: 42px 50px;
          width: 42px;
          height: 50px;
          z-index: ${MAX_ZINDEX_WEIGHT + zIndex};
        `
      : css`
          left: -${width / 2}px;
          top: -${height / 2}px;
          background: url(${src}) no-repeat 0 0;
          background-size: ${width}px ${height}px;
          width: ${width}px;
          height: ${height}px;
          z-index: ${zIndex};
        `
  }}

  ${bounceAnimationMixin}

  ${Circle} {
    ${(props) => withActive(props)}
  }
`
