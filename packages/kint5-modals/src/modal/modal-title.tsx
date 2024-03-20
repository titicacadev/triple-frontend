import { PropsWithChildren } from 'react'
import { Text } from '@titicaca/kint5-core-elements'

import { useModal } from './modal-context'

export type ModalTitleProps = PropsWithChildren

export const ModalTitle = ({ children, ...props }: ModalTitleProps) => {
  const { labelId } = useModal()

  return (
    <Text
      id={labelId}
      center
      css={{ marginBottom: 2, fontSize: 17, fontWeight: 700 }}
      {...props}
    >
      {children}
    </Text>
  )
}
