import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'
import { useArgs } from '@storybook/preview-api'

import { Popup } from './popup'

const meta: Meta<typeof Popup> = {
  title: 'tds-ui / Popup',
  component: Popup,
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 내용을 표시하기 위해 갑자기 생성되는 뷰 컴포넌트입니다.',
      },
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Popup>

const EmptyScroll = styled.div`
  height: 200vh;
`

export const Default: Story = {
  args: {
    open: true,
    title: '제목',
    children: <EmptyScroll>팝업 내용입니다</EmptyScroll>,
  },
  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs()

    const onClose = () => {
      updateArgs({ open: !open })
    }

    if (!open) {
      return (
        <button onClick={() => updateArgs({ open: true })}>팝업 열기</button>
      )
    }

    return <Popup {...args} onClose={onClose} />
  },
}

export const Borderless: Story = {
  args: {
    open: true,
    borderless: true,
    title: '제목',
    children: <EmptyScroll>팝업 내용입니다</EmptyScroll>,
  },
  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs()

    const onClose = () => {
      updateArgs({ open: !open })
    }

    if (!open) {
      return (
        <button onClick={() => updateArgs({ open: true })}>팝업 열기</button>
      )
    }

    return <Popup {...args} onClose={onClose} />
  },
}

export const NoNavbar: Story = {
  args: {
    open: true,
    noNavbar: true,
    title: '제목',
    children: <EmptyScroll>팝업 내용입니다</EmptyScroll>,
  },
  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs()

    const onClose = () => {
      updateArgs({ open: !open })
    }

    if (!open) {
      return (
        <button onClick={() => updateArgs({ open: true })}>팝업 열기</button>
      )
    }

    return <Popup {...args} onClose={onClose} />
  },
}

// TODO
// export const AfterActionSheet = () => {
//   return (
//     <>
//       <Popup title="팝업입니다" open onClose={() => {}}>
//         <EmptyScroll>Scroll........</EmptyScroll>
//       </Popup>

//       <ActionSheet open={false} title="샘플 액션시트">
//         <ActionSheet.Item>메뉴 1</ActionSheet.Item>
//         <ActionSheet.Item>메뉴 2</ActionSheet.Item>
//       </ActionSheet>
//     </>
//   )
// }
// AfterActionSheet.storyName = '팝업과 액션시트가 같은 계층에 있는 경우'

// export const WithInActionSheet = () => {
//   return (
//     <Popup title="팝업입니다" open onClose={() => {}}>
//       <EmptyScroll>Scroll........</EmptyScroll>
//       <ActionSheet open={false} title="샘플 액션시트">
//         <ActionSheet.Item>메뉴 1</ActionSheet.Item>
//         <ActionSheet.Item>메뉴 2</ActionSheet.Item>
//       </ActionSheet>
//     </Popup>
//   )
// }
// WithInActionSheet.storyName = '팝업 안에 액션시트가 있는 경우'
