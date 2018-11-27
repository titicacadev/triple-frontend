import React, { Children } from 'react'
import styled from 'styled-components'

const NavbarFrame = styled.div`
  background-color: #ffffff;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 52px;
  z-index: 2;
  box-shadow: 0 1px 0 0 #efefef;
  box-sizing: border-box;
  padding: 9px 12px;
`

const TitleContainer = styled.div`
  font-family: sans-serif;
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
`

const ICON_URL_BY_NAMES = {
  back: 'https://assets.triple.guide/images/btn-com-back@4x.png',
  close: 'https://assets.triple.guide/images/btn-com-close@2x.png',
  more: 'https://assets.triple.guide/images/btn-com-more@4x.png',
  map: 'https://assets.triple.guide/images/ico-search-place@4x.png',
  write: 'https://assets.triple.guide/images/btn-com-write@2x.png',
  scraped: 'https://assets.triple.guide/images/btn-com-bookmark-on@4x.png',
  unscraped: 'https://assets.triple.guide/images/btn-com-bookmark-off@4x.png',
  share: 'https://assets.triple.guide/images/btn-com-share@4x.png',
  route: 'https://assets.triple.guide/images/btn-com-route@4x.png',
}

const NavbarItem = styled.div`
  float: ${({ floated }) => floated || 'left'};
  background-image: url(${({ icon }) => ICON_URL_BY_NAMES[icon]});
  background-size: cover;
  height: 34px;
  width: 34px;
  margin-left: ${({ floated }) => (!floated || floated === 'left' ? 0 : '6px')};
  margin-right: ${({ floated }) => (floated === 'right' ? 0 : '6px')};
`

function Navbar({ title, children }) {
  const childrenCount = Children.count(children)

  return (
    <NavbarFrame>
      {title && (
        <TitleContainer childrenCount={childrenCount}>{title}</TitleContainer>
      )}
      {children}
    </NavbarFrame>
  )
}

Navbar.Item = NavbarItem

export default Navbar
