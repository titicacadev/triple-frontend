import { PropsWithChildren } from 'react'
import { Text } from '@titicaca/core-elements'

import { useModal } from './modal-context'

export const ModalTitle = ({ children, ...props }: PropsWithChildren) => {
  const { titleProps } = useModal()

  return (
    <Text
      {...titleProps}
      bold
      center
      size="big"
      color="gray"
      css={{ marginBottom: 10 }}
      {...props}
    >
      {children}
    </Text>
  )
}
