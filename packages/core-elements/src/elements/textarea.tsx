import * as React from 'react'
import styled, { css, StyledComponentProps } from 'styled-components'

import { withField } from '../utils/form-field'
import { GlobalColors } from '../commons'

interface BaseTextareaProps {
  focused?: string
  error?: string
}

interface TextareaProps
  extends Omit<
    StyledComponentProps<'textarea', any, BaseTextareaProps, never>,
    'onChange'
  > {
  onChange?: (e: React.SyntheticEvent, value: string) => any
}

const COLORS: Partial<Record<GlobalColors, string>> = {
  blue: '54, 143, 255',
  red: '255, 33, 60',
  gray: '58, 58, 58',
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
    color: rgba(${COLORS.gray}, 0.3);
  }

  ::-webkit-input-placeholder {
    color: rgba(${COLORS.gray}, 0.3);
  }

  :-ms-input-placeholder {
    color: rgba(${COLORS.gray}, 0.3);
  }

  ${({ focused }) =>
    focused &&
    css`
      border-color: rgb(${COLORS.blue});
    `};

  ${({ error }) =>
    error &&
    css`
      border-color: rgb(${COLORS.red});
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
