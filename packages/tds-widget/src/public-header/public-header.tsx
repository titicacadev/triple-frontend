import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'
import { PropsWithChildren } from 'react'
import { useClientApp } from '@titicaca/triple-web'

import {
  HEADER_DESKTOP_HEIGHT,
  HEADER_MOBILE_HEIGHT,
  MIN_DESKTOP_WIDTH,
  TRANSITION_TIME,
} from './constants'
import type { Category, DeeplinkComponent } from './types'
import {
  getCategoryHref,
  getCategoryImageProps,
  getCategoryTitle,
} from './categories'
import { useAutoHide } from './use-auto-hide'
import { ExtraActionsContainer } from './extra-actions-container'
import { ExtraActionItem } from './extra-action-item'
import { PublicHeaderDeeplink } from './public-header-deeplink'

const Wrapper = styled.div<{ $visible: boolean }>`
  transition: height ease ${TRANSITION_TIME}ms;
  overflow: hidden;
  top: 0;
  height: ${({ $visible }) => ($visible ? `${HEADER_MOBILE_HEIGHT}px` : '0px')};

  &:focus-within {
    height: ${HEADER_MOBILE_HEIGHT}px;
  }

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    height: ${({ $visible: visible }) =>
      visible ? `${HEADER_DESKTOP_HEIGHT}px` : '0px'};

    &:focus-within {
      height: ${HEADER_DESKTOP_HEIGHT}px;
    }
  }
`

const HeaderFrame = styled.div`
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-brightGray);
  padding: 0 6px;
  height: ${HEADER_MOBILE_HEIGHT}px;

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    height: ${HEADER_DESKTOP_HEIGHT}px;
    padding: 0 42px;
  }
`

const Logo = styled.a`
  padding: 10px 8px;
  text-decoration: none;
  display: flex;
`

const LogoImage = styled.img`
  display: block;
  width: 57px;
  height: 20px;

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    width: 68px;
    height: 24px;
  }
`

const LogoCategoryImage = styled.img`
  display: block;
  margin-left: 2px;
  width: auto;
  height: 20px;

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    height: 24px;
  }
`

export interface PublicHeaderProps {
  category?: Category
  /**
   * 앱에서 열 수 있는 path. ex) inlink or 네이티브 딥링크
   */
  deeplinkPath?: string
  DeeplinkComponent?: DeeplinkComponent
  disableAutoHide?: boolean
  onClick?: () => void
  linkHref?: string
  linkLabel?: string
  onLogoClick?: () => void
}

export function PublicHeader({
  category,
  deeplinkPath,
  DeeplinkComponent,
  disableAutoHide,
  onClick,
  linkHref = '/my-bookings',
  linkLabel,
  onLogoClick,
  children,
}: PropsWithChildren<PublicHeaderProps>) {
  const { t } = useTranslation('triple-frontend')

  const app = useClientApp()
  const visible = useAutoHide(disableAutoHide)

  if (app) {
    return null
  }

  return (
    <Wrapper $visible={visible}>
      <HeaderFrame>
        <Logo
          href={getCategoryHref(category)}
          title={getCategoryTitle(category)}
          onClick={onLogoClick}
        >
          <LogoImage
            alt="Triple"
            src="https://assets.triple.guide/images/img_intro_logo_dark.svg"
          />
          {category && (
            <LogoCategoryImage {...getCategoryImageProps(category)} />
          )}
        </Logo>

        <ExtraActionsContainer>
          {children}
          <ExtraActionItem href={linkHref} onClick={onClick}>
            {linkLabel ?? t('내 예약')}
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
