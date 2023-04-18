import { PropsWithChildren } from 'react'

import { Container } from '../container'
import { Text } from '../text'

import { useFormGroup } from './form-group-context'

export type FormGroupHelpProps = PropsWithChildren

export const FormGroupHelp = ({ children }: FormGroupHelpProps) => {
  const formGroup = useFormGroup()

  return (
    <Container
      css={{
        padding: '6px 0 0',
      }}
    >
      <Text alpha={0.5} size="tiny" id={formGroup.descriptionId}>
        {children}
      </Text>
    </Container>
  )
}
