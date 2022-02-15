import styled from 'styled-components'
import Popup from '@titicaca/popup'
import ActionSheet from '@titicaca/action-sheet'

export default {
  title: 'popup / Popup',
  component: Popup,
}

const EmptyScroll = styled.div`
  height: 200vh;
`

export const Basic = () => {
  return (
    <Popup
      title="테스트"
      noNavbar={false}
      borderless
      open={false}
      icon="close"
      onClose={() => {}}
    >
      <EmptyScroll>Scroll........</EmptyScroll>
    </Popup>
  )
}
Basic.storyName = '일반'

export const AfterActionSheet = () => {
  return (
    <>
      <Popup title="팝업입니다" open onClose={() => {}}>
        <EmptyScroll>Scroll........</EmptyScroll>
      </Popup>

      <ActionSheet open={false} title="샘플 액션시트">
        <ActionSheet.Item>메뉴 1</ActionSheet.Item>
        <ActionSheet.Item>메뉴 2</ActionSheet.Item>
      </ActionSheet>
    </>
  )
}
AfterActionSheet.storyName = '팝업과 액션시트가 같은 계층에 있는 경우'

export const WithInActionSheet = () => {
  return (
    <Popup title="팝업입니다" open onClose={() => {}}>
      <EmptyScroll>Scroll........</EmptyScroll>
      <ActionSheet open={false} title="샘플 액션시트">
        <ActionSheet.Item>메뉴 1</ActionSheet.Item>
        <ActionSheet.Item>메뉴 2</ActionSheet.Item>
      </ActionSheet>
    </Popup>
  )
}
WithInActionSheet.storyName = '팝업 안에 액션시트가 있는 경우'

export const Event = () => {
  return (
    <Popup
      title="테스트"
      noNavbar={false}
      borderless
      open={false}
      icon="close"
      onClose={() => {}}
    >
      다양한 이벤트가 있습니다.
    </Popup>
  )
}
Event.storyName = '팝업 이벤트'
