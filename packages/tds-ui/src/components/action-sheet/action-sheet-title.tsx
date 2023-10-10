import { isValidElement, PropsWithChildren } from 'react'
import { Container, Text } from '@titicaca/tds-ui'

interface ActionSheetTitleProps extends PropsWithChildren {
  labelId: string
}

export const ActionSheetTitle = ({
  children,
  labelId,
}: ActionSheetTitleProps) => {
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
        <Text id={labelId} size="tiny" bold color="gray700">
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
