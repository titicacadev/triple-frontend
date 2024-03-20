import { PropsWithChildren } from 'react'
import { Text } from '@titicaca/kint5-core-elements'

import { useModal } from './modal-context'

export type ModalDescriptionProps = PropsWithChildren

export const ModalDescription = ({
  children,
  ...props
}: ModalDescriptionProps) => {
  const { descriptionId } = useModal()

  return (
    <Text id={descriptionId} center css={{ fontSize: 13 }} {...props}>
      {children}
    </Text>
  )
}
