import { Autolinker } from 'autolinker'
import { MouseEventHandler } from 'react'
import { Text } from '@titicaca/core-elements'

export function TextMessage({
  text,
  onClick,
}: {
  text: string
  onClick?: MouseEventHandler
}) {
  return (
    <Text
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
