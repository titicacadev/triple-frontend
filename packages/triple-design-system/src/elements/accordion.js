import React, { Component } from 'react'
import styled from 'styled-components'

const Accordion = styled.div``

const TITLE_ICONS = {
  folded: 'ico-header-expand-fold@2x.png',
  unfolded: 'ico-header-expand-more@2x.png',
}

const Title = styled.div`
  &:after {
    float: right;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url(${({ active }) =>
      `http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/${
        TITLE_ICONS[active ? 'unfolded' : 'folded']
      }`});
    background-size: 20px 20px;
    background-position: center center;
    background-repeat: no-repeat;
    content: '';
  }
`

function Content({ active, children }) {
  return active && children
}

function Folded({ active, children }) {
  return !active && children
}

Accordion.Title = Title
Accordion.Content = Content
Accordion.Folded = Folded

export default Accordion
