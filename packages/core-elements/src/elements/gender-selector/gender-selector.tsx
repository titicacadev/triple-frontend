import { RadioGroup } from '../radio'

import { GenderSelectorItem } from './gender-selector-item'

export interface GenderSelectorProps {
  name?: string
  value?: string
  onChange?: (value: string) => void
}

export const GenderSelector = ({
  name,
  value,
  onChange,
}: GenderSelectorProps) => {
  return (
    <RadioGroup name={name} value={value} onChange={onChange}>
      <GenderSelectorItem value="MALE">남자</GenderSelectorItem>
      <GenderSelectorItem value="FEMALE">여자</GenderSelectorItem>
    </RadioGroup>
  )
}
