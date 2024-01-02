import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { PropsWithChildren } from 'react'
import { TripleGlobalBi } from '@titicaca/kint5-core-elements'

import { HEADER_HEIGHT, TRANSITION_TIME } from './constants'
import type { DeeplinkComponent } from './types'
import { useAutoHide } from './use-auto-hide'
import { ExtraActionsContainer } from './extra-actions-container'
import { ExtraActionItem } from './extra-action-item'
import { PublicHeaderDeeplink } from './public-header-deeplink'

const Wrapper = styled.div<{ visible: boolean }>`
  transition: height ease ${TRANSITION_TIME}ms;
  overflow: hidden;
  top: 0;
  height: ${({ visible }) => (visible ? `${HEADER_HEIGHT}px` : '0px')};

  &:focus-within {
    height: ${HEADER_HEIGHT}px;
  }
`

const HeaderFrame = styled.div`
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-brightGray);
  padding: 0 16px;
  height: ${HEADER_HEIGHT}px;
`

export interface TripleGlobalPublicHeaderProps {
  /**
   * 앱에서 열 수 있는 path. ex) inlink or 네이티브 딥링크
   */
  deeplinkPath?: string
  DeeplinkComponent?: DeeplinkComponent
  disableAutoHide?: boolean
  onClick?: () => void
  linkHref?: string
  linkLabel?: string
}

export function TripleGlobalPublicHeader({
  deeplinkPath,
  DeeplinkComponent,
  disableAutoHide,
  onClick,
  linkHref = '/my-bookings',
  linkLabel,
  children,
}: PropsWithChildren<TripleGlobalPublicHeaderProps>) {
  const { t } = useTranslation('common-web')

  const app = useTripleClientMetadata()
  const visible = useAutoHide(disableAutoHide)

  if (app) {
    return null
  }

  return (
    <Wrapper visible={visible}>
      <HeaderFrame>
        <a href="/">
          <TripleGlobalBi width={75} height={30} />
        </a>

        <ExtraActionsContainer>
          {children}
          <ExtraActionItem href={linkHref} onClick={onClick}>
            {linkLabel ?? t(['nae-yeyag', '내 예약'])}
          </ExtraActionItem>
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
