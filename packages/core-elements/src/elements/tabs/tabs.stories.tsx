/* eslint-disable @typescript-eslint/naming-convention */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { Tabs } from './tabs'

export default {
  title: 'core-elements / Tabs',
  component: Tabs,
  subcomponents: {
    TabList: Tabs.TabList,
    Tab: Tabs.Tab,
    TabPanel: Tabs.TabPanel,
  },
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => {
  const [value, setValue] = useState('a')

  return (
    <Tabs {...args} value={value} onChange={setValue}>
      <Tabs.TabList>
        <Tabs.Tab value="a">A</Tabs.Tab>
        <Tabs.Tab value="b">B</Tabs.Tab>
        <Tabs.Tab value="c">C</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanel value="a">This is panel A</Tabs.TabPanel>
      <Tabs.TabPanel value="b">This is panel B</Tabs.TabPanel>
      <Tabs.TabPanel value="c">This is panel C</Tabs.TabPanel>
    </Tabs>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  variant: 'basic',
}

export const Pointing = Template.bind({})
Pointing.args = {
  variant: 'pointing',
}

export const PointingScroll = Template.bind({})
PointingScroll.args = {
  ...Pointing.args,
  scroll: true,
}

export const Rounded = Template.bind({})
Rounded.args = {
  variant: 'rounded',
}

export const RoundedScroll = Template.bind({})
RoundedScroll.args = {
  ...Rounded.args,
  scroll: true,
}
