import { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'

import { Text } from '../text'

import { useRadioGroup } from './use-radio-group'

interface LabelProps {
  isError: boolean
  isRequired: boolean
  isFocused: boolean
}

const Label = styled(Text)<LabelProps>`
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

export type RadioGroupLabelProps = PropsWithChildren

export const RadioGroupLabel = ({ children }: RadioGroupLabelProps) => {
  const radioGroup = useRadioGroup()

  return (
    <Label
      as="legend"
      size="tiny"
      isError={radioGroup.isError}
      isRequired={radioGroup.isRequired}
      isFocused={radioGroup.isFocused}
    >
      {children}
    </Label>
  )
}
