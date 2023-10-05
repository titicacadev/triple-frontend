import { PropsWithChildren } from 'react'

import { Container } from '../container'
import { Text } from '../text'

import { useCheckboxGroup } from './use-checkbox-group'

export type CheckboxGroupHelpProps = PropsWithChildren

export const CheckboxGroupHelp = ({ children }: CheckboxGroupHelpProps) => {
  const checkboxGroup = useCheckboxGroup()

  return (
    <Container
      css={{
        padding: '6px 0 0',
      }}
    >
      <Text alpha={0.5} size="tiny" id={checkboxGroup.descriptionId}>
        {children}
      </Text>
    </Container>
  )
}
