import { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'

import { Container } from '../container'
import { Text } from '../text'

import { useFormField } from './form-field-context'

interface LabelProps {
  isError: boolean
  isRequired: boolean
  isFocused: boolean
}

const Label = styled(Text)<LabelProps>`
  display: inline-block;
  margin-bottom: 6px;

  ${({ isFocused }) =>
    isFocused &&
    css`
      color: rgba(${getColor('blue')});
    `}

  ${({ isError }) =>
    isError &&
    css`
      color: var(--color-red);
    `}

  ${({ isRequired }) =>
    isRequired &&
    css`
      &::after {
        content: ${isRequired ? "'*'" : undefined};
        display: inline;
        color: var(--color-mediumRed);
        font-weight: normal;
        margin-left: 4px;
      }
    `}
`

export type FormFieldLabelProps = PropsWithChildren

export const FormFieldLabel = ({ children }: FormFieldLabelProps) => {
  const formField = useFormField()

  return (
    <Container>
      <Label
        as="label"
        size="tiny"
        htmlFor={formField.inputId}
        isError={formField.isError}
        isRequired={formField.isRequired}
        isFocused={formField.isFocused}
      >
        {children}
      </Label>
    </Container>
  )
}
