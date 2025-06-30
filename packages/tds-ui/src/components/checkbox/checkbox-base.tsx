import { forwardRef, InputHTMLAttributes } from 'react'
import { styled } from 'styled-components'

import { visuallyHiddenCss } from '../visually-hidden'

type CheckboxVariant = 'square' | 'round'

const CheckboxBaseInput = styled.input({}, visuallyHiddenCss)

const CheckboxBaseControl = styled.div<{
  variant: CheckboxVariant
  checkboxSize: number
}>`
  position: relative;
  width: ${({ checkboxSize }) => checkboxSize}px;
  height: ${({ checkboxSize }) => checkboxSize}px;
  border: 1px solid var(--color-gray200);
  border-radius: ${({ variant }) => (variant === 'square' ? '6px' : '50%')};
  background-color: white;

  ${CheckboxBaseInput}:checked + & {
    border-color: var(--color-blue);
    background-color: var(--color-blue);
  }

  ${CheckboxBaseInput}:focus-visible + & {
    outline: -webkit-focus-ring-color auto 1px;
    outline-offset: 2px;
  }
`

const CheckboxBaseSvg = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  aspect-ratio: 1 / 1;
  height: 50%;
`

export interface CheckboxBaseProps
  extends InputHTMLAttributes<HTMLInputElement> {
  variant?: CheckboxVariant
  checkboxSize?: number
}

export const CheckboxBase = forwardRef<HTMLInputElement, CheckboxBaseProps>(
  function CheckboxBase(
    { variant = 'square', checkboxSize = 26, ...props },
    ref,
  ) {
    return (
      <div>
        <CheckboxBaseInput ref={ref} type="checkbox" {...props} />
        <CheckboxBaseControl variant={variant} checkboxSize={checkboxSize}>
          <CheckboxBaseSvg
            viewBox="0 0 12 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable={false}
            aria-hidden
          >
            <path
              d="M1 5L5 9L11 2.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </CheckboxBaseSvg>
        </CheckboxBaseControl>
      </div>
    )
  },
)
