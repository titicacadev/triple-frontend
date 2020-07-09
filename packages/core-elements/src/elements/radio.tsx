import * as React from 'react'
import styled, { css } from 'styled-components'
import { getColor } from '@titicaca/color-palette'

import Text from './text'
import { withField } from '../utils/form-field'

type RadioValue = string | null
type RadioDirection = 'left' | 'right'

interface Option {
  text: string
  value: RadioValue
}

const RADIO_INPUT_SIZE = 26

const RadioFrame = styled.div<{
  direction?: RadioDirection
  outline?: boolean
}>`
  position: relative;
  margin-bottom: 20px;
  line-height: ${RADIO_INPUT_SIZE}px;
  &:last-child {
    margin-bottom: 0;
  }

  ${({ direction, outline }) =>
    direction === 'left'
      ? outline
        ? css`
            padding: 20px ${RADIO_INPUT_SIZE + 20}px 20px 20px;
          `
        : css`
            padding-right: ${RADIO_INPUT_SIZE + 3}px;
          `
      : outline
      ? css`
          padding: 20px 20px 20px ${RADIO_INPUT_SIZE + 20}px;
        `
      : css`
          padding-left: ${RADIO_INPUT_SIZE + 20}px;
        `};

  ${({ outline }) =>
    outline &&
    css`
      border-radius: 2px;
      border: solid 1px rgba(${getColor('gray100')});
    `}
`

const RadioText = styled(Text)`
  width: 100%;
  vertical-align: middle;
`

const RadioInput = styled.input.attrs({ type: 'radio' })<{
  selected?: boolean
  direction?: RadioDirection
  outline?: boolean
}>`
  position: absolute;
  top: 50%;
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
  transform: translateY(-50%);

  ${({ direction, outline }) =>
    direction === 'left'
      ? css`
          right: ${outline ? '20px' : '0'};
        `
      : css`
          left: ${outline ? '20px' : '0'};
        `};

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

interface RadioProps {
  name?: string
  value?: RadioValue
  onChange?: (e: React.SyntheticEvent, value: RadioValue) => void
  direction?: RadioDirection
  multiline?: boolean
  outline?: boolean
  options: Option[]
}

function Radio({
  name,
  value,
  onChange,
  direction = 'left',
  multiline = false,
  outline = false,
  options,
}: RadioProps) {
  return (
    <>
      {options.map(({ text, value: optionValue }, idx) => (
        <RadioFrame
          key={idx}
          direction={direction}
          outline={outline}
          onClick={(e) => onChange && onChange(e, optionValue)}
        >
          <RadioText inlineBlock size="large" ellipsis={!multiline}>
            {text}
          </RadioText>

          <RadioInput
            name={name}
            direction={direction}
            outline={outline}
            selected={optionValue === value}
          />
        </RadioFrame>
      ))}
    </>
  )
}

export default withField(Radio)
