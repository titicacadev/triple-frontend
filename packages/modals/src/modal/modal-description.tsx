import { PropsWithChildren } from 'react'
import { Text } from '@titicaca/core-elements'

import { useModal } from './modal-context'

export type Props = PropsWithChildren

export const ModalDescription = ({ children }: Props) => {
  const { descriptionId } = useModal()

  return (
    <Text id={descriptionId} size="large" lineHeight={1.38} color="gray">
      {children}
    </Text>
  )
}
