import React from 'react'
import styled from 'styled-components'
import { boolean, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
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
      title={text('팝업 제목', '테스트')}
      noNavbar={boolean('Navbar 숨김', false)}
      borderless={boolean('네비바 경계선 없음', true)}
      open={boolean('팝업 열기', false)}
      icon={select('네비바 아이콘', ['close', 'back'], 'close')}
    >
      <EmptyScroll>Scroll........</EmptyScroll>
    </Popup>
  )
}
Basic.storyName = '일반'

export const AfterActionSheet = () => {
  return (
    <>
      <Popup title="팝업입니다" open={true}>
        <EmptyScroll>Scroll........</EmptyScroll>
      </Popup>

      <ActionSheet
        open={boolean('액션 시트 열림', false)}
        title="샘플 액션시트"
      >
        <ActionSheet.Item>메뉴 1</ActionSheet.Item>
        <ActionSheet.Item>메뉴 2</ActionSheet.Item>
      </ActionSheet>
    </>
  )
}
AfterActionSheet.storyName = '팝업과 액션시트가 같은 계층에 있는 경우'

export const WithInActionSheet = () => {
  ;<>
    <Popup title="팝업입니다" open={true}>
      <EmptyScroll>Scroll........</EmptyScroll>
      <ActionSheet
        open={boolean('액션 시트 열림', false)}
        title="샘플 액션시트"
      >
        <ActionSheet.Item>메뉴 1</ActionSheet.Item>
        <ActionSheet.Item>메뉴 2</ActionSheet.Item>
      </ActionSheet>
    </Popup>
  </>
}
WithInActionSheet.storyName = '팝업 안에 액션시트가 있는 경우'

export const Event = () => {
  return (
    <Popup
      title={text('팝업 제목', '테스트')}
      noNavbar={boolean('Navbar 숨김', false)}
      borderless={boolean('네비바 경계선 없음', true)}
      open={boolean('팝업 열기', false)}
      icon={select('네비바 아이콘', ['close', 'back'], 'close')}
      onEnter={action('onEnter')}
      onEntered={action('onEntered')}
      onEntering={action('onEntering')}
      onExit={action('onExit')}
      onExited={action('onExited')}
      onExiting={action('onExiting')}
    >
      다양한 이벤트가 있습니다.
    </Popup>
  )
}
Event.storyName = '팝업 이벤트'
