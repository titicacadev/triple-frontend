import { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'

import { Text } from '../text'

import { useFieldset } from './use-fieldset'

interface LegendProps {
  isRequired: boolean
}

const Legend = styled(Text)<LegendProps>`
  font-weight: 700;
  margin-bottom: 16px;

  ${({ isRequired }) =>
    isRequired &&
    css`
      &::after {
        content: ${isRequired ? "'*'" : undefined};
        display: inline;
        color: var(--color-mediumRed);
        font-weight: 500;
        margin-left: 4px;
      }
    `}
`

export type FieldsetLegendProps = PropsWithChildren

export const FieldsetLegend = ({ children }: FieldsetLegendProps) => {
  const fieldset = useFieldset()

  return (
    <Legend as="legend" size="large" isRequired={fieldset.isRequired}>
      {children}
    </Legend>
  )
}
