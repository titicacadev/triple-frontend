import { PropsWithChildren } from 'react'
import { Text } from '@titicaca/tds-ui'

import { useModal } from './modal-context'

export type ModalDescriptionProps = PropsWithChildren

export const ModalDescription = ({ children }: ModalDescriptionProps) => {
  const { descriptionId } = useModal()

  return (
    <Text id={descriptionId} center size="large" lineHeight={1.38} color="gray">
      {children}
    </Text>
  )
}
