import * as React from 'react'
import * as CSS from 'csstype'
import styled, { css } from 'styled-components'
import { GlobalColors, GetGlobalColor } from '../commons'

const NavbarFrame = styled.div<{
  borderless?: boolean
  backgroundColor?: string
  opacity?: number
}>`
  background-color: ${({ backgroundColor = 'white' }) =>
    `rgba(${GetGlobalColor(backgroundColor)})`};
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 52px;
  z-index: 2;
  ${({ borderless }) =>
    borderless
      ? ''
      : css`
          box-shadow: 0 1px 0 0 #efefef;
        `};
  box-sizing: border-box;
  padding: 9px 12px;
`

const TitleContainer = styled.div<{ childrenCount?: number }>`
  position: absolute;
  top: 17.5px;
  left: 52px;
  right: ${({ childrenCount }) => {
    const count = childrenCount || 0
    return 26 + 40 * Math.max(count - 1, 0)
  }}px;
  font-size: 18px;
  line-height: 18px;
  color: #1e1e1e;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  bottom: 0px;
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

const ICON_URL_BY_NAMES: { [key in IconNames]: string } = {
  back: 'https://assets.triple.guide/images/btn-com-back@4x.png',
  close: 'https://assets.triple.guide/images/btn-com-close@2x.png',
  more: 'https://assets.triple.guide/images/btn-com-more@4x.png',
  map: 'https://assets.triple.guide/images/ico-search-place@4x.png',
  write: 'https://assets.triple.guide/images/btn-com-write@2x.png',
  scraped: 'https://assets.triple.guide/images/btn-com-bookmark-on@4x.png',
  unscraped: 'https://assets.triple.guide/images/btn-com-bookmark-off@4x.png',
  share: 'https://assets.triple.guide/images/btn-com-share@4x.png',
  route: 'https://assets.triple.guide/images/btn-com-route@4x.png',
  search: 'https://assets.triple.guide/images/btn-com-search@2x.png',
  cs: 'https://assets.triple.guide/images/btn-com-cs@2x.png',
  delete: 'https://assets.triple.guide/images/btn-search-close@3x.png',
  list: 'https://assets.triple.guide/images/ico-hotel-list@3x.png',
}

// eslint-disable-next-line no-unexpected-multiline
const NavbarItem = styled.div<{
  floated?: CSS.FloatProperty
  icon?: IconNames
  position?: CSS.PositionProperty
}>`
  ${({ position }) => position && `position: ${position};`}
  float: ${({ floated }) => floated || 'left'};
  background-image: url(${({ icon }) => (icon ? ICON_URL_BY_NAMES[icon] : '')});
  background-size: cover;
  height: 34px;
  width: 34px;
  margin-left: ${({ floated }) => (!floated || floated === 'left' ? 0 : '6px')};
  margin-right: ${({ floated }) => (floated === 'right' ? 0 : '6px')};
  cursor: pointer;
`

const SecondaryNavbar = styled.div`
  background-color: #ffffff;
  position: sticky;
  position: -webkit-sticky;
  top: 52px;
  left: 0;
  right: 0;
  z-index: 2;
  box-sizing: border-box;
  padding: 0 0 5px 0;
  overflow: hidden;
`

function Navbar({
  title,
  renderTitle,
  children,
  borderless,
  backgroundColor,
}: {
  title?: string
  renderTitle?: (props?: any) => JSX.Element
  children?: React.ReactNode
  borderless?: boolean
  backgroundColor?: string
}) {
  const childrenCount = React.Children.count(children)

  return (
    <NavbarFrame borderless={borderless} backgroundColor={backgroundColor}>
      {renderTitle
        ? renderTitle()
        : title && (
            <TitleContainer childrenCount={childrenCount}>
              {title}
            </TitleContainer>
          )}
      {children}
    </NavbarFrame>
  )
}

Navbar.Item = NavbarItem
Navbar.Secondary = SecondaryNavbar
Navbar.NavbarFrame = NavbarFrame

export default Navbar
