import { PropsWithChildren } from 'react'

import { Container } from '../container'
import { Text } from '../text'

import { useRadioGroup } from './use-radio-group'

export type RadioGroupErrorProps = PropsWithChildren

export const RadioGroupError = ({ children }: RadioGroupErrorProps) => {
  const radioGroup = useRadioGroup()

  return (
    <Container css={{ padding: '6px 0 0' }}>
      <Text color="red" size="tiny" id={radioGroup.errorId}>
        {children}
      </Text>
    </Container>
  )
}
