import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { select, text, boolean, number } from '@storybook/addon-knobs'
import Popup from '@titicaca/popup'
import { StaticPageContents } from '@titicaca/static-page-contents'

export default {
  title: 'Static Page Contents | FlexBox',
  components: StaticPageContents,
}

const CustomStyledStaticContents = styled(StaticPageContents)`
  && {
    color: red;
  }
`
storiesOf('Static Page Contents | Basic', module)
  .add('Basic', () => {
    return <StaticPageContents src="static-mock.html">ttt</StaticPageContents>
  })
  .add('with Popup', () => {
    return <Popup
    title={text('팝업 제목', '테스트')}
    noNavbar={boolean('Navbar 숨김', false)}
    borderless={boolean('네비바 경계선 없음', true)}
    open={boolean('팝업 열기', true)}
    icon={select('네비바 아이콘', ['close', 'back'], 'close')}
  >
    <StaticPageContents src="static-mock.html" />
  </Popup>
  })
  .add('with Fallback', () => {
    return <StaticPageContents
    src="can-not-load-static-file.html"
    onFallback={() => <span>custom fallback contents</span>} />
  })
  .add('with Custom Style', () => {
    return <CustomStyledStaticContents src="static-mock.html">ttt</CustomStyledStaticContents>
  })
