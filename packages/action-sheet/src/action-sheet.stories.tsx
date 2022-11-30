import styled, { css } from 'styled-components'
import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryObj,
} from '@storybook/react'

import { ActionSheet } from './action-sheet'

export default {
  title: 'action-sheet / action-sheet',
  component: ActionSheet,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  subcomponents: { Item: ActionSheet.Item },
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
      <ActionSheet.Item
        icon="save"
        css={css`
          padding: 0 40px;
          background-color: aqua;
        `}
      >
        샘플 메뉴
      </ActionSheet.Item>
      <ActionSheet.Item buttonLabel="액션">샘플 메뉴</ActionSheet.Item>
    </ActionSheet>
  )
}
WithExtendStyle.storyName = '스타일 확장'
WithExtendStyle.parameters = {
  docs: {
    description: {
      story:
        '스타일을 확장하여 사용할 때에는 ActionSheet의 css prop이나 ActionSheet.Item의 css prop을 사용합니다. ',
    },
  },
}
