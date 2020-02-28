import React from 'react'
import styled, { css } from 'styled-components'

import { withField } from '../utils/form-field'
import { GetGlobalColor } from '../commons'
import Container from './container'

interface GenderSelectorProps {
  name?: string
  value?: string
  onChange?: (e: React.SyntheticEvent, arg1: string) => any
}

// eslint-disable-next-line no-unexpected-multiline
const GenderContainer = styled.div<{
  name?: string
  value?: string
  selected?: boolean
}>`
  width: 50%;
  display: inline-block;
  padding: 15px 0;
  border: 1px solid rgba(${GetGlobalColor('gray')}, 0.1);
  border-radius: 2px;
  box-sizing: border-box;
  text-align: center;
  font-size: 16px;
  color: rgba(${GetGlobalColor('gray')}, 0.3);

  &:last-child {
    border-left: none;
  }

  ${({ selected }) =>
    selected &&
    css`
      color: rgb(${GetGlobalColor('blue')});
      border: 1px solid rgb(${GetGlobalColor('blue')});

      &:last-child {
        border: 1px solid rgb(${GetGlobalColor('blue')});
      }
    `};
`

function GenderSelector({ name, value, onChange }: GenderSelectorProps) {
  return (
    <Container>
      <GenderContainer
        name={name}
        value="MALE"
        selected={value === 'MALE'}
        onClick={(e: React.SyntheticEvent) => onChange && onChange(e, 'MALE')}
      >
        남자
      </GenderContainer>

      <GenderContainer
        name={name}
        value="FEMALE"
        selected={value === 'FEMALE'}
        onClick={(e: React.SyntheticEvent) => onChange && onChange(e, 'FEMALE')}
      >
        여자
      </GenderContainer>
    </Container>
  )
}

export default withField(GenderSelector)
