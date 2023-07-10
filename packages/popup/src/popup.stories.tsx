import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'

import Popup from './popup'

export default {
  title: 'popup / Popup',
  component: Popup,
  parameters: {
    story: {
      inline: false,
      iframeHeight: 500,
    },
  },
} as Meta<typeof Popup>

const EmptyScroll = styled.div`
  height: 200vh;
`

export const Basic: StoryObj<typeof Popup> = {
  args: {
    open: true,
    title: '테스트',
    children: <EmptyScroll>Scroll........</EmptyScroll>,
  },
}

export const Borderless: StoryObj<typeof Popup> = {
  args: {
    open: true,
    borderless: true,
    title: '테스트',
    children: <EmptyScroll>Scroll........</EmptyScroll>,
  },
}

export const NoNavbar: StoryObj<typeof Popup> = {
  args: {
    open: true,
    noNavbar: true,
    title: '테스트',
    children: <EmptyScroll>Scroll........</EmptyScroll>,
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
