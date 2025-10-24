import type { Meta, StoryObj } from '@storybook/react'
import { styled, css } from 'styled-components'

import { ActionSheet } from './action-sheet'
import { ActionSheetItem } from './action-sheet-item'

const meta: Meta<typeof ActionSheet> = {
  title: 'tds-ui (Overlay) / ActionSheet',
  component: ActionSheet,
  args: {
    open: false,
    from: 'bottom',
    borderRadius: 12,
    bottomSpacing: 13,
    maxContentHeight: 'calc(100vh - 256px)',
  },
  argTypes: {
    open: { control: 'boolean' },
    borderRadius: { control: 'number' },
    bottomSpacing: { control: 'number' },
    from: {
      control: 'radio',
      options: ['top', 'bottom'],
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 선택지를 제공하는 팝업 형태의 뷰 컴포넌트입니다.',
      },
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ActionSheet>

export const Default: Story = {
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

export const WithTextMenu: Story = {
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

export const WithIconMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: '아이콘 메뉴가 포함된 ActionSheet 입니다.',
      },
    },
  },
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

export const WithForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'ActionSheet는 방향을 조절할 수 있습니다.',
      },
    },
  },
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

export const WithCustomHeader: Story = {
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

export const WithExtendStyle: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '스타일을 확장하여 사용할 때에는 ActionSheet의 css prop이나 ActionSheetItem의 css prop을 사용합니다. ',
      },
    },
  },
  args: {
    open: true,
    title: '샘플 액션 시트',
  },
  render: () => {
    return (
      <ActionSheet
        open
        css={css`
          background-color: gray;

          &.action-sheet-slide-enter-done {
            & > div:last-child {
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
  },
}
