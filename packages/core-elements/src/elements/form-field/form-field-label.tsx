import { PropsWithChildren } from 'react'

import { Container } from '../container'
import { Text } from '../text'

import { useFormField } from './form-field-context'

export type Props = PropsWithChildren

export const FormFieldLabel = ({ children }: Props) => {
  const formField = useFormField()

  return (
    <Container>
      <Text as="label" size="tiny" htmlFor={formField?.inputId}>
        {children}
      </Text>
    </Container>
  )
}
