import { isValidElement, PropsWithChildren } from 'react'
import { Container, Text } from '@titicaca/core-elements'
import { Dialog } from '@headlessui/react'

type ActionSheetTitleProps = PropsWithChildren

export const ActionSheetTitle = ({ children }: ActionSheetTitleProps) => {
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
        <Dialog.Title as={Text} size="tiny" bold color="gray700">
          {children}
        </Dialog.Title>
      </Container>
    )
  }

  if (isValidElement(children)) {
    return children
  }

  return null
}
