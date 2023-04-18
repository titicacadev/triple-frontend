import { PropsWithChildren } from 'react'

import { Container } from '../container'
import { Text } from '../text'

import { useFormGroup } from './form-group-context'

export type FormGroupErrorProps = PropsWithChildren

export const FormGroupError = ({ children }: FormGroupErrorProps) => {
  const formGroup = useFormGroup()

  return (
    <Container css={{ padding: '6px 0 0' }}>
      <Text color="red" size="tiny" id={formGroup.errorId}>
        {children}
      </Text>
    </Container>
  )
}
