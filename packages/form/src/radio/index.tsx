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
  value: T
}

function Radio<T>({ name, onChange, options, value }: RadioProps<T>) {
  const handleSelect = (selectedKey: string) => {
    const selctedOption = options.find((option) => option.key === selectedKey)

    if (selctedOption) {
      onChange(selctedOption.value)
    }
  }

  const selectedOptionKey = options.find((option) => option.value === value)
    ?.key as string

  return (
    <>
      {options.map(({ key, label }) => {
        const id = `${name}_${label}_${key}`

        return (
          <RadioFrame key={id}>
            <Label htmlFor={id}>{label}</Label>
            <RadioInput
              id={id}
              name={name}
              value={key}
              selected={selectedOptionKey === key}
              onChange={() => handleSelect(key)}
            />
          </RadioFrame>
        )
      })}
    </>
  )
}

export default withField(Radio)
