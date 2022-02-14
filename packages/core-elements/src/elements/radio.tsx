import { SyntheticEvent } from 'react'
import styled from 'styled-components'
import { gray100 } from '@titicaca/color-palette'

import { withField } from '../utils/form-field'

import Text from './text'

type RadioValue = string | null
type TextAlign = 'left' | 'right'

interface Option {
  text: string
  value: RadioValue
}

const RADIO_INPUT_SIZE = 26

const RadioFrame = styled.div<{
  textAlign?: TextAlign
  outline?: boolean
}>`
  position: relative;
  margin-bottom: 20px;
  line-height: ${RADIO_INPUT_SIZE}px;
  &:last-child {
    margin-bottom: 0;
  }

  ${({ textAlign, outline }) =>
    textAlign === 'left'
      ? outline
        ? `
            padding: 20px ${RADIO_INPUT_SIZE + 20}px 20px 20px;
          `
        : `
            padding-right: ${RADIO_INPUT_SIZE + 3}px;
          `
      : outline
      ? `
          padding: 20px 20px 20px ${RADIO_INPUT_SIZE + 20}px;
        `
      : `
          padding-left: ${RADIO_INPUT_SIZE + 20}px;
        `};

  ${({ outline }) =>
    outline &&
    `
      border-radius: 2px;
      border: solid 1px ${gray100};
    `}
`

const RadioText = styled(Text)<{
  textAlign?: TextAlign
  multiline?: boolean
}>`
  text-align: left;
  vertical-align: middle;
  ${({ multiline }) =>
    !multiline &&
    `
      width: 100%;
    `}
  ${({ textAlign }) =>
    textAlign === 'right' &&
    `
      padding-left: 15px;
    `}
`

const RadioInput = styled.input.attrs({ type: 'radio' })<{
  selected?: boolean
  textAlign?: TextAlign
  outline?: boolean
}>`
  position: absolute;
  top: 50%;
  width: ${RADIO_INPUT_SIZE}px;
  height: ${RADIO_INPUT_SIZE}px;
  background-size: ${RADIO_INPUT_SIZE}px ${RADIO_INPUT_SIZE}px;
  background-repeat: no-repeat;
  transition: all 0.3s ease;
  appearance: none;
  outline: none;
  transform: translateY(-50%);

  ${({ textAlign, outline }) =>
    textAlign === 'left'
      ? `
          right: ${outline ? '20px' : '0'};
        `
      : `
          left: ${outline ? '20px' : '0'};
        `};

  ${({ selected }) =>
    selected
      ? `
          opacity: 1;
          background-image: url('https://assets.triple.guide/images/btn-filter-radio-check.svg');
        `
      : `
          opacity: 0.5;
          background-image: url('https://assets.triple.guide/images/btn-filter-radio.svg');
        `};
`

interface RadioProps {
  name?: string
  value?: RadioValue
  onChange?: (e: SyntheticEvent, value: RadioValue) => void
  textAlign?: TextAlign
  multiline?: boolean
  outline?: boolean
  options: Option[]
}

function Radio({
  name,
  value,
  onChange,
  textAlign = 'left',
  multiline = false,
  outline = false,
  options,
}: RadioProps) {
  return (
    <>
      {options.map(({ text, value: optionValue }, idx) => (
        <RadioFrame
          key={idx}
          textAlign={textAlign}
          outline={outline}
          onClick={(e) => onChange && onChange(e, optionValue)}
        >
          <RadioText
            inlineBlock
            size="large"
            textAlign={textAlign}
            multiline={multiline}
            ellipsis={!multiline}
          >
            {text}
          </RadioText>

          <RadioInput
            name={name}
            textAlign={textAlign}
            outline={outline}
            selected={optionValue === value}
          />
        </RadioFrame>
      ))}
    </>
  )
}

export default withField(Radio)
