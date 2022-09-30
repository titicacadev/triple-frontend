import styled from 'styled-components'
import { RangePicker } from '@titicaca/date-picker'
import { ComponentStory, ComponentStoryObj, Meta } from '@storybook/react'

import { newDateMockingDecorator } from '../../decorators'

import ActionSheet from './index'

export default {
  title: 'action-sheet / action-sheet',
  component: ActionSheet,
} as Meta

export const Basic: ComponentStoryObj<typeof ActionSheet> = {
  name: '기본 액션시트',
  args: {
    open: false,
    title: '샘플 액션 시트',
    borderRadius: 12,
    from: 'bottom',
    maxContentHeight: 100,
    padding: {
      top: 20,
      left: 25,
      bottom: 30,
      right: 25,
    },
    children: (
      <>
        <ActionSheet.Item>메뉴 1</ActionSheet.Item>
        <ActionSheet.Item>메뉴 2</ActionSheet.Item>
        <ActionSheet.Item>메뉴 3</ActionSheet.Item>
        <ActionSheet.Item>메뉴 4</ActionSheet.Item>
        <ActionSheet.Item>메뉴 5</ActionSheet.Item>
        <ActionSheet.Item>메뉴 6</ActionSheet.Item>
        <ActionSheet.Item>메뉴 7</ActionSheet.Item>
        <ActionSheet.Item>메뉴 8</ActionSheet.Item>
      </>
    ),
  },
}

export const WithTextMenu: ComponentStoryObj<typeof ActionSheet> = {
  name: '텍스트 메뉴',
  args: {
    open: true,
    title: '샘플 액션 시트',
    children: (
      <>
        <ActionSheet.Item checked>메뉴 1</ActionSheet.Item>
        <ActionSheet.Item checked={false}>메뉴 2</ActionSheet.Item>
        <ActionSheet.Item icon="save">샘플 메뉴</ActionSheet.Item>
        <ActionSheet.Item buttonLabel="액션">샘플 메뉴</ActionSheet.Item>
      </>
    ),
  },
}

export const WithIconMenu: ComponentStoryObj<typeof ActionSheet> = {
  name: '아이콘 메뉴',
  args: {
    open: true,
    title: '샘플 액션 시트',
    children: (
      <>
        <ActionSheet.Item icon="save">샘플 메뉴</ActionSheet.Item>
        <ActionSheet.Item buttonLabel="액션">샘플 메뉴</ActionSheet.Item>
      </>
    ),
  },
}

export const WithForm: ComponentStoryObj<typeof ActionSheet> = {
  name: '액션시트 방향 조절',
  args: {
    open: true,
    title: '샘플 액션 시트',
    borderRadius: 0,
    from: 'top',
    maxContentHeight: 100,
    padding: {
      top: 20,
      left: 25,
      bottom: 30,
      right: 25,
    },
    children: (
      <>
        <ActionSheet.Item icon="save">샘플 메뉴</ActionSheet.Item>
        <ActionSheet.Item buttonLabel="액션">샘플 메뉴</ActionSheet.Item>
      </>
    ),
  },
}

const Title = styled.h1`
  padding: 10px 20px;
  font-size: 24px;
  font-weight: bold;
`
const Help = styled.small`
  padding: 0 20px;
  color: gray;
  font-size: 13px;
`
const CustomHeader = ({ title, help }: { title: string; help: string }) => (
  <>
    <Title>{title}</Title>
    <Help>{help}</Help>
  </>
)

export const WithCustomHeader: ComponentStoryObj<typeof ActionSheet> = {
  name: '커스텀 헤더',
  args: {
    open: true,
    title: (
      <CustomHeader title="여행일정" help="출발일-도착일을 선택해주세요." />
    ),
    children: (
      <>
        <ActionSheet.Item>메뉴 1</ActionSheet.Item>
        <ActionSheet.Item>메뉴 2</ActionSheet.Item>
      </>
    ),
  },
}

const NewStyledActionSheet = styled(ActionSheet)`
  > div:last-child {
    /* padding: 0; */
  }
`

export const WithExtendStyle: ComponentStory<typeof ActionSheet> = (args) => {
  return (
    <NewStyledActionSheet {...args}>
      <RangePicker startDate={null} endDate={null} onDatesChange={() => {}} />
    </NewStyledActionSheet>
  )
}
WithExtendStyle.storyName = '스타일 확장'
WithExtendStyle.args = {
  open: true,
  title: '샘플 액션 시트',
}
WithExtendStyle.decorators = [newDateMockingDecorator]
