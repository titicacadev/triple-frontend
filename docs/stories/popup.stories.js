import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { boolean, select, text } from '@storybook/addon-knobs'
import Popup from '@titicaca/popup'
import ActionSheet from '@titicaca/action-sheet'

const EmptyScroll = styled.div`
  height: 200vh;
`

storiesOf('Popup', module)
  .add('일반', () => (
    <Popup
      title={text('팝업 제목', '테스트')}
      noNavbar={boolean('Navbar 숨김', false)}
      borderless={boolean('네비바 경계선 없음', true)}
      open={boolean('팝업 열기', false)}
      icon={select('네비바 아이콘', ['close', 'back'], 'close')}
    >
      <EmptyScroll>Scroll........</EmptyScroll>
    </Popup>
  ))
  .add('팝업과 액션시트가 같은 계층에 있는 경우', () => (
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
  ))
  .add('팝업 안에 액션시트가 있는 경우', () => (
    <>
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
  ))
