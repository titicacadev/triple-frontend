import { forwardRef, PropsWithChildren } from 'react'
import styled from 'styled-components'

import { CheckboxBase, CheckboxBaseProps } from '../checkbox'
import { Text } from '../text'

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
  extends Omit<CheckboxBaseProps, 'variant'>,
    PropsWithChildren {}

export const ConfirmSelector = forwardRef<
  HTMLInputElement,
  ConfirmSelectorProps
>(function ConfirmSelector({ children, ...props }, ref) {
  return (
    <ConfirmSelectorLabel>
      <ConfirmSelectorText>{children}</ConfirmSelectorText>
      <CheckboxBase {...props} ref={ref} variant="round" />
    </ConfirmSelectorLabel>
  )
})
