import type { PropsWithChildren } from 'react'
import { Popup, Navbar, Container as BaseContainer } from '@titicaca/tds-ui'
import styled from 'styled-components'

const Container = styled(BaseContainer)`
  padding: 20px;
  display: block;
  font-size: 15px;
  white-space: pre-wrap;
  word-break: break-word;

  > a {
    color: var(--color-blue);
    line-break: anywhere;
  }
`

export function FullTextMessageView({
  open,
  onClose,
  openMenu,
  disableMenu,
  children,
}: PropsWithChildren<{
  open: boolean
  onClose: () => void
  openMenu?: () => void
  disableMenu: boolean
}>) {
  return (
    <Popup open={open} onClose={onClose} noNavbar>
      <Navbar css={{ boxShadow: 'none' }}>
        <Navbar.Item floated="left" icon="back" onClick={onClose} />
        <Navbar.TitleContainer css={{ right: 52 }}>
          전체보기
        </Navbar.TitleContainer>
        {!disableMenu ? (
          <Navbar.Item floated="right" icon="more" onClick={openMenu} />
        ) : null}
      </Navbar>
      <Container>{children}</Container>
    </Popup>
  )
}
