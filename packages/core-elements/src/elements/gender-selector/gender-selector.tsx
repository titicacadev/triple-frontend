import { RadioGroup, RadioGroupProps } from '../radio'

import { GenderSelectorItem } from './gender-selector-item'

export type GenderSelectorProps = Omit<RadioGroupProps, 'children'>

export const GenderSelector = ({ ...props }: GenderSelectorProps) => {
  return (
    <RadioGroup {...props}>
      <GenderSelectorItem disabled={props.disabled} value="MALE">
        남자
      </GenderSelectorItem>
      <GenderSelectorItem disabled={props.disabled} value="FEMALE">
        여자
      </GenderSelectorItem>
    </RadioGroup>
  )
}
