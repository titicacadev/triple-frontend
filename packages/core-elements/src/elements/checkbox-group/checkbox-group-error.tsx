import { PropsWithChildren } from 'react'

import { Container } from '../container'
import { Text } from '../text'

import { useCheckboxGroup } from './use-checkbox-group'

export type CheckboxGroupErrorProps = PropsWithChildren

export const CheckboxGroupError = ({ children }: CheckboxGroupErrorProps) => {
  const checkboxGroup = useCheckboxGroup()

  return (
    <Container css={{ padding: '6px 0 0' }}>
      <Text color="red" size="tiny" id={checkboxGroup.errorId}>
        {children}
      </Text>
    </Container>
  )
}
