import { InputHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { Container, GetGlobalColor } from '@titicaca/core-elements'

const Label = styled.label<{ disabled?: boolean }>`
  color: rgb(${GetGlobalColor('gray')});
  position: relative;
  cursor: pointer;
  display: block;
  min-height: 26px;
  line-height: 26px;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

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
  position: absolute;
  top: 0;
  right: 0;
  width: 26px;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  background-color: #fff;
  outline: none;

  &:checked,
  &:disabled {
    &::after {
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

interface Item<T> {
  key: string
  label: string
  value: T
  disabled?: boolean
}

export interface CheckboxItemProps<T>
  extends InputHTMLAttributes<HTMLInputElement> {
  option: Item<T>
  marginBottom?: number
}

export interface CheckboxWrapperProps<T> {
  name: string
  options: Item<T>[]
  onChange: (checkedValues: T[]) => void
  value: T[]
}

export function CheckboxItem<T>({
  disabled,
  checked,
  onChange = () => {},
  name,
  option: { key, label },
  marginBottom = 20,
  ...props
}: CheckboxItemProps<T>) {
  const id = `${key}_${label}_${name}`

  return (
    <Container
      position="relative"
      css={{
        marginBottom,
        padding: '0 29px 0 0',
      }}
      {...props}
    >
      <Label htmlFor={id} disabled={disabled}>
        {label}
      </Label>

      <CheckboxInput
        type="checkbox"
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        value={key}
        id={id}
      />
    </Container>
  )
}

export default function Checkbox<T>({
  name,
  onChange,
  options,
  value,
}: CheckboxWrapperProps<T>) {
  const checkedKeyList = value.map(
    (v) =>
      (options.find((option) => option.value === v) as Item<T>).key as string,
  )

  const onCheckboxChange = (checkedKey: string) => {
    const checkedKeyIndex = checkedKeyList.findIndex(
      (key) => key === checkedKey,
    )

    if (checkedKeyIndex > -1) {
      onChange(value.filter((_, index) => index !== checkedKeyIndex))
    } else {
      onChange([
        ...value,
        (options.find((option) => option.key === checkedKey) as Item<T>)
          .value as T,
      ])
    }
  }

  return (
    <>
      {options.map((option, index) => {
        const { disabled, key } = option
        const isChecked = checkedKeyList.includes(key)
        const isLast = index + 1 === options.length
        return (
          <CheckboxItem
            key={key}
            option={option}
            name={name}
            checked={isChecked}
            marginBottom={isLast ? 0 : 20}
            disabled={disabled}
            onChange={(e) => onCheckboxChange(e.target.value)}
          />
        )
      })}
    </>
  )
}
