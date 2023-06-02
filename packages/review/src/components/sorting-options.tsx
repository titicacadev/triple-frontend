import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import { Label, FlexBox } from '@titicaca/core-elements'

import { SortingOption } from './types'

export interface SortingOptionsProps {
  selected: string
  onSelect: (key: SortingOption) => void
}

const OptionsContainer = styled(FlexBox)`
  padding: 0;

  div:not(:first-child) {
    margin-left: 12px;
  }

  span {
    font-weight: bold;
  }
`

export default function SortingOptions({
  selected,
  onSelect,
}: SortingOptionsProps) {
  const { t } = useTranslation('common-web')

  const sortingOptions = [
    { key: '' as const, text: t(['cuceonsun', '추천순']) },
    { key: 'latest' as const, text: t(['coesinsun', '최신순']) },
  ]

  return (
    <OptionsContainer
      flex
      css={{
        alignItems: 'center',
      }}
    >
      {sortingOptions.map(({ key, text }) => (
        <Label key={key} radio selected={selected === key}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <span onClick={() => onSelect(key)}>{text}</span>
        </Label>
      ))}
    </OptionsContainer>
  )
}
