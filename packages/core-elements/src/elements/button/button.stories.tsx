/* eslint-disable @typescript-eslint/naming-convention */
import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'

import { Button } from './button'
import { ButtonContainer } from './button-container'
import { ButtonGroup } from './button-group'
import { ButtonIcon } from './button-icon'

export default {
  title: 'Core-Elements / Button',
  component: Button,
  subcomponents: {
    ButtonContainer,
    ButtonGroup,
    ButtonIcon,
  },
} as ComponentMeta<typeof Button>

export const Normal: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Normal',
  },
}

export const Basic: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Basic',
    basic: true,
  },
}

export const Disabled: ComponentStory<typeof Button> = () => {
  return (
    <>
      <Button disabled>Normal</Button>
      <Button basic disabled>
        Basic
      </Button>
    </>
  )
}

export const Compact: ComponentStory<typeof Button> = () => {
  return (
    <>
      <Button compact>Normal</Button>
      <Button basic compact>
        Basic
      </Button>
    </>
  )
}

export const Size: ComponentStory<typeof Button> = () => {
  return (
    <>
      <Button size="tiny">Tiny</Button>
      <Button size="small">Small</Button>
      <Button size="large">Large</Button>
    </>
  )
}

export const Fluid: ComponentStory<typeof Button> = () => {
  return (
    <>
      <Button fluid>Normal</Button>
      <Button basic fluid>
        Basic
      </Button>
    </>
  )
}

export const Icon: ComponentStory<typeof Button> = () => {
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

export const BlockIcons: ComponentStory<typeof Button> = () => {
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

export const WithButtonGroup: ComponentStory<typeof ButtonGroup> = (args) => {
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
}
WithButtonGroup.args = {
  horizontalGap: 10,
  buttonCount: 2,
}

export const WithIconButtonGroup: ComponentStory<typeof ButtonGroup> = (
  args,
) => {
  return (
    <ButtonGroup {...args}>
      <Button icon="saveEmpty">저장하기</Button>
      <Button icon="schedule">일정추가</Button>
      <Button icon="starEmpty">리뷰쓰기</Button>
      <Button icon="share">공유하기</Button>
    </ButtonGroup>
  )
}
WithIconButtonGroup.args = {
  horizontalGap: 22,
}

export const WithButtonContainer: ComponentStory<typeof ButtonContainer> = (
  args,
) => {
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
}
WithButtonContainer.args = {
  floated: 'none',
}
