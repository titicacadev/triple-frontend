import styled, { css } from 'styled-components'
import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'

import { ActionSheet } from './action-sheet'
import { ActionSheetItem } from './action-sheet-item'

export default {
  title: 'action-sheet / action-sheet',
  component: ActionSheet,
  subcomponents: { Item: ActionSheetItem },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
} as ComponentMeta<typeof ActionSheet>

export const Basic: ComponentStoryObj<typeof ActionSheet> = {
  args: {
    open: true,
    children: (
      <>
        <ActionSheetItem>메뉴 1</ActionSheetItem>
        <ActionSheetItem>메뉴 2</ActionSheetItem>
        <ActionSheetItem>메뉴 3</ActionSheetItem>
        <ActionSheetItem>메뉴 4</ActionSheetItem>
        <ActionSheetItem>메뉴 5</ActionSheetItem>
        <ActionSheetItem>메뉴 6</ActionSheetItem>
        <ActionSheetItem>메뉴 7</ActionSheetItem>
        <ActionSheetItem>메뉴 8</ActionSheetItem>
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
        <ActionSheetItem checked>메뉴 1</ActionSheetItem>
        <ActionSheetItem checked={false}>메뉴 2</ActionSheetItem>
        <ActionSheetItem icon="save">샘플 메뉴</ActionSheetItem>
        <ActionSheetItem buttonLabel="액션">샘플 메뉴</ActionSheetItem>
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
        <ActionSheetItem icon="save">샘플 메뉴</ActionSheetItem>
        <ActionSheetItem buttonLabel="액션">샘플 메뉴</ActionSheetItem>
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
    children: (
      <>
        <ActionSheetItem icon="save">샘플 메뉴</ActionSheetItem>
        <ActionSheetItem buttonLabel="액션">샘플 메뉴</ActionSheetItem>
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
        <ActionSheetItem>메뉴 1</ActionSheetItem>
        <ActionSheetItem>메뉴 2</ActionSheetItem>
      </>
    ),
  },
}

export const WithExtendStyle: ComponentStory<typeof ActionSheet> = () => {
  return (
    <ActionSheet
      open
      title="샘플 액션 시트"
      css={css`
        background-color: gray;

        &.action-sheet-slide-enter-done {
          > div:last-child {
            padding: 0 40px;
          }
        }
      `}
    >
      <ActionSheetItem
        icon="save"
        css={css`
          padding: 0 40px;
          background-color: aqua;
        `}
      >
        샘플 메뉴
      </ActionSheetItem>
      <ActionSheetItem buttonLabel="액션">샘플 메뉴</ActionSheetItem>
    </ActionSheet>
  )
}
WithExtendStyle.storyName = '스타일 확장'
WithExtendStyle.parameters = {
  docs: {
    description: {
      story:
        '스타일을 확장하여 사용할 때에는 ActionSheet의 css prop이나 ActionSheetItem의 css prop을 사용합니다. ',
    },
  },
}
