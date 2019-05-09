import React from 'react'
import styled from 'styled-components'
import Container from './container'

const Accordion = styled.div`
  position: relative;
`

const TITLE_ICONS = {
  folded: 'ico-accordion-expand-fold@4x.png',
  unfolded: 'ico-accordion-expand-more@4x.png',
}

const Title = styled(Container)`
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    width: 34px;
    height: 34px;
    background-image: url(${({ active }) =>
      `https://assets.triple.guide/images/${
        TITLE_ICONS[active ? 'folded' : 'unfolded']
      }`});
    background-size: 34px 34px;
    background-position: 0 -7px;
    background-repeat: no-repeat;
    content: '';
  }
`

function Content({ active, children }) {
  return active && <Container margin={{ top: 5 }}>{children}</Container>
}

function Folded({ active, children }) {
  return !active && <Container margin={{ top: 5 }}>{children}</Container>
}

Accordion.Title = Title
Accordion.Content = Content
Accordion.Folded = Folded

export default Accordion
