import React from 'react'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import {
  ImageBanner,
  TextBanner,
  BannerCTA,
} from '@titicaca/app-installation-cta'

export default {
  title: 'app-installation-cta | AppInstallationCTA',
}

export function BaseImageBanner() {
  return (
    <ImageBanner
      imgUrl={text('이미지 URL', '')}
      installUrl={text('설치 URL', 'https://triple-dev.titicaca-corp.com')}
      onDismiss={action('banner dismissed')}
    />
  )
}

BaseImageBanner.story = {
  name: '이미지 배너',
}

export function BaseTextBanner() {
  return (
    <TextBanner
      message={text('표시할 메시지', '앱 다운로드시 가이드북 무료')}
      installUrl={text('설치 URL', 'https://triple-dev.titicaca-corp.com')}
    />
  )
}

BaseTextBanner.story = {
  name: '텍스트 배너',
}

export function BaseBannerCTA() {
  return (
    <div>
      <BannerCTA
        inventoryId={text(
          '표시할 배너의 인벤토리 ID',
          'app-install-cta-poi-v1',
        )}
        installUrl={text('설치 URL', 'https://triple-dev.titicaca-corp.com')}
      />

      <div style={{ height: '2000px' }} />
    </div>
  )
}

BaseBannerCTA.story = {
  name: '배너 CTA',
}
