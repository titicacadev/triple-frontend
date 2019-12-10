import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { boolean, select } from '@storybook/addon-knobs'
import Popup from '@titicaca/popup'

const EmptyScroll = styled.div`
  height: 200vh;
`

storiesOf('Popup', module).add('일반', () => (
  <Popup
    title="테스트"
    borderless
    open={boolean('팝업 열기', false)}
    icon={select('네비바 아이콘', ['close', 'back'], 'close')}
  >
    <EmptyScroll>Scroll........</EmptyScroll>
  </Popup>
))
