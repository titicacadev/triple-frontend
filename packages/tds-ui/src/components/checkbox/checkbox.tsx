import {
  ChangeEventHandler,
  forwardRef,
  PropsWithChildren,
  useContext,
} from 'react'
import { styled } from 'styled-components'

import { Text } from '../text'
import { CheckboxGroupContext } from '../checkbox-group'

import { CheckboxBase, CheckboxBaseProps } from './checkbox-base'

const CheckboxLabel = styled.label`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const CheckboxText = styled(Text)`
  flex: 1;
`

export interface CheckboxProps extends CheckboxBaseProps, PropsWithChildren {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      children,
      variant = 'square',
      checkboxSize,
      name,
      checked,
      value,
      onChange,
      ...props
    },
    ref,
  ) {
    const group = useContext(CheckboxGroupContext)

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      if (group) {
        const nextValue = event.target.checked
          ? group.value.concat(event.target.value)
          : group.value.filter((value) => event.target.value !== value)
        group?.onChange?.(nextValue)
      } else {
        onChange?.(event)
      }
    }

    return (
      <CheckboxLabel>
        <CheckboxText>{children}</CheckboxText>
        <CheckboxBase
          {...props}
          ref={ref}
          variant={variant}
          checkboxSize={checkboxSize}
          name={name ?? group?.name}
          checked={
            checked ??
            (value ? group?.value?.includes(value.toString()) : undefined)
          }
          value={value}
          aria-errormessage={group?.errorId}
          aria-invalid={group?.isError}
          aria-required={group?.isRequired}
          onChange={handleChange}
        />
      </CheckboxLabel>
    )
  },
)
