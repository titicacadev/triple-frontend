import {
  PropsWithChildren,
  MouseEventHandler,
  createContext,
  useContext,
} from 'react'
import styled from 'styled-components'
import * as CSS from 'csstype'

import {
  FrameRatioAndSizes,
  MEDIA_FRAME_OPTIONS,
  MarginPadding,
} from '../../commons'
import { formatMarginPadding, marginMixin } from '../../mixins'

import { useImageState } from './context'

const ContentAbsoluteContext = createContext(true)

export function useContentAbsolute() {
  return useContext(ContentAbsoluteContext)
}

const FixedRatioFrameContainer = styled.div<{
  frame: FrameRatioAndSizes
  borderRadius: number
  overflowHidden?: boolean
  floated?: CSS.Property.Float
  margin?: MarginPadding
}>`
  font-size: 0;
  position: relative;
  width: 100%;
  background-color: #f5f5f5;

  float: ${({ floated }) => floated || 'none'};

  ${({ borderRadius }) => `border-radius: ${borderRadius}px;`}

  ${({ frame }) =>
    frame !== 'original' &&
    formatMarginPadding({ top: MEDIA_FRAME_OPTIONS[frame] }, 'padding')}

  ${({ overflowHidden }) => overflowHidden && 'overflow: hidden;'}

  ${marginMixin}
`

export function ImageFixedRatioFrame({
  frame = 'small',
  floated,
  margin,
  onClick,
  children,
}: PropsWithChildren<{
  frame?: FrameRatioAndSizes
  floated?: CSS.Property.Float
  margin?: MarginPadding
  onClick?: MouseEventHandler
}>) {
  const { borderRadius } = useImageState()

  const originalFrame = frame === 'original'

  return (
    <FixedRatioFrameContainer
      frame={frame}
      overflowHidden={!originalFrame}
      floated={floated}
      borderRadius={borderRadius}
      margin={margin}
      onClick={onClick}
    >
      <ContentAbsoluteContext.Provider value={!originalFrame}>
        {children}
      </ContentAbsoluteContext.Provider>
    </FixedRatioFrameContainer>
  )
}
