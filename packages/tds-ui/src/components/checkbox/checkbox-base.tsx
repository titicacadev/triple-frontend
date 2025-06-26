import { forwardRef, InputHTMLAttributes } from 'react'
import { styled } from 'styled-components'

import { visuallyHiddenCss } from '../visually-hidden'

type CheckboxVariant = 'square' | 'round'

const CheckboxBaseInput = styled.input({}, visuallyHiddenCss)

const CheckboxBaseControl = styled.div<{ variant: CheckboxVariant }>`
  position: relative;
  width: 26px;
  height: 26px;
  border: 1px solid var(--color-gray200);
  border-radius: ${({ variant }) => (variant === 'square' ? '6px' : '36px')};
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
`

export interface CheckboxBaseProps
  extends InputHTMLAttributes<HTMLInputElement> {
  variant?: CheckboxVariant
}

export const CheckboxBase = forwardRef<HTMLInputElement, CheckboxBaseProps>(
  function CheckboxBase({ variant = 'square', ...props }, ref) {
    return (
      <div>
        <CheckboxBaseInput ref={ref} type="checkbox" {...props} />
        <CheckboxBaseControl variant={variant}>
          <CheckboxBaseSvg
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
          </CheckboxBaseSvg>
        </CheckboxBaseControl>
      </div>
    )
  },
)
