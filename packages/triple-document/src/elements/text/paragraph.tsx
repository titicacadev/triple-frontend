import * as React from 'react'
import { Text, TextProps } from '@titicaca/core-elements'

export type ParagraphProps = TextProps

export default function Paragraph({ children, ...props }: ParagraphProps) {
  return (
    <Text lineHeight={1.63} alpha={0.9} {...props}>
      {children}
    </Text>
  )
}
