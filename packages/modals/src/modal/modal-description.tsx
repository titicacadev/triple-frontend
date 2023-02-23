import { PropsWithChildren } from 'react'
import { Text } from '@titicaca/core-elements'
import { Dialog } from '@headlessui/react'

export type ModalDescriptionProps = PropsWithChildren

export const ModalDescription = ({ children }: ModalDescriptionProps) => {
  return (
    <Dialog.Description
      as={Text}
      center
      size="large"
      lineHeight={1.38}
      color="gray"
    >
      {children}
    </Dialog.Description>
  )
}
