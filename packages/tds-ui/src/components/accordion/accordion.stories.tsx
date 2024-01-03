import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import { Text } from '../text'

import { Accordion } from './accordion'
import { AccordionContent } from './accordion-content'
import { AccordionFolded } from './accordion-folded'
import { AccordionTitle } from './accordion-title'

const meta: Meta<typeof Accordion> = {
  title: 'tds-ui / Accordion',
  component: Accordion,
  args: {
    active: false,
  },
}

export default meta

export const BusinessHours: StoryObj<typeof Accordion> = {
  render: function Render(args) {
    const [{ active }, updateArgs] = useArgs()

    const onActiveChange = () => {
      updateArgs({ active: !active })
    }

    return (
      <Accordion {...args} onActiveChange={onActiveChange}>
        <AccordionTitle>
          <Text bold>이용가능시간, 휴무일</Text>
        </AccordionTitle>
        <AccordionFolded>
          <Text bold color="blue">
            오늘 09:00 - 18:00
          </Text>
        </AccordionFolded>
        <AccordionContent>
          <Text>
            월<br />화<br />수<br />목<br />금<br />토<br />일
          </Text>
        </AccordionContent>
      </Accordion>
    )
  },
}
