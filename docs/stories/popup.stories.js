import React from 'react'

import { storiesOf } from '@storybook/react'
import { boolean, select } from '@storybook/addon-knobs'

import ActionSheet from '@titicaca/action-sheet'
import Popup from '@titicaca/popup'

import styled from 'styled-components'

const EmptyScroll = styled.div`
  height: 200vh;
`

storiesOf('Popup', module).add('일반', () => (
  <>
    <Popup
      title="테스트"
      borderless
      open={boolean('팝업 열기', false)}
      icon={select('네비바 아이콘', ['close', 'back'], 'close')}
    >
      <EmptyScroll>Scroll........</EmptyScroll>
    </Popup>

    <ActionSheet open={boolean('액션시트 열림', false)} title="메뉴 액션시트">
      <ActionSheet.Item>메뉴 1</ActionSheet.Item>
      <ActionSheet.Item>메뉴 2</ActionSheet.Item>
    </ActionSheet>
  </>
))
