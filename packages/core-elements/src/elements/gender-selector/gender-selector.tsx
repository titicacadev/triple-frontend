import { RadioGroup, RadioGroupProps } from '../radio'

import { GenderSelectorItem } from './gender-selector-item'

export type GenderSelectorProps = Omit<RadioGroupProps, 'children'>

export const GenderSelector = ({ ...props }: GenderSelectorProps) => {
  return (
    <RadioGroup {...props}>
      <GenderSelectorItem value="MALE">남자</GenderSelectorItem>
      <GenderSelectorItem value="FEMALE">여자</GenderSelectorItem>
    </RadioGroup>
  )
}
