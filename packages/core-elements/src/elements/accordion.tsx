import * as React from 'react'
import styled, { StyledComponentProps } from 'styled-components'

import Container from './container'

type AccordionIcons = 'folded' | 'unfolded'

const AccordionBase = styled.div`
  position: relative;
`

const TITLE_ICONS: { [key in AccordionIcons]: string } = {
  folded: 'ico-accordion-expand-fold@4x.png',
  unfolded: 'ico-accordion-expand-more@4x.png',
}

const Title = styled(Container)<{ active?: boolean }>`
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
    cursor: pointer;
  }
`

function Content({
  active,
  children,
}: React.PropsWithChildren<{ active: boolean }>) {
  return active ? <Container margin={{ top: 5 }}>{children}</Container> : null
}

function Folded({
  active,
  children,
}: React.PropsWithChildren<{ active: boolean }>) {
  return !active ? <Container margin={{ top: 5 }}>{children}</Container> : null
}

export default class Accordion extends React.PureComponent<
  React.PropsWithChildren<StyledComponentProps<'div', any, {}, never>>
> {
  static Title = Title

  static Content = Content

  static Folded = Folded

  render() {
    const {
      props: { children, ...props },
    } = this
    return <AccordionBase {...props}>{children}</AccordionBase>
  }
}
