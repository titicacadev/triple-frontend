import { SyntheticEvent } from 'react'
import styled from 'styled-components'
import { getColor } from '@titicaca/color-palette'
import { Container } from '@titicaca/core-elements'

import withField from '../with-field'

type GenderValue = 'MALE' | 'FEMALE'

interface GenderRadioProps {
  name?: string
  value?: GenderValue
  onChange?: (e: SyntheticEvent, value: GenderValue) => void
}

const GenderContainer = styled.div<{
  name?: string
  value?: string
  selected?: boolean
}>`
  width: 50%;
  display: inline-block;
  padding: 15px 0;
  border-radius: 2px;
  text-align: center;
  font-size: 16px;
  border: ${({ selected }) =>
    selected
      ? `1px solid rgb(${getColor('blue')}) `
      : `1px solid rgba(${getColor('gray100')}) `};
  color: ${({ selected }) =>
    selected ? `rgb(${getColor('blue')}) ` : `rgba(${getColor('gray300')}) `};

  &:last-child {
    border-left: none;
    border: ${({ selected }) =>
      selected && `1px solid rgb(${getColor('blue')}) `};
  }
`

function GenderRadio({ name, value, onChange }: GenderRadioProps) {
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

export default withField(GenderRadio)
