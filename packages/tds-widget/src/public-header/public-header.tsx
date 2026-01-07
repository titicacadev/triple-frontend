import {
  useTranslation,
  useClientApp,
  useTrackEvent,
  useHashRouter,
} from '@titicaca/triple-web'
import { styled } from 'styled-components'
import { PropsWithChildren, useCallback, useMemo } from 'react'

import {
  HEADER_DESKTOP_HEIGHT,
  HEADER_MOBILE_HEIGHT,
  HEADER_SIDE_MENU_HASH,
  HEADER_SIDE_MENU_ITEMS,
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
import { MenuItem } from './side-menu/type'
import { SideMenu } from './side-menu'
import { HeaderMenuButton } from './header-menu-button'
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
  /** @deprecated onLinkClick을 사용해주세요 */
  onClick?: () => void
  linkHref?: string
  linkLabel?: string
  onLogoClick?: () => void
  onLinkClick?: () => void
  sideMenuItems?: MenuItem[]
  hasSideMenu?: boolean
  hasNewNotification?: boolean
}

export function PublicHeader({
  category,
  deeplinkPath,
  DeeplinkComponent,
  disableAutoHide,
  onClick,
  onLinkClick,
  linkHref = '/my-bookings',
  linkLabel,
  onLogoClick,
  children,
  hasSideMenu = false,
  sideMenuItems = HEADER_SIDE_MENU_ITEMS,
  hasNewNotification,
  ...props
}: PropsWithChildren<PublicHeaderProps>) {
  const t = useTranslation()

  const app = useClientApp()
  const visible = useAutoHide(disableAutoHide)
  const { hasUriHash, addUriHash, removeUriHash } = useHashRouter()
  const trackEvent = useTrackEvent()

  const onMenuButtonClick = useCallback(() => {
    addUriHash(HEADER_SIDE_MENU_HASH)
    trackEvent({ fa: { action: '헤더_메뉴_선택' } })
  }, [trackEvent, addUriHash])

  const onSideMenuClose = useCallback(() => {
    trackEvent({ fa: { category: '메인메뉴', action: '닫기_선택' } })
    removeUriHash()
  }, [trackEvent, removeUriHash])

  const onTrackMenuEvent = useCallback(
    (eventAction?: string) => {
      if (eventAction) {
        trackEvent({ fa: { category: '메인메뉴', action: eventAction } })
      }
    },
    [trackEvent],
  )

  const sideMenuItemsWithEventTracking = useMemo(
    () =>
      sideMenuItems.map((menu) => ({
        ...menu,
        ...('subItems' in menu && {
          subItems: menu.subItems.map((subItem) => ({
            ...subItem,
            onClick: () => {
              onTrackMenuEvent(subItem.eventAction)
            },
          })),
        }),
        onClick: () => onTrackMenuEvent(menu.eventAction),
      })),
    [onTrackMenuEvent, sideMenuItems],
  )

  if (app) {
    return null
  }

  return (
    <>
      <Wrapper $visible={visible}>
        <HeaderFrame {...props}>
          <Logo
            href={getCategoryHref(category)}
            title={t(getCategoryTitle(category))}
            onClick={onLogoClick}
          >
            <LogoImage
              alt="Triple"
              src="https://assets.triple.guide/images/img_intro_logo_dark.svg"
            />
            {category && (
              <LogoCategoryImage
                alt={t(getCategoryImageProps(category).alt)}
                src={getCategoryImageProps(category).src}
              />
            )}
          </Logo>

          <ExtraActionsContainer>
            {children}
            <ExtraActionItem href={linkHref} onClick={onLinkClick || onClick}>
              {linkLabel ?? t('내 예약')}
            </ExtraActionItem>

            {deeplinkPath ? (
              <PublicHeaderDeeplink
                deeplinkPath={deeplinkPath}
                DeeplinkComponent={DeeplinkComponent}
              />
            ) : null}

            {hasSideMenu ? (
              <HeaderMenuButton
                onClick={onMenuButtonClick}
                hasNewNotification={hasNewNotification}
              />
            ) : null}
          </ExtraActionsContainer>
        </HeaderFrame>
      </Wrapper>

      {sideMenuItems ? (
        <SideMenu
          open={hasUriHash(HEADER_SIDE_MENU_HASH)}
          onClose={onSideMenuClose}
          menus={sideMenuItemsWithEventTracking}
        />
      ) : null}
    </>
  )
}
