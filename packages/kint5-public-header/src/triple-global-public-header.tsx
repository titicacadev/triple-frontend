import styled from 'styled-components'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { PropsWithChildren } from 'react'
import { TripleKoreaBi } from '@titicaca/kint5-core-elements'

import { HEADER_HEIGHT_PX, TRANSITION_TIME } from './constants'
import type { DeeplinkComponent } from './types'
import { useAutoHide } from './use-auto-hide'
import { ExtraActionsContainer } from './extra-actions-container'
import { PublicHeaderDeeplink } from './public-header-deeplink'

const Wrapper = styled.div<{ visible: boolean }>`
  transition: height ease ${TRANSITION_TIME}ms;
  overflow: hidden;
  top: 0;
  height: ${({ visible }) => (visible ? `${HEADER_HEIGHT_PX}px` : '0px')};

  &:focus-within {
    height: ${HEADER_HEIGHT_PX}px;
  }
`

const HeaderFrame = styled.div`
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-brightGray);
  padding: 18px 16px 13px;
  height: ${HEADER_HEIGHT_PX}px;
`

export interface TripleGlobalPublicHeaderProps {
  /**
   * 앱에서 열 수 있는 path. ex) inlink or 네이티브 딥링크
   */
  deeplinkPath?: string
  DeeplinkComponent?: DeeplinkComponent
  disableAutoHide?: boolean
}

export function TripleGlobalPublicHeader({
  deeplinkPath,
  DeeplinkComponent,
  disableAutoHide = true,
  children,
}: PropsWithChildren<TripleGlobalPublicHeaderProps>) {
  const app = useTripleClientMetadata()
  const visible = useAutoHide(disableAutoHide)

  if (app) {
    return null
  }

  return (
    <Wrapper visible={visible}>
      <HeaderFrame>
        <a href="/">
          <TripleKoreaBi css={{ width: 60, height: 24 }} />
        </a>

        <ExtraActionsContainer>
          {children}
          {deeplinkPath && (
            <PublicHeaderDeeplink
              deeplinkPath={deeplinkPath}
              DeeplinkComponent={DeeplinkComponent}
            />
          )}
        </ExtraActionsContainer>
      </HeaderFrame>
    </Wrapper>
  )
}
