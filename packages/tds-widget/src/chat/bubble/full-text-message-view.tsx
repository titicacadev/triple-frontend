import type { PropsWithChildren } from 'react'
import { Popup, Navbar, Container } from '@titicaca/tds-ui'

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
      <Container
        css={{
          padding: 20,
          display: 'block',
        }}
      >
        {children}
      </Container>
    </Popup>
  )
}
