import { forwardRef, PropsWithChildren } from 'react'
import styled from 'styled-components'

import { Text } from '../text'

import {
  ConfirmSelectorBase,
  ConfirmSelectorBaseProps,
} from './confirm-selector-base'

const ConfirmSelectorLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const ConfirmSelectorText = styled(Text)`
  flex: 1;
`

export interface ConfirmSelectorProps
  extends ConfirmSelectorBaseProps,
    PropsWithChildren {}

export const ConfirmSelector = forwardRef<
  HTMLInputElement,
  ConfirmSelectorProps
>(function ConfirmSelector({ children, ...props }, ref) {
  return (
    <ConfirmSelectorLabel>
      <ConfirmSelectorText>{children}</ConfirmSelectorText>
      <ConfirmSelectorBase {...props} ref={ref} />
    </ConfirmSelectorLabel>
  )
})
