import { SyntheticEvent } from 'react'
import styled from 'styled-components'
import { getColor } from '@titicaca/color-palette'

import { withField } from '../utils/form-field'

import Container from './container'

interface GenderSelectorProps {
  name?: string
  value?: string
  onChange?: (e: SyntheticEvent, arg1: string) => unknown
}

const GenderContainer = styled.div<{
  name?: string
  value?: string
  selected?: boolean
}>`
  width: 50%;
  display: inline-block;
  padding: 15px 0;
  border: ${({ selected }) =>
    selected
      ? `1px solid rgb(${getColor('blue')}) `
      : `1px solid rgba(${getColor('gray100')}) `};
  border-radius: 2px;
  text-align: center;
  font-size: 16px;
  color: ${({ selected }) =>
    selected ? `rgb(${getColor('blue')}) ` : `rgba(${getColor('gray300')}) `};

  &:last-child {
    border-left: none;
    border: ${({ selected }) =>
      selected && `1px solid rgb(${getColor('blue')}) `};
  }
`

function GenderSelector({ name, value, onChange }: GenderSelectorProps) {
  return (
    <Container>
      <GenderContainer
        name={name}
        value="MALE"
        selected={value === 'MALE'}
        onClick={(e: SyntheticEvent) => onChange && onChange(e, 'MALE')}
      >
        남자
      </GenderContainer>

      <GenderContainer
        name={name}
        value="FEMALE"
        selected={value === 'FEMALE'}
        onClick={(e: SyntheticEvent) => onChange && onChange(e, 'FEMALE')}
      >
        여자
      </GenderContainer>
    </Container>
  )
}

export default withField(GenderSelector)
