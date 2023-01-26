import { forwardRef, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { useVisuallyHidden } from '@react-aria/visually-hidden'

const ConfirmSelectorBaseWrapper = styled.div`
  display: inline-block;
`

const ConfirmSelectorBaseInput = styled.input``

const ConfirmSelectorBaseControl = styled.div`
  display: inline-block;
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background-color: var(--color-gray100);

  ${ConfirmSelectorBaseInput}:checked + & {
    background-color: var(--color-blue);
  }

  ${ConfirmSelectorBaseInput}:focus-visible + & {
    outline: -webkit-focus-ring-color auto 1px;
    outline-offset: 2px;
  }
`

const ConfirmSelectorBaseSvg = styled.svg`
  position: absolute;
  top: 7px;
  left: 5px;
`

export type ConfirmSelectorBaseProps = InputHTMLAttributes<HTMLInputElement>

export const ConfirmSelectorBase = forwardRef<
  HTMLInputElement,
  ConfirmSelectorBaseProps
>(function ConfirmSelectorBase(props, ref) {
  const { visuallyHiddenProps } = useVisuallyHidden()

  return (
    <ConfirmSelectorBaseWrapper>
      <ConfirmSelectorBaseInput
        ref={ref}
        type="checkbox"
        {...visuallyHiddenProps}
        {...props}
      />
      <ConfirmSelectorBaseControl>
        <ConfirmSelectorBaseSvg
          width="12"
          height="9"
          viewBox="0 0 12 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable={false}
          aria-hidden
        >
          <path
            d="M1 3.5L5 7.5L11 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </ConfirmSelectorBaseSvg>
      </ConfirmSelectorBaseControl>
    </ConfirmSelectorBaseWrapper>
  )
})
