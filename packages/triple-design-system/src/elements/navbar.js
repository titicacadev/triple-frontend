import React from 'react'
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
  font-size: 18px;
  line-height: 18px;
  color: #1e1e1e;
`

const ICON_URL_BY_NAMES = {
  back:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/btn-com-back@2x.png',
  close:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/btn-com-close@2x.png',
  more:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/btn-com-more@2x.png',
  map:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/ico-search-place@2x.png',
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
  return (
    <NavbarFrame>
      {title && <TitleContainer>{title}</TitleContainer>}
      {children}
    </NavbarFrame>
  )
}

Navbar.Item = NavbarItem

export default Navbar
