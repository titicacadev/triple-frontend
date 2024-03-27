import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Tabs } from './tabs'
import { TabList } from './tab-list'
import { Tab } from './tab'
import { TabPanel } from './tab-panel'

const meta: Meta<typeof Tabs> = {
  title: 'tds-ui / Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          '좁은 화면에 많은 수의 컴포넌트를 배치할 필요가 있을 때 사용되는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Tabs>

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

export const Basic: Story = {
  args: {
    variant: 'basic',
  },
  render: Template,
}

export const Pointing: Story = {
  args: {
    variant: 'pointing',
  },
  render: Template,
}

export const PointingScroll: Story = {
  args: {
    variant: 'pointing',
    scroll: true,
  },
  render: Template,
}

export const Rounded: Story = {
  args: {
    variant: 'rounded',
  },
  render: Template,
}

export const RoundedScroll: Story = {
  args: {
    variant: 'rounded',
    scroll: true,
  },
  render: Template,
}
