import React from 'react'
import styled, { css } from 'styled-components'
import { withField } from '../utils/form-field'
import { GlobalColors } from '../commons'

const COLORS: Partial<Record<GlobalColors, string>> = {
  blue: '54, 143, 255',
  red: '255, 33, 60',
  gray: '58, 58, 58',
}

const BaseTextarea = styled.textarea<{ focus?: boolean; error?: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  overflow: hidden;
  padding: 0;
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

  :-ms-input-placeholder {
    color: rgba(${COLORS.gray}, 0.3);
  }

  ::-ms-input-placeholder {
    color: rgba(${COLORS.gray}, 0.3);
  }

  ${({ focus }) =>
    focus &&
    css`
      border-color: rgb(${COLORS.blue});
    `};

  ${({ error }) =>
    error &&
    css`
      border-color: rgb(${COLORS.red});
    `};
`

function Textarea({ onChange, ...props }) {
  return (
    <BaseTextarea
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        onChange(e, e.target.value)
      }
      {...props}
    />
  )
}

export default withField(Textarea)
