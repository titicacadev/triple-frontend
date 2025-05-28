import { Autolinker } from 'autolinker'
import { MouseEventHandler } from 'react'
import { styled } from 'styled-components'

const StyledText = styled.span`
  display: -webkit-box;
  padding-left: 5px;
  padding-right: 5px;
  user-select: none;
  word-break: break-word;
`

export default function TextItem({
  text,
  href,
  onClick,
}: {
  text: string
  href?: string
  onClick?: MouseEventHandler
}) {
  return (
    <StyledText
      dangerouslySetInnerHTML={{
        __html: Autolinker.link(href ? `<a href=${href}>${text}</a>` : text, {
          newWindow: true,
          stripPrefix: false,
        }),
      }}
      onClick={onClick}
    />
  )
}
