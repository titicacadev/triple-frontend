import React from 'react'
import styled, { css } from 'styled-components'
import equals from 'react-fast-compare'
import {
  Container,
  GetGlobalColor,
  MarginPadding,
  Text,
} from '@titicaca/core-elements'

const CheckboxLabel = styled(Text)<{ disabled?: boolean }>`
  color: rgb(${GetGlobalColor('gray')});
  position: relative;
  cursor: pointer;
  display: block;
  min-height: 26px;
  line-height: 26px;
  font-size: 16px;
  font-weight: 500;

  ${({ disabled }) =>
    disabled
      ? css`
          color: rgba(34, 34, 34, 0.3);
          span {
            font-size: 13px;
            color: rgba(58, 58, 58, 0.5);
          }
        `
      : ''}
`

const CheckboxInput = styled.input`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  width: 26px;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  padding: 0;
  background-color: #ffffff;
  appearance: none;
  outline: none;

  &:checked,
  &:disabled {
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-image: url('https://assets.triple.guide/images/ico-check@3x.png');
      background-size: 100% 100%;
    }
  }

  &:checked {
    background: #368fff;
    border: 1px solid #368fff;
  }

  &:disabled {
    background: #222;
    border: 1px solid #222;
    opacity: 0.1;
  }
`

export interface CheckboxItemOption
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactElement | string
  value: any
  margin?: MarginPadding
}

export interface CheckboxWrapperProps {
  name: string
  value: any[]
  options: CheckboxItemOption[]
  onChange: (newValue: any[]) => any
}

export function CheckboxItem({
  label,
  value,
  name,
  margin = { bottom: 20 },
  disabled,
  checked,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: React.SyntheticEvent) => {},
  ...rest
}: CheckboxItemOption) {
  return (
    <Container margin={margin} position="relative" padding={{ right: 29 }}>
      <CheckboxLabel disabled={disabled} ellipsis>
        <label htmlFor={`${name}-checked`}>{label}</label>
      </CheckboxLabel>

      <CheckboxInput
        {...rest}
        type="checkbox"
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        value={value}
        id={`${name}-checked`}
      />
    </Container>
  )
}

export default function Checkbox({
  name,
  value: checkedList,
  onChange,
  options,
}: CheckboxWrapperProps) {
  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: any,
  ) =>
    onChange(
      e.target.checked
        ? [...checkedList, value]
        : checkedList.filter((v) => !equals(v, value)),
    )

  return (
    <>
      {options.map((option, index) => {
        const { value, disabled, checked } = option
        const checkedState =
          checked !== undefined
            ? checked
            : checkedList.filter((v) => equals(v, value)).length > 0
        const isLast = index + 1 === options.length
        const checkboxMargin = { bottom: isLast ? 0 : 20 }

        return (
          <CheckboxItem
            key={index}
            {...option}
            name={name}
            margin={checkboxMargin}
            checked={checkedState}
            disabled={disabled}
            onChange={(e) => onCheckboxChange(e, value)}
          />
        )
      })}
    </>
  )
}
