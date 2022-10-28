import { ChangeEventHandler, PropsWithChildren } from 'react'
import { blue, gray200 } from '@titicaca/color-palette'
import { useVisuallyHidden } from '@react-aria/visually-hidden'
import styled from 'styled-components'

import Text from '../text'

import { useCheckboxGroup } from './checkbox-group-context'

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const CheckboxInput = styled.input``

const CheckboxControl = styled.span`
  position: relative;
  width: 26px;
  height: 26px;
  border: 1px solid ${gray200};
  border-radius: 6px;
  background-color: white;

  ${CheckboxInput}:checked + & {
    border-color: ${blue};
    background-color: ${blue};
  }

  ${CheckboxInput}:focus-visible + & {
    outline: -webkit-focus-ring-color auto 1px;
    outline-offset: 2px;
  }
`

const CheckboxSvg = styled.svg`
  position: absolute;
  top: 8px;
  left: 6px;
`

const CheckboxText = styled(Text)`
  flex: 1;
`

export interface CheckboxProps extends PropsWithChildren {
  name?: string
  checked?: boolean
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const Checkbox = ({
  children,
  name,
  checked,
  value,
  onChange,
}: CheckboxProps) => {
  const group = useCheckboxGroup()
  const { visuallyHiddenProps } = useVisuallyHidden()

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
      <CheckboxInput
        {...visuallyHiddenProps}
        type="checkbox"
        name={name ?? group?.name}
        checked={checked ?? (value ? group?.value?.includes(value) : undefined)}
        value={value}
        onChange={handleChange}
      />
      <CheckboxControl>
        <CheckboxSvg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable={false}
          aria-hidden
        >
          <path
            d="M12.1893 0.251888C12.4644 -0.0577739 12.9385 -0.0857889 13.2481 0.189315C13.5296 0.43941 13.5784 0.853921 13.3782 1.15987L13.3107 1.24813L6.20347 9.24813C5.94894 9.53464 5.52525 9.57933 5.21887 9.36885L5.13077 9.29804L0.237987 4.72682C-0.0646829 4.44405 -0.0808087 3.96945 0.20197 3.66678C0.459041 3.39162 0.874642 3.35328 1.17548 3.56104L1.26202 3.63076L5.593 7.67601L12.1893 0.251888Z"
            fill="white"
          />
        </CheckboxSvg>
      </CheckboxControl>
    </CheckboxLabel>
  )
}
