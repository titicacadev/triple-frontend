import { useId } from 'react'

import { FlexBox } from '../flex-box'
import { Text } from '../text'

import {
  NumericSpinnerBase,
  NumericSpinnerBaseProps,
} from './numeric-spinner-base'

export interface NumericSpinnerProps extends NumericSpinnerBaseProps {
  label?: string
  sublabel?: string
  strikeLabel?: string
}

export const NumericSpinner = ({
  label,
  sublabel,
  strikeLabel,
  disabled,
  max,
  min,
  step,
  size,
  value,
  onChange,
  ...props
}: NumericSpinnerProps) => {
  const labelId = useId()

  return (
    <FlexBox flex {...props}>
      <FlexBox.Item flex="1">
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
      </FlexBox.Item>

      <NumericSpinnerBase
        disabled={disabled}
        max={max}
        min={min}
        step={step}
        size={size}
        value={value}
        onChange={onChange}
      />
    </FlexBox>
  )
}
