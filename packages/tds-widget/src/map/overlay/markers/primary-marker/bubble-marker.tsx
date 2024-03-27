import { MouseEventHandler, PropsWithChildren } from 'react'
import styled from 'styled-components'

interface BubbleMarkerProps {
  onClick: MouseEventHandler<HTMLDivElement>
}

const BUBBLE_HEIGHT = 32

const LinkContainer = styled.div`
  position: relative;
  background: #fff;
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

  ::after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: #fff0;
    border-top-color: #fff;
    border-width: 7px;
    margin-left: -7px;
  }
`
/**
 * 말풍선 마커 컴포넌트
 */
export function BubbleMarker({
  onClick,
  children,
}: PropsWithChildren<BubbleMarkerProps>) {
  return <LinkContainer onClick={onClick}>{children}</LinkContainer>
}
