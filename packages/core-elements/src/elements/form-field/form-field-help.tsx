import { PropsWithChildren } from 'react'

import { Container } from '../container'
import { Text } from '../text'

import { useFormField } from './form-field-context'

export type FormFieldHelpProps = PropsWithChildren

export const FormFieldHelp = ({ children }: FormFieldHelpProps) => {
  const formField = useFormField()

  return (
    <Container
      css={{
        padding: '6px 0 0',
      }}
    >
      <Text alpha={0.5} size="tiny" id={formField?.descriptionId}>
        {children}
      </Text>
    </Container>
  )
}
