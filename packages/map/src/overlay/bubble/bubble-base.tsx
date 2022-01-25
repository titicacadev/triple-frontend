import React, {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
} from 'react'
import { OverlayViewProps } from '@react-google-maps/api'
import styled, { css } from 'styled-components'
import { ExternalLink } from '@titicaca/router'

import {
  CircleType,
  MarkerBaseProps,
} from '../circle-marker/circle-marker-base'

export interface BubbleBaseProps
  extends Pick<MarkerBaseProps, 'active' | 'zIndex' | 'color'>,
    Omit<OverlayViewProps, 'mapPaneName'> {
  id: string
  type: CircleType
  imageUrl: string
  linkText?: string | null
  onClick?: (e: MouseEvent) => void
  onBubbleClick?: (e: MouseEvent) => void
  onAnimationEnd?: (e: React.SyntheticEvent) => void
}

const BUBBLE_HEIGHT = 32

const BubbleMarkerContainer = styled.div<Pick<BubbleBaseProps, 'active'>>`
  position: relative;
  ${({ active }) =>
    css`
      left: -8px;
      top: -${8 + (active ? BUBBLE_HEIGHT : 0)}px;
      width: 32px;
      height: 32px;
      pointer-events: ${active ? 'none' : 'auto'};
    `}
`

// 각 프로젝트 에서도 개별적으로 사용해야 하기 때문에 export
export const BubbleCircle = styled.div<{ color: string }>`
  position: absolute;
  z-index: 1;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.15);
  left: 3px;
  top: 3px;
  width: 13px;
  height: 13px;
  background-color: ${({ color }) => color};
  > svg {
    padding-top: 4px;
  }
`

const PoiDetailLink = styled.div`
  position: relative;
  background: #ffffff;
  height: ${BUBBLE_HEIGHT}px;
  top: -${13 + BUBBLE_HEIGHT}px;
  left: calc(-50% + 1px);
  border-radius: 16px;
  line-height: ${BUBBLE_HEIGHT}px;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  :after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: #ffffff00;
    border-top-color: #ffffff;
    border-width: 7px;
    margin-left: -7px;
  }
`

const LinkLabel = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 170px;
  color: black;
`

/**
 * 기존 scrap, small marker에 사용되는 link와 marker를 컴포넌트로 정의하고
 * 각각 scrap, small에서 사용되는 메서드들이 다르기에 wrapper 형태로 만들어
 * wrapper 컴포넌트 안에 렌더링 시키는 구조
 * LinkBubbleWrapper or HeartBubbleWrapper 안에 넣어줘야 함
 * <LinkBubbleWrapper {...props}>
 *   {active && <NavigateToPoiDetailLink {...props}>}
 *   <BubbleMarker {...props}/>
 *   </LinkBubbleWrapper>
 **/
export function NavigateToPoiDetailLink({
  id: poiId,
  type: poiType,
  linkText,
  onClick,
}: PropsWithChildren<
  Pick<BubbleBaseProps, 'id' | 'type' | 'linkText'> & {
    onClick: MouseEventHandler<HTMLDivElement>
  }
>) {
  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      onClick && onClick(e)
    },
    [onClick],
  )
  return (
    <PoiDetailLink onClick={handleClick}>
      <ExternalLink href={`/${poiType}s/${poiId}`} target="new" noNavbar>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <LinkLabel>{linkText}</LinkLabel>
        </a>
      </ExternalLink>
    </PoiDetailLink>
  )
}

export function BubbleMarker({
  color,
  active,
  onBubbleClick,
  children,
}: PropsWithChildren<
  Pick<BubbleBaseProps, 'color' | 'active'> & {
    onBubbleClick: MouseEventHandler<HTMLDivElement>
  }
>) {
  const handleBubbleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      onBubbleClick && onBubbleClick(e)
    },
    [onBubbleClick],
  )
  return (
    <BubbleMarkerContainer onClick={handleBubbleClick} active={active}>
      <BubbleCircle color={color}>{children}</BubbleCircle>
    </BubbleMarkerContainer>
  )
}
