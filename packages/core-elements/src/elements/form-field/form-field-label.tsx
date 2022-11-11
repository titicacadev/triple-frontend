import { getColor } from '@titicaca/color-palette'
import { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'

import { Container } from '../container'
import { Text } from '../text'

import { useFormField } from './form-field-context'

const Label = styled(Text)<{ isError: boolean; isRequired: boolean }>`
  ${({ isError }) =>
    isError &&
    css`
      color: rgba(${getColor('red')});
    `}

  ${({ isRequired }) =>
    isRequired &&
    css`
      &::after {
        content: ${isRequired ? "'*'" : undefined};
        display: inline;
        color: rgba(${getColor('mediumRed')});
        font-weight: normal;
        margin-left: 4px;
      }
    `}
`

export interface Props extends PropsWithChildren {
  isError?: boolean
  isRequired?: boolean
}

export const FormFieldLabel = ({ children, isError, isRequired }: Props) => {
  const formField = useFormField()

  return (
    <Container>
      <Label
        as="label"
        size="tiny"
        htmlFor={formField?.inputId}
        isError={isError}
        isRequired={isRequired}
      >
        {children}
      </Label>
    </Container>
  )
}
