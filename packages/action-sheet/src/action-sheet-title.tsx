import { isValidElement, PropsWithChildren } from 'react'
import { Container, Text } from '@titicaca/core-elements'

import { useActionSheet } from './action-sheet-context'

type ActionSheetTitleProps = PropsWithChildren

export const ActionSheetTitle = ({ children }: ActionSheetTitleProps) => {
  const { titleProps } = useActionSheet()

  if (
    typeof children === 'string' ||
    typeof children === 'number' ||
    typeof children === 'boolean'
  ) {
    return (
      <Container
        css={{
          height: '16px',
          margin: '0 0 10px 27px',
        }}
      >
        <Text {...titleProps} size="tiny" bold color="gray700">
          {children}
        </Text>
      </Container>
    )
  }

  if (isValidElement(children)) {
    return children
  }

  return null
}
