import { isValidElement, PropsWithChildren } from 'react'
import { Container, Text } from '@titicaca/kint5-core-elements'

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
          padding: '14px 0 14px 16px',
        }}
      >
        <Text id={labelId} css={{ fontSize: 20, fontWeight: 700 }}>
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
