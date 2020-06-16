import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import withField from '../with-field'

interface Option<T> {
  key: string
  label: string
  value: T
}

const RADIO_INPUT_SIZE = 26

const RadioFrame = styled.div`
  position: relative;
  margin-bottom: 20px;
  line-height: ${RADIO_INPUT_SIZE}px;
  padding-right: ${RADIO_INPUT_SIZE + 3}px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Label = styled.label`
  width: 100%;
  vertical-align: middle;
  font-size: 16px;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const RadioInput = styled.input.attrs({ type: 'radio' })<{
  selected?: boolean
}>`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  width: ${RADIO_INPUT_SIZE}px;
  height: ${RADIO_INPUT_SIZE}px;
  border: 0;
  padding: 0;
  background-size: ${RADIO_INPUT_SIZE}px ${RADIO_INPUT_SIZE}px;
  background-repeat: no-repeat;
  transition: all 0.3s ease;
  appearance: none;
  outline: none;

  ${({ selected }) =>
    selected
      ? css`
          opacity: 1;
          background-image: url('https://assets.triple.guide/images/btn-filter-radio-check.svg');
        `
      : css`
          opacity: 0.5;
          background-image: url('https://assets.triple.guide/images/btn-filter-radio.svg');
        `};
`

interface RadioProps<T> {
  name: string
  onChange: (value: T) => void
  options: Option<T>[]
}

function Radio<T>({ name, onChange, options }: RadioProps<T>) {
  const [selectedOptionKey, setSelectedOptionKey] = useState<string>('')

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>, value: T) => {
    setSelectedOptionKey(e.target.value)
    onChange(value)
  }

  return (
    <>
      {options.map(({ label, key, value }) => {
        const id = `${key}_${label}`

        return (
          <RadioFrame key={key}>
            <Label htmlFor={id}>{label}</Label>
            <RadioInput
              name={name}
              value={key}
              id={id}
              selected={selectedOptionKey === key}
              onChange={(e) => handleSelect(e, value)}
            />
          </RadioFrame>
        )
      })}
    </>
  )
}

export default withField(Radio)
