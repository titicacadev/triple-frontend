import { Meta, Story } from '@storybook/react'
import { Property } from 'csstype'

import { GlobalSizes } from '../../commons'

import { Button, ButtonProps } from './button'

export default {
  title: 'Core-Elements / Button',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
} as Meta

export const Normal: Story<ButtonProps> = (args) => {
  return <Button {...args} />
}
Normal.storyName = '일반'
Normal.args = {
  children: '안녕',
  as: 'a',
  size: 'tiny',
  lineHeight: '16px',
}

export const Compact: Story<ButtonProps> = (args) => {
  return <Button {...args} />
}
Compact.storyName = '컴팩트'
Compact.args = {
  children: '안녕',
  compact: true,
  size: 'tiny',
}

export const NormalFluid: Story<ButtonProps> = (args) => {
  return <Button {...args} />
}
NormalFluid.storyName = '일반 (채움형)'
NormalFluid.args = {
  children: '안녕',
  fluid: true,
  size: 'tiny',
}

interface CompactIconCustomArgs {
  iconSize: GlobalSizes
}

export const CompactIcon: Story<ButtonProps & CompactIconCustomArgs> = ({
  iconSize,
  children,
  ...args
}) => {
  return (
    <Button {...args}>
      <Button.Icon
        src="https://assets.triple-dev.titicaca-corp.com/images/save@4x.png"
        size={iconSize}
      />
      {children}
    </Button>
  )
}
CompactIcon.storyName = '컴팩트 (아이콘)'
CompactIcon.args = {
  children: '저장하기',
  bold: true,
  compact: true,
  size: 'tiny',
  color: 'blue',
}

export const Basic: Story<ButtonProps> = (args) => {
  return <Button {...args} />
}
Basic.storyName = '베이직'
Basic.args = {
  children: '안녕',
  basic: true,
  fluid: false,
  compact: false,
  inverted: false,
}

export const BasicIcon: Story<ButtonProps> = ({ children, ...args }) => {
  return (
    <Button {...args}>
      <Button.Icon src="https://triple-dev.titicaca-corp.com/content/static/images/index@4x.png" />
      {children}
    </Button>
  )
}
BasicIcon.storyName = '베이직 (아이콘)'
BasicIcon.args = {
  children: '목차',
  basic: true,
  fluid: true,
  compact: true,
}

export const BlockIcon: Story<ButtonProps> = (args) => {
  return <Button {...args} />
}
BlockIcon.storyName = '블록형 아이콘'
BlockIcon.args = {
  children: '저장하기',
  icon: 'saveEmpty',
}

interface ButtonGroupCustomArgs {
  horizontalGap: number
  buttonCount: number
  buttonTag: 'a' | 'button'
}

export const ButtonGroup: Story<ButtonGroupCustomArgs> = ({
  horizontalGap,
  buttonCount,
  buttonTag,
}) => {
  return (
    <Button.Group horizontalGap={horizontalGap} buttonCount={buttonCount}>
      <Button as={buttonTag} basic color="gray" size="small">
        현지에서 길묻기
      </Button>
      <Button as={buttonTag} basic inverted color="blue" size="small">
        길찾기
      </Button>
    </Button.Group>
  )
}
ButtonGroup.storyName = '버튼 그룹'
ButtonGroup.args = {
  horizontalGap: 10,
  buttonCount: 2,
  buttonTag: 'a',
}

interface ButtonContainerCustomArgs {
  floated: Property.Float
  buttonTag: 'a' | 'button'
}

export const ButtonContainer: Story<ButtonContainerCustomArgs> = ({
  floated,
  buttonTag,
}) => {
  return (
    <Button.Container floated={floated}>
      <Button as={buttonTag} basic color="gray" size="small">
        버튼 1
      </Button>
      <Button as={buttonTag} basic inverted color="blue" size="small">
        버튼 2
      </Button>
    </Button.Container>
  )
}
ButtonContainer.storyName = '버튼 컨테이너'
ButtonContainer.args = {
  floated: 'none',
  buttonTag: 'a',
}

interface IconButtonGroupCustomArgs {
  horizontalGap: number
}

export const IconButtonGroup: Story<IconButtonGroupCustomArgs> = ({
  horizontalGap,
}) => {
  return (
    <Button.Group horizontalGap={horizontalGap}>
      <Button icon="saveEmpty">저장하기</Button>
      <Button icon="schedule">일정추가</Button>
      <Button icon="starEmpty">리뷰쓰기</Button>
      <Button icon="share">공유하기</Button>
    </Button.Group>
  )
}
IconButtonGroup.storyName = '아이콘 버튼 그룹'
IconButtonGroup.args = {
  horizontalGap: 22,
}
