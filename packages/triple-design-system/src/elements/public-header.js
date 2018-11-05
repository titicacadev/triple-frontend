import React from 'react'
import styled from 'styled-components'

const HeaderFrame = styled.div`
  background-color: #ffffff;
  position: sticky;
  position: -webkit-sticky;
  height: 80px;
  border-bottom: 1px solid #efefef;
`

const Logo = styled.h1`
  background-repeat: no-repeat;
  background-size: 68px 24px;
  background-image: url(https://triple.guide/images/img-intro-logo-dark@2x.png);
  text-indent: -9999px;
  width: 68px;
  height: 24px;
  margin: 0;
  padding: 0;
  top: 50%;
  left: 50px;
  margin-top: -12px;
  position: absolute;
`

const InventoryContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`

export default function PublicHeader({ children }) {
  return (
    <HeaderFrame>
      <Logo>TRIPLE</Logo>
      <InventoryContainer>{children}</InventoryContainer>
    </HeaderFrame>
  )
}
