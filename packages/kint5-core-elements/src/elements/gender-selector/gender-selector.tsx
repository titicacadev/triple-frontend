import { useTranslation } from '@titicaca/next-i18next'

import { RadioGroup, RadioGroupProps } from '../radio-group'

import { GenderSelectorItem } from './gender-selector-item'

export type GenderSelectorProps = Omit<RadioGroupProps, 'children'>

export function GenderSelector({ ...props }: GenderSelectorProps) {
  const { t } = useTranslation('common-web')

  return (
    <RadioGroup {...props}>
      <GenderSelectorItem disabled={props.disabled} value="MALE">
        {t(['namja', '남자'])}
      </GenderSelectorItem>
      <GenderSelectorItem disabled={props.disabled} value="FEMALE">
        {t(['yeoja', '여자'])}
      </GenderSelectorItem>
    </RadioGroup>
  )
}
