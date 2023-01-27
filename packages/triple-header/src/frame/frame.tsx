import { ComponentType, useCallback, useMemo } from 'react'
import { Container } from '@titicaca/core-elements'
import { initialize } from '@titicaca/standard-action-handler'
import styled, { css } from 'styled-components'
import { ContextOptions } from '@titicaca/standard-action-handler/src/types'
import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'
import { useNavigate, useExternalRouter } from '@titicaca/router'

import { FrameData, LinkEventHandler } from '../types'
import { FRAMES } from '../frame'

const FrameContainer = styled(Container)<{
  widthRatio: number
  heightRatio: number
}>`
  width: 100%;
  height: 0;
  margin: 0 auto;

  ${({ heightRatio }) =>
    heightRatio &&
    css`
      padding: ${heightRatio}% 0 0 0;
      position: relative;
    `}

  ${({ widthRatio }) =>
    widthRatio &&
    css`
      max-width: ${widthRatio}%;
    `}
`

export function Frame({
  frame: { type, width, height, value, effect },
  calculateFrameRatio,
  onLinkClick,
}: {
  frame: FrameData
  calculateFrameRatio: (length?: number) => number
  onLinkClick?: LinkEventHandler
}) {
  const FrameElement = FRAMES[type] as ComponentType<Omit<FrameData, 'type'>>

  const widthRatio = calculateFrameRatio(width)
  const heightRatio = calculateFrameRatio(height)

  const trackEventWithMetadata = useEventTrackerWithMetadata()
  const navigate = useNavigate()
  const routeExternally = useExternalRouter()

  const handleAction = useMemo(
    () =>
      initialize({
        navigate: navigate as ContextOptions['navigate'],
        routeExternally,
      }),
    [navigate, routeExternally],
  )

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
    <FrameContainer widthRatio={widthRatio} heightRatio={heightRatio}>
      <FrameElement
        value={value}
        effect={effect}
        onLinkClick={linkClickHandler}
      />
    </FrameContainer>
  )
}
