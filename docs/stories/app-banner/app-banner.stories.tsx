import React from 'react'
import { text } from '@storybook/addon-knobs'
import AppBanner from '@titicaca/app-banner'

export default {
  title: 'app-banner | AppBanner',
}

export function BaseAppBanner() {
  return (
    <AppBanner
      title={text('제목', '트리플 - 해외여행 가이드')}
      description={text('설명', '가이드북, 일정짜기, 길찾기, 맛집')}
      cta={text('버튼 레이블', '앱에서 보기')}
    />
  )
}

BaseAppBanner.storyName = '공유페이지'
