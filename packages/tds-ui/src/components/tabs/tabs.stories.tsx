import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { Tabs } from './tabs'
import { TabList } from './tab-list'
import { Tab } from './tab'
import { TabPanel } from './tab-panel'

export default {
  title: 'tds-ui / Tabs',
  component: Tabs,
  subcomponents: {
    TabList,
    Tab,
    TabPanel,
  },
} as Meta<typeof Tabs>

const Template: StoryFn<typeof Tabs> = (args) => {
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

export const Basic = {
  render: Template,

  args: {
    variant: 'basic',
  },
}

export const Pointing = {
  render: Template,

  args: {
    variant: 'pointing',
  },
}

export const PointingScroll = {
  render: Template,

  args: {
    ...Pointing.args,
    scroll: true,
  },
}

export const Rounded = {
  render: Template,

  args: {
    variant: 'rounded',
  },
}

export const RoundedScroll = {
  render: Template,

  args: {
    ...Rounded.args,
    scroll: true,
  },
}
