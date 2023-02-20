import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { Tabs } from './tabs'
import { TabList } from './tab-list'
import { Tab } from './tab'
import { TabPanel } from './tab-panel'

export default {
  title: 'core-elements / Tabs',
  component: Tabs,
  subcomponents: {
    TabList,
    Tab,
    TabPanel,
  },
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => {
  const [value, setValue] = useState('a')

  return (
    <Tabs {...args} value={value} onChange={setValue}>
      <TabList>
        <Tab value="a">A</Tab>
        <Tab value="b">B</Tab>
        <Tab value="c">C</Tab>
      </TabList>
      <TabPanel value="a">This is panel A</TabPanel>
      <TabPanel value="b">This is panel B</TabPanel>
      <TabPanel value="c">This is panel C</TabPanel>
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
