import * as React from 'react'
import * as CSS from 'csstype'
import styled, { css } from 'styled-components'
import { Color, getColor, brightGray, white } from '@titicaca/color-palette'

import { FALLBACK_ACTION_CLASS_NAME } from '../constants'
import { layeringMixin, LayeringMixinProps, paddingMixin } from '../mixins'
import { unit } from '../utils/unit'
import { MarginPadding } from '../commons'

type NavbarProps = {
  maxWidth?: number
  borderless?: boolean
  backgroundColor?: Color
  position?: CSS.Property.Position
  padding?: MarginPadding
}

const WrapperContainer = styled.div<
  {
    position?: CSS.Property.Position
    top?: number | string
    height?: number | string
  } & LayeringMixinProps
>`
  position: ${({ position = 'fixed' }) => position};
  top: ${({ top = 0 }) => unit(top)};
  left: 0;
  right: 0;
  ${layeringMixin(0)}
  background: ${white};
  ${({ height }) =>
    height &&
    `
      height: ${unit(height)};
    `};
`

const NavbarFrame = styled.div<NavbarProps & LayeringMixinProps>`
  background-color: ${({ backgroundColor = 'white' }) =>
    `rgba(${getColor(backgroundColor)})`};
  position: ${({ position = 'sticky' }) => position};
  top: 0;
  left: 0;
  right: 0;
  height: 52px;
  ${layeringMixin(0)}
  ${({ borderless }) =>
    borderless
      ? ''
      : css`
          box-shadow: 0 1px 0 0 ${brightGray};
        `};
  box-sizing: border-box;
  padding: 9px 12px;
  margin: 0 auto;
  max-width: ${({ maxWidth = '100%' }) => unit(maxWidth)};
`

const TitleContainer = styled.div<{ childrenCount?: number }>`
  position: absolute;
  top: 50%;
  left: 52px;
  right: ${({ childrenCount }) => {
    const count = childrenCount || 0
    return 26 + 40 * Math.max(count - 1, 0)
  }}px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #1e1e1e;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  line-height: 52px;
`

type IconNames =
  | 'back'
  | 'close'
  | 'more'
  | 'map'
  | 'write'
  | 'scraped'
  | 'unscraped'
  | 'share'
  | 'route'
  | 'search'
  | 'cs'
  | 'delete'
  | 'list'
  | 'hamburger'
  | 'message'
  | 'unreadMessage'
  | 'support'
  | 'viewAll'

const ICON_URL_BY_NAMES: { [key in IconNames]: string } = {
  back: 'https://assets.triple.guide/images/btn-com-back@4x.png',
  close: 'https://assets.triple.guide/images/btn-com-close@3x.png',
  more: 'https://assets.triple.guide/images/btn-com-more@4x.png',
  map: 'https://assets.triple.guide/images/ico-search-place@4x.png',
  write: 'https://assets.triple.guide/images/btn-com-write@3x.png',
  scraped: 'https://assets.triple.guide/images/btn-com-bookmark-on@4x.png',
  unscraped: 'https://assets.triple.guide/images/btn-com-bookmark-off@4x.png',
  share: 'https://assets.triple.guide/images/btn-com-share@4x.png',
  route: 'https://assets.triple.guide/images/btn-com-route@4x.png',
  search: 'https://assets.triple.guide/images/btn-com-search@3x.png',
  cs: 'https://assets.triple.guide/images/btn-com-cs@3x.png',
  delete: 'https://assets.triple.guide/images/btn-search-close@3x.png',
  list: 'https://assets.triple.guide/images/ico-hotel-list@3x.png',
  hamburger: 'https://assets.triple.guide/images/btn-my-profile@3x.png',
  support: 'https://assets.triple.guide/images/btn-com-support@3x.png',
  message: 'https://assets.triple.guide/images/btn-com-message@3x.png',
  unreadMessage:
    'https://assets.triple.guide/images/btn-com-message-noti@3x.png',
  viewAll: 'https://assets.triple.guide/images/btn-end-view-all@3x.png',
}

type NavbarItemProps = {
  floated?: CSS.Property.Float
  icon?: IconNames
  position?: CSS.Property.Position
  hasTitle?: boolean
}

const NavbarItem = styled.div.attrs<NavbarItemProps>(({ icon }) => ({
  className: ['back', 'close'].includes(icon || '')
    ? FALLBACK_ACTION_CLASS_NAME
    : '',
}))<NavbarItemProps>`
  ${({ position }) => position && `position: ${position};`}
  float: ${({ floated }) => floated || 'left'};
  background-image: url(${({ icon }) => (icon ? ICON_URL_BY_NAMES[icon] : '')});
  background-size: cover;
  height: 34px;
  width: 34px;
  margin-left: ${({ floated }) => (!floated || floated === 'left' ? 0 : '6px')};
  margin-right: ${({ floated }) => (floated === 'right' ? 0 : '6px')};
  cursor: pointer;
  ${({ hasTitle }) =>
    hasTitle &&
    css`
      margin: 9px 0px 0px;
      width: auto;
      white-space: nowrap;
      word-break: break-word;
      text-overflow: ellipsis;
      overflow-x: hidden;
    `}
`

const SecondaryNavbar = styled.div<NavbarProps & LayeringMixinProps>`
  background-color: ${({ backgroundColor = 'white' }) =>
    `rgba(${getColor(backgroundColor)})`};

  ${({ position = 'sticky' }) => `
      position: ${position};
      top: ${position === 'sticky' ? '52px' : 0};
  `}

  left: 0;
  right: 0;
  box-sizing: border-box;
  ${({ padding }) => !padding && 'padding: 0 0 5px 0;'}
  ${paddingMixin}
  overflow: hidden;
  ${layeringMixin(0)}
  margin: 0 auto;
  max-width: ${({ maxWidth }) => unit(maxWidth || 768)};
`

export function NavbarWrapper({
  position,
  top,
  height,
  zTier,
  zIndex,
  children,
}: React.PropsWithChildren<
  {
    position?: CSS.Property.Position
    top?: number | string
    height?: number | string
  } & LayeringMixinProps
>) {
  return (
    <WrapperContainer
      position={position}
      top={top}
      height={height}
      zTier={zTier}
      zIndex={zIndex}
    >
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          position: 'relative',
        })
      })}
    </WrapperContainer>
  )
}

function Navbar({
  title,
  renderTitle,
  children,
  zTier,
  zIndex = 2,
  ...props
}: {
  renderTitle?: (props?: any) => JSX.Element
  children?: React.ReactNode
} & NavbarProps &
  LayeringMixinProps &
  React.HTMLAttributes<HTMLDivElement>) {
  return (
    <NavbarFrame zTier={zTier} zIndex={zIndex} {...props}>
      {renderTitle && renderTitle()}
      {children}
      {title && (
        <NavbarItem floated="none" hasTitle>
          {title}
        </NavbarItem>
      )}
    </NavbarFrame>
  )
}

Navbar.Item = NavbarItem
Navbar.Secondary = SecondaryNavbar
Navbar.NavbarFrame = NavbarFrame
Navbar.TitleContainer = TitleContainer

export default Navbar
