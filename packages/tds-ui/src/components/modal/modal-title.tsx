import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'

import { Text } from '../text'

import { useModal } from './modal-context'

const StyledText = styled(Text)`
  margin-bottom: 10px;
`

export type ModalTitleProps = PropsWithChildren

export const ModalTitle = ({ children }: ModalTitleProps) => {
  const { labelId } = useModal()

  return (
    <StyledText id={labelId} bold center size="big" color="gray">
      {children}
    </StyledText>
  )
}
