import { Autolinker } from 'autolinker'
import { MouseEventHandler } from 'react'
import styled, { CSSProp } from 'styled-components'
import { shouldForwardProp } from '@titicaca/core-elements'

const StyledText = styled.span.withConfig({
  shouldForwardProp,
})<{ css?: CSSProp }>`
  display: -webkit-box;
  padding-left: 5px;
  padding-right: 5px;
  user-select: none;
  word-break: break-word;
  ${(props) => props.css}
`

export default function TextItem({
  text,
  onClick,
  ...props
}: {
  text: string
  onClick?: MouseEventHandler
  css?: CSSProp
}) {
  return (
    <StyledText
      dangerouslySetInnerHTML={{
        __html: Autolinker.link(text, {
          newWindow: true,
          stripPrefix: false,
        }),
      }}
      onClick={onClick}
      {...props}
    />
  )
}
