import { KeyboardEventHandler, useId } from 'react'
import styled, { css } from 'styled-components'

import { GlobalSizes, MarginPadding } from '../../commons'
import { paddingMixin } from '../../mixins'
import Text from '../text'

const Frame = styled.div<{ borderless?: boolean; padding?: MarginPadding }>`
  display: flex;
  position: relative;
  border: 1px solid #efefef;
  border-radius: 2px;

  ${({ borderless }) =>
    borderless &&
    css`
      border: none;
    `};

  ${paddingMixin}
`

const Counter = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`

const Button = styled.button`
  padding: 0;

  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled.span<{ active?: boolean; backgroundImageSrc?: string }>`
  display: inline-block;
  width: 34px;
  height: 34px;
  background-size: 34px 34px;
  background-repeat: no-repeat;
  background-position: -1px -1px;
  background-image: url(${({ backgroundImageSrc }) => backgroundImageSrc});
  opacity: ${({ active }) => (active ? 1 : 0.2)};
  cursor: pointer;
`

export interface NumericSpinnerProps {
  label?: string
  sublabel?: string
  strikeLabel?: string
  value?: number
  max?: number
  min?: number
  borderless?: boolean
  padding?: MarginPadding
  size?: GlobalSizes | number
  onChange?: (value: number) => void
}

export const NumericSpinner = ({
  label,
  sublabel,
  strikeLabel,
  value = 0,
  max = Infinity,
  min = 1,
  borderless,
  padding,
  size,
  onChange,
  ...props
}: NumericSpinnerProps) => {
  const labelId = useId()

  const clamp = (value: number) => {
    if (Math.min(value, min) === value) {
      return min
    } else if (Math.max(value, max) === value) {
      return max
    } else {
      return value
    }
  }

  const increment = () => {
    onChange?.(clamp(value + 1))
  }

  const decrement = () => {
    onChange?.(clamp(value - 1))
  }

  const toMax = () => {
    if (typeof max === 'number' && isFinite(max)) {
      onChange?.(max)
    }
  }

  const toMin = () => {
    if (typeof min === 'number' && isFinite(min)) {
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
    <Frame {...props} borderless={borderless} padding={padding}>
      <div>
        <Text id={labelId} size={size || 'small'}>
          {label}
        </Text>

        {sublabel ? (
          <Text size="mini" color="blue" inline>
            {sublabel}
          </Text>
        ) : null}

        {strikeLabel ? (
          <Text
            size="mini"
            color="gray"
            alpha={0.3}
            inline
            strikethrough
            margin={{ left: 2 }}
          >
            {strikeLabel}
          </Text>
        ) : null}
      </div>

      <Counter
        aria-labelledby={labelId}
        role="group"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <Button
          aria-label="감소"
          type="button"
          tabIndex={-1}
          onClick={decrement}
        >
          <Icon
            active={value > 0}
            backgroundImageSrc="https://assets.triple.guide/images/btn-numeric-minus@4x.png"
          />
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
          aria-label="증가"
          type="button"
          tabIndex={-1}
          onClick={increment}
        >
          <Icon
            active={value < max}
            backgroundImageSrc="https://assets.triple.guide/images/btn-numeric-plus@4x.png"
          />
        </Button>
      </Counter>
    </Frame>
  )
}
