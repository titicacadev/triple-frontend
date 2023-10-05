import { PropsWithChildren } from 'react'

import { Container } from '../container'
import { Text } from '../text'

import { useRadioGroup } from './use-radio-group'

export type RadioGroupHelpProps = PropsWithChildren

export const RadioGroupHelp = ({ children }: RadioGroupHelpProps) => {
  const radioGroup = useRadioGroup()

  return (
    <Container
      css={{
        padding: '6px 0 0',
      }}
    >
      <Text alpha={0.5} size="tiny" id={radioGroup.descriptionId}>
        {children}
      </Text>
    </Container>
  )
}
