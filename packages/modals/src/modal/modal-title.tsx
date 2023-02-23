import { PropsWithChildren } from 'react'
import { Text } from '@titicaca/core-elements'
import { Dialog } from '@headlessui/react'
import styled from 'styled-components'

const StyledText = styled(Text)`
  margin-bottom: 10px;
`

export type ModalTitleProps = PropsWithChildren

export const ModalTitle = ({ children }: ModalTitleProps) => {
  return (
    <Dialog.Title as={StyledText} bold center size="big" color="gray">
      {children}
    </Dialog.Title>
  )
}
