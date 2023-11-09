import { Autolinker } from 'autolinker'
import { MouseEventHandler } from 'react'
import { Text as CoreText } from '@titicaca/core-elements'

export default function TextItem({
  text,
  onClick,
}: {
  text: string
  onClick?: MouseEventHandler
}) {
  return (
    <CoreText
      css={{
        display: '-webkit-box',
        lineHeight: '21px',
        paddingLeft: 5,
        paddingRight: 5,
        userSelect: 'none',
        wordBreak: 'break-word',
        color: 'inherit',
      }}
      dangerouslySetInnerHTML={{
        __html: Autolinker.link(text, {
          newWindow: true,
          stripPrefix: false,
        }),
      }}
      onClick={onClick}
    />
  )
}
