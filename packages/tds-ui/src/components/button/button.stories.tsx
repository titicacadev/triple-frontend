import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import { Button } from './button'
import { ButtonContainer } from './button-container'
import { ButtonGroup } from './button-group'
import { ButtonIcon } from './button-icon'

const meta: Meta<typeof Button> = {
  title: 'tds-ui / Button',
  component: Button,
}

export default meta

export const Normal: StoryObj<typeof Button> = {
  args: {
    children: 'Normal',
  },
}

export const Basic: StoryObj<typeof Button> = {
  args: {
    children: 'Basic',
    basic: true,
  },
}

export const Disabled: StoryFn<typeof Button> = () => {
  return (
    <>
      <Button disabled>Normal</Button>
      <Button basic disabled>
        Basic
      </Button>
    </>
  )
}

export const Compact: StoryFn<typeof Button> = () => {
  return (
    <>
      <Button compact>Normal</Button>
      <Button basic compact>
        Basic
      </Button>
    </>
  )
}

export const Size: StoryFn<typeof Button> = () => {
  return (
    <>
      <Button size="tiny">Tiny</Button>
      <Button size="small">Small</Button>
      <Button size="large">Large</Button>
    </>
  )
}

export const Fluid: StoryFn<typeof Button> = () => {
  return (
    <>
      <Button fluid>Normal</Button>
      <Button basic fluid>
        Basic
      </Button>
    </>
  )
}

export const Icon: StoryFn<typeof Button> = () => {
  return (
    <>
      <Button>
        <ButtonIcon
          src="https://assets.triple-dev.titicaca-corp.com/images/save@4x.png"
          size="tiny"
        />
        Tiny
      </Button>
      <Button basic>
        <ButtonIcon
          src="https://triple-dev.titicaca-corp.com/content/static/images/index@4x.png"
          size="small"
        />
        Small
      </Button>
    </>
  )
}

export const BlockIcons: StoryFn<typeof Button> = () => {
  return (
    <>
      <Button icon="saveEmpty">saveEmpty</Button>
      <Button icon="saveFilled">saveFilled</Button>
      <Button icon="starEmpty">starEmpty</Button>
      <Button icon="starFilled">starFilled</Button>
      <Button icon="map">map</Button>
      <Button icon="share">share</Button>
      <Button icon="schedule">schedule</Button>
    </>
  )
}

export const WithButtonGroup: StoryObj<typeof ButtonGroup> = {
  render: (args) => {
    return (
      <ButtonGroup {...args}>
        <Button basic color="gray" size="small">
          현지에서 길묻기
        </Button>
        <Button basic inverted color="blue" size="small">
          길찾기
        </Button>
      </ButtonGroup>
    )
  },

  args: {
    horizontalGap: 10,
    buttonCount: 2,
  },
}

export const WithIconButtonGroup: StoryObj<typeof ButtonGroup> = {
  render: (args) => {
    return (
      <ButtonGroup {...args}>
        <Button icon="saveEmpty">저장하기</Button>
        <Button icon="schedule">일정추가</Button>
        <Button icon="starEmpty">리뷰쓰기</Button>
        <Button icon="share">공유하기</Button>
      </ButtonGroup>
    )
  },

  args: {
    horizontalGap: 22,
  },
}

export const WithButtonContainer: StoryObj<typeof ButtonContainer> = {
  render: (args) => {
    return (
      <ButtonContainer {...args}>
        <Button basic color="gray" size="small">
          버튼 1
        </Button>
        <Button basic inverted color="blue" size="small">
          버튼 2
        </Button>
      </ButtonContainer>
    )
  },

  args: {
    floated: 'none',
  },
}
