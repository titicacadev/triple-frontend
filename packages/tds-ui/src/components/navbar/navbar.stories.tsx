import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'
import { defaultTheme } from '@titicaca/tds-theme'

import { Text } from '../text'

import { Navbar, NavbarWrapper } from './navbar'

const Toc = styled.div`
  position: absolute;
  left: 52px;
`

const meta: Meta<typeof Navbar> = {
  title: 'tds-ui / Navbar / Navbar',
  component: Navbar,
  args: {
    zIndex: 2,
    borderless: false,
    backgroundColor: 'white',
    position: 'fixed',
  },
  argTypes: {
    zIndex: { type: 'number' },
    title: { type: 'string' },
    borderless: { type: 'boolean' },
    maxWidth: { type: 'number' },
    backgroundColor: {
      control: 'select',
      options: Object.keys(defaultTheme.colors),
    },
    position: {
      control: 'select',
      options: ['absolute', 'fixed', 'relative', 'static', 'sticky'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '최상단에 Navigation 기능을 제공해야할 때 사용되는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Navbar>

export const TwoButtons: Story = {
  args: {
    title: '도쿄 관광지',
    children: (
      <>
        <Navbar.Item icon="back" />
        <Navbar.Item icon="more" floated="right" />
      </>
    ),
  },
}

export const ThreeButtons: Story = {
  args: {
    title: '도쿄 관광지',
    children: (
      <>
        <Navbar.Item icon="back" />
        <Navbar.Item icon="more" floated="right" />
        <Navbar.Item icon="route" floated="right" />
      </>
    ),
  },
}

export const FourButtons: Story = {
  args: {
    title: '도쿄 관광지',
    children: (
      <>
        <Navbar.Item icon="back" />
        <Navbar.Item icon="more" floated="right" />
        <Navbar.Item icon="route" floated="right" />
        <Navbar.Item icon="list" floated="right" />
      </>
    ),
  },
}

export const SecondaryNavbar: Story = {
  args: {
    title: '도쿄 관광지',
    borderless: true,
  },
  render: (args) => {
    return (
      <>
        <Navbar {...args}>
          <Navbar.Item icon="back" />
          <Navbar.Item floated="right" icon="more" />
        </Navbar>
        <Navbar.Secondary>
          <div>test</div>
        </Navbar.Secondary>
      </>
    )
  },
}

export const WrappedNavbar: Story = {
  args: {
    title: '도쿄 관광지',
    borderless: true,
  },
  render: (args) => {
    return (
      <NavbarWrapper>
        <Navbar {...args}>
          <Navbar.Item icon="back" />
          <Navbar.Item icon="more" floated="right" />
        </Navbar>
      </NavbarWrapper>
    )
  },
}

export const RenderTitle: Story = {
  args: {
    renderTitle: () => (
      <Toc>
        <Text size="small" bold alpha={1}>
          도쿄에서 반드시 먹어봐야 할 음식
        </Text>

        <Text size="mini" alpha={0.5} margin={{ top: 1 }}>
          라멘
        </Text>
      </Toc>
    ),
    children: (
      <>
        <Navbar.Item icon="back" />
        <Navbar.Item icon="more" floated="right" />
      </>
    ),
  },
}
