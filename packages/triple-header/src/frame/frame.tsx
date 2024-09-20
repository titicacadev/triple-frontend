import { ComponentType, useCallback } from 'react'
import { Container } from '@titicaca/tds-ui'
import { styled, css } from 'styled-components'
import { useStandardActionHandler } from '@titicaca/standard-action-handler'
import { useTrackEventWithMetadata } from '@titicaca/triple-web'

import { FrameData, LinkEventHandler } from '../types'
import { FRAMES } from '../frame'

const FrameContainer = styled(Container)<{
  $widthRatio: number
  $heightRatio: number
}>`
  width: 100%;
  height: 0;
  margin: 0 auto;
  flex: 0 0 auto;

  ${({ $heightRatio }) =>
    $heightRatio &&
    css`
      padding: ${$heightRatio}% 0 0 0;
      position: relative;
    `}

  ${({ $widthRatio }) =>
    $widthRatio &&
    css`
      max-width: ${$widthRatio}%;
    `}
`

export function Frame({
  frame: { type, width, height, value, effect },
  index,
  calculateFrameRatio,
  frameCount,
  onLinkClick,
}: {
  frame: FrameData
  index: number
  calculateFrameRatio: (length?: number) => number
  frameCount: number
  onLinkClick?: LinkEventHandler
}) {
  const FrameElement = FRAMES[type] as ComponentType<
    Omit<FrameData, 'type'> & { index: number; frameCount: number }
  >

  const widthRatio = calculateFrameRatio(width)
  const heightRatio = calculateFrameRatio(height)

  const trackEventWithMetadata = useTrackEventWithMetadata()

  const handleAction = useStandardActionHandler()

  const defaultHandleLinkClick: LinkEventHandler = useCallback(
    (e, { href, target }) => {
      if (!href) {
        return
      }
      trackEventWithMetadata({
        fa: {
          action: '링크선택',
          url: href,
        },
        ga: ['링크선택', href],
      })
      handleAction(href, { target })
    },
    [handleAction, trackEventWithMetadata],
  )

  const linkClickHandler = onLinkClick || defaultHandleLinkClick

  return (
    <FrameContainer $widthRatio={widthRatio} $heightRatio={heightRatio}>
      <FrameElement
        value={value}
        effect={effect}
        index={index}
        frameCount={frameCount}
        onLinkClick={linkClickHandler}
      />
    </FrameContainer>
  )
}
