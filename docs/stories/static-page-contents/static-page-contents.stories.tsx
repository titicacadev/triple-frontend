import React from 'react'
import styled from 'styled-components'
import { select, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Popup from '@titicaca/popup'
import { StaticPageContents } from '@titicaca/static-page-contents'

export default {
  title: 'Static Page Contents',
}

const CustomStyledStaticContents = styled(StaticPageContents)`
  && {
    color: red;
  }
`

export function Basic() {
  return <StaticPageContents src="static-mock.html" />
}

Basic.story = {
  name: 'Basic usage',
}

export function withPopup() {
  return (
    <Popup
      title={text('팝업 제목', '테스트')}
      noNavbar={boolean('Navbar 숨김', false)}
      borderless={boolean('네비바 경계선 없음', true)}
      open={boolean('팝업 열기', true)}
      icon={select('네비바 아이콘', ['close', 'back'], 'close')}
      onClose={action('onClose')}
    >
      <StaticPageContents src="static-mock.html" />
    </Popup>
  )
}

withPopup.story = {
  name: 'with Popup Component',
}

export function withFallback() {
  return (
    <StaticPageContents
      src="can-not-load-static-file.html"
      onFallback={() => <span>custom fallback contents</span>}
    />
  )
}

withFallback.story = {
  name: 'with Fallback',
}

export function withCustomStyle() {
  return <CustomStyledStaticContents src="static-mock.html" />
}

withCustomStyle.story = {
  name: 'with Styled Component',
}
