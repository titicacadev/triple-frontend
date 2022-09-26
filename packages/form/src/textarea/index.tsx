import { SyntheticEvent } from 'react'
import styled, { css, StyledComponentProps } from 'styled-components'
import { getColor } from '@titicaca/color-palette'

import withField from '../with-field'

interface BaseTextareaProps {
  focused?: string
  error?: string
}

interface TextareaProps
  extends Omit<
    StyledComponentProps<
      'textarea',
      Record<string, unknown>,
      BaseTextareaProps,
      never
    >,
    'onChange'
  > {
  onChange?: (e: SyntheticEvent, value: string) => void
}

const BaseTextarea = styled.textarea<BaseTextareaProps>`
  appearance: none;
  overflow: hidden;
  margin: 0;
  outline: none;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #efefef;
  border-radius: 2px;
  box-sizing: border-box;
  width: 100%;
  resize: none;
  min-height: 100px;

  ::placeholder {
    color: rgba(${getColor('gray300')});
  }

  ${({ focused }) =>
    focused &&
    css`
      border-color: rgb(${getColor('blue')});
    `};

  ${({ error }) =>
    error &&
    css`
      border-color: rgb(${getColor('red')});
    `};
`

function Textarea({ onChange, ...props }: TextareaProps) {
  return (
    <BaseTextarea
      {...props}
      onChange={(e) => onChange && onChange(e, e.target.value)}
    />
  )
}

export default withField(Textarea)
