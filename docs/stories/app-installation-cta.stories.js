import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'

import { ImageBanner, TextBanner } from '@titicaca/app-installation-cta'

storiesOf('AppInstallationCTA', module)
  .add('이미지 배너', () => (
    <ImageBanner
      imgUrl={text('이미지 URL', '')}
      installUrl={text('설치 URL', 'https://triple-dev.titicaca-corp.com')}
      onDismiss={action('banner dismissed')}
    />
  ))
  .add('텍스트 배너', () => (
    <TextBanner
      message={text('표시할 메시지', '앱 다운로드시 가이드북 무료')}
    />
  ))
