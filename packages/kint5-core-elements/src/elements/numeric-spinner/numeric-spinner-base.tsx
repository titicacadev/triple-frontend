import { KeyboardEventHandler } from 'react'
import styled from 'styled-components'

import { Text } from '../text'
import { GlobalSizes } from '../../commons'

function clamp(value: number, min: number, max: number) {
  if (Math.min(value, min) === value) {
    return min
  } else if (Math.max(value, max) === value) {
    return max
  } else {
    return value
  }
}

const Counter = styled.div`
  display: flex;
  align-items: center;
`

const Button = styled.button`
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  cursor: pointer;

  &:disabled {
    cursor: auto;
    opacity: 0.2;
  }
`

export interface NumericSpinnerBaseProps {
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  size?: GlobalSizes
  value?: number
  onChange?: (value: number) => void
}

export const NumericSpinnerBase = ({
  disabled,
  min = 0,
  max = Infinity,
  step = 1,
  size = 'medium',
  value = 0,
  onChange,
}: NumericSpinnerBaseProps) => {
  const increment = () => {
    onChange?.(clamp(value + step, min, max))
  }

  const decrement = () => {
    onChange?.(clamp(value - step, min, max))
  }

  const toMax = () => {
    if (isFinite(max)) {
      onChange?.(max)
    }
  }

  const toMin = () => {
    if (isFinite(min)) {
      onChange?.(min)
    }
  }

  const handleKeyDown: KeyboardEventHandler = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        event.stopPropagation()
        increment()
        break
      case 'ArrowDown':
        event.stopPropagation()
        decrement()
        break
      case 'Home':
        event.stopPropagation()
        toMin()
        break
      case 'End':
        event.stopPropagation()
        toMax()
        break
    }
  }

  return (
    <Counter role="group" tabIndex={0} onKeyDown={handleKeyDown}>
      <Button
        disabled={disabled || value <= min}
        aria-label="감소"
        type="button"
        tabIndex={-1}
        onClick={decrement}
      >
        <svg
          width="14"
          height="3"
          viewBox="0 0 14 3"
          xmlns="http://www.w3.org/2000/svg"
          focusable={false}
          aria-hidden
        >
          <path
            d="M13 0.5H1C0.447715 0.5 0 0.947715 0 1.5C0 2.05228 0.447715 2.5 1 2.5H13C13.5523 2.5 14 2.05228 14 1.5C14 0.947715 13.5523 0.5 13 0.5Z"
            fill="currentColor"
          />
        </svg>
      </Button>
      <Text
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        role="spinbutton"
        size={size || 'medium'}
        padding={{ left: 10, right: 10 }}
      >
        {value}
      </Text>
      <Button
        disabled={disabled || value >= max}
        aria-label="증가"
        type="button"
        tabIndex={-1}
        onClick={increment}
      >
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          xmlns="http://www.w3.org/2000/svg"
          focusable={false}
          aria-hidden
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 0.5C7.55228 0.5 8 0.947715 8 1.5V6.5H13C13.5523 6.5 14 6.94772 14 7.5C14 8.05228 13.5523 8.5 13 8.5H8V13.5C8 14.0523 7.55228 14.5 7 14.5C6.44772 14.5 6 14.0523 6 13.5V8.5H1C0.447715 8.5 0 8.05228 0 7.5C0 6.94772 0.447715 6.5 1 6.5H6V1.5C6 0.947715 6.44772 0.5 7 0.5Z"
            fill="currentColor"
          />
        </svg>
      </Button>
    </Counter>
  )
}
