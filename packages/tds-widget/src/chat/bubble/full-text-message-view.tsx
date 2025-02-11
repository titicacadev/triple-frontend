import { MouseEventHandler } from 'react'
import { Autolinker } from 'autolinker'
import { styled } from 'styled-components'
import { Popup, Navbar } from '@titicaca/tds-ui'

const AutoLinkText = styled.span`
  > a {
    color: var(--color-blue);
    line-break: anywhere;
  }
`

export function FullTextMessageView({
  open,
  onClose,
  text,
  openMenu,
  onClick,
  disableMenu,
}: {
  open: boolean
  onClose: () => void
  text: string
  openMenu?: () => void
  onClick?: MouseEventHandler
  disableMenu: boolean
}) {
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
      <AutoLinkText
        css={{
          padding: 20,
          display: 'block',
          fontSize: 15,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
        dangerouslySetInnerHTML={{
          __html: Autolinker.link(text, {
            newWindow: true,
            stripPrefix: false,
          }),
        }}
        onClick={onClick}
      />
    </Popup>
  )
}
