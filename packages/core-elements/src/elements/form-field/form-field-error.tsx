import { PropsWithChildren } from 'react'

import { Container } from '../container'
import { Text } from '../text'

import { useFormField } from './form-field-context'

export type FormFieldErrorProps = PropsWithChildren

export const FormFieldError = ({ children }: FormFieldErrorProps) => {
  const formField = useFormField()

  return (
    <Container css={{ padding: '6px 0 0' }}>
      <Text color="red" size="tiny" id={formField?.errorId}>
        {children}
      </Text>
    </Container>
  )
}
