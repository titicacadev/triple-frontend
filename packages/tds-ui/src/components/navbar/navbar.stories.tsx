import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'

import { Text } from '../text'

import { Navbar, NavbarWrapper } from './navbar'

const Toc = styled.div`
  position: absolute;
  left: 52px;
`

const meta: Meta<typeof Navbar> = {
  title: 'tds-ui / Navbar / Navbar',
  component: Navbar,
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
  render: () => {
    return (
      <Navbar title="도쿄 관광지" borderless backgroundColor="white">
        <Navbar.Item icon="back" />
        <Navbar.Item icon="more" floated="right" />
      </Navbar>
    )
  },
}

export const ThreeButtons: Story = {
  render: () => {
    return (
      <Navbar title="도쿄 관광지" borderless backgroundColor="white">
        <Navbar.Item icon="back" />
        <Navbar.Item icon="more" floated="right" />
        <Navbar.Item icon="route" floated="right" />
      </Navbar>
    )
  },
}

export const FourButtons: Story = {
  render: () => {
    return (
      <Navbar title="도쿄 관광지" borderless backgroundColor="white">
        <Navbar.Item icon="back" />
        <Navbar.Item icon="more" floated="right" />
        <Navbar.Item icon="route" floated="right" />
        <Navbar.Item icon="list" floated="right" />
      </Navbar>
    )
  },
}

export const SecondaryNavbar: Story = {
  render: () => {
    return (
      <>
        <Navbar title="도쿄 관광지" borderless>
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
  render: () => {
    return (
      <NavbarWrapper>
        <Navbar title="도쿄 관광지" borderless>
          <Navbar.Item icon="back" />
          <Navbar.Item icon="more" floated="right" />
        </Navbar>
      </NavbarWrapper>
    )
  },
}

export const RenderTitle: Story = {
  render: () => {
    return (
      <Navbar
        renderTitle={() => (
          <Toc>
            <Text size="small" bold alpha={1}>
              도쿄에서 반드시 먹어봐야 할 음식
            </Text>

            <Text size="mini" alpha={0.5} margin={{ top: 1 }}>
              라멘
            </Text>
          </Toc>
        )}
      >
        <Navbar.Item icon="back" />
        <Navbar.Item icon="more" floated="right" />
      </Navbar>
    )
  },
}
