import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { ActionSheetSelect } from './action-sheet-select'
import { ActionSheetSelectButton } from './action-sheet-select-button'
import { ActionSheetSelectOption } from './action-sheet-select-option'
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
} as Meta<typeof ActionSheetSelect>

const list = [
  ['a', 'Option A'],
  ['b', 'Option B'],
  ['c', 'Option C'],
]

export const Basic: StoryFn<typeof ActionSheetSelect> = () => {
  const [value, setValue] = useState<string | undefined>(undefined)

  return (
    <ActionSheetSelect
      label="Label"
      help="Help message"
      required
      value={value}
      onChange={setValue}
    >
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
