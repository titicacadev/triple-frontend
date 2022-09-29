import { PropsWithChildren, PureComponent } from 'react'
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

function Content({ active, children }: PropsWithChildren<{ active: boolean }>) {
  return active ? (
    <Container
      css={{
        margin: '5px 0 0 0',
      }}
    >
      {children}
    </Container>
  ) : null
}

function Folded({ active, children }: PropsWithChildren<{ active: boolean }>) {
  return !active ? (
    <Container
      css={{
        margin: '5px 0 0 0',
      }}
    >
      {children}
    </Container>
  ) : null
}

export default class Accordion extends PureComponent<
  PropsWithChildren<
    StyledComponentProps<
      'div',
      Record<string, unknown>,
      Record<string, unknown>,
      never
    >
  >
> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static Title = Title

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static Content = Content

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static Folded = Folded

  public render() {
    const {
      props: { children, ...props },
    } = this
    return <AccordionBase {...props}>{children}</AccordionBase>
  }
}
