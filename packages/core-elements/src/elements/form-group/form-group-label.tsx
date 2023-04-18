import { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'

import { Container } from '../container'
import { Text } from '../text'

import { useFormGroup } from './form-group-context'

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
      color: var(--color-blue);
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

export type FormGroupLabelProps = PropsWithChildren

export const FormGroupLabel = ({ children }: FormGroupLabelProps) => {
  const formField = useFormGroup()

  return (
    <Container>
      <Label
        as="legend"
        size="tiny"
        isError={formField.isError}
        isRequired={formField.isRequired}
        isFocused={formField.isFocused}
      >
        {children}
      </Label>
    </Container>
  )
}
