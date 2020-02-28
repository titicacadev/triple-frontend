import * as React from 'react'

import Text from './text'
import styled, { css } from 'styled-components'
import { withField } from '../utils/form-field'
import { GetGlobalColor } from '../commons'

interface Option {
  text: string
  value: string
}

const RadioFrame = styled.div.attrs<{ name?: string }>({})`
  position: relative;
  padding: 11px 35px 11px 12px;
  border: 1px solid rgba(${GetGlobalColor('gray')}, 0.1);
  border-radius: 2px;
  margin-bottom: 10px;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }
`

const RadioContainer = styled.div.attrs({})<{ name?: string }>`
  display: table;
  width: 100%;
`

const Cell = styled.div<{ width: number }>`
  width: ${({ width }) => width || 100}%;
  display: table-cell;
  vertical-align: middle;
  word-break: break-all;
`

const Icon = styled.span<{ selected?: boolean }>`
  opacity: 0.5;
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-top: 2px;
  background-size: 22px 22px;
  background-repeat: no-repeat;
  background-position: -1px -1px;
  background-image: url('https://assets.triple.guide/images/radio-off@2x.png');
  vertical-align: bottom;

  ${({ selected }) =>
    selected &&
    css`
      opacity: 1;
      background-image: url('https://assets.triple.guide/images/radio-on@2x.png');
      transition: all 0.3s ease;
    `};
`

interface RadioProps {
  name?: string
  value?: string
  onChange?: (e: React.SyntheticEvent, arg1: string) => any
  options: Option[]
}

function Radio({ name, value, onChange, options }: RadioProps) {
  return (
    <>
      {options.map(({ text, value: optionValue }, idx) => (
        <RadioFrame key={idx}>
          <RadioContainer
            name={name}
            onClick={(e) => onChange && onChange(e, optionValue)}
          >
            <Cell width={10}>
              <Icon selected={value === optionValue} />
            </Cell>
            <Cell width={90}>
              <Text size="small" lineHeight={1.45}>
                {text}
              </Text>
            </Cell>
          </RadioContainer>
        </RadioFrame>
      ))}
    </>
  )
}

export default withField(Radio)
