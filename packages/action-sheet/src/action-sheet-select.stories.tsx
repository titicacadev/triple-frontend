import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { ActionSheetSelect } from './action-sheet-select'
import { ActionSheetSelectOption } from './action-sheet-select-option'
import { ActionSheetSelectButton } from './action-sheet-select-button'
import { ActionSheetSelectOptions } from './action-sheet-select-options'

export default {
  title: 'action-sheet / action-sheet-select',
  component: ActionSheetSelect,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
} as ComponentMeta<typeof ActionSheetSelect>

const list = [
  ['a', 'Option A'],
  ['b', 'Option B'],
  ['c', 'Option C'],
]

export const Basic: ComponentStory<typeof ActionSheetSelect> = () => {
  const [value, setValue] = useState<string | undefined>(undefined)

  return (
    <ActionSheetSelect value={value} onChange={setValue}>
      <ActionSheetSelectButton>
        {list.find((item) => item[0] === value)?.[1] ?? '선택하기'}
      </ActionSheetSelectButton>
      <ActionSheetSelectOptions title="select">
        {list.map((item) => (
          <ActionSheetSelectOption key={item[0]} value={item[0]}>
            {item[1]}
          </ActionSheetSelectOption>
        ))}
      </ActionSheetSelectOptions>
    </ActionSheetSelect>
  )
}
